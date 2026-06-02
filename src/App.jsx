import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegulatoryDashboard from './components/RegulatoryDashboard';
import SplashScreen from './components/SplashScreen';
import RoleSelectionPage from './components/RoleSelectionPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState(() => {
    // Detect if the page is being reloaded (refreshed)
    const navigationEntries = performance.getEntriesByType('navigation');
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';
    
    if (isReload) {
      return sessionStorage.getItem('auris_active_view') || 'home';
    } else {
      sessionStorage.removeItem('auris_active_view');
      return 'home';
    }
  });

  const [isSplashActive, setIsSplashActive] = useState(false);
  const [targetView, setTargetView] = useState(null);
  const [selectedRole, setSelectedRole] = useState(() => {
    return sessionStorage.getItem('auris_active_role') || null;
  });

  useEffect(() => {
    sessionStorage.setItem('auris_active_view', view);
  }, [view]);

  useEffect(() => {
    if (selectedRole) {
      sessionStorage.setItem('auris_active_role', selectedRole);
    } else {
      sessionStorage.removeItem('auris_active_role');
    }
  }, [selectedRole]);

  // Auto-login health check on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('auris_token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSelectedRole(data.user.role);
          localStorage.setItem('auris_user', JSON.stringify(data.user));
          setView('dashboard');
        } else {
          // Token expired or invalid
          localStorage.removeItem('auris_token');
          localStorage.removeItem('auris_user');
        }
      } catch (err) {
        console.warn('⚠️ Authentication health check failed:', err.message);
      }
    };
    checkSession();
  }, []);

  const handleNavigate = (nextView) => {
    // Centralized session purging on exit/logout navigation
    if (nextView === 'home' || nextView === 'role-selection') {
      localStorage.removeItem('auris_token');
      localStorage.removeItem('auris_user');
      setSelectedRole(null);
    }

    if ((view === 'role-selection' && nextView === 'login') || (view === 'login' && nextView === 'dashboard')) {
      setTargetView(nextView);
      setIsSplashActive(true);
    } else {
      setView(nextView);
    }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setTargetView('login');
    setIsSplashActive(true);
  };

  const handleSplashComplete = () => {
    setIsSplashActive(false);
    if (targetView) {
      setView(targetView);
      setTargetView(null);
    }
  };

  return (
    <>
      {isSplashActive ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          {view === 'home' && <LandingPage onNavigate={handleNavigate} />}
          {view === 'role-selection' && <RoleSelectionPage onSelectRole={handleSelectRole} onNavigate={handleNavigate} />}
          {view === 'login' && <LoginPage onNavigate={handleNavigate} selectedRole={selectedRole} />}
          {view === 'dashboard' && (
            selectedRole === 'admin' 
              ? <AdminDashboard onNavigate={handleNavigate} selectedRole={selectedRole} />
              : <RegulatoryDashboard onNavigate={handleNavigate} selectedRole={selectedRole} />
          )}
        </>
      )}
    </>
  );
}

export default App;
