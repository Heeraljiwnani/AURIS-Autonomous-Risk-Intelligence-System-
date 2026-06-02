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
  ShieldCheck,
  Activity,
  Sparkles,
  Eye,
  Folder,
  LogOut as LogoutIcon
} from 'lucide-react';

export default function RegulatoryDashboard({ onNavigate }) {
  // Sidebar state

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(() => {
    return localStorage.getItem('auris_active_sidebar') || 'agent';
  });
  const [sidebarHistory, setSidebarHistory] = useState([]);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedAssignmentTab, setSelectedAssignmentTab] = useState('Retail Banking Department');

  // Load departments on mount
  useEffect(() => {
    const fetchOrgDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organisation');
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.selected_depts) && data.selected_depts.length > 0) {
            setSelectedDepts(data.selected_depts);
            setSelectedAssignmentTab(data.selected_depts[0]);
            setMapTab(data.selected_depts[0]);
            return;
          }
        }
      } catch (err) {
        console.warn('⚠️ Backend server offline. Falling back to local storage.');
      }
      
      const localDepts = localStorage.getItem('auris_selected_depts');
      if (localDepts) {
        try {
          const parsed = JSON.parse(localDepts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSelectedDepts(parsed);
            setSelectedAssignmentTab(parsed[0]);
            setMapTab(parsed[0]);
            return;
          }
        } catch (e) {}
      }
      
      // Default initial departments if nothing saved
      const defaultDepts = [
        "Retail Banking Department",
        "Credit & Loans Department",
        "Risk Management Department",
        "Information Technology (IT) Department",
        "Human Resources (HR) Department"
      ];
      setSelectedDepts(defaultDepts);
      setSelectedAssignmentTab("Retail Banking Department");
      setMapTab("Retail Banking Department");
    };
    fetchOrgDetails();
  }, []);

  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const saved = localStorage.getItem('auris_uploaded_files');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { name: "Sovereign Digital Privacy Directives 2025.pdf", size: "2.4 MB" },
      { name: "Reserve Bank Integrity Standards v4.pdf", size: "1.8 MB" },
      { name: "National Cybersecurity Framework 2026.pdf", size: "4.1 MB" },
      { name: "SME Digital KYC Regulation v2.pdf", size: "1.5 MB" }
    ];
  });

  const [selectedIngestFile, setSelectedIngestFile] = useState(() => {
    return localStorage.getItem('auris_selected_ingest_file') || "Sovereign Digital Privacy Directives 2025.pdf";
  });

  const [isAiScanning, setIsAiScanning] = useState(false);

  const [assignedTasks, setAssignedTasks] = useState(() => {
    const saved = localStorage.getItem('auris_assigned_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const pdfScrollRef = useRef(null);

  const scrollPdfs = (direction) => {
    if (pdfScrollRef.current) {
      const scrollAmount = 200;
      pdfScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getAIGeneratedTasks = (fileName) => {
    if (!fileName) return [];
    const name = fileName.toLowerCase();
    
    if (name.includes('privacy') || name.includes('personal') || name.includes('sovereign')) {
      return [
        {
          id: 'task-p1',
          title: 'DPDP Consent Verification',
          desc: `Verify that raw customer records are geofenced as mandated by the DPDP Act and no silent bypass exists. [Ingested from ${fileName}]`,
          department: 'banking',
          priority: 'Critical Priority',
          status: 'Active',
          progress: 65,
          fileName: fileName
        },
        {
          id: 'task-p2',
          title: 'Geographic Data Audit',
          desc: `Validate that analytical metadata logs are stored domestically to avoid regulatory geofencing infractions. [Ingested from ${fileName}]`,
          department: 'compliance',
          priority: 'High Priority',
          status: 'Active',
          progress: 45,
          fileName: fileName
        },
        {
          id: 'task-p3',
          title: 'API Threat Shield Sync',
          desc: `Audit third-party client API tokens and verify cryptographic shielding against local data exposure. [Ingested from ${fileName}]`,
          department: 'security',
          priority: 'High Priority',
          status: 'Active',
          progress: 80,
          fileName: fileName
        },
        {
          id: 'task-p4',
          title: 'Consent Pruning Protocol',
          desc: `Implement automated background scripts to prune consent files of inactive customer accounts past 180 days. [Ingested from ${fileName}]`,
          department: 'support',
          priority: 'Medium Priority',
          status: 'Active',
          progress: 30,
          fileName: fileName
        }
      ];
    } else if (name.includes('bank') || name.includes('integrity') || name.includes('reserve')) {
      return [
        {
          id: 'task-b1',
          title: 'Core Ledger Audit Trace',
          desc: `Verify accounting ledgers and core transaction logs against sovereign financial compliance directives. [Ingested from ${fileName}]`,
          department: 'banking',
          priority: 'Critical Priority',
          status: 'Active',
          progress: 85,
          fileName: fileName
        },
        {
          id: 'task-b2',
          title: 'Risk Profiler Classification',
          desc: `Audit digital lending compliance and credit risk classification algorithms for transparency validation. [Ingested from ${fileName}]`,
          department: 'finance',
          priority: 'High Priority',
          status: 'Active',
          progress: 50,
          fileName: fileName
        },
        {
          id: 'task-b3',
          title: 'Cryptographic Vault Scan',
          desc: `Continuous security scanning of core server storage vaults holding sensitive transaction records. [Ingested from ${fileName}]`,
          department: 'security',
          priority: 'High Priority',
          status: 'Active',
          progress: 90,
          fileName: fileName
        }
      ];
    } else {
      const cleanName = fileName.replace('.pdf', '');
      return [
        {
          id: 'task-c1',
          title: `${cleanName} Ingestion Sync`,
          desc: `Continuous verification of operational files and regulatory alignment validation for ${fileName}.`,
          department: 'compliance',
          priority: 'High Priority',
          status: 'Active',
          progress: 60,
          fileName: fileName
        },
        {
          id: 'task-c2',
          title: `${cleanName} Threat Check`,
          desc: `Cybersecurity auditing and access control trace on systems related to ${fileName}.`,
          department: 'security',
          priority: 'High Priority',
          status: 'Active',
          progress: 75,
          fileName: fileName
        }
      ];
    }
  };

  const getDeptCategory = (deptName) => {
    if (!deptName) return 'main';
    const name = deptName.toLowerCase();
    if (name.includes('banking') || name.includes('treasury')) return 'banking';
    if (name.includes('credit') || name.includes('loans') || name.includes('risk')) return 'finance';
    if (name.includes('compliance') || name.includes('it') || name.includes('technology') || name.includes('audit')) return 'security';
    if (name.includes('resources') || name.includes('hr') || name.includes('operation') || name.includes('support')) return 'support';
    return 'main';
  };

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

  useEffect(() => {
    localStorage.setItem('auris_active_sidebar', activeSidebar);
  }, [activeSidebar]);
  // Dashboard workflow views
  const [currentView, setCurrentView] = useState('upload'); // 'upload' | 'scanning' | 'report'
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanStep, setScanStep] = useState(0);
  const [activeTab, setActiveTab] = useState('infractions');

  // Map Generator states
  const [mapTab, setMapTab] = useState('Retail Banking Department');

  const [isTaskExpanded, setIsTaskExpanded] = useState(false);
  const [checkedDirectives, setCheckedDirectives] = useState(() => {
    const saved = localStorage.getItem('auris_checked_directives');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
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

    const category = directiveMapping[id];
    if (category && isNowChecked) {
      const matchingDept = selectedDepts.find(d => getDeptCategory(d) === category) || selectedDepts[0] || 'Retail Banking Department';
      setMapTab(matchingDept);
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
        const newFile = { name: file.name, size: formattedSize };
        setUploadedFiles(prev => {
          const exists = prev.some(f => f.name === file.name);
          if (exists) return prev;
          const updated = [...prev, newFile];
          localStorage.setItem('auris_uploaded_files', JSON.stringify(updated));
          return updated;
        });
        setSelectedIngestFile(file.name);
        localStorage.setItem('auris_selected_ingest_file', file.name);

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
        const newFile = { name: file.name, size: formattedSize };
        setUploadedFiles(prev => {
          const exists = prev.some(f => f.name === file.name);
          if (exists) return prev;
          const updated = [...prev, newFile];
          localStorage.setItem('auris_uploaded_files', JSON.stringify(updated));
          return updated;
        });
        setSelectedIngestFile(file.name);
        localStorage.setItem('auris_selected_ingest_file', file.name);

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

      <aside className={`relative bg-[#edeeef] flex flex-col border-r border-[#c4c6cf] z-50 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        {/* Floating Border Collapse/Expand Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-[80px] -right-3.5 w-7 h-7 bg-[#003262] hover:bg-[#004b87] text-white rounded-full flex items-center justify-center border border-[#c4c6cf] shadow-md transition-all duration-200 z-50 cursor-pointer active:scale-95"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Brand Identity & Collapse Control */}
        <div className={`p-6 flex items-center transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <img src="/auris-logo.png" className="w-9 h-9 rounded-lg object-cover shadow-md flex-shrink-0" alt="AURIS Logo" />
          {!isSidebarCollapsed && (
            <span className="text-xl font-bold tracking-tight text-[#003262] font-public uppercase animate-fade-in">AURIS</span>
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
                if (isSidebarCollapsed) {
                  setIsSidebarCollapsed(false);
                  setAssignmentsExpanded(true);
                  navigateToSidebar('assignments');
                  if (selectedDepts.length > 0) {
                    setSelectedAssignmentTab(selectedDepts[0]);
                  } else {
                    setSelectedAssignmentTab('Retail Banking Department');
                  }
                } else {
                  if (activeSidebar === 'assignments') {
                    setAssignmentsExpanded(!assignmentsExpanded);
                  } else {
                    navigateToSidebar('assignments');
                    setAssignmentsExpanded(true);
                    if (selectedDepts.length > 0) {
                      setSelectedAssignmentTab(selectedDepts[0]);
                    } else {
                      setSelectedAssignmentTab('Retail Banking Department');
                    }
                  }
                }
              }}
              title={isSidebarCollapsed ? "Departments" : undefined}
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
                {!isSidebarCollapsed && <span className="text-sm">Departments</span>}
              </div>
              {!isSidebarCollapsed && (assignmentsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
            </button>

             {!isSidebarCollapsed && assignmentsExpanded && (
              <div className="ml-10 mt-1 space-y-1 border-l border-[#c4c6cf] pl-4 text-left">
                {selectedDepts.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      navigateToSidebar('assignments');
                      setSelectedAssignmentTab(dept);
                      setToast(`Loading ${dept.split(' ')[0]} audits...`);
                    }}
                    className={`block w-full text-left py-1.5 text-xs hover:translate-x-1 transition-all truncate ${
                      activeSidebar === 'assignments' && selectedAssignmentTab === dept
                        ? "text-[#003262] font-black"
                        : "text-[#44474e] font-semibold hover:text-[#003262]"
                    }`}
                  >
                    {dept.replace(/\s*Department\s*/gi, '')}
                  </button>
                ))}
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

          {/* Left panel spacer */}
          <div></div>

          {/* Interactive Right Control Group */}
          <div className="flex items-center gap-5">

            {/* Highly aesthetic circular India flag language switcher toggle */}
            <div className="flex items-center gap-3 select-none font-extrabold text-xs tracking-wider">
              <span className={`transition-colors duration-300 ${currentLanguage === 'en' ? 'text-[#003262]' : 'text-slate-400'}`}>EN</span>
              <button
                onClick={() => {
                  const nextLang = currentLanguage === 'en' ? 'hi' : 'en';
                  setCurrentLanguage(nextLang);
                  setToast(nextLang === 'en' ? "Language switched to English" : "भाषा बदलकर हिंदी कर दी गई है");
                }}
                className="w-16 h-8 bg-slate-200/80 backdrop-blur-sm border border-slate-300/80 rounded-full p-1 relative flex items-center cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-slate-400/60 active:scale-95"
                aria-label="Toggle Language"
              >
                {/* Sliding India flag thumb */}
                <div
                  className={`w-6 h-6 rounded-full transition-transform duration-300 transform shadow-[0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center overflow-hidden bg-white ${
                    currentLanguage === 'en' ? 'translate-x-0' : 'translate-x-8'
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
              <span className={`transition-colors duration-300 ${currentLanguage === 'hi' ? 'text-[#003262]' : 'text-slate-400'}`}>HI</span>
            </div>



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
              <div className="relative z-10 flex-grow flex flex-col items-start justify-start px-12 py-10 w-full space-y-10 min-h-[calc(100vh-80px)]">

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
                      onClick={() => handleActionView('Direct Compliance Analysis')}
                      className="flex items-center gap-3 px-8 py-4 bg-[#003262] border-2 border-[#003262] hover:bg-[#004b87] hover:border-[#004b87] text-white font-extrabold text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] w-72 justify-center cursor-pointer"
                    >
                      <Eye className="h-5 w-5 text-white" />
                      View Result
                    </button>
                    <button
                      onClick={() => handleActionView('Legal Interpretation Framework')}
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
              <div className="relative z-10 flex-grow overflow-y-auto p-8 max-w-7xl w-full mx-auto space-y-6 custom-scrollbar min-h-[calc(100vh-80px)]">

                {/* Back to upload and audit details panel */}
                <div className="bg-white border border-[#c4c6cf] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[rgba(188,155,106,0.2)] text-[#003262] rounded-xl">
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
                    <span className="text-[11px] font-extrabold text-[#44474e] uppercase tracking-wider">Warnings Issued</span>
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
              <footer className="w-full bg-[#0b1329] text-left py-6 border-t-4 border-[#f57c00] mt-auto z-20">
                <div className="w-full px-12 text-[11px] leading-relaxed text-slate-400 font-medium">
                  <p>
                    © Developed and hosted by <strong className="text-white font-bold">National Informatics Centre</strong>,
                  </p>
                  <p>
                    Ministry of Law &amp; Justice, Information Technology, <strong className="text-white font-bold">Government of India</strong>
                  </p>
                </div>
              </footer>
            )}

          </div>
        </div>
      )}

        {/* Map Generator view */}
        {activeSidebar === 'map' && (
          <div className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">

            <div className="flex-grow flex flex-col items-start justify-start p-6 md:px-12 md:py-6 w-full space-y-5 relative z-10" style={{ minHeight: '100vh' }}>

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
                    <span className="text-[15px] font-bold text-[#003262] font-public">AI Task Ingestion</span>
                    {isTaskExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {/* PDF Document Carousel */}
                  {isTaskExpanded && (
                    <div className="p-6 space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                          Select Document to Ingest
                        </span>
                        {/* Horizontal Scroll Chevron Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => scrollPdfs('left')}
                            className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-95 transition-all shadow-sm cursor-pointer"
                            title="Scroll Left"
                          >
                            <ChevronLeft className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => scrollPdfs('right')}
                            className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-95 transition-all shadow-sm cursor-pointer"
                            title="Scroll Right"
                          >
                            <ChevronRight className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      {/* Horizontally Scrollable PDF Container */}
                      <div
                        ref={pdfScrollRef}
                        className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'thin' }}
                      >
                        {uploadedFiles.map((file) => {
                          const isSelected = selectedIngestFile === file.name;
                          return (
                            <div
                              key={file.name}
                              onClick={() => {
                                if (isSelected) return;
                                setSelectedIngestFile(file.name);
                                localStorage.setItem('auris_selected_ingest_file', file.name);
                                setIsAiScanning(true);
                                setToast(`AI is scanning: ${file.name}...`);
                                setTimeout(() => {
                                  setIsAiScanning(false);
                                  setToast(`Compliance mapping successfully extracted!`);
                                }, 1500);
                              }}
                              className={`flex-shrink-0 w-[180px] snap-center p-4 border rounded-xl cursor-pointer hover:shadow-md hover:scale-102 active:scale-98 transition-all flex flex-col space-y-3 relative overflow-hidden bg-slate-50/50 ${
                                isSelected
                                  ? 'border-[#003262] bg-blue-50/20 ring-2 ring-[#003262]/10'
                                  : 'border-[#cbd5e1] hover:border-slate-400'
                              }`}
                            >
                              {/* Selection Checked Badge */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 text-emerald-500 bg-white rounded-full p-0.5 shadow-sm">
                                  <CheckCircle2 className="h-4 w-4" />
                                </div>
                              )}
                              <FileText className={`h-8 w-8 ${isSelected ? 'text-[#003262]' : 'text-slate-400'}`} />
                              <div className="space-y-0.5 text-left">
                                <h5 className="text-[11.5px] font-black text-slate-800 leading-tight truncate w-full" title={file.name}>
                                  {file.name}
                                </h5>
                                <p className="text-[10px] text-slate-400 font-extrabold">{file.size}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      
                    </div>
                  )}
                </div>

                {/* Right Column: Tabbed Checkbox Container */}
                <div className="lg:col-span-7 bg-[#001b3d] text-white rounded-2xl p-4 shadow-md flex flex-col text-left border border-slate-850" style={{ maxHeight: '380px' }}>

                  {/* Tasks Header */}
                  <div className="relative flex items-center justify-center mb-3 pb-3 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Tasks</span>
                      <span className="text-[9px] bg-sky-500/20 text-sky-300 font-extrabold px-2 py-0.5 rounded-full border border-sky-400/20">
                        {getAIGeneratedTasks(selectedIngestFile).length}
                      </span>
                    </div>
                    <span className="absolute right-0 text-[9px] text-white/40 font-semibold uppercase tracking-wider">AI Generated</span>
                  </div>

                  {/* Vertical Checkbox stack — scrollable */}
                  <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-grow" style={{ maxHeight: '310px' }}>
                    {isAiScanning ? (
                      // Scanning indicator skeleton
                      <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4">
                        <RefreshCw className="h-10 w-10 text-white/50 animate-spin" />
                        <div className="space-y-1">
                          <p className="text-xs font-black text-white/90">AURIS Deep Compliance Parser active</p>
                          <p className="text-[10px] text-white/60 font-semibold">Simulating semantic analysis and compliance mapping on "{selectedIngestFile}"...</p>
                        </div>
                      </div>
                    ) : (() => {
                      const allTasks = getAIGeneratedTasks(selectedIngestFile);
                      
                      if (allTasks.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                            <Shield className="h-10 w-10 text-white/20" />
                            <div className="space-y-1">
                              <p className="text-xs font-black text-white/80">No guidelines generated</p>
                              <p className="text-[10px] text-white/50 font-semibold px-4">
                                {selectedIngestFile 
                                  ? `This document's compliance vector does not contain any generated tasks.`
                                  : 'Select a document in the Ingestion list to generate regulatory tasks.'}
                              </p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-4 text-left">
                          {allTasks.map(t => (
                            <div key={t.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-xl p-4.5 space-y-2.5 relative group">
                              <div className="flex justify-between items-start">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[9px] bg-rose-500/20 text-rose-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                      {t.priority}
                                    </span>
                                    <span className="text-[9px] bg-[#0ea5e9]/20 text-[#38bdf8] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#0ea5e9]/10">
                                      {t.department}
                                    </span>
                                    {assignedTasks.some(at => at.id === t.id) && (
                                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <CheckCircle2 className="h-3 w-3" /> Submitted
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-sm font-black text-white pt-1">{t.title}</h4>
                                </div>
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">AI Generated</span>
                              </div>
                              <p className="text-xs text-white/70 font-semibold leading-relaxed">
                                {t.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                </div>

              </div>

              {/* Submit Button — Outside the card, below the grid */}
              <div className="w-full flex justify-center pt-6">
                <button
                  onClick={() => {
                    if (isAiScanning) {
                      setToast("Please wait for AI Ingestion to complete.");
                      return;
                    }
                    const newTasks = getAIGeneratedTasks(selectedIngestFile);
                    if (newTasks.length === 0) {
                      setToast("No tasks available to assign.");
                      return;
                    }
                    setAssignedTasks(prev => {
                      const filteredPrev = prev.filter(t => !newTasks.some(nt => nt.id === t.id));
                      const updated = [...filteredPrev, ...newTasks];
                      localStorage.setItem('auris_assigned_tasks', JSON.stringify(updated));
                      return updated;
                    });
                    setToast(`Successfully assigned ${newTasks.length} tasks to dynamic oversight desks! 💾`);
                  }}
                  className="px-14 py-3.5 bg-[#003262] hover:bg-[#0ea5e9] text-white text-xs font-bold rounded-xl shadow-xl transition-all duration-200 active:scale-95 border border-slate-700 hover:border-sky-400 cursor-pointer tracking-wider uppercase"
                >
                  Submit to Departments
                </button>
              </div>

            </div>

            </div>

          {/* The beautiful landing page footer! */}
          <footer className="w-full bg-[#0b1329] text-left py-6 border-t-4 border-[#f57c00] mt-auto z-20">
            <div className="w-full px-12 text-[11px] leading-relaxed text-slate-400 font-medium">
              <p>
                © Developed and hosted by <strong className="text-white font-bold">National Informatics Centre</strong>,
              </p>
              <p>
                Ministry of Law &amp; Justice, Information Technology, <strong className="text-white font-bold">Government of India</strong>
              </p>
            </div>
          </footer>

          </div>
        )}

        {/* Validation view */}
        {activeSidebar === 'validation' && (
          <div className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">

            <div className="flex-grow flex flex-col items-start justify-start p-12 w-full text-left space-y-6 relative z-10 min-h-[calc(100vh-80px)]">
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
            <footer className="w-full bg-[#0b1329] text-left py-6 border-t-4 border-[#f57c00] mt-auto z-20">
              <div className="w-full px-12 text-[11px] leading-relaxed text-slate-400 font-medium">
                <p>
                  © Developed and hosted by <strong className="text-white font-bold">National Informatics Centre</strong>,
                </p>
                <p>
                  Ministry of Law &amp; Justice, Information Technology, <strong className="text-white font-bold">Government of India</strong>
                </p>
              </div>
            </footer>

          </div>
        )}

        {/* Assignments view */}
        {activeSidebar === 'assignments' && (
          <div className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar bg-[#f1f3f4]">
            <div className="flex-grow flex flex-col items-start justify-start p-6 md:px-12 md:py-6 w-full space-y-5 relative z-10 min-h-[calc(100vh-80px)]">

              {/* Left-aligned Header */}
              <div className="text-left space-y-3.5 w-full">
                <h1 className="text-4xl md:text-[44px] font-black text-slate-900 tracking-tight leading-none font-public">
                  {selectedAssignmentTab === 'main' 
                    ? (currentLanguage === 'hi' ? 'विभाग > मुख्य' : 'Department > Main') 
                    : (currentLanguage === 'hi' 
                        ? `विभाग > ${selectedAssignmentTab === 'banking' || selectedAssignmentTab.toLowerCase().includes('retail') ? 'रिटेल बैंकिंग' : selectedAssignmentTab === 'finance' ? 'ऋण और वित्त' : selectedAssignmentTab === 'security' ? 'प्रौद्योगिकी और सुरक्षा' : selectedAssignmentTab === 'support' ? 'संचालन और सहायता' : selectedAssignmentTab.replace(/\s*Department\s*/gi, '')}` 
                        : `Department > ${selectedAssignmentTab.replace(/\s*Department\s*/gi, '')}`)}
                </h1>
                <p className="text-slate-600 text-sm md:text-[15px] font-semibold leading-relaxed max-w-3xl">
                  Upload sovereign policy documents or internal directives for autonomous risk evaluation and legal alignment verification.
                </p>
              </div>

              {/* Large Centered Blue Card */}
              <div className="w-full tasks-gradient-box rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 flex flex-col space-y-8 border border-white/10 text-white min-h-[480px]">
                
                {/* Centered Capsule Header */}
                <div className="w-full max-w-[420px] mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center border border-white/20 select-none shadow-sm">
                  {/* Left List Icon inside square outline */}
                  <div className="w-8 h-8 rounded-lg border border-white/25 flex items-center justify-center bg-transparent">
                    <ClipboardList className="h-4.5 w-4.5 text-white" />
                  </div>
                  
                  {/* Center Text */}
                  <span className="text-sm font-black tracking-widest text-white uppercase text-center flex-grow">
                    TASKS
                  </span>
                  
                  {/* Right Up-Arrow Caret */}
                  <ChevronUp className="h-5 w-5 text-white cursor-pointer" />
                </div>

                {/* Dynamic/Preset Tasks list inside the deep blue container */}
                <div className="w-full max-w-5xl mx-auto space-y-3.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar flex flex-col">
                  {(() => {
                    const deptCat = getDeptCategory(selectedAssignmentTab);
                    const filtered = assignedTasks.filter(t => t.department === deptCat);
                    
                    if (selectedAssignmentTab === 'main') {
                      // Render default main system-level tasks inside the deep blue container
                      return (
                        <div className="grid grid-cols-1 gap-3.5 text-left w-full">
                          {/* Task Row 1 */}
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 shadow-inner">
                            <div className="space-y-1.5 text-left max-w-xl">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] bg-rose-500/20 text-rose-300 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                                <span className="text-[9px] bg-orange-500/20 text-orange-300 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">High Priority</span>
                              </div>
                              <h4 className="text-[15px] font-bold text-white leading-snug">{currentLanguage === 'hi' ? 'कोर बही अखंडता जांच' : 'Core Ledger Integrity Check'}</h4>
                              <p className="text-[11px] text-white/70 font-semibold leading-relaxed">
                                {currentLanguage === 'hi'
                                  ? 'मुख्य लेखा बही और संप्रभु वित्तीय अनुपालन वैक्टर की निरंतर ऑडिट निगरानी।'
                                  : 'Continuous audit monitoring of the main accounting ledger and sovereign financial compliance vectors.'}
                              </p>
                              <div className="flex items-center gap-4 text-[10px] font-bold text-white/60 pt-0.5">
                                <span>{currentLanguage === 'hi' ? 'नोड्स जाँचे गए: 8,530' : 'Ledger Nodes Checked: 8,530'}</span>
                                <span className="text-emerald-300 font-bold ml-2">✓ Verified</span>
                              </div>
                              <div className="space-y-1.5 pt-1.5 max-w-xs">
                                <div className="flex justify-between text-[10px] font-extrabold text-white/70">
                                  <span>{currentLanguage === 'hi' ? 'प्रगति' : 'Progress'}</span>
                                  <span>92%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-450 h-full rounded-full" style={{ width: '92%', backgroundColor: '#34d399' }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-left sm:text-right">
                              <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase bg-[#1a6b8f] px-4 py-2 rounded-xl text-white border border-white/10 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                {currentLanguage === 'hi' ? 'प्रौद्योगिकी और सुरक्षा' : 'Technology & Security'}
                              </span>
                            </div>
                          </div>

                          {/* Task Row 2 */}
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 shadow-inner">
                            <div className="space-y-1.5 text-left max-w-xl">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Compliant</span>
                                <span className="text-[9px] bg-slate-500/20 text-slate-300 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Medium Priority</span>
                              </div>
                              <h4 className="text-[15px] font-bold text-white leading-snug">{currentLanguage === 'hi' ? 'संप्रभु नियामक सिंक' : 'Sovereign Regulatory Sync'}</h4>
                              <p className="text-[11px] text-white/70 font-semibold leading-relaxed">
                                {currentLanguage === 'hi'
                                  ? 'मुख्य संचालन में आरबीआई के परिपत्रों और नियामक निर्देशों के साथ वास्तविक समय सिंक्रनाइज़ेशन सुनिश्चित करना।'
                                  : 'Ensuring real-time synchronization with RBI circulars and regulatory directives across main operations.'}
                              </p>
                              <div className="flex items-center gap-4 text-[10px] font-bold text-white/60 pt-0.5">
                                <span>{currentLanguage === 'hi' ? 'सिंक अखंडता: 99.98%' : 'Sync Integrity: 99.98%'}</span>
                                <span className="text-emerald-300">0.4s Delay</span>
                              </div>
                              <div className="space-y-1.5 pt-1.5 max-w-xs">
                                <div className="flex justify-between text-[10px] font-extrabold text-white/70">
                                  <span>{currentLanguage === 'hi' ? 'प्रगति' : 'Progress'}</span>
                                  <span>100%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-teal-450 h-full rounded-full" style={{ width: '100%', backgroundColor: '#2dd4bf' }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-left sm:text-right">
                              <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase bg-[#1a6b8f] px-4 py-2 rounded-xl text-white border border-white/10 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                                {currentLanguage === 'hi' ? 'जोखिम और अनुपालन' : 'Risk & Compliance'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (filtered.length === 0) {
                      return (
                        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-white/5 rounded-2xl border border-white/10 w-full">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/40 border border-white/10 shadow-inner">
                            <ClipboardList className="h-8 w-8" />
                          </div>
                          <div className="space-y-1.5">
                            <h5 className="text-base font-black text-white">{currentLanguage === 'hi' ? 'कोई कार्य निर्दिष्ट नहीं है' : 'No Tasks Assigned'}</h5>
                            <p className="text-xs text-white/60 font-semibold max-w-md mx-auto leading-relaxed">
                              {currentLanguage === 'hi'
                                ? 'इस विभाग को अभी तक कोई स्वायत्त अनुपालन कार्य नहीं भेजा गया है।'
                                : 'No compliance or monitoring tasks have been assigned to this desk yet. Ingest a document inside Map Generator to assign tasks to this department.'}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 gap-3.5 text-left w-full">
                        {filtered.map((task) => (
                          <div key={task.id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 shadow-inner">
                            <div className="space-y-1.5 text-left max-w-xl">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className={`text-[9px] ${task.status === 'Compliant' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'} font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                                  {task.status}
                                </span>
                                <span className={`text-[9px] ${task.priority.includes('Critical') ? 'bg-rose-500/20 text-rose-300' : 'bg-orange-500/20 text-orange-300'} font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                                  {task.priority}
                                </span>
                              </div>
                              <h4 className="text-[15px] font-bold text-white leading-snug">{task.title}</h4>
                              <p className="text-[11px] text-white/70 font-semibold leading-relaxed">
                                {task.desc}
                              </p>
                              <div className="flex items-center gap-4 text-[10px] font-bold text-white/60 pt-0.5">
                                <span>Ingested: {task.fileName}</span>
                                <span className="text-emerald-300 font-bold ml-2">✓ Verified</span>
                              </div>
                              <div className="space-y-1.5 pt-1.5 max-w-xs">
                                <div className="flex justify-between text-[10px] font-extrabold text-white/70">
                                  <span>Progress</span>
                                  <span>{task.progress}%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-450 h-full rounded-full" style={{ width: `${task.progress}%`, backgroundColor: '#34d399' }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-left sm:text-right">
                              <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase bg-[#1a6b8f] px-4 py-2 rounded-xl text-white border border-white/10 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                {selectedAssignmentTab.replace(/\s*Department\s*/gi, '')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

              </div>

              {/* Reusable landing page footer */}
              <footer className="w-full bg-[#0b1329] text-left py-6 border-t-4 border-[#f57c00] mt-auto z-20">
                <div className="w-full px-12 text-[11px] leading-relaxed text-slate-400 font-medium">
                  <p>
                    © Developed and hosted by <strong className="text-white font-bold">National Informatics Centre</strong>,
                  </p>
                  <p>
                    Ministry of Law &amp; Justice, Information Technology, <strong className="text-white font-bold">Government of India</strong>
                  </p>
                </div>
              </footer>

            </div>
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
