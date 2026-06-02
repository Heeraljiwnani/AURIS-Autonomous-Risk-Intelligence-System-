import { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  AlertTriangle,
  Loader2,
  Mail,
  UserPlus
} from 'lucide-react';

export default function LoginPage({ onNavigate, selectedRole }) {
  // Form states
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const allDepts = [
    "Retail Banking Department",
    "Corporate Banking Department",
    "Credit & Loans Department",
    "Risk Management Department",
    "Compliance Department",
    "Treasury Department",
    "Information Technology (IT) Department",
    "Human Resources (HR) Department",
    "Internal Audit Department"
  ];
  const [departments, setDepartments] = useState(() => {
    const localDepts = localStorage.getItem('auris_selected_depts');
    if (localDepts) {
      try {
        const parsed = JSON.parse(localDepts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse local depts:', e);
      }
    }
    return allDepts;
  });

  const [selectedDepartment, setSelectedDepartment] = useState(() => {
    const localDepts = localStorage.getItem('auris_selected_depts');
    if (localDepts) {
      try {
        const parsed = JSON.parse(localDepts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      } catch (e) {
        console.warn('Failed to parse local depts:', e);
      }
    }
    return allDepts[0];
  });

  useEffect(() => {
    const fetchActiveDepts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organisation');
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.selected_depts) && data.selected_depts.length > 0) {
            setDepartments(data.selected_depts);
            setSelectedDepartment(data.selected_depts[0]);
            localStorage.setItem('auris_selected_depts', JSON.stringify(data.selected_depts));
          }
        }
      } catch (err) {
        console.warn('⚠️ Could not fetch active departments from API:', err.message);
      }
    };
    fetchActiveDepts();
  }, []);

  // Parallax background movement
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xPercent = 50 + (e.clientX / window.innerWidth * 2 - 1);
      const yPercent = 50 + (e.clientY / window.innerHeight * 2 - 1);
      setCoords({ x: xPercent, y: yPercent });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlert(false);
    setAlertMessage('');

    if (isSignUp) {
      if (password !== confirmPassword) {
        setIsLoading(false);
        setShowAlert(true);
        setAlertMessage("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            role: selectedRole,
            department: selectedRole === 'employee' ? selectedDepartment : null
          })
        });

        const data = await response.json();
        setIsLoading(false);

        if (response.ok) {
          setIsSignUp(false); // Switch to Sign In after signing up
          setIdentifier(email); // Autofill the email in the sign-in field
          setPassword('');
          setConfirmPassword('');
          alert("Registration successful! Please sign in with your credentials.");
        } else {
          setShowAlert(true);
          setAlertMessage(data.message || "Registration failed. Please try again.");
        }
      } catch {
        setIsLoading(false);
        setShowAlert(true);
        setAlertMessage("Unable to connect to the secure authentication server.");
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identifier,
            password,
            role: selectedRole
          })
        });

        const data = await response.json();
        setIsLoading(false);

        if (response.ok) {
          // Store token and user details in localStorage
          localStorage.setItem('auris_token', data.token);
          localStorage.setItem('auris_user', JSON.stringify(data.user));
          
          // Redirect to dashboard
          onNavigate('dashboard');
        } else {
          setShowAlert(true);
          setAlertMessage(data.message || "Invalid credentials. Please consult support.");
        }
      } catch {
        setIsLoading(false);
        setShowAlert(true);
        setAlertMessage("Unable to connect to the secure authentication server.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 font-sans relative overflow-hidden">
      
      {/* Full-Page Background Cybersecurity Room with Parallax */}
      <div 
        className="absolute inset-0 login-bg filter brightness-[0.75] transform scale-105 transition-all duration-300"
        style={{ 
          backgroundPosition: `${coords.x}% ${coords.y}%`,
          zIndex: 0
        }}
      ></div>
      
      {/* Full-Screen Glassmorphic Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[10px] z-0"></div>

      {/* Floating Neon Mesh Orbs for Three-Dimensional Depth */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-sky-500/15 rounded-full blur-[110px] z-0 pointer-events-none animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-[130px] z-0 pointer-events-none animate-pulse duration-[8000ms]"></div>

      {/* Header */}
      <header className="relative w-full z-10 bg-transparent border-none shadow-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">
          
          {/* Logo / AURIS Clickable to home */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <img 
              alt="Ashoka Emblem" 
              className="h-8 w-auto object-contain brightness-0 invert" 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            />
            <div className="text-xl font-extrabold text-white tracking-tight font-public drop-shadow-md">
              AURIS
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-6 text-sm font-semibold">
            <button 
              onClick={() => onNavigate('role-selection')}
              className="text-sky-400 border-b-[3px] border-sky-400 pb-1 cursor-pointer transition-colors"
            >
              Change Role
            </button>
          </nav>

        </div>
      </header>

      {/* Centered Login Card Canvas */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[390px] bg-slate-950/45 backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_50px_rgba(14,165,233,0.15)] rounded-3xl overflow-hidden border border-white/10 flex flex-col transition-all duration-500 hover:border-sky-500/30 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),_0_0_60px_rgba(14,165,233,0.25)]">

          <div className="px-8 pt-10 pb-8 space-y-6">
            
            {/* Logo Symbol inside a perfect rounded square glass box */}
            <div className="flex justify-center mb-6">
              <div className="overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-white/15 flex items-center justify-center">
                <img 
                  src="/auris-logo.png" 
                  alt="AURIS Symbol" 
                  className="h-16 w-16 object-cover"
                />
              </div>
            </div>

            {/* Greeting / Headings */}
            <div className="text-center space-y-2.5">
              <h1 className="text-2xl font-bold text-white tracking-tight font-public drop-shadow-sm transition-all duration-300">
                {isSignUp 
                  ? (selectedRole === 'admin' ? 'Create Admin Account' : 'Create Employee Account') 
                  : (selectedRole === 'admin' ? 'AURIS Admin Portal' : 'AURIS Employee Portal')}
              </h1>
              <div className="text-[12.5px] text-slate-300 font-bold leading-relaxed max-w-[280px] mx-auto transition-all duration-300">
                <p>{isSignUp ? 'Secure Access Registration' : 'Autonomous Unified Risk Intelligence'}</p>
                <p>{isSignUp ? 'Portal' : (selectedRole === 'admin' ? 'Sovereign Administrator System' : 'Employee Auditing System')}</p>
              </div>
            </div>

            {/* Login / signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              
              {isSignUp && (
                <>
                  {/* Full Name Field */}
                  <div className="space-y-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="fullname">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="h-4.5 w-4.5" />
                      </span>
                      <input 
                        type="text" 
                        id="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-[40px] pr-4 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Address Field */}
                  <div className="space-y-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="h-4.5 w-4.5" />
                      </span>
                      <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@government.in"
                        className="w-full pl-[40px] pr-4 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {selectedRole === 'employee' && (
                    <div className="space-y-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="department">
                        Department
                      </label>
                      <div className="relative">
                        <select
                          id="department"
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900/90 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white shadow-sm cursor-pointer"
                          required
                        >
                          {departments.map((dept) => (
                            <option key={dept} value={dept} className="bg-slate-950 text-white">
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Username Field */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="username">
                  {isSignUp ? 'Choose Username' : 'Username or Email'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="h-4.5 w-4.5" />
                  </span>
                  <input 
                    type="text" 
                    id="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={isSignUp ? 'johndoe123' : 'Enter your identity'}
                    className="w-full pl-[40px] pr-4 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="password">
                    Password
                  </label>
                  {!isSignUp && (
                    <button 
                      type="button"
                      onClick={() => alert("Connecting to password reset services...")}
                      className="text-[11.5px] font-extrabold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4.5 w-4.5" />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-[40px] pr-10 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                /* Confirm Password Field */
                <div className="space-y-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="h-4.5 w-4.5" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-[40px] pr-10 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-[13px] shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isSignUp ? 'Creating Account...' : 'Sign In...'}
                    </>
                  ) : (
                    <>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      {isSignUp ? <UserPlus className="h-4.5 w-4.5" /> : <LogIn className="h-4.5 w-4.5" />}
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Error Notification Alert */}
            {showAlert && (
              <div className="p-3 bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-200 rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-left leading-normal font-semibold">
                  <p className="font-bold text-red-200">Access Control Restriction</p>
                  <p className="text-red-300/80 mt-0.5">{alertMessage || 'Invalid credentials. Please consult your administrator or support desk.'}</p>
                </div>
              </div>
            )}

          </div>

          {/* Card Footer */}
          <div className="bg-slate-950/60 py-4 text-center border-t border-white/5 backdrop-blur-md">
            <p className="text-xs text-slate-300 font-medium">
              {isSignUp ? 'Already have an AURIS account?' : "Don't have an account?"}{' '}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sky-400 font-extrabold hover:text-sky-300 hover:underline transition-all cursor-pointer"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-slate-950/60 backdrop-blur-md border-t border-white/5 py-5 text-[11px] text-slate-400 font-bold px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <span className="text-white font-extrabold text-xs font-public">AURIS</span>
          
          <p className="text-center font-bold">
            © 2026 Autonomous Unified Risk Intelligence System (AURIS). All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <button onClick={() => alert("Loading Help Document...")} className="hover:text-white transition-colors">Help</button>
            <button onClick={() => alert("Loading Privacy Policy...")} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => alert("Loading Terms of Service...")} className="hover:text-white transition-colors">Terms of Service</button>
          </div>

        </div>
      </footer>

    </div>
  );
}
