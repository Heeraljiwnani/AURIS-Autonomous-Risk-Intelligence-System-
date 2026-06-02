import { useState, useEffect } from 'react';
import {
  ChevronDown,
  X,
  MessageSquare,
  Sparkles,
  Award,
  Bell,
  Gavel,
  Shield,
  GitBranch,
  CheckCircle2,
  TrendingUp,
  Zap,
  ShieldAlert,
  ScrollText
} from 'lucide-react';
import FloatingNavigation from './FloatingNavigation';

const HERO_IMAGES = [
  '/cybersecurity_command_center.png',
  '/sbi_building.png',
  '/rbi_logo.png',
  '/gdp_charts.png'
];

const GOAL_DETAILS = {
  'fraud': {
    title: "Detect Fraud in Real-Time",
    subtitle: "BankGuard AI Defensive Shield",
    description: "Protect your banking operations with intelligent, real-time fraud detection. BankGuard AI analyzes every transaction as it occurs, identifying unusual patterns, high-risk activities, and potential security threats. By generating instant alerts and actionable insights, the platform helps financial institutions prevent fraud, minimize losses, and maintain a secure banking environment.",
    hiDescription: "बुद्धिमानी और वास्तविक समय में धोखाधड़ी का पता लगाने के साथ अपने बैंकिंग संचालन को सुरक्षित रखें। BankGuard AI प्रत्येक लेनदेन का विश्लेषण करता है जैसे ही वह होता है, असामान्य पैटर्न, उच्च जोखिम वाली गतिविधियों और संभावित सुरक्षा खतरों की पहचान करता है। तत्काल अलर्ट और कार्रवाई योग्य अंतर्दृष्टि उत्पन्न करके, मंच वित्तीय संस्थानों को धोखाधड़ी को रोकने, नुकसान को कम करने और एक सुरक्षित बैंकिंग वातावरण बनाए रखने में मदद करता है।",
    icon: Bell,
    color: "blue",
    borderColor: "border-blue-400/40",
    headerBg: "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600",
    glow: "shadow-blue-500/30 shadow-2xl",
    textColor: "text-blue-300",
    badgeGlow: "from-blue-400 to-indigo-400",
    iconBg: "from-blue-500/25 to-indigo-500/10",
    iconBorder: "border-blue-400/30",
    iconGlow: "shadow-[0_0_25px_rgba(59,130,246,0.3)]",
    bulletBg: "bg-blue-500/15 text-blue-300",
    btnBg: "from-blue-500 to-indigo-600 hover:from-blue-450 hover:to-indigo-550 shadow-blue-500/30",
    features: [
      "Real-Time Streaming Analysis",
      "High-Risk Pattern Recognition",
      "Automated Incident Escalation"
    ],
    hiFeatures: [
      "वास्तविक समय स्ट्रीम विश्लेषण",
      "उच्च जोखिम पैटर्न पहचान",
      "स्वचालित घटना वृद्धि"
    ]
  },
  'rbi': {
    title: "Monitor RBI Compliance Automatically",
    subtitle: "Autonomous Regulatory Engine",
    description: "Stay compliant with changing regulatory landscape effortlessly. AURIS automatically monitors, parses, and implements RBI compliance rules, checking each ledger entry for regulatory adherence in real-time.",
    hiDescription: "बदलते नियामक परिदृश्य के साथ सहजता से अनुपालन में रहें। AURIS स्वचालित रूप से आरबीआई अनुपालन नियमों की निगरानी, विश्लेषण और कार्यान्वयन करता है, वास्तविक समय में नियामक पालन के लिए प्रत्येक बही प्रविष्टि की जांच करता है।",
    icon: Gavel,
    color: "cyan",
    borderColor: "border-cyan-400/40",
    headerBg: "bg-gradient-to-r from-cyan-50 via-cyan-400 to-blue-500",
    glow: "shadow-cyan-500/30 shadow-2xl",
    textColor: "text-cyan-300",
    badgeGlow: "from-cyan-400 to-blue-400",
    iconBg: "from-cyan-500/25 to-blue-500/10",
    iconBorder: "border-cyan-400/30",
    iconGlow: "shadow-[0_0_25px_rgba(6,182,212,0.3)]",
    bulletBg: "bg-cyan-500/15 text-cyan-300",
    btnBg: "from-cyan-500 to-blue-600 hover:from-cyan-450 hover:to-blue-550 shadow-cyan-500/30",
    features: [
      "Continuous Ledger Scans",
      "Automatic Directive Mapping",
      "Compliance Score Tracking"
    ],
    hiFeatures: [
      "सतत बही स्कैन",
      "स्वचालित निर्देश मानचित्रण",
      "अनुपालन स्कोर ट्रैकिंग"
    ]
  },
  'cyber': {
    title: "Detect Cyber Threats",
    subtitle: "Intelligent Security Sentinel",
    description: "Defend your financial systems from sophisticated cyber threats. The cyber defense agent continuously scans infrastructure logs, detecting anomalies, unauthorized access, and malicious attempts before they impact your database.",
    hiDescription: "जटिल साइबर खतरों से अपने वित्तीय प्रणालियों की रक्षा करें। साइबर रक्षा एजेंट लगातार बुनियादी ढांचे के लॉग को स्कैन करता है, डेटाबेस को प्रभावित करने से पहले विसंगतियों, अनधिकृत पहुंच और दुर्भावनापूर्ण प्रयासों का पता लगाता है।",
    icon: Shield,
    color: "indigo",
    borderColor: "border-indigo-400/40",
    headerBg: "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600",
    glow: "shadow-indigo-500/30 shadow-2xl",
    textColor: "text-indigo-300",
    badgeGlow: "from-indigo-400 to-purple-400",
    iconBg: "from-indigo-500/25 to-purple-500/10",
    iconBorder: "border-indigo-400/30",
    iconGlow: "shadow-[0_0_25px_rgba(99,102,241,0.3)]",
    bulletBg: "bg-indigo-500/15 text-indigo-300",
    btnBg: "from-indigo-500 to-purple-600 hover:from-indigo-450 hover:to-purple-550 shadow-indigo-500/30",
    features: [
      "Infrastructure Log Audits",
      "Intrusion Attempt Alerts",
      "Behavioral Threat Profiling"
    ],
    hiFeatures: [
      "बुनियादी ढांचा लॉग ऑडिट",
      "घुसपेठ के प्रयास अलर्ट",
      "व्यवहार संबंधी खतरा प्रोफाइलिंग"
    ]
  },
  'maps': {
    title: "Generate Master Action Plans (MAPs)",
    subtitle: "Automated Risk Remediation",
    description: "Streamline risk remediation with automated master action plans. When compliance gaps or anomalies are detected, the system designs a step-by-step action plan for immediate corrective action.",
    hiDescription: "स्वचालित मास्टर एक्शन प्लान के साथ जोखिम निवारण को कारगर बनाएं। जब अनुपालन अंतराल या विसंगतियों का पता चलता है, तो सिस्टम तत्काल सुधारात्मक कार्रवाई के लिए एक चरण-दर-चरण कार्य योजना तैयार करता है।",
    icon: GitBranch,
    color: "emerald",
    borderColor: "border-emerald-400/40",
    headerBg: "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/30 shadow-2xl",
    textColor: "text-emerald-300",
    badgeGlow: "from-emerald-400 to-teal-400",
    iconBg: "from-emerald-500/25 to-teal-500/10",
    iconBorder: "border-emerald-400/30",
    iconGlow: "shadow-[0_0_25px_rgba(16,185,129,0.3)]",
    bulletBg: "bg-emerald-500/15 text-emerald-300",
    btnBg: "from-emerald-500 to-teal-600 hover:from-emerald-450 hover:to-teal-550 shadow-emerald-500/30",
    features: [
      "Automated Task Assignment",
      "Remediation Step Planners",
      "Dynamic Criticality Analysis"
    ],
    hiFeatures: [
      "स्वचालित कार्य असाइनमेंट",
      "उपचार चरण योजनाकार",
      "गतिशील गंभीरता विश्लेषण"
    ]
  },
  'audit': {
    title: "Produce Audit-Ready Reports",
    subtitle: "Continuous Compliance Ledger",
    description: "Simplify your auditing process with automated reporting. Access instant, verified audit trails, compliance certifications, and risk logs formatted to perfectly fit legislative requirements.",
    hiDescription: "स्वचालित रिपोर्टिंग के साथ अपनी ऑडिटिंग प्रक्रिया को सरल बनाएं। विधायी आवश्यकताओं को पूरी तरह से फिट करने के लिए स्वरूपित तत्काल, सत्यापित ऑडिट ट्रेल्स, अनुपालन प्रमाणपत्र और जोखिम लॉग तक पहुंचें।",
    icon: CheckCircle2,
    color: "amber",
    borderColor: "border-amber-400/40",
    headerBg: "bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500",
    glow: "shadow-amber-500/30 shadow-2xl",
    textColor: "text-amber-300",
    badgeGlow: "from-amber-400 to-orange-400",
    iconBg: "from-amber-500/25 to-orange-500/10",
    iconBorder: "border-amber-400/30",
    iconGlow: "shadow-[0_0_25px_rgba(245,158,11,0.3)]",
    bulletBg: "bg-amber-500/15 text-amber-300",
    btnBg: "from-amber-500 to-orange-600 hover:from-amber-450 hover:to-orange-550 shadow-amber-500/30",
    features: [
      "Instant PDF & JSON Reports",
      "Tamper-Proof Audit History",
      "Regulatory Certification Logs"
    ],
    hiFeatures: [
      "त्वरित पीडीएफ और जेएसओएन रिपोर्ट",
      "छेड़छाड़-मुक्त ऑडिट इतिहास",
      "नियामक प्रमाणन लॉग"
    ]
  }
};

