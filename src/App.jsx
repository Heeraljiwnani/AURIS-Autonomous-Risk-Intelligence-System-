import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegulatoryDashboard from './components/RegulatoryDashboard';

function App() {
  const [view, setView] = useState('home');

  return (
    <>
      {view === 'home' && <LandingPage onNavigate={setView} />}
      {view === 'login' && <LoginPage onNavigate={setView} />}
      {view === 'dashboard' && <RegulatoryDashboard onNavigate={setView} />}
    </>
  );
}

export default App;
