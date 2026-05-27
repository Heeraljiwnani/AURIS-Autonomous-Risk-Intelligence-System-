import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Link2, 
  Bookmark, 
  X, 
  Send, 
  BookOpen, 
  FileText, 
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Heart,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

// Custom SVG Icons to avoid import warnings and align brand graphics
const Instagram = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Facebook = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);


export default function LandingPage({ onNavigate }) {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [periodicalIndex, setPeriodicalIndex] = useState(0);
  const [inFocusIndex, setInFocusIndex] = useState(0);
  
  // Feedback / Suggest Modals
  const [activeModal, setActiveModal] = useState(null); // 'suggest' | 'feedback' | 'periodical' | 'social' | null
  const [selectedPeriodical, setSelectedPeriodical] = useState(null);
  const [selectedSocial, setSelectedSocial] = useState(null);
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

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
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

  // Campaign Data
  const campaigns = [
    {
      id: 1,
      title: "NHRC - Protecting & Promoting Life, Liberty, Equality & Dignity for All",
      description: "National Human Rights Commission (NHRC) - Protecting and Promoting Life, Liberty, Equality & Dignity for All citizens through active review and regulatory policies.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5W5MK9fEqohZLRI3G_ughE47O4FTJY0DEQXepNTt507utoPbzAMmmg_0v7tIPmV-DFP7qt2ehCensGtbyLTW2MeBdHjtLbygZfTzzMBfgetd1xw3ldzx0Is_AeWwyyKsVwOgb-3zjxiBQLWFo9lCaACXjdn71Nb7WuLytuiQlOJ_LHb0l0AQPjsUuUT4aH5ccVNOwuwpW6LK2ENny8-bRjATHAot7yfENRV03UH5Y2gCK8Y1djORT71yD5qSJHI97ZtEEdiB-KfU",
      category: "Human Rights"
    },
    {
      id: 2,
      title: "ASMITA - Khelo India Women League",
      description: "The Ministry of Youth Affairs and Sports (MYAS), through the Khelo India initiative, is promoting the ASMITA (Achieving Sports Milestone by Inspiring Women Through Action) Leagues.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5W5MK9fEqohZLRI3G_ughE47O4FTJY0DEQXepNTt507utoPbzAMmmg_0v7tIPmV-DFP7qt2ehCensGtbyLTW2MeBdHjtLbygZfTzzMBfgetd1xw3ldzx0Is_AeWwyyKsVwOgb-3zjxiBQLWFo9lCaACXjdn71Nb7WuLytuiQlOJ_LHb0l0AQPjsUuUT4aH5ccVNOwuwpW6LK2ENny8-bRjATHAot7yfENRV03UH5Y2gCK8Y1djORT71yD5qSJHI97ZtEEdiB-KfU",
      category: "Sports"
    },
    {
      id: 3,
      title: "70 years of ED: Fighting Financial Crimes, Serving the Nation",
      description: "The Directorate of Enforcement (ED), established in 1956, complete its 70 years on May 1, 2026. As the premier financial investigative agency of the Government of India.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5W5MK9fEqohZLRI3G_ughE47O4FTJY0DEQXepNTt507utoPbzAMmmg_0v7tIPmV-DFP7qt2ehCensGtbyLTW2MeBdHjtLbygZfTzzMBfgetd1xw3ldzx0Is_AeWwyyKsVwOgb-3zjxiBQLWFo9lCaACXjdn71Nb7WuLytuiQlOJ_LHb0l0AQPjsUuUT4aH5ccVNOwuwpW6LK2ENny8-bRjATHAot7yfENRV03UH5Y2gCK8Y1djORT71yD5qSJHI97ZtEEdiB-KfU",
      category: "National Security"
    },
    {
      id: 4,
      title: "Inviting Ideas for Mann Ki Baat",
      description: "Prime Minister Narendra Modi invites you to share your ideas and thoughts on themes for Mann Ki Baat scheduled on 31st May 2026.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkcounDuOsO4Vk92UOX_xTxAOzq3WBTmJHbBBG7FDTtqSEM4kEL7TeWAm3Nwohh659jZ6ZAXZgNxYnvTYaG2-3X1iPB8yEDCWYpZJilq1clJ86z59ZnkWgqmHmjPnXmajZKRBqX7vCCHTqDB-Ea_3N8TkuzY3X1scwEOp_dpCRNoUeIx0_KwtcqXwMM93yU1xN5UCQ7gRoFPka5kzIhKuQyZQUy9tLhDZVKN33fHDNmOBNNVbscOeJzjHH44pV4ZzsX0335K8tVew",
      category: "Citizen Ideas",
      isInteractive: true,
      startDate: "May 08, 2026",
      endDate: "May 29, 2026"
    }
  ];

  // Periodicals Data
  const periodicals = [
    {
      id: 1,
      title: "MyGov Pulse",
      tagline: "RISING FROM THE ROOTS - VIKSIT BHARAT'S TRANSFORMATION BEGINS HERE",
      description: "Learn how localized grassroots citizen schemes are driving systemic transitions across governance, digital utilities, and community integration.",
      date: "May 11, 2026",
      size: "1.05 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbR7ktLiN1WZtVJ4IOznyarAvIehgqlrKiAC0bI1Kix3K_lpoFQiLP0jZ_a16-2fqW9D5mErBTVRVGr6xAIo8Mu2TY7TL5weost3sC2zqD3iDGYdo-7gDAaXYJ62tT6WuZe5b63iansV5IhQcRo3vsMtF0d9reAQPlweFKNYYJkQFdd--pmQcAHoKD9SX4yirBO6BwNpfpf48NeDmef9S_JZtWla19NFBKjikHYo5l6UJIge5K3_KViSIyJLb2wQhyrdXEokTstCQ",
      pages: [
        { title: "Governance Evolution", text: "India's digital identity and payment stack are creating unprecedented transparent financial linkages directly to farmers and small vendors, ensuring secure roots." },
        { title: "Empowerment Index", text: "Evaluating the success of local skill developments, specialized self-help associations, and regional craft grants in creating a robust internal economy." }
      ]
    },
    {
      id: 2,
      title: "Bharat Matters",
      tagline: "INDIA DEEPENS GLOBAL ENGAGEMENT",
      description: "A comprehensive look at India's dynamic geopolitical alliances, digital diplomacy stacks, and bilateral economic corridors in 2026.",
      date: "May 15, 2026",
      size: "1.48 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbR7ktLiN1WZtVJ4IOznyarAvIehgqlrKiAC0bI1Kix3K_lpoFQiLP0jZ_a16-2fqW9D5mErBTVRVGr6xAIo8Mu2TY7TL5weost3sC2zqD3iDGYdo-7gDAaXYJ62tT6WuZe5b63iansV5IhQcRo3vsMtF0d9reAQPlweFKNYYJkQFdd--pmQcAHoKD9SX4yirBO6BwNpfpf48NeDmef9S_JZtWla19NFBKjikHYo5l6UJIge5K3_KViSIyJLb2wQhyrdXEokTstCQ",
      pages: [
        { title: "Bilateral Corridors", text: "Highlighting economic partnerships, unified custom regimes, and maritime security pacts that position Bharat as a stabilizer in global trade pathways." },
        { title: "Digital Diplomacy", text: "Sharing India's digital public infrastructure blueprint (UPI, Aadhaar, DigiLocker) with developing nations to empower structural resilience globally." }
      ]
    },
    {
      id: 3,
      title: "Yuvaam",
      tagline: "YUVAAM - VOICE OF YOUTH",
      description: "Spotlighting national student innovations, green tech incubators, and young leadership panels shaping sustainable developmental pathways.",
      date: "Jan 1, 2026",
      size: "1.79 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbR7ktLiN1WZtVJ4IOznyarAvIehgqlrKiAC0bI1Kix3K_lpoFQiLP0jZ_a16-2fqW9D5mErBTVRVGr6xAIo8Mu2TY7TL5weost3sC2zqD3iDGYdo-7gDAaXYJ62tT6WuZe5b63iansV5IhQcRo3vsMtF0d9reAQPlweFKNYYJkQFdd--pmQcAHoKD9SX4yirBO6BwNpfpf48NeDmef9S_JZtWla19NFBKjikHYo5l6UJIge5K3_KViSIyJLb2wQhyrdXEokTstCQ",
      pages: [
        { title: "Green-Tech Pioneers", text: "Young mechanical and computing students collaborate to develop low-cost solar recycling pumps and bio-degradable composite packaging." },
        { title: "Incubator Accelerators", text: "Government-supported technology hubs help university students register patents, secure pre-seed startup funding, and receive industry coaching." }
      ]
    }
  ];

  // In Focus Data
  const inFocusItems = [
    {
      id: 1,
      tag: "Activity : Blog",
      title: "Winner Announcement for Painting competition on Waste to Wealth",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
      date: "May 20, 2026",
      details: "The 'Waste to Wealth' national paint event saw thousands of student submissions transforming everyday recyclable materials into physical artworks. Winners have been evaluated by a panel of fine arts experts."
    },
    {
      id: 2,
      tag: "Activity : Do/Task",
      title: "SciQuest Summer Exploration - National Poster Competition",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      date: "May 22, 2026",
      details: "Inviting high school students to explore complex physics, mathematics, and biotechnology concepts via visually rich posters. Registration and digital submission portals remain open until mid-June."
    },
    {
      id: 3,
      tag: "Activity : Do/Task",
      title: "National Logo Design Contest for Corporate Mitra Scheme",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
      date: "May 25, 2026",
      details: "Design a powerful emblem representing corporate synergy, regulatory transparency, and structural partnerships between private companies and national development funds."
    }
  ];

  // Social Media Data
  const socialFeed = {
    instagram: {
      user: "mygovindia",
      text: "Join the largest community of active citizens! Dynamic, secure, and always striving for a Viksit Bharat.",
      postLink: "https://www.instagram.com/p/C7X2_mygov",
    },
    linkedin: {
      author: "MyGov India",
      followers: "239,521 followers",
      title: "World Applauds India's Global Leadership!",
      content: "From digital currency models to integrated environmental programs, international partners and analysts continue to celebrate Bharat's rapid structural advancements under Prime Minister Narendra Modi.",
      hashtag: "#PMModiInSweden",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbpdLhmlvRCCQ4Cr-OEsO9LJfw1U9K4HxLB-wFOyLahtQlGQemM1rMvJpbUqa6pyeprkU32quu_0MCCJMOuK7pqMCQ41tbbVlVW1zM3A4s1kcg89TQKfglcH00PlnhacYVCLZJrtPISlU8QaIOvi6HJbx60VNrz700U25F2AJAdWLfRjPxIf_OZbdxXBr13yPH3hxGk2uXT6AstjGgZ6St0FP94tvzRexDUPwg6Slpxl5XlPvXCbq0ZBjWgZ9IRaJk0Kdyiur14_8"
    },
    facebook: {
      title: "Government Initiatives Update",
      details: "Highlighting key decisions on digital public infrastructure, logistics integration, and rural AI incubation grids from the recent high-level cabinet session.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOEVG7fJaC2TVhRAhekJmwlRSBFeHjiqUvZB3rDlyEOtOyAIJC97lphDrv_uNv-VJpk9J0QtPOci0SWXtWSKo5f3lNjmUgcC52U3sU0MfCuIGqI2DzgcfMNeZt6Z5EpYlMFmmV9aksmKgFeY2_sIoY0lDTj2zIbd9-fswRxqd0y7DUGhGpPHIMzmvHP_rQclfTF8fOU6Q7fro4rQxMIYjS-A5xfh61V45JMVYGO-L0A7aBt0Zb_4vbnJ1D5ZAtOI6agieqca6MzLI"
    }
  };

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
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-700 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="text-yellow-400 h-5 w-5" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* Main Header inside Hero Area to match styling */}
      <section className="hero-bg flex flex-col justify-between">
        
        {/* Navigation Navbar */}
        <header className="w-full bg-gradient-to-b from-black/50 to-transparent z-40">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* National Emblem & Logo */}
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img 
                alt="AURIS India Logo" 
                className="w-auto h-16 object-contain filter drop-shadow brightness-0 invert" 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              />
              <div className="text-left border-l-2 border-white/30 pl-4">
                <div className="text-3xl font-extrabold tracking-tight text-white font-public flex items-center gap-1">
                  AURIS <span className="bg-orange-500 text-[10px] tracking-widest font-extrabold text-white px-1.5 py-0.5 rounded-md align-middle">GOV</span>
                </div>
                <p className="text-white/95 text-xs font-semibold tracking-wide leading-tight mt-0.5">
                  Autonomous Unified Risk Intelligence System
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <nav className="flex items-center bg-black/35 backdrop-blur-md rounded-full border border-white/20 p-1 shadow-lg">
              <button 
                onClick={() => onNavigate('login')}
                className="px-5 py-2 text-white font-semibold text-xs rounded-full hover:bg-white/25 active:scale-95 transition-all"
              >
                LOGIN
              </button>
              <button 
                onClick={() => scrollToSection('campaign-section')}
                className="px-5 py-2 text-white font-semibold text-xs hover:bg-white/10 transition-colors hidden sm:block"
              >
                CAMPAIGN
              </button>
              <button 
                onClick={() => scrollToSection('periodicals-section')}
                className="px-5 py-2 text-white font-semibold text-xs hover:bg-white/10 transition-colors hidden sm:block"
              >
                PERIODICALS
              </button>
              <button 
                onClick={() => scrollToSection('infocus-section')}
                className="px-5 py-2 text-white font-semibold text-xs hover:bg-white/10 transition-colors hidden md:block"
              >
                IN FOCUS
              </button>
              <button 
                onClick={() => scrollToSection('trending-section')}
                className="px-5 py-2 text-white font-semibold text-xs rounded-full hover:bg-white/15 transition-all"
              >
                TRENDING
              </button>
            </nav>

          </div>
        </header>

        {/* Hero Search Box Centered */}
        <div className="flex-grow flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-3xl text-center">
            
            {/* Animated Title Accent */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow">
              <Sparkles className="text-yellow-300 h-4 w-4 animate-pulse" />
              INTEGRATED RISK INTELLIGENCE & CITIZEN PORTAL
            </div>

            <form onSubmit={handleSearch} className="relative bg-white/95 backdrop-blur-md rounded-full p-2 border-2 border-blue-400 shadow-2xl flex items-center transition-all hover:bg-white focus-within:ring-4 focus-within:ring-blue-400/30">
              <div className="p-3 text-gray-500">
                <Layers className="h-6 w-6 text-blue-500" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Keyword (e.g. NHRC, ED, MyGov, Periodicals)"
                className="flex-grow px-2 py-1 text-base md:text-lg text-gray-700 bg-transparent border-none outline-none focus:ring-0"
              />
              <div className="h-8 w-px bg-gray-200 mx-3"></div>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md hover:scale-105 active:scale-95 transition-all mr-1"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

      </section>

      {/* Main Page Layout */}
      <main className="flex-grow">
        
        {/* Campaign Section (Light Saffron Pastel Gradient with glow effect) */}
        <section id="campaign-section" className="scroll-mt-24 py-20 bg-gradient-to-br from-[#fffcf6] via-[#fffaf0] to-[#fff4e6] border-b border-amber-200/40 shadow-sm relative overflow-hidden">
          {/* Decorative background glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 space-y-8 relative z-10">
          <div className="flex justify-between items-end border-b border-gray-200 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-blue-600">
                <Award className="h-4 w-4" />
                Featured Programs
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 font-public mt-1">Campaign</h2>
              <p className="text-gray-500 text-base mt-1">Participate, Engage, Empower</p>
            </div>
            
            {/* Slider navigations */}
            <div className="flex space-x-3">
              <button 
                onClick={() => setCampaignIndex(prev => Math.max(0, prev - 1))}
                disabled={campaignIndex === 0}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setCampaignIndex(prev => Math.min(campaigns.length - 1, prev + 1))}
                disabled={campaignIndex === campaigns.length - 1}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cards Grid / Carousel wrapper */}
          <div className="overflow-hidden relative p-1">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${campaignIndex * 24}rem)` }}
            >
              {campaigns.map((camp) => (
                <div 
                  key={camp.id} 
                  className="reveal w-96 flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-2xl scale-hover overflow-hidden flex flex-col border-none"
                >
                  <div className="relative">
                    <img 
                      alt={camp.title} 
                      className="w-full h-48 object-cover" 
                      src={camp.image}
                    />
                    <span className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {camp.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-extrabold text-gray-900 text-lg leading-snug font-public hover:text-blue-600 transition-colors">
                        {camp.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {camp.description}
                      </p>
                    </div>

                    {/* Interactive Campaign Mann Ki Baat dates block */}
                    {camp.isInteractive && (
                      <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 space-y-2">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">
                          <span>Start Date</span>
                          <span>End Date</span>
                        </div>
                        <div className="flex justify-between gap-3 font-semibold text-xs">
                          <span className="bg-white px-2.5 py-1 rounded border border-emerald-200 text-emerald-800 flex-1 text-center">
                            {camp.startDate}
                          </span>
                          <span className="bg-white px-2.5 py-1 rounded border border-red-200 text-red-700 flex-1 text-center">
                            {camp.endDate}
                          </span>
                        </div>
                      </div>
                    )}

                    {camp.isInteractive ? (
                      <button 
                        onClick={() => {
                          setSuggestForm(prev => ({ ...prev, description: "Submitting views for PM Mann Ki Baat" }));
                          setActiveModal('suggest');
                        }}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-extrabold shadow-lg hover:opacity-95 transform active:scale-98 glow-btn transition-all"
                      >
                        Share your Views
                      </button>
                    ) : (
                      <button 
                        onClick={() => setToast(`Opening Campaign: ${camp.title}`)}
                        className="w-max px-8 py-2.5 bg-gray-800 text-white rounded-full text-xs font-bold hover:bg-gray-950 transition-colors active:scale-95"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* MyGov Periodicals Section (Light Slate/Blue-gray Pastel Gradient with glow effect) */}
        <section id="periodicals-section" className="scroll-mt-24 py-20 bg-gradient-to-br from-[#f8fafc] via-[#f1f6fc] to-[#e6effc] border-b border-blue-100/40 shadow-sm relative overflow-hidden">
          {/* Decorative background glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 space-y-8 relative z-10">
          <div className="flex justify-between items-end border-b border-gray-200 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-blue-600">
                <BookOpen className="h-4 w-4" />
                Knowledge and Reports
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 font-public mt-1">MyGov Periodicals</h2>
              <p className="text-gray-500 text-base mt-1 max-w-3xl">
                Bringing You Stories and Strategies Shaping Viksit Bharat – From Citizen Centric Initiatives to Global Impact
              </p>
            </div>
            
            {/* Periodicals Slider */}
            <div className="flex space-x-3">
              <button 
                onClick={() => setPeriodicalIndex(prev => Math.max(0, prev - 1))}
                disabled={periodicalIndex === 0}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setPeriodicalIndex(prev => Math.min(periodicals.length - 1, prev + 1))}
                disabled={periodicalIndex === periodicals.length - 1}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cards slider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {periodicals.map((periodical) => (
              <div 
                key={periodical.id}
                className="reveal bg-white rounded-2xl shadow-md hover:shadow-2xl scale-hover overflow-hidden flex flex-col border-none"
              >
                <div className="p-6 flex flex-col flex-grow text-center justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-gray-900 font-public">
                      {periodical.title}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-snug">
                      {periodical.tagline}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center border border-gray-100 flex-grow shadow-inner">
                    <img 
                      alt={periodical.title} 
                      className="max-h-64 object-contain shadow-2xl rounded-lg hover:rotate-2 transition-transform duration-300" 
                      src={periodical.image}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedPeriodical(periodical);
                            setActiveModal('periodical');
                          }}
                          className="px-4 py-2 bg-gray-700 text-white rounded-full text-[10px] font-bold hover:bg-gray-900 transition-colors shadow"
                        >
                          View Latest Edition
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPeriodical(periodical);
                            setActiveModal('periodical');
                          }}
                          className="px-4 py-2 bg-gray-700 text-white rounded-full text-[10px] font-bold hover:bg-gray-900 transition-colors shadow"
                        >
                          View E-book
                        </button>
                      </div>
                      <button 
                        onClick={() => setToast(`Viewing entire archive of ${periodical.title}`)}
                        className="px-4 py-1.5 border border-gray-300 text-gray-600 rounded-full text-[10px] font-bold hover:bg-gray-100 hover:text-gray-900"
                      >
                        View All
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500 font-semibold border-t border-gray-100 pt-3">
                      <span>{periodical.date}</span>
                      <span>Size: {periodical.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* In Focus Section (Light Emerald/Mint Green Pastel Gradient with glow effect) */}
        <section id="infocus-section" className="scroll-mt-24 py-20 bg-gradient-to-br from-[#f6fdf9] via-[#ecfbf1] to-[#def7e5] border-b border-emerald-200/40 shadow-sm relative overflow-hidden">
          {/* Decorative background glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 space-y-8 relative z-10">
          <div className="flex justify-between items-end border-b border-gray-200 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-blue-600">
                <FileText className="h-4 w-4" />
                Latest Highlights
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 font-public mt-1">In Focus</h2>
              <p className="text-gray-500 text-base mt-1">Let's take part in this and be a changemaker</p>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={() => setInFocusIndex(prev => Math.max(0, prev - 1))}
                disabled={inFocusIndex === 0}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setInFocusIndex(prev => Math.min(inFocusItems.length - 1, prev + 1))}
                disabled={inFocusIndex === inFocusItems.length - 1}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inFocusItems.map((item) => (
              <div 
                key={item.id}
                className="reveal group cursor-pointer flex flex-col justify-between"
                onClick={() => {
                  setSelectedPeriodical({ title: item.title, tagline: item.tag, description: item.details, date: item.date, size: "N/A", pages: [] });
                  setActiveModal('periodical');
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md bg-white mb-4 hover:shadow-2xl transition-all duration-300 border-none">
                  <img 
                    alt={item.title} 
                    className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300" 
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="space-y-1 mt-2">
                  <span className="bg-blue-50 text-blue-800 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors font-public pt-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Trending Social Media Section (Light Lavender/Indigo Pastel Gradient with glow effect) */}
        <section id="trending-section" className="scroll-mt-24 py-20 bg-gradient-to-br from-[#fafaff] via-[#f4f2ff] to-[#eae6ff] border-b border-indigo-100/40 shadow-sm relative overflow-hidden">
          {/* Decorative background glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 space-y-8 relative z-10">
          <div className="flex justify-between items-end border-b border-gray-200 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-blue-600">
                <Instagram className="h-4 w-4" />
                Community Updates
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 font-public mt-1">Trending Social Media</h2>
              <p className="text-gray-500 text-base mt-1">Join Our Social Hub to stay up to date</p>
            </div>
          </div>

          {/* Featured Broadcast Highlight Card (National AI Literacy Program YUVA AI for All) */}
          <div className="reveal bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all flex flex-col lg:flex-row gap-8 items-center relative mb-12 border-none">
            
            {/* Left: Video Player */}
            <div className="w-full lg:w-3/5 aspect-video rounded-xl overflow-hidden relative bg-black shadow-inner flex flex-col justify-between group">
              {/* Image backdrop (generated premium poster) */}
              <img 
                alt="YUVA AI For All Video Poster" 
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-101 transition-transform duration-500" 
                src="/yuva-ai-poster.png"
              />
              
              {/* Play overlays and controls */}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center cursor-pointer">
                <div className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white scale-95 group-hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  <svg className="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Play bar control details at bottom */}
              <div className="relative z-10 w-full bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 flex flex-col space-y-2 mt-auto">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-orange-500 w-0 group-hover:w-1/3 transition-all duration-1000"></div>
                </div>
                {/* Video controls */}
                <div className="flex justify-between items-center text-white text-[11px] font-semibold opacity-95">
                  <div className="flex items-center space-x-3">
                    <button className="hover:text-orange-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                    <span>0:00 / 1:57</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="hover:text-orange-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
                    </button>
                    <button className="hover:text-orange-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Broadcast Details */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between h-full space-y-6 text-left">
              
              <div className="space-y-4">
                {/* Segment tagline */}
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-normal block">
                  Connecting citizens and government through the power of media
                </span>
                
                <h3 className="text-2xl font-black text-slate-950 leading-snug font-public pt-1">
                  National AI Literacy Program YUVA AI for All
                </h3>
                
                <div className="border-t border-gray-200"></div>

                {/* MyGov Verified Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      alt="Ashoka Emblem" 
                      className="h-8 object-contain" 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                    />
                    <img 
                      alt="MyGov Logo" 
                      className="h-8 object-contain" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbpdLhmlvRCCQ4Cr-OEsO9LJfw1U9K4HxLB-wFOyLahtQlGQemM1rMvJpbUqa6pyeprkU32quu_0MCCJMOuK7pqMCQ41tbbVlVW1zM3A4s1kcg89TQKfglcH00PlnhacYVCLZJrtPISlU8QaIOvi6HJbx60VNrz700U25F2AJAdWLfRjPxIf_OZbdxXBr13yPH3hxGk2uXT6AstjGgZ6St0FP94tvzRexDUPwg6Slpxl5XlPvXCbq0ZBjWgZ9IRaJk0Kdyiur14_8"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-sm text-slate-950 leading-none">MyGov India</span>
                        <span className="bg-slate-200 text-slate-600 rounded-full p-0.5 inline-flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Circular Plus Button */}
                  <button 
                    onClick={() => setToast("Added YUVA AI Program to your featured dashboard shortcuts.")}
                    className="w-10 h-10 bg-white hover:bg-slate-50 border border-gray-200 rounded-full flex items-center justify-center text-orange-500 font-bold text-xl shadow-sm transform hover:scale-105 active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons (Share & Saffron Download) */}
              <div className="space-y-4 pt-4 border-t border-gray-150">
                <div className="flex items-center gap-3">
                  {/* Share button */}
                  <button 
                    onClick={() => setToast("Shared video link to clipboard!")}
                    className="p-3 bg-white hover:bg-slate-50 border border-gray-200 rounded-full flex items-center justify-center text-slate-600 hover:scale-105 active:scale-95 transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>
                  
                  {/* Download button (Matching saffron/bronze color) */}
                  <button 
                    onClick={() => setToast("Starting video download (74.4 MB)...")}
                    className="px-6 py-3 bg-[#d57c59] hover:bg-[#c46b48] text-white rounded-full text-xs font-bold shadow hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                  </button>
                </div>

                {/* Video metadata sizes */}
                <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                  Video Size: <span className="text-slate-800">74.4 MB</span> | Video Resolution: <span className="text-slate-800">1920x1080</span>
                </div>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Instagram Card */}
            <div className="reveal flex flex-col items-center">
              <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden mb-6 flex flex-col h-[460px] border-none">
                <div className="p-4 border-b border-gray-100 flex items-center space-x-3 bg-gradient-to-r from-pink-50/50 to-orange-50/50">
                  <div className="p-2 bg-gradient-to-tr from-yellow-500 to-purple-600 rounded-lg text-white">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-gray-800">Instagram</span>
                    <p className="text-[10px] text-gray-400">@{socialFeed.instagram.user}</p>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-gray-50 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-pink-100 rounded-full text-pink-600 animate-pulse">
                    <Instagram className="w-10 h-10 opacity-70" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-xs">
                    {socialFeed.instagram.text}
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedSocial({ platform: 'Instagram', user: socialFeed.instagram.user, text: socialFeed.instagram.text });
                      setActiveModal('social');
                    }}
                    className="text-blue-600 hover:text-blue-800 font-bold text-xs"
                  >
                    View this post on Instagram
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setToast("Opening official Instagram directory...")}
                className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-xs font-bold shadow hover:opacity-90 transition-all active:scale-95"
              >
                View More
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="reveal flex flex-col items-center">
              <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden mb-6 flex flex-col h-[460px] border-none">
                <div className="p-4 border-b border-gray-100 flex items-center space-x-3 bg-blue-50/50">
                  <div className="p-2 bg-blue-600 rounded-lg text-white">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-gray-800">Linkedin</span>
                    <p className="text-[10px] text-gray-400">Professional Feed</p>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto custom-scrollbar p-5 space-y-4 text-xs bg-white">
                  <div className="flex items-center space-x-3">
                    <img 
                      alt="MyGov" 
                      className="w-10 h-10 rounded-full border border-gray-200" 
                      src={socialFeed.linkedin.avatar}
                    />
                    <div>
                      <p className="font-extrabold text-gray-900 text-sm leading-none">{socialFeed.linkedin.author}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{socialFeed.linkedin.followers}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-extrabold text-sm text-gray-900">{socialFeed.linkedin.title}</p>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {socialFeed.linkedin.content}
                    </p>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                    <Layers className="w-10 h-10 text-blue-500 opacity-40 animate-pulse" />
                  </div>
                  <p className="text-blue-600 font-bold text-xs">{socialFeed.linkedin.hashtag}</p>
                </div>
              </div>
              <button 
                onClick={() => setToast("Opening official LinkedIn directory...")}
                className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-xs font-bold shadow hover:opacity-90 transition-all active:scale-95"
              >
                View More
              </button>
            </div>

            {/* Facebook Card */}
            <div className="reveal flex flex-col items-center">
              <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden mb-6 flex flex-col h-[460px] border-none">
                <div className="p-4 border-b border-gray-100 flex items-center space-x-3 bg-gradient-to-r from-blue-100/30 to-purple-100/30">
                  <div className="p-2 bg-blue-700 rounded-lg text-white">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-gray-800">Facebook</span>
                    <p className="text-[10px] text-gray-400">Citizen Updates</p>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto custom-scrollbar flex flex-col bg-white">
                  <img 
                    alt="Cabinet Updates" 
                    className="w-full h-44 object-cover" 
                    src={socialFeed.facebook.image}
                  />
                  <div className="p-4 space-y-2">
                    <p className="text-sm font-extrabold text-gray-900 leading-snug">{socialFeed.facebook.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {socialFeed.facebook.details}
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setToast("Opening official Facebook directory...")}
                className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-xs font-bold shadow hover:opacity-90 transition-all active:scale-95"
              >
                View More
              </button>
            </div>

          </div>
          </div>
        </section>

      </main>

      {/* Call to Action Section (Suggestion & Feedback Forms) */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-16 text-center shadow-xl">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight font-public">HELP US IN MAKING IT BETTER</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
              We welcome your participation in enhancing the directory further and also invite your comments and suggestions for improvement
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/20 backdrop-blur-md shadow-2xl">
              <button 
                onClick={() => setActiveModal('suggest')}
                className="px-8 py-3.5 bg-white text-blue-600 font-extrabold text-sm rounded-full shadow hover:bg-gray-50 active:scale-95 transition-all mr-1"
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

          <div className="border-t border-white/20 border-dashed w-3/4 mx-auto"></div>

          {/* Social Links Row */}
          <div className="space-y-8">
            <h3 className="text-2xl font-extrabold tracking-widest font-public uppercase">CONNECT WITH US</h3>
            <div className="flex justify-center space-x-12">
              
              <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setToast("Link copied to clipboard!")}>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 shadow transition-transform">
                  <Link2 className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold uppercase tracking-widest text-sm text-white">LINK</p>
                  <p className="text-xs text-white/70">To Us</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleBookmark}>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 shadow transition-transform">
                  <Bookmark className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold uppercase tracking-widest text-sm text-white">BOOKMARK</p>
                  <p className="text-xs text-white/70">This Page</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Official Government Logos Row structured as Three Cards */}
      <section className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] py-16 border-t border-b border-slate-200/60 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">National Digital Gateways</span>
            <h3 className="text-3xl font-extrabold text-slate-900 font-public">Official Portals & Digital Infrastructure</h3>
            <p className="text-xs text-gray-500">Access verified government platforms, open data registries, and secure digital compliance frameworks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: National Portal & Government Services */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center space-y-4">
              <div className="h-16 flex items-center justify-center gap-6">
                <img 
                  alt="Sarnath Capital" 
                  className="max-h-12 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                />
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-blue-900 leading-tight block">National Services</span>
                  <p className="text-[8px] text-gray-400 font-bold block mt-0.5">राष्ट्रीय सरकारी पोर्टल</p>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-950">National Portal of India</h4>
                <p className="text-xs text-gray-500">Single window access to consolidated digital services, information indices, and regulatory portals of the Government of India.</p>
              </div>
              <a 
                href="https://india.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2 transition-all hover:translate-x-0.5"
              >
                india.gov.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Card 2: Open Data & Collaboration */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center space-y-4">
              <div className="h-16 flex items-center justify-center gap-6">
                <img 
                  alt="MyGov" 
                  className="max-h-12 object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbpdLhmlvRCCQ4Cr-OEsO9LJfw1U9K4HxLB-wFOyLahtQlGQemM1rMvJpbUqa6pyeprkU32quu_0MCCJMOuK7pqMCQ41tbbVlVW1zM3A4s1kcg89TQKfglcH00PlnhacYVCLZJrtPISlU8QaIOvi6HJbx60VNrz700U25F2AJAdWLfRjPxIf_OZbdxXBr13yPH3hxGk2uXT6AstjGgZ6St0FP94tvzRexDUPwg6Slpxl5XlPvXCbq0ZBjWgZ9IRaJk0Kdyiur14_8"
                />
                <div className="h-8 w-px bg-gray-200"></div>
                <span className="text-sm font-black tracking-tighter text-orange-600">data.gov<span className="text-blue-600">.in</span></span>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-950">Open Data & Citizen Engagement</h4>
                <p className="text-xs text-gray-500">Contribute directly to policy decisions on the MyGov interactive portal and leverage government datasets for robust analytics.</p>
              </div>
              <div className="flex gap-4 mt-2">
                <a 
                  href="https://mygov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all hover:translate-x-0.5"
                >
                  MyGov <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-gray-300">|</span>
                <a 
                  href="https://data.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all hover:translate-x-0.5"
                >
                  data.gov.in <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 3: Secure Infrastructure & Cloud Compliance */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center space-y-4">
              <div className="h-16 flex items-center justify-center gap-6">
                <div className="text-center">
                  <span className="text-[8px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded block">GIGW COMPLIANT</span>
                  <span className="text-[7px] text-gray-400 font-semibold block mt-0.5">Website Guidelines</span>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-left">
                  <span className="text-xs font-black tracking-wider text-purple-700 block">SwaaS</span>
                  <span className="text-[8px] text-gray-400 font-bold block">Secure Cloud Platform</span>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-950">Standards & Secure Cloud</h4>
                <p className="text-xs text-gray-500">Access GIGW compliant portals and secure, highly reliable SaaS (Website as a Service) hosting services engineered by NIC.</p>
              </div>
              <button 
                onClick={() => setToast("GIGW security & SwaaS cloud guidelines loaded.")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2 transition-all hover:translate-x-0.5"
              >
                View Standards <ExternalLink className="w-3 h-3" />
              </button>
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
            <span className="text-white/20">|</span>
            <button onClick={() => setToast("Help documentation linked.")} className="hover:text-white transition-colors">Help</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setToast("Site map opened.")} className="hover:text-white transition-colors">Sitemap</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setToast("Website Policies and Terms linked.")} className="hover:text-white transition-colors">Website Policies</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setActiveModal('feedback')} className="hover:text-white transition-colors">Feedback</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setToast("Contact Information opened.")} className="hover:text-white transition-colors">Contact Us</button>
          </div>

          {/* Copyright details */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <div className="text-center md:text-left space-y-1">
              <p className="leading-relaxed">
                © Developed and hosted by <span className="text-white font-semibold">National Informatics Centre</span>,
              </p>
              <p className="leading-relaxed">
                Ministry of Electronics & Information Technology, <span className="text-white font-bold">Government of India</span>
              </p>
            </div>
            
            <div className="text-center md:text-right font-bold space-y-1">
              <p>Last Updated: <span className="text-blue-400">May 26, 2026</span></p>
              <p className="text-[10px] text-gray-500 font-semibold uppercase">AURIS Portal version 2.4.1</p>
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
                <h3 className="text-xl font-bold font-public">Suggest A Website Directory</h3>
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
                <h3 className="text-xl font-bold font-public">Share Portal Feedback</h3>
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

      {/* 3. Periodical Reader Modal */}
      {activeModal === 'periodical' && selectedPeriodical && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="bg-blue-500 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                  AURIS Reader
                </span>
                <h3 className="text-xl font-bold font-public mt-1">{selectedPeriodical.title}</h3>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">{selectedPeriodical.tagline}</p>
              </div>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  setSelectedPeriodical(null);
                }}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[480px] overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                {selectedPeriodical.description}
              </p>
              
              {selectedPeriodical.pages && selectedPeriodical.pages.length > 0 ? (
                <div className="space-y-4 border-t border-gray-100 pt-4">
                  <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                    Highlighted Articles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedPeriodical.pages.map((p, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-150 rounded-xl p-4 space-y-2">
                        <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-2 py-0.5 rounded">
                          Article {idx + 1}
                        </span>
                        <h5 className="font-bold text-gray-900 text-sm">{p.title}</h5>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                  <FileText className="h-10 w-10 mx-auto opacity-30 mb-2" />
                  <p className="text-xs">No online preview pages are cached. You can download the full PDF to view complete content.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Size: {selectedPeriodical.size}
              </span>
              <button 
                onClick={() => {
                  setToast(`Downloading document "${selectedPeriodical.title}.pdf"...`);
                  setActiveModal(null);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow transition-all active:scale-95"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Social Embed Detail Modal */}
      {activeModal === 'social' && selectedSocial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-500" />
                <h3 className="font-bold font-public text-sm">{selectedSocial.platform} Embed</h3>
              </div>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  setSelectedSocial(null);
                }}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-center">
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Instagram className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-extrabold text-gray-900 text-base">@{selectedSocial.user}</p>
                  <p className="text-xs text-gray-400">Official Social Broadcast Partner</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  "{selectedSocial.text}"
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setToast("Connecting to Instagram APIs...");
                    setActiveModal(null);
                  }}
                  className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Instagram
                </button>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