const TRANSLATIONS = {
  en: {
    login: "LOGIN",
    aurisSub: "Autonomous Unified Risk Intelligence System",
    workflowTitle: "The Workflow",
    workflowSub: "From Transaction Entry to Audit Resolution",
    aimTitle: "What we Aim for ?",
    aimSub: "Empowering Financial Institutions with Proactive Defense",
    benefitsTitle: "Why it Matters?",
    ctaTitle: "HELP US IN MAKING IT BETTER",
    ctaSub: "Your feedback and insights are vital in shaping the future of autonomous compliance and risk intelligence.",
    feedbackBtn: "Share Feedback",
    connectTitle: "CONNECT WITH US",
    card1Title: "Detect fraud in real-time",
    card2Title: "Monitor RBI compliance automatically",
    card3Title: "Detect cyber threats",
    card4Title: "Generate Master Action Plans (MAPs)",
    card5Title: "Produce audit-ready reports",
    viewDetails: "View Details",
    benefit1Title: "Faster fraud detection",
    benefit1Desc: "Seconds from transaction to alert, reducing critical reaction windows.",
    benefit2Title: "Better regulatory compliance",
    benefit2Desc: "Continuous monitoring ensures alignment with evolving RBI mandates.",
    benefit3Title: "Reduced fraud losses",
    benefit3Desc: "Proactive prevention stops illegal transfers before they settle.",
    benefit4Title: "Automated audit reporting",
    benefit4Desc: "Eliminate manual report compilation with instant PDF/JSON outputs.",
    step1Title: "Step 1: Circular & Transaction Ingestion",
    step1Desc: "Ingest RBI circulars, regulatory updates and real-time financial transactions from multiple distributed sources.",
    step2Title: "Step 2: AI Extraction & Interpretation",
    step2Desc: "AI agents analyze documents and transactions to extract, classify and structure key information for downstream processing.",
    step3Title: "Step 3: Central Orchestration",
    step3Desc: "The Central Orchestrator coordinates all agents, routes transactions and regulatory requirements to the right modules.",
    step4Title: "Step 4: Fraud & Risk Analysis",
    step4Desc: "The Fraud Agent evaluates real-time transactions to identify suspicious patterns, anomalies and potential risks.",
    step5Title: "Step 5: Compliance Mapping",
    step5Desc: "The Compliance Agent cross-references regulations with RBI guidelines to create Measurable Action Points (MAPs).",
    step6Title: "Step 6: Department Execution",
    step6Desc: "Departments complete assigned MAPs and upload evidence. AI Validation Agents verify compliance automatically.",
    step7Title: "Step 7: Audit & Monitoring",
    step7Desc: "The Audit Agent compiles all findings into a structured audit report with real-time dashboards and complete trails."
  },
  hi: {
    login: "लॉगिन",
    aurisSub: "स्वायत्त एकीकृत जोखिम खुफिया प्रणाली",
    workflowTitle: "कार्यप्रवाह",
    workflowSub: "लेनदेन प्रविष्टि से ऑडिट समाधान तक",
    aimTitle: "हमारा लक्ष्य क्या है?",
    aimSub: "सक्रिय सुरक्षा के साथ वित्तीय संस्थानों को सशक्त बनाना",
    benefitsTitle: "यह क्यों महत्वपूर्ण है?",
    ctaTitle: "इसे बेहतर बनाने में हमारी सहायता करें",
    ctaSub: "स्वायत्त अनुपालन और जोखिम खुफिया के भविष्य को आकार देने में आपकी प्रतिक्रिया और अंतर्दृष्टि महत्वपूर्ण हैं।",
    feedbackBtn: "प्रतिक्रिया साझा करें",
    connectTitle: "हमसे संपर्क करें",
    card1Title: "वास्तविक समय में धोखाधड़ी का पता लगाएं",
    card2Title: "आरबीआई अनुपालन की स्वचालित निगरानी करें",
    card3Title: "साइबर खतरों का पता लगाएं",
    card4Title: "मास्टर एक्शन प्लान (MAPs) उत्पन्न करें",
    card5Title: "ऑडिट-तैयार रिपोर्ट तैयार करें",
    viewDetails: "विवरण देखें",
    benefit1Title: "तेजी से धोखाधड़ी का पता लगाना",
    benefit1Desc: "लेनदेन से लेकर अलर्ट तक कुछ सेकंड, महत्वपूर्ण प्रतिक्रिया समय को कम करना।",
    benefit2Title: "बेहतर विनियामक अनुपालन",
    benefit2Desc: "सतत निगरानी विकसित होते आरबीआई आदेशों के साथ संरेखण सुनिश्चित करती है।",
    benefit3Title: "धोखाधड़ी के नुकसान में कमी",
    benefit3Desc: "सक्रिय रोकथाम अवैध स्थानान्तरण को उनके निपटान से पहले रोक देती है।",
    benefit4Title: "स्वचालित ऑडिट रिपोर्टिंग",
    benefit4Desc: "त्वरित पीडीएफ/जेएसओएन आउटपुट के साथ मैन्युअल रिपोर्ट संकलन को समाप्त करें।",
    step1Title: "चरण 1: सर्कुलर और लेनदेन अंतर्ग्रहण",
    step1Desc: "आरबीआई सर्कुलर, विनियामक अपडेट और वास्तविक समय वित्तीय लेनदेन को कई वितरित स्रोतों से अंतर्ग्रहण करें।",
    step2Title: "चरण 2: एआई निष्कर्षण और व्याख्या",
    step2Desc: "एआई एजेंट दस्तावेजों और लेनदेन का विश्लेषण करके डाउनस्ट्रीम प्रसंस्करण के लिए प्रमुख जानकारी निकालते, वर्गीकृत करते और संरचित करते हैं।",
    step3Title: "चरण 3: केंद्रीय ऑर्केस्ट्रेशन",
    step3Desc: "केंद्रीय ऑर्केस्ट्रेटर सभी एजेंटों का समन्वय करता है, लेनदेन और विनियामक आवश्यकताओं को सही मॉड्यूल में रूट करता है।",
    step4Title: "चरण 4: धोखाधड़ी और जोखिम विश्लेषण",
    step4Desc: "धोखाधड़ी एजेंट संदिग्ध पैटर्न, विसंगतियों और संभावित जोखिमों की पहचान करने के लिए वास्तविक समय लेनदेन का मूल्यांकन करता है।",
    step5Title: "चरण 5: अनुपालन मानचित्रण",
    step5Desc: "अनुपालन एजेंट मापने योग्य कार्य बिंदु (MAPs) बनाने के लिए आरबीआई दिशानिर्देशों के साथ विनियमों का क्रॉस-रेफरेंस करता है।",
    step6Title: "चरण 6: विभाग निष्पादन",
    step6Desc: "विभाग सौंपे गए MAPs को पूरा करते हैं और साक्ष्य अपलोड करते हैं। एआई सत्यापन एजेंट स्वचालित रूप से अनुपालन सत्यापित करते हैं।",
    step7Title: "चरण 7: ऑडिट और निगरानी",
    step7Desc: "ऑडिट एजेंट सभी निष्कर्षों को वास्तविक समय डैशबोर्ड और पूर्ण ट्रेल्स के साथ एक संरचित ऑडिट रिपोर्ट में संकलित करता है।"
  }
};

