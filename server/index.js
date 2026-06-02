import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection pool setup
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

let dbConnected = false;

// Helper to automatically check and create the configured database if missing
async function ensureDatabaseExists() {
  const defaultClient = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: 'postgres', // Always exists by default in PostgreSQL
  });

  try {
    await defaultClient.connect();
    const dbName = process.env.DB_DATABASE || 'auris';
    
    // Check if configured DB exists
    const res = await defaultClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    
    if (res.rows.length === 0) {
      console.log(`🔨 Database "${dbName}" does not exist. Creating it programmatically...`);
      await defaultClient.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database "${dbName}" successfully created.`);
    }
    await defaultClient.end();
  } catch (err) {
    // If PG isn't running or credentials fail, we'll see a connection error here, which is fine
    console.warn('⚠️  Database auto-creation check skipped:', err.message);
    try {
      await defaultClient.end();
    } catch {
      // Ignore client connection closure failures
    }
  }
}

// Initialize Database Table Schema
async function initDB() {
  // First ensure the configured database exists on the PostgreSQL server
  await ensureDatabaseExists();

  try {
    // Check connection health
    const client = await pool.connect();
    console.log('✅ PostgreSQL connection successfully established!');
    dbConnected = true;
    
    // Create schema table if it does not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS organisation_details (
        id INT PRIMARY KEY,
        org_name VARCHAR(255) NOT NULL,
        num_depts VARCHAR(50) NOT NULL,
        selected_depts TEXT[] NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('📋 "organisation_details" table schema verified/created.');
    
    // Create users schema table if it does not exist
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        department VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS department VARCHAR(255);
    `);
    console.log('📋 "users" table schema verified/created.');
    client.release();
  } catch (err) {
    console.error('⚠️  PostgreSQL Connection Error:', err.message);
    console.log('ℹ️  Entering graceful offline mode. Server will remain active.');
    dbConnected = false;
  }
}

// Run DB Initialization
initDB();

// GET API: Retrieve the global Organisation Details (id = 1)
app.get('/api/organisation', async (req, res) => {
  if (!dbConnected) {
    // Attempt re-connection on request to heal connection if DB went online
    try {
      const client = await pool.connect();
      client.release();
      dbConnected = true;
    } catch {
      return res.status(503).json({
        error: 'Database Offline',
        message: 'PostgreSQL database connection is currently offline. Details are not accessible.',
      });
    }
  }

  try {
    const result = await pool.query('SELECT org_name, num_depts, selected_depts FROM organisation_details WHERE id = 1 LIMIT 1');
    if (result.rows.length === 0) {
      // Return empty configuration rather than error for smooth frontend loading
      return res.status(200).json(null);
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Get details error:', err.message);
    return res.status(500).json({ error: 'Database Error', message: err.message });
  }
});

// POST API: Upsert Organisation Details (stores as id = 1 uniquely)
app.post('/api/organisation', async (req, res) => {
  if (!dbConnected) {
    try {
      const client = await pool.connect();
      client.release();
      dbConnected = true;
    } catch {
      return res.status(503).json({
        error: 'Database Offline',
        message: 'PostgreSQL database connection is offline. Cannot save details at this time.',
      });
    }
  }

  const { orgName, numDepts, selectedDepts } = req.body;
  
  if (!orgName || !numDepts || !Array.isArray(selectedDepts)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid payload: orgName, numDepts, and selectedDepts array are required.',
    });
  }

  try {
    const queryText = `
      INSERT INTO organisation_details (id, org_name, num_depts, selected_depts)
      VALUES (1, $1, $2, $3)
      ON CONFLICT (id)
      DO UPDATE SET org_name = EXCLUDED.org_name,
                    num_depts = EXCLUDED.num_depts,
                    selected_depts = EXCLUDED.selected_depts,
                    updated_at = NOW()
      RETURNING *;
    `;
    const result = await pool.query(queryText, [orgName, numDepts, selectedDepts]);
    console.log(`💾 Organization Details upserted for "${orgName}"`);
    return res.status(200).json({
      success: true,
      message: 'Organization details successfully persisted to PostgreSQL!',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Save details error:', err.message);
    return res.status(500).json({ error: 'Database Error', message: err.message });
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyforaurisintelligence123!';

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No session token was provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden', message: 'Session is invalid or has expired.' });
    }
    req.user = decoded;
    next();
  });
}

// POST API: User Registration
app.post('/api/auth/register', async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ error: 'Database Offline', message: 'Cannot register user because the database is offline.' });
  }

  const { fullName, email, password, role, department } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ error: 'Validation Error', message: 'All fields (fullName, email, password, role) are required.' });
  }

  if (role !== 'admin' && role !== 'employee') {
    return res.status(400).json({ error: 'Validation Error', message: 'Role must be either admin or employee.' });
  }

  try {
    // Check if email already exists
    const emailCheck = await pool.query('SELECT 1 FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Conflict Error', message: 'Email address is already registered.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Store in database
    const result = await pool.query(
      'INSERT INTO users (full_name, email, password_hash, role, department) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role, department, created_at',
      [fullName, email.toLowerCase().trim(), passwordHash, role, department || null]
    );

    const user = result.rows[0];

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, fullName: user.full_name, email: user.email, role: user.role, department: user.department },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`👤 New user registered: "${user.full_name}" (${user.role})`);
    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        department: user.department,
        createdAt: user.created_at
      }
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    return res.status(500).json({ error: 'Database Error', message: err.message });
  }
});

// POST API: User Login with Role Lock Verification
app.post('/api/auth/login', async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ error: 'Database Offline', message: 'Cannot authenticate because the database is offline.' });
  }

  const { identifier, password, role } = req.body;

  if (!identifier || !password || !role) {
    return res.status(400).json({ error: 'Validation Error', message: 'Identity credentials and role parameter are required.' });
  }

  try {
    // Search user by email OR username (matching by email or exact full name case-insensitively)
    const cleanedIdentifier = identifier.trim().toLowerCase();
    const result = await pool.query(
      'SELECT * FROM users WHERE LOWER(email) = $1 OR LOWER(full_name) = $1 LIMIT 1',
      [cleanedIdentifier]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Authentication Failed', message: 'Invalid credentials. Access Denied.' });
    }

    const user = result.rows[0];

    // CRITICAL: Role Lock check
    if (user.role !== role) {
      return res.status(403).json({
        error: 'Access Restricted',
        message: `Access denied. Your account is registered as an ${user.role.toUpperCase()}, but you are attempting to log in through the ${role.toUpperCase()} portal.`
      });
    }

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Authentication Failed', message: 'Invalid credentials. Access Denied.' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, fullName: user.full_name, email: user.email, role: user.role, department: user.department },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`🔐 User session authenticated: "${user.full_name}" (${user.role})`);
    return res.status(200).json({
      success: true,
      message: 'Authentication successful!',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        department: user.department,
        createdAt: user.created_at
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Database Error', message: err.message });
  }
});

// GET API: Retrieve Authenticated Profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ error: 'Database Offline', message: 'Database connection is offline.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, full_name, email, role, department, created_at FROM users WHERE id = $1 LIMIT 1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'User profile not found.' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: result.rows[0].id,
        fullName: result.rows[0].full_name,
        email: result.rows[0].email,
        role: result.rows[0].role,
        department: result.rows[0].department,
        createdAt: result.rows[0].created_at
      }
    });

  } catch (err) {
    console.error('Profile fetch error:', err.message);
    return res.status(500).json({ error: 'Database Error', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AURIS Backend API server listening on http://localhost:${PORT}`);
});
