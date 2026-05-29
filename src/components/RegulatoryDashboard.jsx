import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  TrendingUp,
  Map,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Menu,
  Scale,
  Settings,
  Bell,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  RefreshCw,
  FileCheck,
  LogOut,
  ShieldCheck,
  Activity,
  Database,
  Info,
  Sparkles,
  Eye,
  LogOut as LogoutIcon,
  Globe,
  User
} from 'lucide-react';

export default function RegulatoryDashboard({ onNavigate }) {
  // Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(() => {
    return localStorage.getItem('auris_active_sidebar') || 'agent';
  });
  const [sidebarHistory, setSidebarHistory] = useState([]);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [selectedAssignmentTab, setSelectedAssignmentTab] = useState('banking');
  
  const navigateToSidebar = (nextSidebar) => {
    if (activeSidebar !== nextSidebar) {
      setSidebarHistory(prev => [...prev, activeSidebar]);
      setActiveSidebar(nextSidebar);
    }
  };

  const handleBack = () => {
    if (sidebarHistory.length > 0) {
      const prevView = sidebarHistory[sidebarHistory.length - 1];
      setSidebarHistory(prev => prev.slice(0, -1));
      setActiveSidebar(prevView);
    } else {
      setIsSignOutModalOpen(true);
    }
  };

  const [assignmentsExpanded, setAssignmentsExpanded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('auris_language') || 'en';
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('auris_language', currentLanguage);
  }, [currentLanguage]);
  
  // Dashboard workflow views
  const [currentView, setCurrentView] = useState('upload'); // 'upload' | 'scanning' | 'report'
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanStep, setScanStep] = useState(0);
  const [activeTab, setActiveTab] = useState('infractions');
  
  // Map Generator states
  const [mapTab, setMapTab] = useState('banking');
  const [isTaskExpanded, setIsTaskExpanded] = useState(false);
  const [checkedDirectives, setCheckedDirectives] = useState(() => {
    const saved = localStorage.getItem('auris_checked_directives');
    return saved ? JSON.parse(saved) : {};
  });

  const directiveMapping = {
    risk: 'banking',
    geospatial: 'banking',
    audit: 'banking',
    policy: 'compliance',
    system: 'security',
    ops: 'support',
  };

  const handleToggleDirective = (id) => {
    const isNowChecked = !checkedDirectives[id];
    setCheckedDirectives(prev => ({ ...prev, [id]: isNowChecked }));
    
    const tab = directiveMapping[id];
    if (tab && isNowChecked) {
      setMapTab(tab);
    }
  };

  const handleSendAssignment = () => {
    const totalSelected = Object.values(checkedDirectives).filter(Boolean).length;
    if (totalSelected === 0) {
      setToast("Please select at least one directive or task to assign.");
    } else {
      setToast(`Successfully assigned ${totalSelected} items to digital oversight desks.`);
      setCheckedDirectives({});
    }
  };

  const renderTaskCard = (id, title, desc) => (
    <div 
      key={id}
      className="block p-4 rounded-xl border border-white/20 bg-white/10 transition-all duration-350 hover:bg-white/15"
    >
      <div className="space-y-1 text-left">
        <span className="text-sm font-bold block leading-none text-white">{title}</span>
        <p className="text-[12px] text-white/70 font-semibold leading-relaxed">{desc}</p>
      </div>
    </div>
  );

  const renderEmptyPlaceholder = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center text-white/40 space-y-4">
      <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
        <ClipboardList className="h-6 w-6 opacity-60" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-white/60">No tasks assigned to this desk yet</p>
        <p className="text-[11.5px] text-white/40 max-w-[240px] leading-relaxed mx-auto">Select available directives in the left panel to assign and dispatch digital oversight tasks.</p>
      </div>
    </div>
  );
  
  // Custom toast notification
  const [toast, setToast] = useState(null);

  // Chatbot states
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hello! I am your Autonomous Risk Intelligence Agent. I have digested the uploaded document and cross-referenced it with national policies. Feel free to ask any specific compliance or risk-related questions.",
      timestamp: 'Just now'
    }
  ]);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Save active sidebar on change
  useEffect(() => {
    localStorage.setItem('auris_active_sidebar', activeSidebar);
  }, [activeSidebar]);

  // Save checked directives on change
  useEffect(() => {
    localStorage.setItem('auris_checked_directives', JSON.stringify(checkedDirectives));
  }, [checkedDirectives]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Presets data for quick analysis demo
  const presets = [
    {
      id: 'privacy',
      title: "Sovereign Digital Privacy Directives 2025.pdf",
      desc: "Comprehensive guidelines on data retention, cross-border transfers, and user consent parameters.",
      size: "24.5 KB",
      complianceScore: 84,
      infractionsCount: 3,
      risks: { critical: 1, warning: 2 },
      status: "Partial Deficit",
      text: `NATIONAL DIGITAL PRIVACY REGULATION DIRECTIVE (2025)
Author: Ministry of Electronics & Information Technology (MeitY)
Reference: DP-2025-SEC4

CLAUSE 4.2 - THIRD PARTY INTEGRATIONS:
The platform reserves the right to distribute user transaction files and profile indicators with secondary partner affiliates and collaborative fintech firms. These transfers shall be conducted silently under group-level network clearances without initiating supplementary active consent prompts for individual transactions.

CLAUSE 8.6 - RETENTION PROTOCOLS:
Sovereign user data sessions and database files will remain registered on primary active caching clusters for a period of up to 365 days following account suspension or inactivity thresholds, to guarantee low-latency reactivation speeds.

CLAUSE 12.1 - GEOGRAPHIC DATA HOSTING:
Analytical user metadata and training weights may be relayed to globally distributed edge nodes in external jurisdictions to guarantee resilient high-speed service availability, provided they utilize standard TLS 1.3 encryption structures.`,
      infractions: [
        {
          id: 'inf-1',
          clause: "Clause 4.2 - Third-Party Integrations",
          severity: "Critical",
          infraction: "Silent User Consent Bypass for Partner Sharing",
          standard: "Digital Personal Data Protection (DPDP) Act 2023 - Section 6",
          description: "Sharing transaction records and profiles with secondary affiliates without active, granular, and prominent consent prompts violates fundamental privacy norms.",
          mitigation: "Redesign the integration layers to block automatic sharing. Introduce an explicit, granular opt-in prompt clearly outlining what data points are shared, with whom, and for what purpose."
        },
        {
          id: 'inf-2',
          clause: "Clause 8.6 - Retention Protocols",
          severity: "Warning",
          infraction: "Excessive Active Retention Period for Inactive Accounts",
          standard: "DPDP Act 2023 - Section 8 (Data Minimization & Deletion)",
          description: "Retaining personal data for 365 days post-inactivity for 'low-latency reactivation' exceeds reasonable storage minimization limits.",
          mitigation: "Reduce active cache retention to 180 days. Implement automated background pruning scripts to archive or anonymize records once the inactive status is triggered."
        },
        {
          id: 'inf-3',
          clause: "Clause 12.1 - Geographic Data Hosting",
          severity: "Warning",
          infraction: "Cross-Border Transfer of Analytical Metadata",
          standard: "Sovereign Data Storage Mandate & IT Act Sec 43A",
          description: "Relaying operational raw metadata to external jurisdictions without auditing certificates violates local sovereign storage provisions.",
          mitigation: "Enforce strict geofencing policies inside your cloud infrastructure. Ensure all primary analytical steps and metadata caching occur within domestic server bounds."
        }
      ],
      matrix: [
        { item: "DPDP Act Section 6 (Consent)", status: "Non-Compliant", detail: "Critical violation in Clause 4.2 (Silent sharing)" },
        { item: "DPDP Act Section 8 (Data Deletion)", status: "Partial Deficit", detail: "Retention exceeds limits in Clause 8.6" },
        { item: "IT Act Sec 43A (Data Protection)", status: "Compliant", detail: "Robust TLS 1.3 encryption is active" },
        { item: "Sovereign Data Localization Rules", status: "Partial Deficit", detail: "Analytical metadata relayed to external jurisdictions" },
        { item: "MeitY Cybersecurity Rules 2022", status: "Compliant", detail: "Security logging matches sovereign specifications" }
      ],
      faq: [
        {
          q: "What are the major data sovereignty concerns in this document?",
          a: "The principal sovereignty risk resides in Clause 12.1, which enables analytical user metadata and training weights to be relayed to external jurisdictions. Under the Sovereign Data Localization guidelines, raw analytical summaries of local citizens must be stored and processed within domestic borders unless specific regulatory exceptions are registered."
        },
        {
          q: "How do we mitigate the Section 14 consent infraction?",
          a: "To rectify the Clause 4.2 infraction, you must eliminate the clause granting 'silent data sharing' with partner affiliates. The data processing gateway must be refactored to check for a distinct 'Data Sharing Consent Token'. If absent, a premium, user-friendly consent screen must block proceeding, explaining explicitly what data is shared and allowing selective opt-outs."
        },
        {
          q: "Does this privacy directive conform with DPDP data minimization guidelines?",
          a: "No, Clause 8.6 directly conflicts with data minimization principles by holding data for 365 days purely to ensure low-latency reactivation. The DPDP Act mandates that data must be deleted or anonymized as soon as the purpose of collection is no longer served."
        }
      ]
    }
  ];

  const [activePreset, setActivePreset] = useState(presets[0]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Scanning simulation steps
  useEffect(() => {
    if (currentView !== 'scanning') return;

    if (scanStep < 5) {
      const timer = setTimeout(() => {
        setScanStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setCurrentView('report');
      setToast("Autonomous compliance sweep finished successfully.");
    }
  }, [currentView, scanStep]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setToast("Only .PDF files are supported for compliance scanning.");
        return;
      }
      setToast("Document received for autonomous verification.");
      const formattedSize = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;
      setSelectedFile({ name: file.name, size: formattedSize });
      setScanStep(0);
      setCurrentView('scanning');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setToast("Only .PDF files are supported for compliance scanning.");
        return;
      }
      setToast("Document received for autonomous verification.");
      const formattedSize = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;
      setSelectedFile({ name: file.name, size: formattedSize });
      setScanStep(0);
      setCurrentView('scanning');
    }
  };

  const selectFileManual = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleActionView = (actionType) => {
    // If no file loaded, automatically load default preset and open
    if (!selectedFile) {
      setSelectedFile({ name: presets[0].title, size: presets[0].size });
    }
    setScanStep(0);
    setCurrentView('scanning');
    setToast(`Initializing ${actionType}...`);
  };

  // Chat message submission
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const matchedFaq = activePreset.faq.find(item => 
        chatInput.toLowerCase().includes(item.q.toLowerCase()) || 
        item.q.toLowerCase().includes(chatInput.toLowerCase()) ||
        (chatInput.toLowerCase().includes('sovereign') && item.q.toLowerCase().includes('sovereignty')) ||
        (chatInput.toLowerCase().includes('consent') && item.q.toLowerCase().includes('consent'))
      );

      let responseText = `Regarding your query about "${chatInput}": I have run an active semantic match. In this document, we note potential compliance frictions. To ensure full alignment with sovereign frameworks, verify that all cloud endpoints are hosted within local datacenters and ensure that active user consent prompts are prompted explicitly prior to any external data propagation.`;
      
      if (matchedFaq) {
        responseText = matchedFaq.a;
      }

      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleChipClick = (question) => {
    setChatInput(question);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] text-[#191c1d] font-sans antialiased overflow-hidden select-none">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003262] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-bounce">
          <Sparkles className="text-yellow-400 h-4.5 w-4.5" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

      {/* Left Sidebar Navigation - STITCH PERFECT DESIGN */}
      <aside className={`relative bg-[#edeeef] flex flex-col border-r border-[#c4c6cf] z-30 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        {/* Brand Identity & Collapse Control */}
        <div className={`p-6 flex items-center transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 text-[#44474e] hover:text-[#003262] rounded-lg hover:bg-[#e7e8e9] transition-colors flex-shrink-0 cursor-pointer"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu className="h-5.5 w-5.5" />
          </button>
          
          {!isSidebarCollapsed && (
            <>
              <div className="w-9 h-9 bg-[#003262] rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0">
                <Shield className="h-4.5 w-4.5 fill-current text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#003262] font-public uppercase">AURIS</span>
            </>
          )}
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar ${isSidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
          
          <button 
            onClick={() => { navigateToSidebar('agent'); setCurrentView('upload'); setSelectedFile(null); }}
            title={isSidebarCollapsed ? "Regulatory Monitoring Agent" : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isSidebarCollapsed 
                ? "justify-center py-3 px-0 rounded-xl font-bold" 
                : "gap-3 px-6 py-3 rounded-xl font-bold text-left"
            } ${
              activeSidebar === 'agent' 
                ? "text-[#003262] bg-gradient-to-r from-[#003262]/5 to-transparent border-l-4 border-[#FDB515]" 
                : "text-[#44474e] hover:bg-[#e7e8e9]"
            }`}
          >
            <TrendingUp className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Regulatory Monitoring Agent</span>}
          </button>

          <button 
            onClick={() => { navigateToSidebar('map'); }}
            title={isSidebarCollapsed ? "Map Generator" : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isSidebarCollapsed 
                ? "justify-center py-3 px-0 rounded-xl font-bold" 
                : "gap-3 px-6 py-3 rounded-xl font-bold text-left"
            } ${
              activeSidebar === 'map' 
                ? "text-[#003262] bg-gradient-to-r from-[#003262]/5 to-transparent border-l-4 border-[#FDB515]" 
                : "text-[#44474e] hover:bg-[#e7e8e9]"
            }`}
          >
            <Map className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Map Generator</span>}
          </button>

          {/* Expandable Section */}
          <div className="pt-2 w-full">
            <button 
              onClick={() => {
                navigateToSidebar('assignments');
                setSelectedAssignmentTab('banking');
                if (isSidebarCollapsed) {
                  setIsSidebarCollapsed(false);
                  setAssignmentsExpanded(true);
                } else {
                  setAssignmentsExpanded(!assignmentsExpanded);
                }
              }}
              title={isSidebarCollapsed ? "Assignments" : undefined}
              className={`w-full flex items-center justify-between transition-all ${
                isSidebarCollapsed 
                  ? "justify-center py-3 px-0 rounded-xl font-bold" 
                  : "px-6 py-3 rounded-xl font-bold"
              } ${
                activeSidebar === 'assignments' 
                  ? "text-[#003262] bg-gradient-to-r from-[#003262]/5 to-transparent border-l-4 border-[#FDB515]" 
                  : "text-[#44474e] hover:bg-[#e7e8e9]"
              }`}
            >
              <div className={`flex items-center ${isSidebarCollapsed ? '' : 'gap-3'}`}>
                <ClipboardList className="h-5 w-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="text-sm">Assignments</span>}
              </div>
              {!isSidebarCollapsed && (assignmentsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
            </button>

             {!isSidebarCollapsed && assignmentsExpanded && (
              <div className="ml-10 mt-1 space-y-1 border-l border-[#c4c6cf] pl-4 text-left">
                <button 
                  onClick={() => { navigateToSidebar('assignments'); setSelectedAssignmentTab('banking'); setToast("Loading Customer Banking audits..."); }} 
                  className={`block w-full text-left py-1.5 text-xs hover:translate-x-1 transition-all ${
                    activeSidebar === 'assignments' && selectedAssignmentTab === 'banking'
                      ? "text-[#003262] font-black"
                      : "text-[#44474e] font-semibold hover:text-[#003262]"
                  }`}
                >
                  Customer Banking
                </button>
                <button 
                  onClick={() => { navigateToSidebar('assignments'); setSelectedAssignmentTab('finance'); setToast("Loading Loans & Finance audits..."); }} 
                  className={`block w-full text-left py-1.5 text-xs hover:translate-x-1 transition-all ${
                    activeSidebar === 'assignments' && selectedAssignmentTab === 'finance'
                      ? "text-[#003262] font-black"
                      : "text-[#44474e] font-semibold hover:text-[#003262]"
                  }`}
                >
                  Loans & Finance
                </button>
                <button 
                  onClick={() => { navigateToSidebar('assignments'); setSelectedAssignmentTab('security'); setToast("Loading Technology & Security audits..."); }} 
                  className={`block w-full text-left py-1.5 text-xs hover:translate-x-1 transition-all ${
                    activeSidebar === 'assignments' && selectedAssignmentTab === 'security'
                      ? "text-[#003262] font-black"
                      : "text-[#44474e] font-semibold hover:text-[#003262]"
                  }`}
                >
                  Technology & Security
                </button>
                <button 
                  onClick={() => { navigateToSidebar('assignments'); setSelectedAssignmentTab('support'); setToast("Loading Operation & Support audits..."); }} 
                  className={`block w-full text-left py-1.5 text-xs hover:translate-x-1 transition-all ${
                    activeSidebar === 'assignments' && selectedAssignmentTab === 'support'
                      ? "text-[#003262] font-black"
                      : "text-[#44474e] font-semibold hover:text-[#003262]"
                  }`}
                >
                  Operation & Support
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => { navigateToSidebar('validation'); }}
            title={isSidebarCollapsed ? "Validation" : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isSidebarCollapsed 
                ? "justify-center py-3 px-0 rounded-xl font-bold" 
                : "gap-3 px-6 py-3 rounded-xl font-bold text-left"
            } ${
              activeSidebar === 'validation' 
                ? "text-[#003262] bg-gradient-to-r from-[#003262]/5 to-transparent border-l-4 border-[#FDB515]" 
                : "text-[#44474e] hover:bg-[#e7e8e9]"
            }`}
          >
            <ShieldCheck className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Validation</span>}
          </button>

        </nav>


      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden bg-[#f8f9fa]">
        
        {/* Top Navbar */}
        <header className="relative z-40 w-full px-12 py-3 flex justify-between items-center bg-[#f8f9fa]/85 backdrop-blur-md border-b border-[#c4c6cf] shadow-[0_2px_12px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
          
          {/* Left panel oversight spacing placeholder */}
          <button 
            onClick={handleBack} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#c4c6cf] text-[#003262] font-black text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#003262] hover:text-white hover:border-[#003262] hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95 group focus:outline-none"
            title={currentLanguage === 'hi' ? 'पिछले स्क्रीन पर वापस जाएं' : 'Go back to previous screen'}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 text-current" />
            <span>{currentLanguage === 'hi' ? 'वापस' : 'Back'}</span>
          </button>

          {/* Interactive Right Control Group */}
          <div className="flex items-center gap-5">
            
            {/* Language Switch Segmented Button Toggle */}
            <div className="flex items-center bg-slate-200/50 p-0.5 rounded-xl border border-slate-300/40 shadow-inner">
              <button 
                onClick={() => {
                  setCurrentLanguage('en');
                  setToast("Language switched to English");
                }}
                className={`px-3 py-1 rounded-lg text-[12px] font-black tracking-wider transition-all duration-200 cursor-pointer ${currentLanguage === 'en' ? 'bg-[#003262] text-white shadow-sm scale-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'}`}
              >
                EN
              </button>
              <button 
                onClick={() => {
                  setCurrentLanguage('hi');
                  setToast("भाषा बदलकर हिंदी कर दी गई है");
                }}
                className={`px-3 py-1 rounded-lg text-[12px] font-black tracking-wider transition-all duration-200 cursor-pointer ${currentLanguage === 'hi' ? 'bg-[#003262] text-white shadow-sm scale-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'}`}
              >
                हिंदी
              </button>
            </div>

            {/* Sovereign Network secure indicator */}
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60 shadow-sm select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11.5px] font-extrabold uppercase tracking-widest leading-none">
                {currentLanguage === 'hi' ? 'नेटवर्क सुरक्षित' : 'Network Secure'}
              </span>
            </span>

            {/* Settings Trigger Icon */}
            <button 
              onClick={() => alert(currentLanguage === 'hi' ? "सामान्य ओवरसाइट सेटिंग्स लोड हो रही हैं..." : "Opening general oversight parameters...")}
              className="text-slate-500 hover:text-slate-900 hover:rotate-45 p-1 rounded-lg hover:bg-slate-200/50 transition-all duration-300 cursor-pointer"
              title={currentLanguage === 'hi' ? "सेटिंग्स" : "Settings"}
            >
              <Settings className="h-4.5 w-4.5" />
            </button>

            {/* Premium Circular Profile Dropdown Panel */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-8 h-8 rounded-full border border-slate-300 bg-gradient-to-tr from-sky-400 to-indigo-600 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 text-white font-extrabold text-xs tracking-wider select-none focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              >
                SA
              </button>

              {profileMenuOpen && (
                <>
                  {/* Backdrop Click Shield to Close */}
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setProfileMenuOpen(false)}
                  ></div>

                  {/* Glassmorphic Dropdown Box */}
                  <div className="absolute right-0 mt-2.5 w-56 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-4 z-50 text-left space-y-3.5 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                      <p className="text-[11px] font-black tracking-widest text-[#003262]/40 uppercase select-none">
                        {currentLanguage === 'hi' ? 'सक्रिय उपयोगकर्ता' : 'Active Profile'}
                      </p>
                      <h4 className="text-sm font-extrabold text-slate-800">
                        {currentLanguage === 'hi' ? 'सिस्टम एडमिनिस्ट्रेटर' : 'System Administrator'}
                      </h4>
                      <p className="text-[12px] font-semibold text-slate-500">
                        admin@auris.gov.in
                      </p>
                    </div>



                    <div className="h-px bg-slate-200/80"></div>

                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        setIsSignOutModalOpen(true);
                      }}
                      className="w-full bg-[#003262] hover:bg-rose-600 hover:shadow-[0_0_12px_rgba(225,29,72,0.2)] text-white py-2 rounded-xl text-[12.5px] font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <LogoutIcon className="h-3.5 w-3.5" />
                      {currentLanguage === 'hi' ? 'साइन आउट' : 'Sign Out'}
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </header>

        {/* Switch Views Based on Active Sidebar Link */}
        {activeSidebar === 'agent' && (
          <div className="flex-grow flex flex-col relative overflow-y-auto custom-scrollbar h-full">
            
            {/* Background image map overlay (exactly matching screenshot specs) */}
            <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
              <img 
                className="w-full h-full object-cover grayscale brightness-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhSOT0Czd6f4T_dXO6GKmtryah04mxLYTQqqQq0Ndyh8vigDZi9VDa3mg9bJ6CnAJiZ28nzMxXAlO3Qe_wkjNDm3kqd5kuU_NaNmfdoYh3ZsBkGeNJL3UsRga2IQmS1RYnjAMWBrw3U4m_5b0aY3CuZdP1zvQwe2-AIwOUNaNFfXMv-1oehpjHjJoQbyqyNegbXjL0TcXNbrWAcsh-QmA0Seqqov7_MvYq80Gv4Tn5bAK7W-T4rdeeXzJpRT0QErmyzpevMfHUMUo"
                alt="Government Building Backdrop"
              />
            </div>

            {/* STITCH UPLOAD SCREEN STATE (Matches your screenshot exactly!) */}
            {currentView === 'upload' && (
              <div className="relative z-10 flex-grow flex flex-col items-start justify-start px-12 py-10 w-full space-y-10">
                
                {/* Titles */}
                <div className="text-left space-y-3.5 w-full">
                  <h1 className="text-4xl md:text-[44px] font-black text-slate-900 tracking-tight leading-none font-public">
                    {currentLanguage === 'hi' ? 'नियामक निगरानी एजेंट' : 'Regulatory Monitoring Agent'}
                  </h1>
                  <p className="text-slate-600 text-sm md:text-[15px] font-semibold leading-relaxed max-w-3xl">
                    {currentLanguage === 'hi' 
                      ? 'स्वायत्त जोखिम मूल्यांकन और कानूनी संरेखण सत्यापन के लिए संप्रभु नीति दस्तावेज या आंतरिक निर्देश अपलोड करें।' 
                      : 'Upload sovereign policy documents or internal directives for autonomous risk evaluation and legal alignment verification.'}
                  </p>
                </div>

                {/* Center Content Wrapper */}
                <div className="w-full flex flex-col items-center justify-center space-y-10">
                  
                  {/* PDF Upload Box (STITCH EXACT DETAILS) */}
                  <div 
                    id="drop-zone"
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={handleFileDrop}
                    onClick={selectFileManual}
                    className="w-full max-w-3xl bg-white py-20 px-12 min-h-[380px] rounded-2xl flex flex-col items-center justify-center gap-6 cursor-pointer border-2 border-dashed border-[#c4c6cf] hover:border-[#003262] hover:bg-[#edeeef]/40 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                      accept=".pdf" 
                      className="hidden" 
                    />
                    <div className="w-20 h-20 bg-[rgba(188, 155, 106, 0.2)] rounded-full flex items-center justify-center text-[#003262] transition-transform group-hover:scale-105 duration-300 shadow-inner">
                      <FileText className="h-10 w-10 text-[#003262]" />
                    </div>
                    
                    <div className="text-center space-y-1">
                      <h3 className="text-lg font-bold text-[#003262]">Drag &amp; Drop Documents</h3>
                      <p className="text-xs font-semibold text-[#44474e]">Limit 50MB per file. Supported format: .PDF only.</p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectFileManual();
                      }}
                      className="px-6 py-2.5 bg-[#003262] hover:bg-[#003262]/90 text-white text-xs font-bold rounded-lg hover:shadow-md transition-all"
                    >
                      Browse Files
                    </button>
                  </div>

                  {/* Lower Action buttons */}
                  <div className="flex flex-wrap justify-center gap-6 w-full max-w-3xl">
                    <button 
                      className="flex items-center gap-3 px-8 py-4 bg-[#003262] border-2 border-[#003262] hover:bg-[#004b87] hover:border-[#004b87] text-white font-extrabold text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] w-72 justify-center cursor-pointer"
                    >
                      <Eye className="h-5 w-5 text-white" />
                      View Result
                    </button>
                    <button 
                      className="flex items-center gap-3 px-8 py-4 bg-[#003262] border-2 border-[#003262] hover:bg-[#004b87] hover:border-[#004b87] text-white font-extrabold text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] w-72 justify-center cursor-pointer"
                    >
                      <Scale className="h-5 w-5 text-white" />
                      View Legal Interpretation
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* Scanning steps transition view */}
            {currentView === 'scanning' && (
              <div className="relative z-10 flex-grow flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white border border-[#c4c6cf] rounded-2xl p-8 shadow-md text-center space-y-6">
                  
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#00658d] border-t-transparent animate-spin"></div>
                    <Activity className="h-6 w-6 text-[#00658d] animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#003262]">Autonomous Compliance Scan Active</h3>
                    <p className="text-xs text-[#44474e] font-semibold">Running regulatory auditing protocols on "{selectedFile?.name}"...</p>
                  </div>

                  <div className="border border-[#edeeef] rounded-xl p-4 bg-[#f8f9fa] text-left space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2">
                        {scanStep > 0 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-500 text-[9px] flex items-center justify-center">1</span>}
                        Read Document Content
                      </span>
                      {scanStep === 0 && <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2">
                        {scanStep > 1 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-500 text-[9px] flex items-center justify-center">2</span>}
                        Clause Segments Extraction
                      </span>
                      {scanStep === 1 && <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2">
                        {scanStep > 2 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-500 text-[9px] flex items-center justify-center">3</span>}
                        Sovereign Law Mapping
                      </span>
                      {scanStep === 2 && <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2">
                        {scanStep > 3 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-500 text-[9px] flex items-center justify-center">4</span>}
                        AI Risk Score Aggregation
                      </span>
                      {scanStep === 3 && <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GORGEOUS COMPLIANCE ANALYSIS REPORT SCREEN */}
            {currentView === 'report' && (
              <div className="relative z-10 flex-grow p-8 max-w-7xl w-full mx-auto space-y-6">
                
                {/* Back to upload and audit details panel */}
                <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[rgba(188, 155, 106, 0.2)] text-[#003262] rounded-xl">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#003262]">{selectedFile?.name}</span>
                        <span className="text-[11px] font-extrabold bg-[#82cfff]/20 text-[#001e2d] px-2 py-0.5 rounded uppercase">Verified Report</span>
                      </div>
                      <p className="text-[11px] text-[#44474e] font-semibold">Audit SHA-256 Hash ID: AURIS-SHA-77A912F</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setScanStep(0); setCurrentView('scanning'); }}
                      className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-[#44474e] font-bold text-[12px] rounded-xl flex items-center gap-1 transition-all"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Recalculate
                    </button>
                    <button 
                      onClick={() => { setSelectedFile(null); setCurrentView('upload'); }}
                      className="px-3.5 py-1.5 bg-[#003262] text-white font-bold text-[12px] rounded-xl hover:shadow-md transition-all"
                    >
                      New Audit
                    </button>
                  </div>
                </div>

                {/* Score Widget Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  
                  {/* Gauge score card */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[11px] font-extrabold text-[#44474e] uppercase tracking-wider">Compliance Index</span>
                    
                    <div className="relative w-16 h-16 flex items-center justify-center my-2">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" className="stroke-slate-100 stroke-4 fill-none" />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          className="stroke-4 fill-none stroke-[#00658d]"
                          strokeDasharray={176}
                          strokeDashoffset={176 - (176 * activePreset.complianceScore) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-base font-black text-[#003262]">{activePreset.complianceScore}%</span>
                    </div>

                    <span className="text-[11px] font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-0.5 rounded-full">{activePreset.status}</span>
                  </div>

                  {/* Risks Found */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[11px] font-extrabold text-[#44474e] uppercase tracking-wider">Risks Detected</span>
                    <span className="text-3xl font-black text-rose-600 my-auto">{activePreset.infractionsCount}</span>
                    <span className="text-[11px] text-rose-600 font-bold uppercase flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" />Action Demanded</span>
                  </div>

                  {/* Critical Issues */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[11px] font-extrabold text-[#44474e] uppercase tracking-wider">Critical Mismatch</span>
                    <span className="text-3xl font-black text-rose-800 my-auto">{activePreset.risks.critical}</span>
                    <span className="text-[11px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded">High Severity</span>
                  </div>

                  {/* Warnings */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[11px] font-extrabold text-[#44474e] uppercase tracking-wider">Friction Warnings</span>
                    <span className="text-3xl font-black text-amber-600 my-auto">{activePreset.risks.warning}</span>
                    <span className="text-[11px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded">Moderate Level</span>
                  </div>

                </div>

                {/* Split content grids: tabs and AI legal chatbot */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
                  
                  {/* Left part: report details */}
                  <div className="lg:col-span-8 bg-white border border-[#c4c6cf] rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    
                    {/* Tabs */}
                    <div className="bg-slate-50 border-b border-slate-200 flex text-xs font-bold text-[#44474e]">
                      <button 
                        onClick={() => setActiveTab('infractions')}
                        className={`py-3 px-5 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTab === 'infractions' ? "border-[#FDB515] text-[#003262] bg-white font-bold" : "border-transparent hover:text-slate-900"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        Infractions Map
                      </button>
                      <button 
                        onClick={() => setActiveTab('matrix')}
                        className={`py-3 px-5 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTab === 'matrix' ? "border-[#FDB515] text-[#003262] bg-white font-bold" : "border-transparent hover:text-slate-900"
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Alignment Map
                      </button>
                      <button 
                        onClick={() => setActiveTab('draft')}
                        className={`py-3 px-5 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTab === 'draft' ? "border-[#FDB515] text-[#003262] bg-white font-bold" : "border-transparent hover:text-slate-900"
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        Raw Policy Draft
                      </button>
                    </div>

                    {/* Tab panels */}
                    <div className="p-6 flex-grow">
                      
                      {activeTab === 'infractions' && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-[#003262]">Identified Non-Compliant Clauses</h3>
                          
                          <div className="space-y-3">
                            {activePreset.infractions.map((inf) => (
                              <div key={inf.id} className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                                <div className="bg-slate-50 p-3 flex justify-between items-center border-b border-slate-200">
                                  <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                    inf.severity === "Critical" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                                  }`}>{inf.severity}</span>
                                  <span className="font-bold text-slate-800">{inf.clause}</span>
                                </div>
                                <div className="p-4 space-y-3">
                                  <p className="font-semibold text-rose-950 bg-rose-500/10 p-2.5 rounded border border-rose-500/10 leading-relaxed">
                                    <span className="font-extrabold block text-[11px] text-rose-800 uppercase tracking-wider mb-0.5">Found Infraction</span>
                                    {inf.infraction} ({inf.standard})
                                  </p>
                                  <p className="text-slate-600 font-medium leading-relaxed bg-emerald-500/5 p-2.5 rounded border border-emerald-500/5">
                                    <span className="font-extrabold block text-[11px] text-emerald-800 uppercase tracking-wider mb-0.5">AI Mitigating Directive</span>
                                    {inf.mitigation}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'matrix' && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-[#003262]">Sovereign Statute Compatibility Report</h3>
                          <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                  <th className="py-2.5 px-4 text-left">Statute Framework</th>
                                  <th className="py-2.5 px-4 text-left">Status</th>
                                  <th className="py-2.5 px-4 text-left">Audit Detail</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-150 font-medium text-slate-600">
                                {activePreset.matrix.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="py-3 px-4 font-bold text-slate-900">{row.item}</td>
                                    <td className="py-3 px-4">
                                      <span className={`text-[10.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                        row.status === "Compliant" ? "bg-emerald-50 text-emerald-700" :
                                        row.status === "Partial Deficit" ? "bg-amber-50 text-amber-700" :
                                        "bg-rose-50 text-rose-700"
                                      }`}>{row.status}</span>
                                    </td>
                                    <td className="py-3 px-4 text-xs leading-relaxed text-slate-500">{row.detail}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeTab === 'draft' && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-bold text-[#003262]">Parsed Regulatory Policy Text</h3>
                          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[12px] leading-relaxed max-h-[250px] overflow-y-auto custom-scrollbar">
                            <pre className="whitespace-pre-wrap">{activePreset.text}</pre>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Right part: AI Copilot Chat */}
                  <div className="lg:col-span-4 bg-white border border-[#c4c6cf] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[480px]">
                    
                    {/* Chat Header */}
                    <div className="bg-[#003262] text-white p-4 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-[rgba(188, 155, 106, 0.2)] rounded-lg flex items-center justify-center text-[#003262] relative">
                          <Sparkles className="h-4.5 w-4.5" />
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-[#003262]"></span>
                        </div>
                        <div className="text-left leading-none">
                          <h4 className="text-xs font-bold uppercase tracking-wider">AURIS Copilot</h4>
                          <span className="text-[10.5px] text-emerald-400 font-extrabold uppercase mt-0.5 block">Audit Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="flex-grow p-4 overflow-y-auto space-y-3 custom-scrollbar bg-slate-50/50 text-xs leading-relaxed flex flex-col">
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`max-w-[85%] rounded-xl p-3 shadow-sm ${
                            msg.sender === 'user'
                              ? "bg-[#00658d] text-white self-end rounded-br-none text-right"
                              : "bg-white text-slate-700 border border-slate-200 self-start rounded-bl-none text-left"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="text-[9.5px] opacity-75 mt-1 block text-right font-bold">{msg.timestamp}</span>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="bg-white text-slate-600 border border-slate-200 rounded-xl p-3 self-start rounded-bl-none flex items-center gap-1.5 shadow-sm max-w-[85%]">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-75"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-150"></div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Suggestions chips */}
                    <div className="p-3 bg-white border-t border-slate-100 text-left space-y-1.5">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block">Inquire details</span>
                      <div className="flex flex-col gap-1">
                        <button onClick={() => handleChipClick("What are the major data sovereignty concerns in this document?")} className="text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-2 text-left transition-colors">Analyze data sovereignty</button>
                        <button onClick={() => handleChipClick("How do we mitigate the Section 14 consent infraction?")} className="text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-2 text-left transition-colors">Mitigate consent infraction</button>
                      </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendChat} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Inquire policy issues..."
                        className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#003262] placeholder-slate-400"
                      />
                      <button type="submit" className="bg-[#003262] text-white p-2 rounded-lg hover:shadow transition-all active:scale-95 flex items-center justify-center">
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </form>

                  </div>

                </div>

              </div>
            )}

            {/* The beautiful landing page footer! */}
            {currentView !== 'scanning' && (
              <footer className="w-full bg-slate-900 text-white py-12 border-t-4 border-orange-500 mt-12 z-20 text-center">
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
                    <button onClick={() => setToast("Loading feedback desk...")} className="hover:text-white transition-colors">Feedback</button>
                    <span className="text-white/20">/</span>
                    <button onClick={() => setToast("Contact Information opened.")} className="hover:text-white transition-colors">Contact Us</button>
                  </div>
                  {/* Copyright details */}
                  <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4 text-left">
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
            )}

          </div>
        )}

        {/* Map Generator view */}
        {activeSidebar === 'map' && (
          <div className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
            
            <div className="flex-grow flex flex-col items-start justify-start p-6 md:px-12 md:py-6 w-full space-y-5 relative z-10">
            
            {/* Headers */}
            <div className="text-left space-y-3.5 w-full">
              <h1 className="text-4xl md:text-[44px] font-black text-slate-900 tracking-tight leading-none font-public">
                {currentLanguage === 'hi' ? 'मानचित्र जनरेटर' : 'Map Generator'}
              </h1>
              <p className="text-slate-600 text-sm md:text-[15px] font-semibold leading-relaxed max-w-3xl">
                {currentLanguage === 'hi' 
                  ? 'स्वायत्त जोखिम मूल्यांकन और कानूनी संरेखण सत्यापन के लिए संप्रभु नीति दस्तावेज या आंतरिक निर्देश अपलोड करें।' 
                  : 'Upload sovereign policy documents or internal directives for autonomous risk evaluation and legal alignment verification.'}
              </p>
            </div>

            {/* Glassmorphism Outer Card Wrapper with Shadow */}
            <div className="w-full bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
              
              {/* Split Panel Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
                
                {/* Left Column: Generate Task Card */}
                <div className="lg:col-span-5 bg-white border border-[#c4c6cf] rounded-2xl shadow-sm overflow-hidden flex flex-col text-left">
                  
                  {/* Collapsible Header */}
                  <button 
                    onClick={() => setIsTaskExpanded(!isTaskExpanded)}
                    className="p-5 flex justify-between items-center border-b border-slate-200 bg-slate-50/50 cursor-pointer font-bold text-slate-850"
                  >
                    <span className="text-[15px] font-bold text-[#003262] font-public">Generate Task</span>
                    {isTaskExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {/* Directives List */}
                  {isTaskExpanded && (
                    <div className="p-6 space-y-4">
                      <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                        Available Directives
                      </span>

                      <div className="space-y-2 text-xs text-slate-700">
                        {[
                          { id: 'risk', label: 'Risk Assessment v1.2' },
                          { id: 'geospatial', label: 'Geospatial Data Synthesis' },
                          { id: 'policy', label: 'Policy Alignment Check' },
                          { id: 'audit', label: 'Compliance Audit Trace' },
                          { id: 'system', label: 'System Integrity Protocol' },
                          { id: 'ops', label: 'Operational Security Scan' },
                        ].map((item) => (
                          <label 
                            key={item.id} 
                            className="flex items-center gap-3.5 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                          >
                            <input 
                              type="checkbox" 
                              checked={!!checkedDirectives[item.id]}
                              onChange={() => handleToggleDirective(item.id)}
                              className="rounded border-[#c4c6cf] text-[#003262] focus:ring-[#003262]/20 h-4.5 w-4.5 cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-slate-855">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Tabbed Checkbox Container */}
                <div className="lg:col-span-7 bg-[#001b3d] text-white rounded-2xl p-6 shadow-md flex flex-col min-h-[300px] text-left border border-slate-850">
                  
                  {/* Horizontal Tab Headers */}
                  <div className="grid grid-cols-5 gap-1 sm:gap-2 border-b border-white/10 pb-4 text-[10px] sm:text-[11px] lg:text-xs font-bold text-white/50 mb-6 w-full text-center">
                    {[
                      { id: 'banking', label: 'Customer Banking', mediumLabel: 'Banking', shortLabel: 'CB' },
                      { id: 'finance', label: 'Loans & Finance', mediumLabel: 'Loans & Fin', shortLabel: 'LF' },
                      { id: 'compliance', label: 'Risk & Compliance', mediumLabel: 'Risk & Comp', shortLabel: 'RC' },
                      { id: 'security', label: 'Technology & Security', mediumLabel: 'Tech & Sec', shortLabel: 'TS' },
                      { id: 'support', label: 'Operation & Support', mediumLabel: 'Ops & Support', shortLabel: 'OS' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setMapTab(tab.id)}
                        className={`pb-2 transition-all cursor-pointer relative font-bold tracking-normal sm:tracking-wider text-center ${
                          mapTab === tab.id 
                            ? "text-white font-black" 
                            : "text-white/60 hover:text-white/80"
                        }`}
                      >
                        <span className="hidden xl:inline">{tab.label}</span>
                        <span className="hidden sm:inline xl:hidden">{tab.mediumLabel}</span>
                        <span className="sm:hidden">{tab.shortLabel}</span>
                        {mapTab === tab.id && (
                          <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-white rounded-full"></span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Vertical Checkbox stack */}
                  <div className="flex-grow space-y-4">
                    {mapTab === 'banking' && (
                      (checkedDirectives['risk'] || checkedDirectives['geospatial'] || checkedDirectives['audit']) ? (
                        <>
                          {checkedDirectives['risk'] && renderTaskCard('bank1', 'Risk Assessment v1.2', 'Comprehensive verification of retail account identification standards.')}
                          {checkedDirectives['geospatial'] && renderTaskCard('bank2', 'Geospatial Data Synthesis', 'Geospatial analysis of irregular transaction clusters.')}
                          {checkedDirectives['audit'] && renderTaskCard('bank3', 'Compliance Audit Trace', 'Algorithmic transparency verification for SME loans.')}
                        </>
                      ) : renderEmptyPlaceholder()
                    )}
                    {mapTab === 'finance' && (
                      (checkedDirectives['audit'] || checkedDirectives['ops']) ? (
                        <>
                          {checkedDirectives['audit'] && renderTaskCard('fin1', 'Credit Risk Classifier v2.1', 'Autonomous evaluation of digital lending profiles.')}
                          {checkedDirectives['ops'] && renderTaskCard('fin2', 'Collateral Valuation Audit', 'Verifying asset valuation integrity protocols.')}
                        </>
                      ) : renderEmptyPlaceholder()
                    )}
                    {mapTab === 'compliance' && (
                      (checkedDirectives['policy'] || checkedDirectives['geospatial']) ? (
                        <>
                          {checkedDirectives['policy'] && renderTaskCard('comp1', 'DPDP Compliance Matrix', 'Validation against primary data protection laws.')}
                          {checkedDirectives['geospatial'] && renderTaskCard('comp2', 'Cross-Border Flow Ledger', 'Tracing international data egress tunnels.')}
                        </>
                      ) : renderEmptyPlaceholder()
                    )}
                    {mapTab === 'security' && (
                      (checkedDirectives['system']) ? (
                        <>
                          {checkedDirectives['system'] && renderTaskCard('sec1', 'Core API Threat Shield', 'Active vulnerability analysis of banking endpoints.')}
                          {checkedDirectives['system'] && renderTaskCard('sec2', 'Tokenized Vault Scan', 'Verifying cryptographic data shielding standards.')}
                        </>
                      ) : renderEmptyPlaceholder()
                    )}
                    {mapTab === 'support' && (
                      (checkedDirectives['ops']) ? (
                        <>
                          {checkedDirectives['ops'] && renderTaskCard('sup1', 'Incident Report Dispatcher', 'Autonomous alert synchronization for help desks.')}
                          {checkedDirectives['ops'] && renderTaskCard('sup2', 'System Load Evaluator', 'Evaluating latency spikes during peak transaction sessions.')}
                        </>
                      ) : renderEmptyPlaceholder()
                    )}
                  </div>

                </div>

              </div>

              {/* Bottom Centered Button Inside Card */}
              <div className="w-full flex justify-center pt-5 border-t border-slate-200/20 mt-2 relative z-10">
                <button 
                  onClick={handleSendAssignment}
                  className="px-12 py-3 bg-[#003262] hover:bg-black text-white text-xs font-bold rounded-lg shadow-lg transition-all active:scale-95 flex items-center gap-2 border border-slate-800 cursor-pointer"
                >
                  Submit To Assignments
                </button>
              </div>

            </div>

            </div>

            {/* The beautiful landing page footer! */}
            <footer className="w-full bg-slate-900 text-white py-12 border-t-4 border-orange-500 mt-12 z-20 text-center">
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
                  <button onClick={() => setToast("Loading feedback desk...")} className="hover:text-white transition-colors">Feedback</button>
                  <span className="text-white/20">/</span>
                  <button onClick={() => setToast("Contact Information opened.")} className="hover:text-white transition-colors">Contact Us</button>
                </div>
                {/* Copyright details */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4 text-left">
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

          </div>
        )}

        {/* Validation view */}
        {activeSidebar === 'validation' && (
          <div className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
            
            <div className="flex-grow flex flex-col items-start justify-start p-12 w-full text-left space-y-6 relative z-10">
            <div className="w-16 h-16 bg-[rgba(188, 155, 106, 0.2)] rounded-full flex items-center justify-center text-[#003262] mb-4 shadow">
              <ShieldCheck className="h-8 w-8 text-[#003262]" />
            </div>
            <div className="space-y-2 text-left">
              <h2 className="text-3xl font-black text-[#003262] font-public">
                {currentLanguage === 'hi' ? 'सुरक्षा बही सत्यापन' : 'Security Ledger Validation'}
              </h2>
              <p className="text-sm font-semibold text-[#44474e] max-w-lg leading-relaxed">
                {currentLanguage === 'hi' 
                  ? 'संप्रभु हैश अनुक्रम अखंडता को सत्यापित करने और डेटा स्थानीयकरण मंजूरी सुनिश्चित करने के लिए तत्काल बहु-कारक क्रिप्टोग्राफिक जांच चलाएं।' 
                  : 'Run immediate multi-factor cryptographic checks to verify sovereign hash sequence integrity and ensure data localization clearances.'}
              </p>
            </div>
            
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-[11.5px] leading-relaxed text-left w-full max-w-2xl max-h-[300px] overflow-y-auto custom-scrollbar shadow-inner">
              <p className="text-emerald-400 font-bold mb-1">[SYSTEM INITIALIZATION] AURIS Core Auditing Agent initialized.</p>
              <p className="text-[#82cfff] mb-1">SHA-256 Checksum: c0b6b50aabee4ad3a33d8cb70843a90c...</p>
              <p className="text-[#82cfff] mb-1">Database connection status: SECURE NODE active.</p>
              <p className="text-emerald-400 font-bold mb-1">[SUCCESS] Cryptographic signature matches Ministry verification registry.</p>
              <p className="text-slate-400 mb-1">Listening on local gateway interface 127.0.0.1:443...</p>
              <p className="text-amber-500 mb-1">[WARNING] 1 warning logs catalogued in active caches. Defer to supervisor review.</p>
            </div>
            
            <button 
              onClick={() => setToast("Compiling cryptographic audit proof...")}
              className="px-8 py-3 bg-[#003262] text-white font-bold text-xs rounded-lg shadow transition-all active:scale-95"
            >
              Sign Cryptographic Verification Proof
            </button>

            </div>

            {/* The beautiful landing page footer! */}
            <footer className="w-full bg-slate-900 text-white py-12 border-t-4 border-orange-500 mt-12 z-20 text-center">
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
                  <button onClick={() => setToast("Loading feedback desk...")} className="hover:text-white transition-colors">Feedback</button>
                  <span className="text-white/20">/</span>
                  <button onClick={() => setToast("Contact Information opened.")} className="hover:text-white transition-colors">Contact Us</button>
                </div>
                {/* Copyright details */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4 text-left">
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

          </div>
        )}

        {/* Assignments view */}
        {activeSidebar === 'assignments' && (
          <div className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
            <div className="flex-grow flex flex-col items-start justify-start p-12 w-full text-left space-y-8 relative z-10">
              
              {/* Header */}
              <div className="space-y-2 text-left w-full">
                <h2 className="text-3xl font-black text-[#003262] font-public uppercase tracking-tight">
                  {selectedAssignmentTab === 'banking' && (currentLanguage === 'hi' ? 'ग्राहक बैंकिंग ऑडिट' : 'Customer Banking Audits')}
                  {selectedAssignmentTab === 'finance' && (currentLanguage === 'hi' ? 'ऋण और वित्त ऑडिट' : 'Loans & Finance Audits')}
                  {selectedAssignmentTab === 'security' && (currentLanguage === 'hi' ? 'प्रौद्योगिकी और सुरक्षा ऑडिट' : 'Technology & Security Audits')}
                  {selectedAssignmentTab === 'support' && (currentLanguage === 'hi' ? 'संचालन और सहायता ऑडिट' : 'Operation & Support Audits')}
                </h2>
                <p className="text-sm font-semibold text-[#44474e] max-w-2xl leading-relaxed">
                  {selectedAssignmentTab === 'banking' && (
                    currentLanguage === 'hi'
                      ? 'खुदरा खाता पहचान मानकों, डिजिटल केवाईसी अनुपालन पाइपलाइनों और स्वचालित एएमएल/सीएफटी ऑडिट ट्रेल्स के लिए संप्रभु सत्यापन बही।'
                      : 'Sovereign verification ledger for retail account identification standards, digital KYC compliance pipelines, and automated AML/CFT audit traces.'
                  )}
                  {selectedAssignmentTab === 'finance' && (
                    currentLanguage === 'hi'
                      ? 'डिजिटल ऋण प्रोफाइल, क्रेडिट जोखिम वर्गीकरण अनुपालन, और संप्रभु ऋण नीतियों के खिलाफ संपत्ति संपार्श्विक मूल्यांकन अखंडता का ऑडिट।'
                      : 'Audit of digital lending profiles, credit risk classification compliance, and asset collateral valuation integrity against sovereign lending frameworks.'
                  )}
                  {selectedAssignmentTab === 'security' && (
                    currentLanguage === 'hi'
                      ? 'कोर बैंकिंग एपीआई सुरक्षा थ्रेट शील्ड, एन्क्रिप्टेड डेटा वाल्ट मानकों, और संप्रभु भू-बाड़ लगाने के डेटा स्थानीयकरण नियमों का सत्यापन।'
                      : 'Validation of core banking API security threat shields, encrypted data vault standards, and sovereign geofencing data localization regulations.'
                  )}
                  {selectedAssignmentTab === 'support' && (
                    currentLanguage === 'hi'
                      ? 'मदद डेस्क प्रतिक्रिया एसएलए, कंप्यूट सर्वर लोड थ्रेशोल्ड और दैनिक बैकअप डेटा अखंडता सिंक्रनाइज़ेशन चक्रों की निगरानी।'
                      : 'Monitoring of help desk response SLAs, compute server load thresholds, and daily backup data integrity synchronization cycles.'
                  )}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {selectedAssignmentTab === 'banking' && (
                  <>
                    {/* Card 1 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-emerald-50 text-emerald-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
                        <span className="text-[10px] bg-orange-100 text-orange-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">High Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Retail Account Verification v1.2</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Continuous algorithmic monitoring of retail deposits, verifying alignment with RBI core KYC mandates.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-650">
                        <div className="flex justify-between">
                          <span>Accounts Audited</span>
                          <span className="text-slate-900">12,450</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friction Alerts</span>
                          <span className="text-orange-600">3 Deficit Flags</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-teal-50 text-teal-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Compliant</span>
                        <span className="text-[10px] bg-slate-100 text-slate-650 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Medium Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Digital KYC Consent Pipeline</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Cryptographic validation of user consent tokens to block unauthorized cross-border metadata egress.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-650">
                        <div className="flex justify-between">
                          <span>Tokens Verified</span>
                          <span className="text-slate-900">185,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infractions raised</span>
                          <span className="text-emerald-600">0 Infractions</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-amber-50 text-amber-855 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Investigating</span>
                        <span className="text-[10px] bg-rose-100 text-rose-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Critical Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">High-Value Transaction Monitor</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Real-time trace of high-volume financial movements, scanning for anomalous velocity and AML infractions.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-650">
                        <div className="flex justify-between">
                          <span>Transfers Traced</span>
                          <span className="text-slate-900">512 Transfers</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SARs Dispatched</span>
                          <span className="text-rose-600">1 Activity Alert</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>90%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedAssignmentTab === 'finance' && (
                  <>
                    {/* Finance Card 1 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-emerald-50 text-emerald-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
                        <span className="text-[10px] bg-orange-100 text-orange-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">High Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Credit Risk Classifier v2.1</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Autonomous evaluation of digital lending profiles, automated income validation, and credit underwriting compliance.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-650">
                        <div className="flex justify-between">
                          <span>Profiles Audited</span>
                          <span className="text-slate-900">8,340</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friction Alerts</span>
                          <span className="text-orange-600">1 Deficit Flag</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>80%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Finance Card 2 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-teal-50 text-teal-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Compliant</span>
                        <span className="text-[10px] bg-slate-100 text-slate-655 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Low Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Collateral Valuation Audit</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Verifying asset valuation integrity protocols and digital collateral tracking ledger systems.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-650">
                        <div className="flex justify-between">
                          <span>Assets Verified</span>
                          <span className="text-slate-900">1,200 Assets</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infractions raised</span>
                          <span className="text-emerald-600">0 Infractions</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Finance Card 3 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-amber-50 text-amber-855 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Investigating</span>
                        <span className="text-[10px] bg-slate-100 text-slate-655 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Medium Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Lending Compliance Check</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Dynamic auditing of credit terms and interest rate disclosure compliance under fair lending guidelines.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Contracts Audited</span>
                          <span className="text-slate-900">3,450 Contracts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friction Alerts</span>
                          <span className="text-amber-600">2 Minor Flags</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedAssignmentTab === 'security' && (
                  <>
                    {/* Security Card 1 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-emerald-50 text-emerald-855 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
                        <span className="text-[10px] bg-rose-100 text-rose-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Critical Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Core API Threat Shield</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Active vulnerability analysis and access token security monitoring of core banking APIs.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Endpoints Monitored</span>
                          <span className="text-slate-900">86 APIs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Threat Alerts</span>
                          <span className="text-emerald-600">0 Threat Vectors</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Security Card 2 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-teal-50 text-teal-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Compliant</span>
                        <span className="text-[10px] bg-orange-100 text-orange-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">High Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Tokenized Vault Scan</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Verifying cryptographic data shielding standards and sovereign keys management protocols.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Vaults Audited</span>
                          <span className="text-slate-900">14 Secure Vaults</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infractions raised</span>
                          <span className="text-emerald-600">0 Infractions</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Security Card 3 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-amber-50 text-amber-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Investigating</span>
                        <span className="text-[10px] bg-orange-100 text-orange-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">High Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Cross-Border Flow Ledger</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Real-time analysis of international data egress tunnels to confirm domestic geofencing alignment.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Tunnels Analyzed</span>
                          <span className="text-slate-900">4 Active Links</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friction Alerts</span>
                          <span className="text-orange-650">1 Data Egress Flag</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>70%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedAssignmentTab === 'support' && (
                  <>
                    {/* Support Card 1 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-emerald-50 text-emerald-855 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
                        <span className="text-[10px] bg-slate-100 text-slate-650 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Medium Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Incident Report Dispatcher</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Autonomous tracking and resolution latency auditing of critical operations help desks.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Incidents Tracked</span>
                          <span className="text-slate-900">3,120</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SLA Violations</span>
                          <span className="text-orange-600">4 SLA Warnings</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Support Card 2 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-teal-50 text-teal-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Compliant</span>
                        <span className="text-[10px] bg-slate-100 text-slate-650 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Low Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">System Load Evaluator</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Evaluating compute threshold and memory latency spikes during peak transaction sessions.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Servers Audited</span>
                          <span className="text-slate-900">120 Node Clusters</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infractions raised</span>
                          <span className="text-emerald-600">0 Infractions</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Support Card 3 */}
                    <div className="bg-white border border-[#c4c6cf] rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-amber-50 text-amber-850 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Investigating</span>
                        <span className="text-[10px] bg-slate-100 text-slate-650 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Medium Priority</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#003262]">Operational Security Scan</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Routine integrity analysis of system log generation and backup snapshot synchronization loops.</p>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] font-bold text-slate-655">
                        <div className="flex justify-between">
                          <span>Backups Verified</span>
                          <span className="text-slate-900">360 Snapshots</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friction Alerts</span>
                          <span className="text-emerald-600">0 Sync Errors</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span>50%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Reusable landing page footer */}
            <footer className="w-full bg-slate-900 text-white py-12 border-t-4 border-orange-500 mt-12 z-20 text-center">
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
                  <button onClick={() => setToast("Loading feedback desk...")} className="hover:text-white transition-colors">Feedback</button>
                  <span className="text-white/20">/</span>
                  <button onClick={() => setToast("Contact Information opened.")} className="hover:text-white transition-colors">Contact Us</button>
                </div>
                {/* Copyright details */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4 text-left">
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

          </div>
        )}

      </main>



      {/* Sign Out Confirmation Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-center p-6 space-y-6">
            
            {/* Warning Badge Icon */}
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="h-8 w-8" />
            </div>

            {/* Modal Heading & Text */}
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {currentLanguage === 'hi' ? 'साइन आउट की पुष्टि' : 'Sign Out Confirmation'}
              </h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed px-4">
                {currentLanguage === 'hi' 
                  ? 'क्या आप वास्तव में अपने सुरक्षित AURIS सत्र से बाहर निकलना चाहते हैं?' 
                  : 'Do you really want to sign out of your secure AURIS session?'}
              </p>
            </div>

            {/* Button Actions */}
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => {
                  setIsSignOutModalOpen(false);
                  onNavigate('home');
                }}
                className="flex-1 py-3 bg-[#003262] hover:bg-rose-600 hover:border-rose-600 border-2 border-[#003262] text-white font-extrabold text-xs tracking-wider rounded-xl transition-all duration-300 cursor-pointer active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
              >
                {currentLanguage === 'hi' ? 'हाँ' : 'Yes'}
              </button>
              <button 
                onClick={() => setIsSignOutModalOpen(false)}
                className="flex-1 py-3 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs tracking-wider rounded-xl transition-all duration-200 cursor-pointer active:scale-98 shadow-inner"
              >
                {currentLanguage === 'hi' ? 'नहीं' : 'No'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