export default function LandingPage({ onNavigate }) {
  // States
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [lang, setLang] = useState('en'); // 'en' | 'hi'

  const t = (key) => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || "";
  };

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
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [toast, setToast] = useState(null);

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
      <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden" data-purpose="hero-search-header">

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
                  backgroundImage: `linear-gradient(rgba(15, 12, 10, 0.45), rgba(15, 12, 10, 0.5)), url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform,
                  transition,
                  filter: 'sepia(15%) brightness(95%) contrast(105%)',
                  willChange: 'transform',
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                }}
              />
            );
          })}
        </div>

        {/* Navigation Navbar */}
        <header className="w-full bg-gradient-to-b from-black/50 to-transparent z-40 relative" data-purpose="main-header">
          <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
            
            {/* Left Side: Brand Logo & Title */}
            <div className="flex items-center gap-3.5 cursor-pointer select-none group" onClick={() => scrollToSection('home')}>
              <img src="/auris-logo.png" className="w-11 h-11 rounded-xl object-cover shadow-[0_4px_20px_rgba(59,130,246,0.35)] border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:border-white/30" alt="AURIS Logo" />
              <span className="text-2xl font-black tracking-widest text-white font-public uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:text-blue-200 transition-colors duration-300">AURIS</span>
            </div>

            {/* Right Side: Language Switcher and Login Button */}
            <div className="flex items-center">
              {/* Highly aesthetic circular India flag language switcher toggle */}
              <div className="flex items-center gap-3 mr-8 select-none font-extrabold text-xs tracking-wider">
                <span className={`transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-white/40'}`}>EN</span>
                <button
                  onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                  className="w-16 h-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 relative flex items-center cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/20 active:scale-95"
                  aria-label="Toggle Language"
                >
                  {/* Sliding India flag thumb */}
                  <div
                    className={`w-6 h-6 rounded-full transition-transform duration-300 transform shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden bg-white ${
                      lang === 'en' ? 'translate-x-0' : 'translate-x-8'
                    }`}
                  >
                    <svg viewBox="0 0 30 30" className="w-full h-full scale-105">
                      <rect width="30" height="10" fill="#FF9933" />
                      <rect y="10" width="30" height="10" fill="#FFFFFF" />
                      <rect y="20" width="30" height="10" fill="#138808" />
                      <circle cx="15" cy="15" r="2.5" fill="none" stroke="#000080" strokeWidth="0.4" />
                      <path d="M 15 12.5 L 15 17.5 M 12.5 15 L 17.5 15 M 13.2 13.2 L 16.8 16.8 M 13.2 16.8 L 16.8 13.2" stroke="#000080" strokeWidth="0.25" />
                    </svg>
                  </div>
                </button>
                <span className={`transition-colors duration-300 ${lang === 'hi' ? 'text-white' : 'text-white/40'}`}>HI</span>
              </div>

              {/* Login Button in Top Right */}
              <button
                onClick={() => onNavigate('role-selection')}
                className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-[12px] tracking-widest rounded-full hover:bg-white/25 active:scale-95 transition-all shadow-lg uppercase"
              >
                {t('login')}
              </button>
            </div>

          </div>
        </header>

        {/* Centered Grand Title / Logo Block */}
        <div className="flex-grow flex flex-col items-center justify-center px-6 z-40 relative text-center max-w-5xl mx-auto drop-shadow-xl select-none">
          <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Centered Large Emblem */}
            <img
              alt="National Emblem of India"
              className="h-28 md:h-32 w-auto object-contain filter brightness-0 invert drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            />

            {/* Centered System Name */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white flex items-center justify-center gap-4 filter drop-shadow-md font-bungee">
                AURIS
              </h1>
              <p className="text-white/95 text-sm md:text-xl font-bold tracking-widest max-w-4xl leading-relaxed border-t border-white/25 pt-6 px-12 uppercase font-bungee">
                {t('aurisSub')}
              </p>
            </div>

          </div>
        </div>

        {/* Scroll Down Arrow Indicator */}
        <div className="w-full pb-6 flex flex-col items-center z-40 relative">
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
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? (
                  <>
                    The <span className="font-playwrite-j workflow-gradient-text ml-2">Workflow</span>
                  </>
                ) : (
                  t('workflowTitle')
                )}
              </h2>
              <p className="text-slate-500 text-lg mt-2">{t('workflowSub')}</p>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 md:px-0">
              {/* Vertical Center Line */}
              <div className="workflow-line-new"></div>

              {/* ── STEP 01 ── Circular & Transaction Ingestion */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 w-full reveal">
                {/* Left Card — Primary Sources */}
                <div className="w-full md:w-[43%] order-2 md:order-1">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-blue-700">Primary Sources</h4>
                    <div className="wf-detail-items">
                      <span>RBI / SEBI / Regulatory Portals 🌐</span>
                      <span>PDF, DOCX, HTML, Websites 📄</span>
                      <span>Internal Systems & Core Banking 🏛️</span>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-green-600">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3">
                  <div className="wf-card wf-card-main wf-card-main-right">
                    <span className="wf-step-label text-blue-700">STEP 01</span>
                    <h3 className="wf-step-title">Circular & Transaction Ingestion</h3>
                    <p className="wf-step-desc">Ingest RBI circulars, regulatory updates and real-time financial transactions from multiple distributed sources.</p>
                  </div>
                </div>
              </div>

              {/* ── STEP 02 ── AI Extraction & Interpretation */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 w-full reveal">
                {/* Left Card — NLP Capabilities */}
                <div className="w-full md:w-[43%] order-2 md:order-3">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-green-700">NLP Capabilities</h4>
                    <div className="wf-detail-checklist">
                      <div className="wf-check-item"><span className="wf-check-icon text-green-600">✓</span> Extract key sections & obligations</div>
                      <div className="wf-check-item"><span className="wf-check-icon text-green-600">✓</span> Simplify legal text to plain language</div>
                      <div className="wf-check-item"><span className="wf-check-icon text-green-600">✓</span> Identify entities & implications</div>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-green-600">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3 md:order-1">
                  <div className="wf-card wf-card-main wf-card-main-left">
                    <span className="wf-step-label text-green-700">STEP 02</span>
                    <h3 className="wf-step-title">AI Extraction & Interpretation</h3>
                    <p className="wf-step-desc">AI agents analyze documents and transactions to extract, classify and structure key information for downstream processing.</p>
                  </div>
                </div>
              </div>

              {/* ── STEP 03 ── Central Orchestration */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 w-full reveal">
                {/* Left Card — Orchestrator Logic */}
                <div className="w-full md:w-[43%] order-2 md:order-1">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-slate-700">Orchestrator Logic</h4>
                    <div className="wf-detail-items">
                      <span>Route transactions for fraud 🔀</span>
                      <span>Compliance mapping assignments 📋</span>
                      <span>Monitor workflow progress 🔄</span>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-slate-700">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3">
                  <div className="wf-card wf-card-main wf-card-main-right">
                    <span className="wf-step-label text-slate-600">STEP 03</span>
                    <h3 className="wf-step-title">Central Orchestration</h3>
                    <p className="wf-step-desc">The Central Orchestrator coordinates all agents, routes transactions and regulatory requirements to the right modules.</p>
                  </div>
                </div>
              </div>

              {/* ── STEP 04 ── Fraud & Risk Analysis */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 w-full reveal">
                {/* Left Card — Risk Matrix */}
                <div className="w-full md:w-[43%] order-2 md:order-3">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-red-600">Risk Matrix</h4>
                    <div className="wf-detail-checklist">
                      <div className="wf-check-item"><span className="wf-check-icon text-red-500">⚠</span> Analyze patterns & behavior</div>
                      <div className="wf-check-item"><span className="wf-check-icon text-red-500">⚠</span> Detect anomalies & red flags</div>
                      <div className="wf-check-item"><span className="wf-check-icon text-red-500">⚠</span> Assign risk scores & severity</div>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-red-600">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3 md:order-1">
                  <div className="wf-card wf-card-main wf-card-main-left">
                    <span className="wf-step-label text-red-600">STEP 04</span>
                    <h3 className="wf-step-title">Fraud & Risk Analysis</h3>
                    <p className="wf-step-desc">The Fraud Agent evaluates real-time transactions to identify suspicious patterns, anomalies and potential risks.</p>
                  </div>
                </div>
              </div>

              {/* ── STEP 05 ── Compliance Mapping */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 w-full reveal">
                {/* Left Card — MAP Details */}
                <div className="w-full md:w-[43%] order-2 md:order-1">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-orange-600">MAP Details</h4>
                    <div className="wf-detail-items">
                      <span>Measurable Action Points ✅</span>
                      <span>Compliance deadlines 📅</span>
                      <span>Internal policy cross-ref 🔗</span>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-orange-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3">
                  <div className="wf-card wf-card-main wf-card-main-right">
                    <span className="wf-step-label text-orange-600">STEP 05</span>
                    <h3 className="wf-step-title">Compliance Mapping</h3>
                    <p className="wf-step-desc">The Compliance Agent cross-references regulations with RBI guidelines to create Measurable Action Points (MAPs).</p>
                  </div>
                </div>
              </div>

              {/* ── STEP 06 ── Department Execution */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between mb-12 w-full reveal">
                {/* Left Card — Validation Result */}
                <div className="w-full md:w-[43%] order-2 md:order-3">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-teal-700">Validation Result</h4>
                    <div className="flex gap-2 mt-3 justify-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-extrabold rounded-md tracking-wide">VALID</span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-extrabold rounded-md tracking-wide">PENDING</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-extrabold rounded-md tracking-wide">REJECTED</span>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-teal-600">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3 md:order-1">
                  <div className="wf-card wf-card-main wf-card-main-left">
                    <span className="wf-step-label text-teal-700">STEP 06</span>
                    <h3 className="wf-step-title">Department Execution</h3>
                    <p className="wf-step-desc">Departments complete assigned MAPs and upload evidence. AI Validation Agents verify compliance automatically.</p>
                  </div>
                </div>
              </div>

              {/* ── STEP 07 ── Audit & Monitoring */}
              <div className="relative flex flex-col md:flex-row items-stretch justify-between w-full reveal">
                {/* Left Card — Final Outputs */}
                <div className="w-full md:w-[43%] order-2 md:order-1">
                  <div className="wf-card wf-card-detail">
                    <h4 className="wf-detail-title text-slate-800">Final Outputs</h4>
                    <div className="wf-detail-items">
                      <span>Real-time Compliance Dashboard 📊</span>
                      <span>Audit Trail · Reports · Alerts ⏱️</span>
                      <span>Executive Reports ⓘ</span>
                    </div>
                  </div>
                </div>
                {/* Center Icon */}
                <div className="wf-icon-col order-1 md:order-2">
                  <div className="wf-icon-circle bg-slate-800">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                </div>
                {/* Right Card — Step Content */}
                <div className="w-full md:w-[43%] order-3">
                  <div className="wf-card wf-card-main wf-card-main-right">
                    <span className="wf-step-label text-slate-600">STEP 07</span>
                    <h3 className="wf-step-title">Audit & Monitoring</h3>
                    <p className="wf-step-desc">The Audit Agent compiles all findings into a structured audit report with real-time dashboards and complete trails.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Strategic Project Goals Section */}
        <section className="scroll-mt-32 py-24 bg-gradient-to-b from-slate-50 via-teal-50/20 to-emerald-50/10 border-b border-teal-100/10" id="aim">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? (
                  <>
                    What we <span className="font-playwrite-j workflow-gradient-text mx-1">Aim</span> for ?
                  </>
                ) : (
                  t('aimTitle')
                )}
              </h2>
              <p className="text-slate-500 text-lg mt-2">{t('aimSub')}</p>
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
                  onClick={() => setSelectedGoal('fraud')}
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
                  onClick={() => setSelectedGoal('rbi')}
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
                  onClick={() => setSelectedGoal('cyber')}
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
                  onClick={() => setSelectedGoal('maps')}
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
                  onClick={() => setSelectedGoal('audit')}
                  className="mt-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-900 transition-colors shadow-md shadow-slate-900/10 active:scale-95"
                >
                  View Details
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* System Benefits Section */}
        <section id="goals" className="scroll-mt-32 py-24 bg-gradient-to-b from-emerald-50/10 via-amber-50/20 to-orange-50/10 border-b border-amber-100/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 reveal">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? (
                  <>
                    Why it <span className="font-playwrite-j workflow-gradient-text mx-1">Matters</span>?
                  </>
                ) : (
                  t('benefitsTitle')
                )}
              </h2>
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
      <section id="feedback" className="scroll-mt-32 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-20 text-center shadow-xl border-t border-slate-800" data-purpose="cta-participate">
        <div className="max-w-4xl mx-auto px-6 space-y-12">

          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold tracking-tight uppercase">{t('ctaTitle')}</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">{t('ctaSub')}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/20 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setActiveModal('feedback')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center font-bold text-sm tracking-wide"
                aria-label="Share Feedback"
              >
                Feedback
              </button>
            </div>
          </div>


        </div>
      </section>


      {/* Footer Details */}
      <footer className="bg-slate-900 text-white py-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 space-y-8">



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


          </div>

        </div>
      </footer>

      {/* MODAL OVERLAYS */}

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

      {/* 3. Goal Details Modal */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`bg-slate-800/98 text-white rounded-3xl shadow-2xl ${GOAL_DETAILS[selectedGoal].glow} border ${GOAL_DETAILS[selectedGoal].borderColor} w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative`}>
            
            <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className={`${GOAL_DETAILS[selectedGoal].headerBg} p-8 pb-6 flex flex-col justify-between relative overflow-hidden`}>
              
              <button
                onClick={() => setSelectedGoal(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 text-white/90 hover:text-white hover:rotate-90 z-20 shadow-md"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 space-y-2.5 max-w-[90%]">
                <span className="inline-block text-[10px] font-black tracking-widest text-white/90 bg-white/20 px-3 py-1 rounded-full uppercase">
                  {GOAL_DETAILS[selectedGoal].subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                  {GOAL_DETAILS[selectedGoal].title}
                </h3>
              </div>

              {(() => {
                const HeaderIcon = GOAL_DETAILS[selectedGoal].icon;
                return <HeaderIcon className="absolute right-[-20px] bottom-[-20px] h-36 w-36 opacity-15 text-white pointer-events-none rotate-12" />;
              })()}
            </div>

            <div className="p-8 pt-6 space-y-6 relative z-10">
              
              <div className="flex gap-5 items-start">
                <div className={`p-4 bg-gradient-to-b ${GOAL_DETAILS[selectedGoal].iconBg} border ${GOAL_DETAILS[selectedGoal].iconBorder} rounded-2xl flex-shrink-0 flex items-center justify-center ${GOAL_DETAILS[selectedGoal].iconGlow}`}>
                  {(() => {
                    const ContentIcon = GOAL_DETAILS[selectedGoal].icon;
                    return <ContentIcon className={`h-8 w-8 ${GOAL_DETAILS[selectedGoal].textColor}`} />;
                  })()}
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-widest text-slate-200 uppercase mb-1">
                    {lang === 'en' ? 'Overview' : 'अवलोकन'}
                  </h4>
                  <p className="text-white leading-relaxed font-semibold text-sm opacity-95">
                    {lang === 'en' ? GOAL_DETAILS[selectedGoal].description : GOAL_DETAILS[selectedGoal].hiDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black tracking-widest text-slate-200 uppercase">
                  {lang === 'en' ? 'Key Capabilities' : 'प्रमुख क्षमताएं'}
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {(lang === 'en' ? GOAL_DETAILS[selectedGoal].features : GOAL_DETAILS[selectedGoal].hiFeatures).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-3 rounded-2xl hover:bg-white/15 transition-all">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${GOAL_DETAILS[selectedGoal].badgeGlow}`}></div>
                      <span className="text-xs font-bold text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedGoal(null)}
                  className={`w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r ${GOAL_DETAILS[selectedGoal].btnBg} text-white font-extrabold text-xs tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase`}
                >
                  {lang === 'en' ? 'Close Details' : 'विवरण बंद करें'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Floating Navigation Menu */}
      <FloatingNavigation />
    </div>
  );
}
