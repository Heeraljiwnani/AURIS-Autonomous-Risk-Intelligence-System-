import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  TrendingUp,
  Map,
  ClipboardList,
  ChevronDown,
  ChevronUp,
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
  LogOut as LogoutIcon
} from 'lucide-react';

export default function RegulatoryDashboard({ onNavigate }) {
  // Sidebar state
  const [activeSidebar, setActiveSidebar] = useState('agent'); // 'agent' | 'map' | 'validation'
  const [assignmentsExpanded, setAssignmentsExpanded] = useState(true);
  
  // Dashboard workflow views
  const [currentView, setCurrentView] = useState('upload'); // 'upload' | 'scanning' | 'report'
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanStep, setScanStep] = useState(0);
  const [activeTab, setActiveTab] = useState('infractions');
  
  // Map Generator states
  const [mapTab, setMapTab] = useState('banking');
  const [isTaskExpanded, setIsTaskExpanded] = useState(true);
  const [checkedDirectives, setCheckedDirectives] = useState({});
  const [checkedTasks, setCheckedTasks] = useState({});

  const handleToggleDirective = (id) => {
    setCheckedDirectives(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleTask = (id) => {
    setCheckedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendAssignment = () => {
    const totalSelected = Object.values(checkedDirectives).filter(Boolean).length + 
                         Object.values(checkedTasks).filter(Boolean).length;
    if (totalSelected === 0) {
      setToast("Please select at least one directive or task to assign.");
    } else {
      setToast(`Successfully assigned ${totalSelected} items to digital oversight desks.`);
      setCheckedDirectives({});
      setCheckedTasks({});
    }
  };

  const renderTaskCard = (id, title, desc) => (
    <label 
      key={id}
      className={`block p-4 rounded-xl border transition-all cursor-pointer ${
        checkedTasks[id] 
          ? "bg-white/15 border-white/30" 
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          checked={!!checkedTasks[id]}
          onChange={() => handleToggleTask(id)}
          className="mt-1 rounded border-white/30 text-white focus:ring-offset-0 focus:ring-0 h-4.5 w-4.5 cursor-pointer bg-transparent"
        />
        <div className="space-y-1">
          <span className="text-sm font-bold block leading-none text-white">{title}</span>
          <p className="text-[11px] text-white/70 font-semibold leading-relaxed">{desc}</p>
        </div>
      </div>
    </label>
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
    setToast("Document received for autonomous verification.");
    setSelectedFile({ name: "Uploaded_Policy_Charter.pdf", size: "1.2 MB" });
    setScanStep(0);
    setCurrentView('scanning');
  };

  const selectFileManual = () => {
    setToast("Preset file loaded for autonomous audit.");
    setSelectedFile({ name: presets[0].title, size: presets[0].size });
    setScanStep(0);
    setCurrentView('scanning');
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
        <div className="fixed bottom-6 right-6 z-50 bg-[#000a1e] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-bounce">
          <Sparkles className="text-yellow-400 h-4.5 w-4.5" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

      {/* Left Sidebar Navigation - STITCH PERFECT DESIGN */}
      <aside className="w-72 bg-[#edeeef] flex flex-col border-r border-[#c4c6cf] z-30">
        
        {/* Brand Identity */}
        <div className="p-6 flex items-center gap-2">
          <img 
            alt="Ashoka Emblem" 
            className="h-9 w-auto object-contain filter drop-shadow-sm" 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
          />
          <div className="w-9 h-9 bg-[#000a1e] rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Shield className="h-4.5 w-4.5 fill-current text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#000a1e] font-public uppercase">AURIS</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          
          <button 
            onClick={() => { setActiveSidebar('agent'); setCurrentView('upload'); setSelectedFile(null); }}
            className={`w-full flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-200 text-left ${
              activeSidebar === 'agent' 
                ? "text-[#000a1e] bg-gradient-to-r from-[#000a1e]/5 to-transparent border-l-4 border-[#000a1e]" 
                : "text-[#44474e] hover:bg-[#e7e8e9]"
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Regulatory Monitoring Agent</span>
          </button>

          <button 
            onClick={() => { setActiveSidebar('map'); }}
            className={`w-full flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-200 text-left ${
              activeSidebar === 'map' 
                ? "text-[#000a1e] bg-gradient-to-r from-[#000a1e]/5 to-transparent border-l-4 border-[#000a1e]" 
                : "text-[#44474e] hover:bg-[#e7e8e9]"
            }`}
          >
            <Map className="h-5 w-5" />
            <span className="text-sm">Map Generator</span>
          </button>

          {/* Expandable Section */}
          <div className="pt-2">
            <button 
              onClick={() => setAssignmentsExpanded(!assignmentsExpanded)}
              className="w-full flex items-center justify-between px-6 py-3 rounded-xl font-bold text-[#44474e] hover:bg-[#e7e8e9] transition-all"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5" />
                <span className="text-sm">Assignments</span>
              </div>
              {assignmentsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {assignmentsExpanded && (
              <div className="ml-10 mt-1 space-y-1 border-l border-[#c4c6cf] pl-4 text-left">
                <button onClick={() => setToast("Loading Customer Banking audits...")} className="block w-full text-left py-1.5 text-xs text-[#44474e] font-semibold hover:text-[#000a1e] hover:translate-x-1 transition-all">Customer Banking</button>
                <button onClick={() => setToast("Loading Loans & Finance audits...")} className="block w-full text-left py-1.5 text-xs text-[#44474e] font-semibold hover:text-[#000a1e] hover:translate-x-1 transition-all">Loans & Finance</button>
                <button onClick={() => setToast("Loading Technology & Security audits...")} className="block w-full text-left py-1.5 text-xs text-[#44474e] font-semibold hover:text-[#000a1e] hover:translate-x-1 transition-all">Technology & Security</button>
                <button onClick={() => setToast("Loading Operation & Support audits...")} className="block w-full text-left py-1.5 text-xs text-[#44474e] font-semibold hover:text-[#000a1e] hover:translate-x-1 transition-all">Operation & Support</button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setActiveSidebar('validation')}
            className={`w-full flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-200 text-left ${
              activeSidebar === 'validation' 
                ? "text-[#000a1e] bg-gradient-to-r from-[#000a1e]/5 to-transparent border-l-4 border-[#000a1e]" 
                : "text-[#44474e] hover:bg-[#e7e8e9]"
            }`}
          >
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm">Validation</span>
          </button>

        </nav>

        {/* Bottom Profile Info */}
        <div className="p-6 border-t border-[#c4c6cf] bg-[#f3f4f5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#82cfff]/30 text-[#001e2d] flex items-center justify-center font-bold">
              SA
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#000a1e] leading-none">System Admin</p>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#44474e] mt-1">Active Oversight</p>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('login')}
            title="Sign Out"
            className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <LogoutIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden bg-[#f8f9fa]">
        
        {/* Top Navbar */}
        <header className="relative z-10 w-full px-12 py-3 flex justify-between items-center bg-[#f8f9fa]/80 backdrop-blur-md border-b border-[#c4c6cf]">
          <div className="flex items-center gap-2 text-[#44474e] font-bold text-xs">
            <Scale className="h-4 w-4" />
            <span>Intelligence Oversight Panel</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[9px] font-bold uppercase tracking-widest">Network Secure</span>
            </span>

            <button 
              onClick={() => alert("Opening general oversight parameters...")}
              className="text-[#44474e] hover:text-[#000a1e] transition-colors"
            >
              <Settings className="h-4.5 w-4.5" />
            </button>
          </div>
        </header>

        {/* Switch Views Based on Active Sidebar Link */}
        {activeSidebar === 'agent' && (
          <div className="flex-grow flex flex-col relative">
            
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
              <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto w-full space-y-10">
                
                {/* Titles */}
                <div className="text-center space-y-3.5">
                  <span className="text-[#00658d] font-bold text-xs tracking-[0.2em] uppercase block">
                    Autonomous Unified Risk Intelligence System
                  </span>
                  <h1 className="text-4xl md:text-[44px] font-black text-slate-900 tracking-tight leading-none font-public">
                    Regulatory Monitoring Agent
                  </h1>
                  <p className="text-slate-600 text-sm md:text-[15px] font-semibold leading-relaxed max-w-3xl mx-auto">
                    Upload sovereign policy documents or internal directives for autonomous risk evaluation and legal alignment verification.
                  </p>
                </div>

                {/* PDF Upload Box (STITCH EXACT DETAILS) */}
                <div 
                  id="drop-zone"
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDrop={handleFileDrop}
                  onClick={selectFileManual}
                  className="w-full max-w-3xl bg-white py-20 px-12 min-h-[380px] rounded-2xl flex flex-col items-center justify-center gap-6 cursor-pointer border-2 border-dashed border-[#c4c6cf] hover:border-[#000a1e] hover:bg-[#edeeef]/40 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm group"
                >
                  <div className="w-20 h-20 bg-[#d6e3ff] rounded-full flex items-center justify-center text-[#000a1e] transition-transform group-hover:scale-105 duration-300 shadow-inner">
                    <FileText className="h-10 w-10 text-[#000a1e]" />
                  </div>
                  
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-[#000a1e]">Drag &amp; Drop Documents</h3>
                    <p className="text-xs font-semibold text-[#44474e]">Limit 50MB per file. Supported format: .PDF only.</p>
                  </div>
                  
                  <button className="px-6 py-2.5 bg-[#000a1e] hover:bg-[#000a1e]/90 text-white text-xs font-bold rounded-lg hover:shadow-md transition-all">
                    Browse Files
                  </button>
                </div>

                {/* Lower Action buttons */}
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-2xl">
                  <button 
                    onClick={() => handleActionView('Direct Compliance Analysis')}
                    className="flex items-center gap-2.5 px-8 py-3.5 bg-[#000a1e] hover:bg-[#000a1e]/90 text-white font-bold text-xs rounded-lg hover:shadow-md transition-all active:scale-95 w-64 justify-center"
                  >
                    <Eye className="h-4.5 w-4.5" />
                    View Result
                  </button>
                  <button 
                    onClick={() => handleActionView('Legal Interpretation Framework')}
                    className="flex items-center gap-2.5 px-8 py-3.5 bg-white border-2 border-[#000a1e] text-[#000a1e] font-bold text-xs rounded-lg hover:bg-[#d6e3ff]/40 transition-all active:scale-95 w-64 justify-center"
                  >
                    <Scale className="h-4.5 w-4.5" />
                    View Legal Interpretation
                  </button>
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
                    <h3 className="text-lg font-bold text-[#000a1e]">Autonomous Compliance Scan Active</h3>
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
              <div className="relative z-10 flex-grow overflow-y-auto p-8 max-w-7xl w-full mx-auto space-y-6 custom-scrollbar">
                
                {/* Back to upload and audit details panel */}
                <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#d6e3ff] text-[#000a1e] rounded-xl">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#000a1e]">{selectedFile?.name}</span>
                        <span className="text-[10px] font-extrabold bg-[#82cfff]/20 text-[#001e2d] px-2 py-0.5 rounded uppercase">Verified Report</span>
                      </div>
                      <p className="text-[10px] text-[#44474e] font-semibold">Audit SHA-256 Hash ID: AURIS-SHA-77A912F</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setScanStep(0); setCurrentView('scanning'); }}
                      className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-[#44474e] font-bold text-[11px] rounded-xl flex items-center gap-1 transition-all"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Recalculate
                    </button>
                    <button 
                      onClick={() => { setSelectedFile(null); setCurrentView('upload'); }}
                      className="px-3.5 py-1.5 bg-[#000a1e] text-white font-bold text-[11px] rounded-xl hover:shadow-md transition-all"
                    >
                      New Audit
                    </button>
                  </div>
                </div>

                {/* Score Widget Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  
                  {/* Gauge score card */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[10px] font-extrabold text-[#44474e] uppercase tracking-wider">Compliance Index</span>
                    
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
                      <span className="absolute text-base font-black text-[#000a1e]">{activePreset.complianceScore}%</span>
                    </div>

                    <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-0.5 rounded-full">{activePreset.status}</span>
                  </div>

                  {/* Risks Found */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[10px] font-extrabold text-[#44474e] uppercase tracking-wider">Risks Detected</span>
                    <span className="text-3xl font-black text-rose-600 my-auto">{activePreset.infractionsCount}</span>
                    <span className="text-[10px] text-rose-600 font-bold uppercase flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" />Action Demanded</span>
                  </div>

                  {/* Critical Issues */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[10px] font-extrabold text-[#44474e] uppercase tracking-wider">Critical Mismatch</span>
                    <span className="text-3xl font-black text-rose-800 my-auto">{activePreset.risks.critical}</span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded">High Severity</span>
                  </div>

                  {/* Warnings */}
                  <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between min-h-[150px]">
                    <span className="text-[10px] font-extrabold text-[#44474e] uppercase tracking-wider">Friction Warnings</span>
                    <span className="text-3xl font-black text-amber-600 my-auto">{activePreset.risks.warning}</span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded">Moderate Level</span>
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
                          activeTab === 'infractions' ? "border-[#000a1e] text-[#000a1e] bg-white font-bold" : "border-transparent hover:text-slate-900"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        Infractions Map
                      </button>
                      <button 
                        onClick={() => setActiveTab('matrix')}
                        className={`py-3 px-5 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTab === 'matrix' ? "border-[#000a1e] text-[#000a1e] bg-white font-bold" : "border-transparent hover:text-slate-900"
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Alignment Map
                      </button>
                      <button 
                        onClick={() => setActiveTab('draft')}
                        className={`py-3 px-5 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTab === 'draft' ? "border-[#000a1e] text-[#000a1e] bg-white font-bold" : "border-transparent hover:text-slate-900"
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
                          <h3 className="text-sm font-bold text-[#000a1e]">Identified Non-Compliant Clauses</h3>
                          
                          <div className="space-y-3">
                            {activePreset.infractions.map((inf) => (
                              <div key={inf.id} className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                                <div className="bg-slate-50 p-3 flex justify-between items-center border-b border-slate-200">
                                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                    inf.severity === "Critical" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                                  }`}>{inf.severity}</span>
                                  <span className="font-bold text-slate-800">{inf.clause}</span>
                                </div>
                                <div className="p-4 space-y-3">
                                  <p className="font-semibold text-rose-950 bg-rose-500/10 p-2.5 rounded border border-rose-500/10 leading-relaxed">
                                    <span className="font-extrabold block text-[9.5px] text-rose-800 uppercase tracking-wider mb-0.5">Found Infraction</span>
                                    {inf.infraction} ({inf.standard})
                                  </p>
                                  <p className="text-slate-600 font-medium leading-relaxed bg-emerald-500/5 p-2.5 rounded border border-emerald-500/5">
                                    <span className="font-extrabold block text-[9.5px] text-emerald-800 uppercase tracking-wider mb-0.5">AI Mitigating Directive</span>
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
                          <h3 className="text-sm font-bold text-[#000a1e]">Sovereign Statute Compatibility Report</h3>
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
                                      <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                        row.status === "Compliant" ? "bg-emerald-50 text-emerald-700" :
                                        row.status === "Partial Deficit" ? "bg-amber-50 text-amber-700" :
                                        "bg-rose-50 text-rose-700"
                                      }`}>{row.status}</span>
                                    </td>
                                    <td className="py-3 px-4 text-[11px] leading-relaxed text-slate-500">{row.detail}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeTab === 'draft' && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-bold text-[#000a1e]">Parsed Regulatory Policy Text</h3>
                          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[10px] leading-relaxed max-h-[250px] overflow-y-auto custom-scrollbar">
                            <pre className="whitespace-pre-wrap">{activePreset.text}</pre>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Right part: AI Copilot Chat */}
                  <div className="lg:col-span-4 bg-white border border-[#c4c6cf] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[480px]">
                    
                    {/* Chat Header */}
                    <div className="bg-[#000a1e] text-white p-4 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-[#d6e3ff] rounded-lg flex items-center justify-center text-[#000a1e] relative">
                          <Sparkles className="h-4.5 w-4.5" />
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-[#000a1e]"></span>
                        </div>
                        <div className="text-left leading-none">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider">AURIS Copilot</h4>
                          <span className="text-[8px] text-emerald-400 font-extrabold uppercase mt-0.5 block">Audit Active</span>
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
                          <span className="text-[7.5px] opacity-75 mt-1 block text-right font-bold">{msg.timestamp}</span>
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
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block">Inquire details</span>
                      <div className="flex flex-col gap-1">
                        <button onClick={() => handleChipClick("What are the major data sovereignty concerns in this document?")} className="text-[9px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-2 text-left transition-colors">Analyze data sovereignty</button>
                        <button onClick={() => handleChipClick("How do we mitigate the Section 14 consent infraction?")} className="text-[9px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-2 text-left transition-colors">Mitigate consent infraction</button>
                      </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendChat} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Inquire policy issues..."
                        className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#000a1e] placeholder-slate-400"
                      />
                      <button type="submit" className="bg-[#000a1e] text-white p-2 rounded-lg hover:shadow transition-all active:scale-95 flex items-center justify-center">
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </form>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* Map Generator view */}
        {activeSidebar === 'map' && (
          <div className="relative z-10 flex-grow flex flex-col items-center justify-start p-6 md:p-12 w-full max-w-7xl mx-auto space-y-10 overflow-y-auto custom-scrollbar h-full">
            
            {/* Headers */}
            <div className="text-center space-y-3.5">
              <span className="text-[#00658d] font-bold text-xs tracking-[0.2em] uppercase block">
                Autonomous Unified Risk Intelligence System
              </span>
              <h1 className="text-4xl md:text-[44px] font-black text-slate-900 tracking-tight leading-none font-public">
                Map Generator
              </h1>
              <p className="text-slate-600 text-sm md:text-[15px] font-semibold leading-relaxed max-w-3xl mx-auto">
                Upload sovereign policy documents or internal directives for autonomous risk evaluation and legal alignment verification.
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
                    <span className="text-[15px] font-bold text-[#000a1e] font-public">Generate Task</span>
                    {isTaskExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {/* Directives List */}
                  {isTaskExpanded && (
                    <div className="p-6 space-y-4">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
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
                              className="rounded border-[#c4c6cf] text-[#000a1e] focus:ring-[#000a1e]/20 h-4.5 w-4.5 cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-slate-855">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Tabbed Checkbox Container */}
                <div className="lg:col-span-7 bg-[#001b3d] text-white rounded-2xl p-6 shadow-md flex flex-col min-h-[440px] text-left border border-slate-850">
                  
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
                      <>
                        {renderTaskCard('bank1', 'Risk Assessment v1.2', 'Comprehensive verification of retail account identification standards.')}
                        {renderTaskCard('bank2', 'Geospatial Data Synthesis', 'Geospatial analysis of irregular transaction clusters.')}
                        {renderTaskCard('bank3', 'Compliance Audit Trace', 'Algorithmic transparency verification for SME loans.')}
                      </>
                    )}
                    {mapTab === 'finance' && (
                      <>
                        {renderTaskCard('fin1', 'Credit Risk Classifier v2.1', 'Autonomous evaluation of digital lending profiles.')}
                        {renderTaskCard('fin2', 'Collateral Valuation Audit', 'Verifying asset valuation integrity protocols.')}
                      </>
                    )}
                    {mapTab === 'compliance' && (
                      <>
                        {renderTaskCard('comp1', 'DPDP Compliance Matrix', 'Validation against primary data protection laws.')}
                        {renderTaskCard('comp2', 'Cross-Border Flow Ledger', 'Tracing international data egress tunnels.')}
                      </>
                    )}
                    {mapTab === 'security' && (
                      <>
                        {renderTaskCard('sec1', 'Core API Threat Shield', 'Active vulnerability analysis of banking endpoints.')}
                        {renderTaskCard('sec2', 'Tokenized Vault Scan', 'Verifying cryptographic data shielding standards.')}
                      </>
                    )}
                    {mapTab === 'support' && (
                      <>
                        {renderTaskCard('sup1', 'Incident Report Dispatcher', 'Autonomous alert synchronization for help desks.')}
                        {renderTaskCard('sup2', 'System Load Evaluator', 'Evaluating latency spikes during peak transaction sessions.')}
                      </>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Centered Button */}
            <div className="w-full flex justify-center pt-4 relative z-10">
              <button 
                onClick={handleSendAssignment}
                className="px-12 py-3.5 bg-[#000a1e] hover:bg-black text-white text-xs font-bold rounded-lg shadow-lg transition-all active:scale-95 flex items-center gap-2 border border-slate-800"
              >
                Submit To Assignments
              </button>
            </div>

          </div>
        )}

        {/* Validation view */}
        {activeSidebar === 'validation' && (
          <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 bg-[#d6e3ff] rounded-full flex items-center justify-center text-[#000a1e] mb-4 shadow">
              <ShieldCheck className="h-8 w-8 text-[#000a1e]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#000a1e] font-public">Security Ledger Validation</h2>
              <p className="text-sm font-semibold text-[#44474e] max-w-lg leading-relaxed mx-auto">
                Run immediate multi-factor cryptographic checks to verify sovereign hash sequence integrity and ensure data localization clearances.
              </p>
            </div>
            
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-[10px] leading-relaxed text-left w-full max-w-2xl max-h-[300px] overflow-y-auto custom-scrollbar shadow-inner">
              <p className="text-emerald-400 font-bold mb-1">[SYSTEM INITIALIZATION] AURIS Core Auditing Agent initialized.</p>
              <p className="text-[#82cfff] mb-1">SHA-256 Checksum: c0b6b50aabee4ad3a33d8cb70843a90c...</p>
              <p className="text-[#82cfff] mb-1">Database connection status: SECURE NODE active.</p>
              <p className="text-emerald-400 font-bold mb-1">[SUCCESS] Cryptographic signature matches Ministry verification registry.</p>
              <p className="text-slate-400 mb-1">Listening on local gateway interface 127.0.0.1:443...</p>
              <p className="text-amber-500 mb-1">[WARNING] 1 warning logs catalogued in active caches. Defer to supervisor review.</p>
            </div>
            
            <button 
              onClick={() => setToast("Compiling cryptographic audit proof...")}
              className="px-8 py-3 bg-[#000a1e] text-white font-bold text-xs rounded-lg shadow transition-all active:scale-95"
            >
              Sign Cryptographic Verification Proof
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-72 right-0 border-t border-[#c4c6cf] py-3.5 px-12 bg-white/95 backdrop-blur z-20 text-[10.5px] text-[#44474e] font-bold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Autonomous Unified Risk Intelligence System (AURIS). All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => alert("AURIS Security Standard v5.0")} className="hover:text-[#000a1e] transition-colors">Help</button>
            <button onClick={() => alert("AURIS Privacy Protocols")} className="hover:text-[#000a1e] transition-colors">Privacy Policy</button>
            <button onClick={() => alert("AURIS Terms of Service")} className="hover:text-[#000a1e] transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
