import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  AlertTriangle,
<<<<<<< HEAD
  Loader2,
  Mail,
  UserPlus
=======
  Loader2
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
} from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  // Form states
<<<<<<< HEAD
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
=======
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSignUp(false); // Switch to Sign In after signing up
        alert("Registration request submitted! Please sign in with your credentials.");
      }, 1500);
    } else {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 font-sans relative overflow-hidden">
      
      {/* Full-Page Background Cybersecurity Room */}
      <div 
        className="absolute inset-0 login-bg filter brightness-[0.75] z-0"
      ></div>
      
      {/* Full-Screen Glassmorphic Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[10px] z-0"></div>

      {/* Floating Neon Mesh Orbs for Three-Dimensional Depth */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-sky-500/15 rounded-full blur-[110px] z-0 pointer-events-none animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-[130px] z-0 pointer-events-none animate-pulse duration-[8000ms]"></div>

      {/* Header (Transparent floating navbar with high-contrast text) */}
=======
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlert(false);

    // Simulate Gov Server Authentication Delay
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-900 font-sans relative overflow-hidden">
      
      {/* Full-Page Background Sunrise Flag */}
      <div 
        className="absolute inset-0 login-bg filter brightness-95 transform scale-105 transition-all duration-300"
        style={{ 
          backgroundPosition: `${coords.x}% ${coords.y}%`,
          zIndex: 0
        }}
      ></div>
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      {/* Header (Transparent floating navbar to let background span fully) */}
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
      <header className="relative w-full z-10 bg-transparent border-none shadow-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">
          
          {/* Logo / AURIS Clickable to home */}
          <div 
            onClick={() => onNavigate('home')}
<<<<<<< HEAD
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <img 
              alt="Ashoka Emblem" 
              className="h-8 w-auto object-contain brightness-0 invert" 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            />
            <div className="text-xl font-extrabold text-white tracking-tight font-public drop-shadow-md">
=======
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img 
              alt="Ashoka Emblem" 
              className="h-8 w-auto object-contain" 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            />
            <div className="text-xl font-extrabold text-black tracking-tight font-public">
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
              AURIS
            </div>
          </div>

          {/* Navigation Items */}
<<<<<<< HEAD
          <nav className="flex items-center space-x-6 text-sm font-semibold">
            <button 
              onClick={() => onNavigate('login')}
              className="text-sky-400 border-b-[3px] border-sky-400 pb-1 cursor-pointer transition-colors"
            >
              Portal Login
            </button>
=======
          <nav className="flex items-center space-x-6 text-sm font-semibold text-gray-950">
            <button 
              onClick={() => onNavigate('login')}
              className="text-black border-b-[3px] border-black pb-1 hover:text-black transition-colors"
            >
              Portal Login
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-black transition-colors pb-1"
            >
              Support
            </button>
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
          </nav>

        </div>
      </header>

<<<<<<< HEAD
      {/* Centered Login Card Canvas (State-of-the-Art Dark Glassmorphism) */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[390px] bg-slate-950/45 backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_50px_rgba(14,165,233,0.15)] rounded-3xl overflow-hidden border border-white/10 flex flex-col transition-all duration-500 hover:border-sky-500/30 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),_0_0_60px_rgba(14,165,233,0.25)]">

          <div className="px-8 pt-10 pb-8 space-y-6">
            
            {/* Greeting / Headings */}
            <div className="text-center space-y-2.5">
              <h1 className="text-3xl font-bold text-white tracking-tight font-public drop-shadow-sm transition-all duration-300">
                {isSignUp ? 'Create Account' : 'Welcome to AURIS'}
              </h1>
              <div className="text-[13px] text-slate-300 font-bold leading-relaxed max-w-[240px] mx-auto transition-all duration-300">
                <p>{isSignUp ? 'Secure Access Registration' : 'Autonomous Unified Risk Intelligence'}</p>
                <p>{isSignUp ? 'Portal' : 'System'}</p>
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
                </>
              )}

              {/* Username Field */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-sky-300 font-public tracking-wide" htmlFor="username">
                  {isSignUp ? 'Choose Username' : 'Username or Email'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
=======
      {/* Centered Login Card Canvas (Enhanced Frosted Glass Panel) */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[390px] bg-white/25 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-white/45 flex flex-col transition-all duration-500 hover:shadow-white/5">

          
          <div className="px-8 pt-10 pb-8 space-y-6">
            
            {/* Greeting / Headings */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-public">
                Welcome to AURIS
              </h1>
              <div className="text-[13px] text-gray-700 font-bold leading-relaxed max-w-[240px] mx-auto">
                <p>Autonomous Unified Risk Intelligence</p>
                <p>System</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              
              {/* Username Field */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-gray-800 font-public" htmlFor="username">
                  Username or Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                    <User className="h-4.5 w-4.5" />
                  </span>
                  <input 
                    type="text" 
                    id="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
<<<<<<< HEAD
                    placeholder={isSignUp ? 'johndoe123' : 'Enter your identity'}
                    className="w-full pl-[40px] pr-4 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
=======
                    placeholder="Enter your identity"
                    className="w-full pl-[40px] pr-4 py-2.5 bg-white/65 hover:bg-white/75 focus:bg-white/95 border border-white/40 focus:border-slate-950 rounded-xl outline-none focus:ring-2 focus:ring-slate-950/10 transition-all text-xs font-bold text-slate-950 placeholder-gray-500 shadow-sm"
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
<<<<<<< HEAD
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
=======
                  <label className="block text-[11px] font-bold text-gray-800 font-public" htmlFor="password">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={() => alert("Connecting to password reset services...")}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                    <Lock className="h-4.5 w-4.5" />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
<<<<<<< HEAD
                    className="w-full pl-[40px] pr-10 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-950/80 border border-white/10 focus:border-sky-500 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-xs font-bold text-white placeholder-slate-500 shadow-sm"
=======
                    className="w-full pl-[40px] pr-10 py-2.5 bg-white/65 hover:bg-white/75 focus:bg-white/95 border border-white/40 focus:border-slate-950 rounded-xl outline-none focus:ring-2 focus:ring-slate-950/10 transition-all text-xs font-bold text-slate-950 placeholder-gray-500 shadow-sm"
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
=======
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 transition-colors"
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

<<<<<<< HEAD
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

              {/* Submit Button (Glowing Cyber-Glass Gradient) */}
=======
              {/* Sign In Button (Deep bracket color layout) */}
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
<<<<<<< HEAD
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-[13px] shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-75 disabled:cursor-not-allowed"
=======
                  className="w-full bg-[#000a1e] hover:bg-black text-white py-3 rounded-xl font-bold transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-[13px] shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
<<<<<<< HEAD
                      {isSignUp ? 'Creating Account...' : 'Sign In...'}
                    </>
                  ) : (
                    <>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      {isSignUp ? <UserPlus className="h-4.5 w-4.5" /> : <LogIn className="h-4.5 w-4.5" />}
=======
                      Sign In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <LogIn className="h-4.5 w-4.5" />
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Error Notification Alert */}
            {showAlert && (
<<<<<<< HEAD
              <div className="p-3 bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-200 rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-left leading-normal font-semibold">
                  <p className="font-bold text-red-200">Access Control Restriction</p>
                  <p className="text-red-300/80 mt-0.5">Invalid credentials. Please consult your administrator or support desk.</p>
=======
              <div className="p-3 bg-red-500/20 backdrop-blur-md border border-red-500/35 text-red-950 rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-[11px] text-left leading-normal font-semibold">
                  <p className="font-bold text-red-950">Access Control Restriction</p>
                  <p className="text-red-800/90 mt-0.5">Invalid credentials. Please consult your administrator or support desk.</p>
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
                </div>
              </div>
            )}

          </div>

<<<<<<< HEAD
          {/* Card Footer (Glassmorphic dark footer with subtle top border toggling modes) */}
          <div className="bg-slate-950/60 py-4 text-center border-t border-white/5 backdrop-blur-md">
            <p className="text-xs text-slate-300 font-medium">
              {isSignUp ? 'Already have an AURIS account?' : "Don't have an account?"}{' '}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sky-400 font-extrabold hover:text-sky-300 hover:underline transition-all cursor-pointer"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
=======
          {/* Card Footer (Exactly matching gray layout, with translucent blur) */}
          <div className="bg-white/15 py-4 text-center border-t border-white/35 backdrop-blur-md">
            <p className="text-xs text-gray-700 font-bold">
              Don't have an account?{' '}
              <button 
                onClick={() => alert("Registering dynamic access query...")}
                className="text-black font-extrabold hover:underline"
              >
                Request Access
>>>>>>> 2160a878ded497201a77800488f680a69eeea164
              </button>
            </p>
          </div>

        </div>
      </main>

<<<<<<< HEAD
=======
      {/* Footer (Translucent Glass, matching screenshot details) */}
      <footer className="relative z-10 w-full bg-white/60 backdrop-blur-md border-t border-white/20 py-5 text-[11px] text-gray-800 font-bold px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <span className="text-black font-extrabold text-xs font-public">AURIS</span>
          
          <p className="text-center font-bold">
            © 2024 Autonomous Unified Risk Intelligence System (AURIS). All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <button onClick={() => alert("Loading Help Document...")} className="hover:text-black transition-colors">Help</button>
            <button onClick={() => alert("Loading Privacy Policy...")} className="hover:text-black transition-colors">Privacy Policy</button>
            <button onClick={() => alert("Loading Terms of Service...")} className="hover:text-black transition-colors">Terms of Service</button>
          </div>

        </div>
      </footer>

>>>>>>> 2160a878ded497201a77800488f680a69eeea164
    </div>
  );
}
