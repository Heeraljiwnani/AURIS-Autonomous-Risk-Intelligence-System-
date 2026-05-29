import React, { useState, useEffect } from 'react';
import { 

  ChevronDown,
  Search, 

  Link2, 
  Bookmark, 
  X, 
  Send, 

  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Award,
  Bell,
  Gavel,
  Shield,
  GitBranch,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Network,
  Lock,
  Scale,
  BarChart3,
  LayoutDashboard,
  TrendingUp,
  Zap,
  ShieldAlert,
  ScrollText
} from 'lucide-react';

const HERO_IMAGES = [
  '/india_gate_sunset.png',
  '/gateway_of_india.png',
  '/taj_mahal_palace.png',
  '/vidhana_soudha.png'
];


export default function LandingPage({ onNavigate }) {
  // States
  const [searchQuery, setSearchQuery] = useState('');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);

  // Background slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        setPrevImageIndex(prev);
        return next;
      });
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    if (index === currentImageIndex) return;
    setPrevImageIndex(currentImageIndex);
    setCurrentImageIndex(index);
  };
  
  // Feedback / Suggest Modals
  const [activeModal, setActiveModal] = useState(null); // 'suggest' | 'feedback' | null

  const [toast, setToast] = useState(null);
  
  // Suggest Site Form State
  const [suggestForm, setSuggestForm] = useState({ name: '', url: '', category: 'Security', description: '' });
  // Feedback Form State
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', message: '', rating: 5 });

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Scroll reveal observer animation for all scroll-triggered cards
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px', // Trigger entrance just before it is visible
      threshold: 0.05
    };


    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');

        }
      });
    }, observerOptions);

    // Grab all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);



  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setToast(`Searching for "${searchQuery}"... Found 8 matched resources.`);
    } else {
      setToast("Please enter a valid keyword to search.");
    }
  };

  const handleBookmark = () => {
    setToast("Portal bookmarked successfully! Saved in local directory.");
  };

  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    setToast(`Site suggestion for "${suggestForm.name}" submitted successfully!`);
    setSuggestForm({ name: '', url: '', category: 'Security', description: '' });
    setActiveModal(null);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setToast(`Thank you, ${feedbackForm.name}! Your feedback has been recorded.`);
    setFeedbackForm({ name: '', email: '', message: '', rating: 5 });
    setActiveModal(null);
  };

  // Navigations or Anchor Scrolls
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <div className="bg-slate-50 min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-slate-900/95 backdrop-blur-sm border border-slate-700 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">

          <Sparkles className="text-yellow-400 h-5 w-5" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}


      {/* Hero Section with Slideshow Background */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden" data-purpose="hero-search-header">
        
        {/* Background Slideshow Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_IMAGES.map((img, index) => {
            const isActive = index === currentImageIndex;
            const isPrev = index === prevImageIndex;
            
            let transform = 'translateX(100%)';
            let transition = 'none';
            
            if (isActive) {
              transform = 'translateX(0%)';
              transition = 'transform 1000ms ease-in-out';
            } else if (isPrev) {
              transform = 'translateX(-100%)';
              transition = 'transform 1000ms ease-in-out';
            }
            
            return (
              <div 
                key={img}
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.45)), url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform,
                  transition,
                }}
              />
            );
          })}
        </div>

        {/* Navigation Navbar */}
        <header className="w-full bg-gradient-to-b from-black/50 to-transparent z-40 relative" data-purpose="main-header">
          <div className="max-w-7xl mx-auto px-6 py-8 flex justify-end items-center">
            {/* Login Button in Top Right */}
            <button 
              onClick={() => onNavigate('login')}
              className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-[12px] tracking-widest rounded-full hover:bg-white/25 active:scale-95 transition-all shadow-lg uppercase"
            >
              LOGIN
            </button>
          </div>
        </header>

        {/* Centered Grand Title / Logo Block */}
        <div className="flex-grow flex flex-col items-center justify-center px-6 z-40 relative text-center max-w-5xl mx-auto drop-shadow-xl select-none">
          <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Centered Large Emblem */}
            <img 
              alt="National Emblem of India" 
              className="h-28 md:h-32 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            />
            
            {/* Centered System Name */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white flex items-center justify-center gap-4 filter drop-shadow-md">
                AURIS <span className="bg-orange-500 text-sm md:text-lg tracking-widest font-extrabold text-white px-4 py-1.5 rounded-2xl align-middle shadow-2xl shadow-orange-500/20 border border-orange-400/20">GOV</span>
              </h1>
              <p className="text-white/95 text-lg md:text-3xl font-extrabold tracking-wide max-w-3xl leading-relaxed border-t border-white/25 pt-6 px-12 uppercase">
                Autonomous Unified Risk Intelligence System
              </p>
            </div>
            
          </div>
        </div>

        {/* Carousel Indicator Dots & Scroll Down Arrow */}
        <div className="w-full pb-6 flex flex-col items-center gap-4 z-40 relative">
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-3">
            {HERO_IMAGES.map((_, index) => (
              <button 
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-125 shadow-lg shadow-white/50' : 'bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Down Arrow Indicator */}
          <button 
            onClick={() => scrollToSection('workflow')}
            className="text-white/75 hover:text-white transition-colors duration-200 animate-bounce focus:outline-none p-1 cursor-pointer"
            aria-label="Scroll down to workflow"
          >
            <ChevronDown className="w-8 h-8 filter drop-shadow-md" />
          </button>


        </div>

      </section>

      {/* Main Page Layout */}

      <main className="flex-grow w-full flex flex-col" data-purpose="content-grid">
        
        {/* Complete Workflow Timeline Section */}
        <section id="workflow" className="scroll-mt-32 py-24 bg-gradient-to-b from-indigo-50/20 via-blue-50/10 to-slate-50 border-b border-indigo-100/10">
          <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal active">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">The Workflow</h2>
            <p className="text-slate-500 text-lg mt-2">From Transaction Entry to Audit Resolution</p>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* Vertical Line */}
            <div className="workflow-line"></div>

            {/* Step 1 */}
            <div className="relative mb-24 md:flex items-center reveal">
              <div className="hidden md:block w-1/2 pr-12 text-right">
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block mb-1">Step 1: Data Ingestion</span>
                <h3 className="font-extrabold text-xl text-slate-800">The Transaction API receives a real-time stream of financial events.</h3>
              </div>
              <div className="absolute left-[-16px] md:left-1/2 md:translate-x-[-50%] w-14 h-14 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-md">
                <span className="text-white text-lg font-black">1</span>
              </div>
              <div className="w-full md:w-1/2 pl-12">
                <div className="md:hidden">
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block mb-1">Step 1: Data Ingestion</span>
                  <h3 className="font-extrabold text-xl text-slate-800">The Transaction API receives a real-time stream of financial events.</h3>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative mb-24 md:flex items-center reveal">
              <div className="w-full md:w-1/2 pr-12 md:text-right hidden md:block"></div>
              <div className="absolute left-[-16px] md:left-1/2 md:translate-x-[-50%] w-14 h-14 bg-slate-800 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-md">
                <span className="text-white text-lg font-black">2</span>
              </div>
              <div className="w-full md:w-1/2 pl-12 text-left">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block mb-1">Step 2: Orchestration</span>
                <h3 className="font-extrabold text-xl text-slate-800">The Central Orchestrator receives the transaction and routes it for validation.</h3>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative mb-24 md:flex items-center reveal">
              <div className="hidden md:block w-1/2 pr-12 text-right">
                <span className="text-xs font-bold text-red-600 tracking-wider uppercase block mb-1">Step 3: Fraud Analysis</span>
                <h3 className="font-extrabold text-xl text-slate-800">The Fraud Agent analyzes patterns to flag suspicious transaction behaviors.</h3>
              </div>
              <div className="absolute left-[-16px] md:left-1/2 md:translate-x-[-50%] w-14 h-14 bg-red-600 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-md">
                <span className="text-white text-lg font-black">3</span>
              </div>
              <div className="w-full md:w-1/2 pl-12">
                <div className="md:hidden">
                  <span className="text-xs font-bold text-red-600 tracking-wider uppercase block mb-1">Step 3: Fraud Analysis</span>
                  <h3 className="font-extrabold text-xl text-slate-800">The Fraud Agent analyzes patterns to flag suspicious transaction behaviors.</h3>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative mb-24 md:flex items-center reveal">
              <div className="w-full md:w-1/2 pr-12 md:text-right hidden md:block"></div>
              <div className="absolute left-[-16px] md:left-1/2 md:translate-x-[-50%] w-14 h-14 bg-indigo-600 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-md">
                <span className="text-white text-lg font-black">4</span>
              </div>
              <div className="w-full md:w-1/2 pl-12 text-left">
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase block mb-1">Step 4: Compliance Check</span>
                <h3 className="font-extrabold text-xl text-slate-800">The Compliance Agent cross-references data with RBI and regulatory requirements.</h3>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative mb-12 md:flex items-center reveal">
              <div className="hidden md:block w-1/2 pr-12 text-right">
                <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block mb-1">Step 5: Audit Generation</span>
                <h3 className="font-extrabold text-xl text-slate-800">The Audit Agent compiles all findings into a structured report with MAPs.</h3>
              </div>
              <div className="absolute left-[-16px] md:left-1/2 md:translate-x-[-50%] w-14 h-14 bg-amber-600 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-md">
                <span className="text-white text-lg font-black">5</span>
              </div>
              <div className="w-full md:w-1/2 pl-12">
                <div className="md:hidden">
                  <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block mb-1">Step 5: Audit Generation</span>
                  <h3 className="font-extrabold text-xl text-slate-800">The Audit Agent compiles all findings into a structured report with MAPs.</h3>
                </div>
              </div>
            </div>


          </div>
          </div>
        </section>


        {/* Strategic Project Goals Section */}
        <section className="scroll-mt-32 py-24 bg-gradient-to-b from-slate-50 via-teal-50/20 to-emerald-50/10 border-b border-teal-100/10" id="project-goals">
          <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Project Goals</h2>
            <p className="text-slate-500 text-lg mt-2">Empowering Financial Institutions with Proactive Defense</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Card 1: Detect Fraud */}
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500 bg-white/70 reveal">
              <div className="p-4 bg-blue-50 rounded-2xl mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <Bell className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg mb-8 h-14 flex items-center justify-center leading-snug">
                Detect fraud in real-time
              </h3>
              <button 
                onClick={() => setToast("Directing to real-time fraud metrics dashboard.")}
                className="mt-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md shadow-slate-900/10 active:scale-95"
              >
                View Details
              </button>
            </div>

            {/* Card 2: RBI Compliance */}
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-cyan-500 bg-white/70 reveal delay-100">
              <div className="p-4 bg-cyan-50 rounded-2xl mb-6 text-cyan-600 group-hover:scale-110 transition-transform">
                <Gavel className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg mb-8 h-14 flex items-center justify-center leading-snug">
                Monitor RBI compliance automatically
              </h3>
              <button 
                onClick={() => setToast("Directing to regulatory compliance logs.")}
                className="mt-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md shadow-slate-900/10 active:scale-95"
              >
                View Details
              </button>
            </div>

            {/* Card 3: Cyber Threats */}
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-indigo-500 bg-white/70 reveal delay-200">
              <div className="p-4 bg-indigo-50 rounded-2xl mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg mb-8 h-14 flex items-center justify-center leading-snug">
                Detect cyber threats
              </h3>
              <button 
                onClick={() => setToast("Opening cybersecurity monitor module.")}
                className="mt-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md shadow-slate-900/10 active:scale-95"
              >
                View Details
              </button>
            </div>

            {/* Card 4: Action Plans */}
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-emerald-500 bg-white/70 reveal delay-300">
              <div className="p-4 bg-emerald-50 rounded-2xl mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                <GitBranch className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg mb-8 h-14 flex items-center justify-center leading-snug">
                Generate Master Action Plans (MAPs)
              </h3>
              <button 
                onClick={() => setToast("Opening MAP generator tool.")}
                className="mt-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md shadow-slate-900/10 active:scale-95"
              >
                View Details
              </button>
            </div>

            {/* Card 5: Audit Reports */}
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-amber-500 bg-white/70 reveal delay-400">
              <div className="p-4 bg-amber-50 rounded-2xl mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg mb-8 h-14 flex items-center justify-center leading-snug">
                Produce audit-ready reports
              </h3>
              <button 
                onClick={() => setToast("Redirecting to the report download directory.")}
                className="mt-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md shadow-slate-900/10 active:scale-95"
              >
                View Details
              </button>
            </div>


          </div>
          </div>
        </section>


        {/* System Benefits Section */}
        <section id="benefits" className="scroll-mt-32 py-24 bg-gradient-to-b from-emerald-50/10 via-amber-50/20 to-orange-50/10 border-b border-amber-100/10">
          <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Benefits</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-slate-100/80 border border-slate-200/50 rounded-[3rem] shadow-2xl relative overflow-hidden backdrop-blur-xl reveal">
            
            {/* Dynamic visual line chart graphic overlay */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-slate-900">
              <TrendingUp className="h-[12rem] w-[12rem]" />
            </div>

            <div className="p-8 md:p-16 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Benefit 1: Faster Fraud */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/90 shadow-md flex items-start space-x-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-white/80">
                  <div className="bg-blue-50 text-blue-600 p-3.5 rounded-2xl shadow-sm border border-blue-100/50">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold mb-2 text-slate-900">Faster fraud detection</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                      Seconds from transaction to alert, reducing critical reaction windows.
                    </p>
                  </div>
                </div>

                {/* Benefit 2: Better compliance */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/90 shadow-md flex items-start space-x-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-white/80">
                  <div className="bg-cyan-50 text-cyan-600 p-3.5 rounded-2xl shadow-sm border border-cyan-100/50">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold mb-2 text-slate-900">Better regulatory compliance</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                      Continuous monitoring ensures alignment with evolving RBI mandates.
                    </p>
                  </div>
                </div>

                {/* Benefit 3: Fraud losses */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/90 shadow-md flex items-start space-x-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-white/80">
                  <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl shadow-sm border border-indigo-100/50">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold mb-2 text-slate-900">Reduced fraud losses</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                      Proactive prevention stops illegal transfers before they settle.
                    </p>
                  </div>
                </div>

                {/* Benefit 4: Audit reports */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/90 shadow-md flex items-start space-x-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-white/80">
                  <div className="bg-amber-50 text-amber-600 p-3.5 rounded-2xl shadow-sm border border-amber-100/50">
                    <ScrollText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold mb-2 text-slate-900">Automated audit reporting</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                      Eliminate manual report compilation with instant PDF/JSON outputs.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
          </div>
        </section>

      </main>

      {/* Call to Action Section (Suggestion & Feedback Forms) */}

      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-20 text-center shadow-xl border-t border-slate-800" data-purpose="cta-participate">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight uppercase">HELP US IN MAKING IT BETTER</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90 leading-relaxed font-semibold text-slate-300">

              We welcome your participation in enhancing the directory further and also invite your comments and suggestions for improvement
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/20 backdrop-blur-md shadow-2xl">
              <button 
                onClick={() => setActiveModal('suggest')}

                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-full shadow-lg transition-all active:scale-95 mr-1"

              >
                Suggest A Site
              </button>
              <div className="w-px bg-white/20 my-2"></div>
              <button 
                onClick={() => setActiveModal('feedback')}
                className="px-8 py-3.5 bg-transparent font-extrabold text-sm rounded-full text-white hover:bg-white/10 active:scale-95 transition-all ml-1"
              >
                Share Feedback
              </button>
            </div>
          </div>


          <div className="border-t border-white/10 border-dashed w-3/4 mx-auto"></div>

          {/* Social Links Row */}
          <div className="space-y-8">
            <h3 className="text-2xl font-extrabold tracking-widest uppercase">CONNECT WITH US</h3>
            <div className="flex justify-center space-x-12">
              
              <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setToast("Link copied to clipboard!")}>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:scale-110 shadow transition-transform">

                  <Link2 className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold uppercase tracking-widest text-sm text-white">LINK</p>

                  <p className="text-xs text-white/60 font-semibold">To Us</p>

                </div>
              </div>

              <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleBookmark}>

                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:scale-110 shadow transition-transform">

                  <Bookmark className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold uppercase tracking-widest text-sm text-white">BOOKMARK</p>

                  <p className="text-xs text-white/60 font-semibold">This Page</p>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* Other Government Websites Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-purple-50/20 to-slate-100/40 border-t border-purple-100/10" data-purpose="main-footer">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Centered Heading */}
          <div className="text-center mb-12 reveal">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Other Government Websites</h2>
          </div>

          {/* Large Card Container */}
          <div className="bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-slate-100/80 border border-slate-200/50 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl reveal">
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              
              {/* Card 1: National Portal */}
              <div className="bg-white/70 backdrop-blur-md p-4 border border-white/90 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-24">
                <img 
                  alt="India Government Service Emblem" 
                  className="max-h-16 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                />
              </div>

              {/* Card 2: Services Portal text block */}
              <div className="bg-white/70 backdrop-blur-md p-4 border border-white/90 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-24 text-center">
                <div>
                  <p className="font-extrabold text-xs text-blue-900 leading-tight">National Government Services Portal</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-1">राष्ट्रीय सरकारी सेवा पोर्टल</p>
                </div>
              </div>

              {/* Card 3: MyGov Logo */}
              <div className="bg-white/70 backdrop-blur-md p-4 border border-white/90 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-24">
                <img 
                  alt="MyGov Portal Logo" 
                  className="max-h-14 object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbpdLhmlvRCCQ4Cr-OEsO9LJfw1U9K4HxLB-wFOyLahtQlGQemM1rMvJpbUqa6pyeprkU32quu_0MCCJMOuK7pqMCQ41tbbVlVW1zM3A4s1kcg89TQKfglcH00PlnhacYVCLZJrtPISlU8QaIOvi6HJbx60VNrz700U25F2AJAdWLfRjPxIf_OZbdxXBr13yPH3hxGk2uXT6AstjGgZ6St0FP94tvzRexDUPwg6Slpxl5XlPvXCbq0ZBjWgZ9IRaJk0Kdyiur14_8"
                />
              </div>

              {/* Card 4: data.gov.in */}
              <div className="bg-white/70 backdrop-blur-md p-4 border border-white/90 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-24">
                <span className="text-lg font-black tracking-tighter text-orange-600">data.gov<span className="text-blue-600">.in</span></span>
              </div>

              {/* Card 5: GIGW compliant indicator */}
              <div className="bg-white/70 backdrop-blur-md p-4 border border-white/90 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-24 text-center">
                <div>
                  <p className="font-extrabold text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded inline-block">GIGW COMPLIANT</p>
                  <p className="text-[9px] text-gray-500 font-semibold mt-1">Website Standards</p>
                </div>
              </div>

              {/* Card 6: PMIndia */}
              <div className="bg-white/70 backdrop-blur-md p-4 border border-white/90 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center h-24 text-center">
                <span className="text-sm font-black tracking-wider text-purple-700">SwaaS</span>
                <span className="text-[9px] text-gray-400 font-bold block mt-0.5">Secure Cloud Platform</span>
              </div>


            </div>

          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-slate-900 text-white py-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          
          {/* Main Footer Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-bold text-gray-300 border-b border-white/10 pb-8 uppercase tracking-widest">
            <button onClick={() => setToast("About Us page linked.")} className="hover:text-white transition-colors">About Us</button>

            <span className="text-white/20">/</span>
            <button onClick={() => setToast("Help documentation linked.")} className="hover:text-white transition-colors">Help</button>
            <span className="text-white/20">/</span>
            <button onClick={() => setToast("Site map opened.")} className="hover:text-white transition-colors">Sitemap</button>
            <span className="text-white/20">/</span>
            <button onClick={() => setToast("Website Policies and Terms linked.")} className="hover:text-white transition-colors">Website Policies</button>
            <span className="text-white/20">/</span>
            <button onClick={() => setActiveModal('feedback')} className="hover:text-white transition-colors">Feedback</button>
            <span className="text-white/20">/</span>

            <button onClick={() => setToast("Contact Information opened.")} className="hover:text-white transition-colors">Contact Us</button>
          </div>

          {/* Copyright details */}

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">

            <div className="text-center md:text-left space-y-1">
              <p className="leading-relaxed">
                © Developed and hosted by <span className="text-white font-semibold">National Informatics Centre</span>,
              </p>
              <p className="leading-relaxed">

                Ministry of Law &amp; Justice, Information Technology, <span className="text-white font-bold">Government of India</span>

              </p>
            </div>
            
            <div className="text-center md:text-right font-bold space-y-1">

              <p>Last Updated: <span className="text-blue-400">May 27, 2026</span></p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">AURIS Portal version 2.4.2</p>

            </div>
          </div>

        </div>
      </footer>

      {/* MODAL OVERLAYS */}
      
      {/* 1. Suggest a Site Modal */}
      {activeModal === 'suggest' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
              <div>

                <h3 className="text-xl font-bold">Suggest A Website Directory</h3>

                <p className="text-xs text-white/80 mt-1">Submit official URLs to enhance our integration</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSuggestSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Website Name</label>
                <input 
                  type="text" 
                  value={suggestForm.name}
                  onChange={(e) => setSuggestForm({ ...suggestForm, name: e.target.value })}
                  placeholder="e.g. National Environment Audit Portal"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Website URL</label>
                <input 
                  type="url" 
                  value={suggestForm.url}
                  onChange={(e) => setSuggestForm({ ...suggestForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Category</label>
                <select 
                  value={suggestForm.category}
                  onChange={(e) => setSuggestForm({ ...suggestForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option>Security</option>
                  <option>Citizen Services</option>
                  <option>Science & Tech</option>
                  <option>Financial Registry</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Short Description</label>
                <textarea 
                  value={suggestForm.description}
                  onChange={(e) => setSuggestForm({ ...suggestForm, description: e.target.value })}
                  placeholder="Provide context regarding the portal registry..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Website Suggestion
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Share Feedback Modal */}
      {activeModal === 'feedback' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
              <div>

                <h3 className="text-xl font-bold">Share Portal Feedback</h3>

                <p className="text-xs text-white/80 mt-1">We value your remarks and suggestions for improvement</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleFeedbackSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Your Name</label>
                <input 
                  type="text" 
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={feedbackForm.email}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button 
                      key={stars} 
                      type="button"
                      onClick={() => setFeedbackForm({ ...feedbackForm, rating: stars })}
                      className={`p-2 rounded-lg border text-sm font-bold flex-grow transition-all ${feedbackForm.rating >= stars ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                    >
                      ★ {stars}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Message</label>
                <textarea 
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  placeholder="Enter details..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Submit Feedback Details
              </button>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}
