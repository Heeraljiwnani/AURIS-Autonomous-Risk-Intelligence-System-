import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegulatoryDashboard from './components/RegulatoryDashboard';
import SplashScreen from './components/SplashScreen';

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

  useEffect(() => {
    sessionStorage.setItem('auris_active_view', view);
  }, [view]);

  const handleNavigate = (nextView) => {
    if ((view === 'home' && nextView === 'login') || (view === 'login' && nextView === 'dashboard')) {
      setTargetView(nextView);
      setIsSplashActive(true);
    } else {
      setView(nextView);
    }
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
          {view === 'login' && <LoginPage onNavigate={handleNavigate} />}
          {view === 'dashboard' && <RegulatoryDashboard onNavigate={handleNavigate} />}
        </>
      )}
    </>
  );
}

export default App;
