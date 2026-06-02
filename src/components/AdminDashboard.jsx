import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Activity,
  Users,
  Settings,
  Sliders,
  Database,
  Menu,
  RefreshCw,
  LogOut as LogoutIcon,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Cpu,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Folder,
  FileText
} from 'lucide-react';

export default function AdminDashboard({ onNavigate }) {
  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'surveillance'
  
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('auris_language') || 'en';
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Form states matching the mock-up screenshot
  const [orgName, setOrgName] = useState('');
  const [numDepts, setNumDepts] = useState('');
  const [selectedDepts, setSelectedDepts] = useState([]);

  const [isNumDeptsOpen, setIsNumDeptsOpen] = useState(false);
  const [isDeptNamesOpen, setIsDeptNamesOpen] = useState(false);

  const getDeptLimit = () => {
    if (numDepts === "1 Department") return 1;
    if (numDepts === "2 Departments") return 2;
    if (numDepts === "3 Departments") return 3;
    if (numDepts === "4 Departments") return 4;
    if (numDepts === "5 Departments") return 5;
    if (numDepts === "6 Departments") return 6;
    if (numDepts === "7 Departments") return 7;
    if (numDepts === "7+ Departments") return 9; // allow all 9
    return 0;
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch Organisation Details from PostgreSQL database on mount
  useEffect(() => {
    const fetchOrgDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organisation');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setOrgName(data.org_name || '');
            setNumDepts(data.num_depts || '');
            setSelectedDepts(data.selected_depts || []);
          }
        }
      } catch (err) {
        console.warn('⚠️ Could not connect to AURIS backend server. Falling back to local state.', err.message);
      }
    };
    fetchOrgDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem('auris_language', currentLanguage);
  }, [currentLanguage]);

  // Section 1: System Monitor simulated statistics (for Surveillance tab)
  const [cpuUsage, setCpuUsage] = useState(38);
  const [ramUsage, setRamUsage] = useState(6.4);
  const [logs, setLogs] = useState([
    { id: 1, time: '19:50:12', type: 'INFO', msg: 'System integrity scan initiated' },
    { id: 2, time: '19:51:04', type: 'SUCCESS', msg: 'Core API Endpoint verification success (SHA-256 matches)' },
    { id: 3, time: '19:52:19', type: 'INFO', msg: 'Analyst Jane Doe dispatched KYC compliance verification audit' },
    { id: 4, time: '19:53:40', type: 'WARNING', msg: 'Directives retention threshold near policy threshold limits (Clause 8.6)' }
  ]);

  // CPU fluctuations simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const diff = Math.floor(Math.random() * 9) - 4;
        const next = prev + diff;
        return Math.max(10, Math.min(95, next));
      });
      setRamUsage(prev => {
        const diff = parseFloat((Math.random() * 0.4 - 0.2).toFixed(2));
        const next = prev + diff;
        return parseFloat(Math.max(4.2, Math.min(14.8, next)).toFixed(2));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Section 2: Access Management (Permissions desks for Surveillance tab)
  const initialAccess = {
    'jane': { name: 'Jane Doe', role: 'Senior Compliance Officer', clearing: { risk: true, geospatial: true, policy: false, audit: true, ops: false } },
    'sarah': { name: 'Sarah Jenkins', role: 'Audit Lead Inspector', clearing: { risk: true, geospatial: false, policy: true, audit: true, ops: true } },
    'john': { name: 'John Smith', role: 'Operations Auditor', clearing: { risk: false, geospatial: true, policy: false, audit: false, ops: true } }
  };
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('auris_admin_employees_access');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialAccess;
  });
  const [selectedEmployee, setSelectedEmployee] = useState('jane');

  const toggleEmployeePermission = (desk) => {
    setEmployees(prev => {
      const updated = {
        ...prev,
        [selectedEmployee]: {
          ...prev[selectedEmployee],
          clearing: {
            ...prev[selectedEmployee].clearing,
            [desk]: !prev[selectedEmployee].clearing[desk]
          }
        }
      };
      localStorage.setItem('auris_admin_employees_access', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateAccess = () => {
    setToast(`Access permissions updated for ${employees[selectedEmployee].name}!`);
  };

  // Section 3: Global Policy Config Rules (for Surveillance tab)
  const initialPolicies = [
    { id: 'data-local', label: 'Section 12.1: Sovereign Data Localization Check', active: true, severity: 'High' },
    { id: 'silent-share', label: 'Section 4.2: Partner API Silent Sharing Bypass Guard', active: true, severity: 'Critical' },
    { id: 'retention-cap', label: 'Section 8.6: 180-Day Data Retention Cache Pruning', active: false, severity: 'Medium' },
    { id: 'crypto-sig', label: 'Section 14: Centralized Ledger Signature Verification', active: true, severity: 'Critical' },
    { id: 'live-scan', label: 'Section 22: Real-time Cloud Egress Port Synthesis', active: true, severity: 'High' }
  ];
  const [policies, setPolicies] = useState(() => {
    const saved = localStorage.getItem('auris_admin_policies_rules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialPolicies;
  });

  const togglePolicy = (id) => {
    setPolicies(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, active: !p.active } : p);
      localStorage.setItem('auris_admin_policies_rules', JSON.stringify(updated));
      return updated;
    });
    const policyLabel = policies.find(p => p.id === id)?.label.split(':')[0];
    setToast(`${policyLabel || 'Rule'} config updated!`);
  };

  const handleSeverityChange = (id, newSeverity) => {
    setPolicies(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, severity: newSeverity } : p);
      localStorage.setItem('auris_admin_policies_rules', JSON.stringify(updated));
      return updated;
    });
    setToast(`Rule severity adjusted to ${newSeverity}`);
  };

  // Section 4: Cryptographic Console (for Surveillance tab)
  const [cryptHistory, setCryptHistory] = useState([
    'SECURE ACCESS POINT PORT 443 AUTHENTICATED: OK',
    'PARSING DIRECTIVES COMPLIANCE ARCHIVE SCHEMA...',
    'INTEGRITY CHECK SUCCESS: HASH 77A912F MATCHES REGISTRY',
    'ACTIVE SERVER HEALTH STATUS: NORMAL (NODE 02A)'
  ]);
  const [cryptInput, setCryptInput] = useState('');
  const consoleEndRef = useRef(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cryptHistory]);

  const handleConsoleSubmit = (e) => {
    e.preventDefault();
    if (!cryptInput.trim()) return;
    
    const userLine = `root@auris-secure:~# ${cryptInput}`;
    setCryptHistory(prev => [...prev, userLine]);
    
    const command = cryptInput.toLowerCase().trim();
    setCryptInput('');

    setTimeout(() => {
      let response = "Error: Unknown administrative directive sequence.";
      if (command === 'help') {
        response = "Available Directives:\n- status: Get system cluster health\n- verify: Run signature checks\n- clear: Purge screen activity\n- rules: Fetch operational policies status";
      } else if (command === 'status') {
        response = `ACTIVE NODES: 4/4\nDATABASE CLUSTERS: SECURE\nCPU UTILIZATION: ${cpuUsage}%\nRAM UTILIZATION: ${ramUsage} GB`;
      } else if (command === 'verify') {
        response = "VERIFYING CRYPTOGRAPHIC LEDGER SIGNATURE...\n[SUCCESS] SHA-256 checksum match verified (Ministry registry node 0xEF91).";
      } else if (command === 'clear') {
        setCryptHistory([]);
        return;
      } else if (command === 'rules') {
        response = policies.map(p => `[${p.active ? 'ACTIVE' : 'INACTIVE'}] ${p.label.split(':')[0]} (Severity: ${p.severity})`).join('\n');
      }
      setCryptHistory(prev => [...prev, response]);
    }, 400);
  };

  const handleSignLedger = () => {
    const timestamp = new Date().toLocaleString();
    setToast("Ledger Signed Cryptographically!");
    setCryptHistory(prev => [
      ...prev,
      `--- LEDGER SIGN-OFF REGISTEREDED ---`,
      `SIGNED BY: System Administrator (admin@auris.gov.in)`,
      `TIMESTAMP: ${timestamp}`,
      `STATUS: ALL AUDIT TRAILS MARKED COMPLIANT`,
      `-------------------------------------`
    ]);
  };

  // Submission handler for Organisation details card
  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    if (!orgName.trim() || !numDepts || selectedDepts.length === 0) {
      setToast("Please fill in all details before saving.");
      return;
    }
    const limit = getDeptLimit();
    if (selectedDepts.length < limit && numDepts !== "7+ Departments") {
      setToast(`Please select exactly ${limit} departments as specified.`);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/organisation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgName,
          numDepts,
          selectedDepts,
        }),
      });

      if (response.ok) {
        await response.json();
        localStorage.setItem('auris_selected_depts', JSON.stringify(selectedDepts));
        localStorage.setItem('auris_org_name', orgName);
        localStorage.setItem('auris_num_depts', numDepts);
        setToast("All Details saved Successfully");
      } else {
        const errData = await response.json();
        setToast(`❌ Failed to save: ${errData.message || 'Database error'}`);
      }
    } catch (err) {
      console.warn('⚠️ Could not connect to AURIS backend server. Saving locally.', err.message);
      localStorage.setItem('auris_selected_depts', JSON.stringify(selectedDepts));
      localStorage.setItem('auris_org_name', orgName);
      localStorage.setItem('auris_num_depts', numDepts);
      setToast("⚠️  Backend offline. Details saved locally only!");
    }
  };

  const isLightTheme = activeTab === 'details' || activeTab === 'surveillance';

  return (
    <div className={`flex h-screen w-full font-sans antialiased overflow-hidden select-none transition-colors duration-300 ${
      isLightTheme ? 'bg-[#f8f9fa] text-[#0f172a]' : 'bg-[#030712] text-[#f8fafc]'
    }`}>
      
      {/* Scrollbar and custom glow utilities */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isLightTheme ? '#f1f5f9' : '#090d16'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isLightTheme ? '#cbd5e1' : '#1e293b'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isLightTheme ? '#94a3b8' : '#334155'};
        }
        
        .pulse-dot {
          box-shadow: 0 0 8px ${isLightTheme ? 'rgba(16, 185, 129, 0.4)' : 'rgba(34, 197, 94, 0.6)'};
        }

        .neon-glow-cyan {
          box-shadow: 0 0 15px rgba(14, 165, 233, 0.15);
        }
        .neon-glow-green {
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.15);
        }
        .neon-glow-red {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.15);
        }

        @keyframes toast-slide-in-right {
          0% {
            transform: translate3d(120%, 0, 0) scale(0.9);
            opacity: 0;
          }
          65% {
            transform: translate3d(-10px, 0, 0) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
          }
        }
        .toast-slide-in {
          animation: toast-slide-in-right 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
 
      {/* Admin Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[999] toast-slide-in w-full max-w-sm px-4 select-none pointer-events-none">
          <div className={`pointer-events-auto flex items-center gap-4 px-5 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            toast.toLowerCase().includes('failed') || toast.includes('❌') || toast.toLowerCase().includes('error')
              ? 'bg-white/95 border-rose-200 text-slate-800 shadow-[0_20px_50px_rgba(244,63,94,0.08)]'
              : toast.toLowerCase().includes('success') || toast.toLowerCase().includes('saved') || toast.includes('💾') || toast.includes('Ledger')
                ? 'bg-white/95 border-emerald-200 text-slate-800 shadow-[0_20px_50px_rgba(16,185,129,0.08)]'
                : 'bg-white/95 border-sky-200 text-slate-800 shadow-[0_20px_50px_rgba(14,165,233,0.08)]'
          }`}>
            {/* Left color bar */}
            <div className={`absolute left-0 top-3.5 bottom-3.5 w-1 rounded-r-lg ${
              toast.toLowerCase().includes('failed') || toast.includes('❌') || toast.toLowerCase().includes('error')
                ? 'bg-rose-500'
                : toast.toLowerCase().includes('success') || toast.toLowerCase().includes('saved') || toast.includes('💾') || toast.includes('Ledger')
                  ? 'bg-emerald-500'
                  : 'bg-sky-500'
            }`} />

            {/* Icon */}
            <div className={`p-2.5 rounded-xl flex-shrink-0 border ${
              toast.toLowerCase().includes('failed') || toast.includes('❌') || toast.toLowerCase().includes('error')
                ? 'bg-rose-50/80 text-rose-600 border-rose-100'
                : toast.toLowerCase().includes('success') || toast.toLowerCase().includes('saved') || toast.includes('💾') || toast.includes('Ledger')
                  ? 'bg-emerald-50/80 text-emerald-600 border-emerald-100'
                  : 'bg-sky-50/80 text-sky-600 border-sky-100'
            }`}>
              {toast.toLowerCase().includes('failed') || toast.includes('❌') || toast.toLowerCase().includes('error') ? (
                <AlertTriangle className="h-4.5 w-4.5 animate-pulse" />
              ) : toast.toLowerCase().includes('success') || toast.toLowerCase().includes('saved') || toast.includes('💾') || toast.includes('Ledger') ? (
                <CheckCircle2 className="h-4.5 w-4.5" />
              ) : (
                <Sparkles className="h-4.5 w-4.5" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-left min-w-0 pr-2 pl-0.5">
              <p className={`text-[10px] font-black tracking-widest uppercase ${
                toast.toLowerCase().includes('failed') || toast.includes('❌') || toast.toLowerCase().includes('error')
                  ? 'text-rose-600'
                  : toast.toLowerCase().includes('success') || toast.toLowerCase().includes('saved') || toast.includes('💾') || toast.includes('Ledger')
                    ? 'text-emerald-600'
                    : 'text-sky-600'
              }`}>
                {toast.toLowerCase().includes('failed') || toast.includes('❌') || toast.toLowerCase().includes('error')
                  ? 'System Alert'
                  : toast.toLowerCase().includes('success') || toast.toLowerCase().includes('saved') || toast.includes('💾') || toast.includes('Ledger')
                    ? 'Success'
                    : 'Notification'}
              </p>
              <h5 className="text-[13px] font-extrabold text-slate-800 mt-0.5 leading-snug break-words">
                {toast.replace(/💾|❌|⚠️|✅/gu, '').trim()}
              </h5>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setToast(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all flex-shrink-0 cursor-pointer pointer-events-auto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Left Sidebar Navigation */}
      <aside className={`relative flex flex-col z-50 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      } ${
        isLightTheme 
          ? 'bg-[#edeeef] border-r border-[#c4c6cf]' 
          : 'bg-[#030712] border-r border-white/5'
      }`}>
        
        {/* Floating Border Collapse/Expand Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`absolute top-[80px] -right-3.5 w-7 h-7 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 z-50 cursor-pointer active:scale-95 ${
            isLightTheme 
              ? 'bg-[#003262] hover:bg-[#004b87] text-white border-[#c4c6cf]' 
              : 'bg-[#1e293b] hover:bg-slate-700 text-white border-white/10'
          }`}
          title={isSidebarCollapsed ? "Expand Menu" : "Collapse Menu"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Brand layout & sidebar collapse */}
        <div className={`p-6 flex items-center transition-all duration-300 ${
          isSidebarCollapsed ? 'justify-center' : 'justify-start gap-3'
        } ${!isLightTheme ? 'border-b border-white/5' : ''}`}>
          <img src="/auris-logo.png" className="w-9 h-9 rounded-lg object-cover shadow-sm flex-shrink-0" alt="AURIS Logo" />
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="flex items-center gap-1.5">
                <span className={`text-xl font-bold tracking-tight font-public uppercase ${
                  isLightTheme ? 'text-[#003262]' : 'text-white'
                }`}>
                  AURIS
                </span>
                {!isLightTheme && (
                  <span className="text-[10px] font-black uppercase text-[#0ea5e9] border border-[#0ea5e9]/40 bg-[#0ea5e9]/5 px-2.5 py-0.5 rounded leading-none">
                    ADM
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar tabs */}
        <nav className="flex-grow px-3 py-6 space-y-2 text-left">
          
          {/* Details tab - Active in Light mode / Image 2 */}
          <button
            onClick={() => {
              setActiveTab('details');
              setToast("Theme loaded: Light Corporate View");
            }}
            title={isSidebarCollapsed ? (currentLanguage === 'hi' ? 'विवरण' : 'Details') : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isSidebarCollapsed
                ? "justify-center py-3.5 px-0 font-bold"
                : "gap-3 px-6 py-3.5 font-bold text-left"
            } ${
              isLightTheme && activeTab === 'details'
                ? "text-[#003262] bg-gradient-to-r from-[#003262]/5 to-transparent border-l-4 border-[#FDB515] rounded-none rounded-r-xl"
                : isLightTheme 
                  ? "text-[#44474e] hover:bg-[#e7e8e9]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Database className="h-4.5 w-4.5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm font-semibold">Details</span>}
          </button>

          {/* Control Center / Surveillance tab */}
          <button
            onClick={() => {
              setActiveTab('surveillance');
              setToast(currentLanguage === 'hi' ? "निगरानी मॉड्यूल लोड किया गया।" : "Loaded Surveillance Oversight.");
            }}
            title={isSidebarCollapsed ? (currentLanguage === 'hi' ? 'निगरानी' : 'Surveillance') : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isSidebarCollapsed
                ? "justify-center py-3.5 px-0 font-bold"
                : "gap-3 px-6 py-3.5 font-bold text-left"
            } ${
              isLightTheme && activeTab === 'surveillance'
                ? "text-[#003262] bg-gradient-to-r from-[#003262]/5 to-transparent border-l-4 border-[#FDB515] rounded-none rounded-r-xl"
                : isLightTheme 
                  ? "text-[#44474e] hover:bg-[#e7e8e9]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {isLightTheme ? (
              <Eye className="h-4.5 w-4.5 flex-shrink-0" />
            ) : (
              <Activity className="h-4.5 w-4.5 flex-shrink-0" />
            )}
            {!isSidebarCollapsed && (
              <span className="text-sm font-semibold">
                {isLightTheme ? 'Surveillance' : 'Control Center'}
              </span>
            )}
          </button>

          {/* Placeholders matching Image 1 to maintain absolute mockup fidelity */}
          {!isLightTheme && (
            <>
              <button
                onClick={() => setToast("Access Provision parameters locked under high-security active oversight.")}
                className={`w-full flex items-center transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center py-3.5 px-0 rounded-xl font-bold" : "gap-3 px-6 py-3.5 rounded-xl font-bold text-left"
                } text-slate-400 hover:bg-white/5 hover:text-white`}
              >
                <Users className="h-4.5 w-4.5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Access Provision</span>}
              </button>

              <button
                onClick={() => setToast("Policy Configuration matrices are operational on the central ledger.")}
                className={`w-full flex items-center transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center py-3.5 px-0 rounded-xl font-bold" : "gap-3 px-6 py-3.5 rounded-xl font-bold text-left"
                } text-slate-400 hover:bg-white/5 hover:text-white`}
              >
                <Sliders className="h-4.5 w-4.5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Policy Config</span>}
              </button>

              <button
                onClick={() => setToast("Threat Ledger is currently synced with Central Government node 02A.")}
                className={`w-full flex items-center transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center py-3.5 px-0 rounded-xl font-bold" : "gap-3 px-6 py-3.5 rounded-xl font-bold text-left"
                } text-slate-400 hover:bg-white/5 hover:text-white`}
              >
                <Terminal className="h-4.5 w-4.5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="text-sm font-semibold uppercase text-slate-400 tracking-wider">Threat Ledger</span>}
              </button>
            </>
          )}

        </nav>

        {/* Muted bottom borders inside sidebar */}
        <div className={`p-4 border-t ${
          isLightTheme ? 'border-[#c4c6cf]' : 'border-white/5'
        }`}>
          {!isSidebarCollapsed && (
            <p className="text-[10px] font-mono text-center tracking-wider text-slate-500 select-none">
              AURIS SECURE ADM
            </p>
          )}
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        
        {/* Top Operations Navbar */}
        <header className={`relative z-45 w-full px-12 py-4 flex justify-between items-center transition-colors duration-300 border-b ${
          isLightTheme 
            ? 'bg-white border-[#cbd5e1]/55 shadow-sm' 
            : 'bg-[#030712] border-white/5'
        }`}>
          
          {/* Spacer for layout balance */}
          <div />

          {/* Right Header Operations controls group */}
          <div className="flex items-center gap-5">
            
            {/* Highly aesthetic circular India flag language switcher toggle */}
            <div className="flex items-center gap-3 select-none font-extrabold text-xs tracking-wider">
              <span className={`transition-colors duration-300 ${
                currentLanguage === 'en' 
                  ? (isLightTheme ? 'text-[#001b3d]' : 'text-white') 
                  : (isLightTheme ? 'text-slate-400' : 'text-white/40')
              }`}>EN</span>
              <button
                onClick={() => {
                  const nextLang = currentLanguage === 'en' ? 'hi' : 'en';
                  setCurrentLanguage(nextLang);
                  setToast(nextLang === 'en' ? "Language switched to English" : "भाषा बदलकर हिंदी कर दी गई है");
                }}
                className={`w-16 h-8 rounded-full p-1 relative flex items-center cursor-pointer transition-all duration-300 active:scale-95 border ${
                  isLightTheme 
                    ? 'bg-slate-200/80 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] hover:border-slate-400/60' 
                    : 'bg-black/40 border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] hover:border-white/20'
                }`}
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
              <span className={`transition-colors duration-300 ${
                currentLanguage === 'hi' 
                  ? (isLightTheme ? 'text-[#001b3d]' : 'text-white') 
                  : (isLightTheme ? 'text-slate-400' : 'text-white/40')
              }`}>HI</span>
            </div>



            {/* Settings Parameter Gear Button */}
            <button
              onClick={() => setToast(currentLanguage === 'hi' ? "प्रशासनिक सेटिंग्स लोड हो रही हैं..." : "Loading admin settings...")}
              className={`hover:rotate-45 p-1 rounded-lg transition-all duration-350 cursor-pointer ${
                isLightTheme ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Settings"
            >
              <Settings className="h-4.5 w-4.5" />
            </button>

            {/* Blue circular profile badge SA */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-8 h-8 rounded-full bg-[#005c8a] hover:bg-[#004a70] text-white font-extrabold text-xs tracking-wider flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm focus:outline-none"
              >
                SA
              </button>

              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setProfileMenuOpen(false)}></div>
                  
                  <div className={`absolute right-0 mt-3 w-56 border shadow-2xl rounded-2xl p-4 z-50 text-left space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isLightTheme ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0b1329] border-white/10 text-white'
                  }`}>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase select-none">
                        Active System Administrator
                      </p>
                      <h4 className="text-sm font-extrabold">System Admin</h4>
                      <p className="text-[11.5px] font-semibold text-[#005c8a] dark:text-[#24b2f7]">admin@auris.gov.in</p>
                    </div>
                    <div className={`h-px ${isLightTheme ? 'bg-slate-100' : 'bg-white/10'}`}></div>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        setIsSignOutModalOpen(true);
                      }}
                      className="w-full bg-[#001b3d] dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7] hover:shadow-lg text-white py-2 rounded-xl text-[12.5px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <LogoutIcon className="h-3.5 w-3.5" />
                      Exit Session
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>

        </header>

        {/* DETAILS SCREEN STATE - LIGHT CORPORATE THEME MATCHING IMAGE 2 */}
        {activeTab === 'details' && (
          <div className="flex-grow overflow-y-auto custom-scrollbar w-full text-left">
            <div className="p-10 md:p-14 pb-24 w-full max-w-4xl space-y-8 animate-in fade-in duration-300">
            
            {/* Headers */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#001b3d] font-public tracking-tight leading-none">
                {currentLanguage === 'hi' ? 'संगठन का विवरण' : 'Organisation Details'}
              </h1>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
                {currentLanguage === 'hi'
                  ? 'स्वायत्त जोखिम मूल्यांकन और अनुपालन सत्यापन के लिए अपने नियामक दस्तावेजों को अपलोड करें।'
                  : 'Upload your regulatory documents for autonomous risk assessment and compliance verification.'}
              </p>
            </div>

            {/* Input Forms Bento Container */}
            <form onSubmit={handleOrgSubmit} className="space-y-6 max-w-xl">
              
              {/* Field 1: Organization Name */}
              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="org-name">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="org-name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter organization name..."
                  className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#cbd5e1] rounded-xl outline-none focus:border-[#24b2f7] focus:ring-2 focus:ring-[#24b2f7]/15 transition-all text-xs font-semibold text-slate-800 placeholder-slate-400"
                  required
                />
              </div>

              {/* Field 2: Number of Departments */}
              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Number of Departments
                </label>
                <div className="relative">
                  <div
                    onClick={() => {
                      setIsDeptNamesOpen(false);
                      setIsNumDeptsOpen(!isNumDeptsOpen);
                    }}
                    className={`w-full px-4 py-3 bg-[#f8f9fa] border rounded-xl outline-none transition-all text-xs font-semibold text-left flex justify-between items-center cursor-pointer select-none ${
                      isNumDeptsOpen ? 'border-[#24b2f7] ring-2 ring-[#24b2f7]/15' : 'border-[#cbd5e1]'
                    } ${numDepts ? 'text-slate-800' : 'text-slate-400'}`}
                  >
                    <span>{numDepts || "Select number of departments..."}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isNumDeptsOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isNumDeptsOpen && (
                    <>
                      {/* Click outside backdrop */}
                      <div className="fixed inset-0 z-40 bg-transparent" onClick={(e) => { e.stopPropagation(); setIsNumDeptsOpen(false); }}></div>
                      
                      <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-[#cbd5e1] rounded-xl shadow-xl py-1 overflow-hidden animate-in slide-in-from-top-2 duration-150 text-left">
                        {[
                          "1 Department",
                          "2 Departments",
                          "3 Departments",
                          "4 Departments",
                          "5 Departments",
                          "6 Departments",
                          "7 Departments",
                          "7+ Departments"
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNumDepts(opt);
                              setSelectedDepts([]); // Reset selected depts when limit changes
                              setIsNumDeptsOpen(false);
                              setToast(`Selected ${opt}. Please select ${opt === "7+ Departments" ? "up to 9" : "exactly " + opt.split(' ')[0]} departments below.`);
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-[#003262]/5 hover:text-[#003262] transition-colors cursor-pointer"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Field 3: Department Names */}
              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Department Names
                </label>
                <div className="relative">
                  <div
                    onClick={() => {
                      if (!numDepts) {
                        setToast("Please select the number of departments first.");
                        return;
                      }
                      setIsNumDeptsOpen(false);
                      setIsDeptNamesOpen(!isDeptNamesOpen);
                    }}
                    className={`w-full px-4 py-3 bg-[#f8f9fa] border rounded-xl outline-none transition-all text-xs font-semibold text-left flex justify-between items-center cursor-pointer select-none ${
                      !numDepts ? 'opacity-60 cursor-not-allowed' : ''
                    } ${
                      isDeptNamesOpen ? 'border-[#24b2f7] ring-2 ring-[#24b2f7]/15' : 'border-[#cbd5e1]'
                    } ${selectedDepts.length > 0 ? 'text-slate-800' : 'text-slate-400'}`}
                  >
                    <span>
                      {!numDepts 
                        ? "Select number of departments first..." 
                        : selectedDepts.length > 0 
                          ? `${selectedDepts.length} of ${getDeptLimit() === 9 ? "7+" : getDeptLimit()} selected`
                          : "Select departments..."}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDeptNamesOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isDeptNamesOpen && (
                    <>
                      {/* Click outside backdrop */}
                      <div className="fixed inset-0 z-40 bg-transparent" onClick={(e) => { e.stopPropagation(); setIsDeptNamesOpen(false); }}></div>
                      
                      <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-[#cbd5e1] rounded-xl shadow-xl py-1 max-h-60 overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2 duration-150 text-left">
                        {[
                          "Retail Banking Department",
                          "Corporate Banking Department",
                          "Credit & Loans Department",
                          "Risk Management Department",
                          "Compliance Department",
                          "Treasury Department",
                          "Information Technology (IT) Department",
                          "Human Resources (HR) Department",
                          "Internal Audit Department"
                        ].map((opt) => {
                          const isSelected = selectedDepts.includes(opt);
                          const limit = getDeptLimit();
                          const isLimitReached = selectedDepts.length >= limit;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isSelected) {
                                  setSelectedDepts(selectedDepts.filter(d => d !== opt));
                                } else {
                                  if (isLimitReached) {
                                    setToast(`Limit reached: You can only select up to ${limit} department${limit > 1 ? 's' : ''}.`);
                                    return;
                                  }
                                  setSelectedDepts([...selectedDepts, opt]);
                                }
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer flex justify-between items-center ${
                                isSelected 
                                  ? 'bg-[#003262]/5 text-[#003262]' 
                                  : 'text-slate-700 hover:bg-[#003262]/5 hover:text-[#003262]'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <CheckCircle2 className="h-4 w-4 text-[#003262]" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Selected Departments Toggles (Pills) */}
                {selectedDepts.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in duration-200">
                    {selectedDepts.map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => {
                          setSelectedDepts(selectedDepts.filter(d => d !== dept));
                          setToast(`Removed ${dept.split(' ')[0]}`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003262]/5 hover:bg-rose-50 border border-[#cbd5e1] hover:border-rose-200 text-[#003262] hover:text-rose-600 rounded-full text-[11px] font-black tracking-wide uppercase transition-all duration-200 cursor-pointer shadow-sm"
                        title={`Click to remove ${dept}`}
                      >
                        <span>{dept}</span>
                        <X className="h-3.5 w-3.5 rounded-full hover:bg-rose-100 p-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Save button */}
              <div className="pt-4 flex justify-start">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#001b3d] hover:bg-[#002f6c] text-white text-xs font-black rounded-xl hover:shadow-lg transition-all uppercase tracking-wider cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Save Details
                </button>
              </div>

            </form>
             
             {/* Spacer to guarantee the dropdowns have plenty of vertical room to open downwards */}
             <div className="h-48"></div>
             </div>
           </div>
        )}

        {/* SURVEILLANCE SCREEN STATE - LIGHT REGULATORY ASSIGNMENTS VIEW */}
        {activeTab === 'surveillance' && (
          <div className="flex-grow overflow-y-auto custom-scrollbar w-full text-left bg-[#f8f9fa]">
            <div className="p-10 md:p-14 pb-24 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
              
              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#001b3d] font-public tracking-tight leading-none">
                  {currentLanguage === 'hi' ? 'निगरानी' : 'Surveillance'}
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
                  Upload sovereign policy documents or internal directives for autonomous risk evaluation and legal alignment verification.
                </p>
              </div>

              {/* Main Assignments Card Container */}
              <div className="w-full bg-[#1c7093] rounded-3xl p-8 shadow-2xl border border-white/10 text-white flex flex-col space-y-6">
                
                {/* Header Row */}
                <div className="flex justify-between items-center text-xs font-black tracking-widest text-white/95 select-none uppercase px-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4.5 w-4.5 text-[#FDB515]" />
                    <span>TASK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Folder className="h-4.5 w-4.5 text-[#FDB515]" />
                    <span>DEPARTMENT NAME</span>
                  </div>
                </div>

                {/* Inner Container */}
                <div className="bg-[#124d67] rounded-2xl p-6 flex flex-col space-y-6">
                  
                  {/* Task Row 1 */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner">
                    <div className="space-y-2 text-left max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                        <span className="text-[10px] bg-orange-500/20 text-orange-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">High Priority</span>
                      </div>
                      <h4 className="text-lg font-black text-white">Core Ledger Integrity Check</h4>
                      <p className="text-xs text-white/70 font-semibold leading-relaxed">
                        Continuous audit monitoring of the main accounting ledger and sovereign financial compliance vectors.
                      </p>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-white/60 pt-1">
                        <span>Ledger Nodes Checked: 8,530</span>
                        <span className="text-emerald-350">RBI Standard Verified</span>
                      </div>
                      <div className="space-y-1.5 pt-1.5 max-w-xs">
                        <div className="flex justify-between text-[10px] font-extrabold text-white/70">
                          <span>Progress</span>
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
                        Technology &amp; Security
                      </span>
                    </div>
                  </div>

                  {/* Task Row 2 */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner">
                    <div className="space-y-2 text-left max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Compliant</span>
                        <span className="text-[10px] bg-slate-500/20 text-slate-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Medium Priority</span>
                      </div>
                      <h4 className="text-lg font-black text-white">Sovereign Regulatory Sync</h4>
                      <p className="text-xs text-white/70 font-semibold leading-relaxed">
                        Ensuring real-time synchronization with RBI circulars and regulatory directives across main operations.
                      </p>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-white/60 pt-1">
                        <span>Sync Integrity: 99.98%</span>
                        <span className="text-emerald-300">0.4s Delay</span>
                      </div>
                      <div className="space-y-1.5 pt-1.5 max-w-xs">
                        <div className="flex justify-between text-[10px] font-extrabold text-white/70">
                          <span>Progress</span>
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
                        Risk &amp; Compliance
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* CONTROL CENTER SCREEN STATE - Obsidan cybersecurity dark theme matching image 1 */}
        {!isLightTheme && (
          <div className="flex-grow overflow-y-auto custom-scrollbar w-full bg-[#030712]">
            <div className="p-10 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-300 text-left">
            
            {/* Headers */}
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white font-public tracking-tight uppercase flex items-center gap-3">
                {currentLanguage === 'hi' ? 'प्रशासनिक संप्रभु निगरानी' : 'AUDIT CONTROL CENTER'}
                <span className="text-[10px] tracking-widest font-black uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full leading-none flex items-center gap-1 shadow-sm animate-pulse">
                  ACTIVE OVERSIGHT
                </span>
              </h1>
              <p className="text-slate-400 text-sm font-semibold max-w-3xl leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'संप्रभु नियमों, डेटा स्थानीयकरण और विसंगतियों के खिलाफ वास्तविक समय में विश्लेषक और सिस्टम गतिविधि को ट्रैक करें।'
                  : 'Assess sovereign data ingestion, active analyst queues, CPU threshold metrics, and system-wide threat clearance rates in real-time.'}
              </p>
            </div>

            {/* Four metric boxes matching Mock-up */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
              
              {/* Box 1: ACTIVE ANALYSTS */}
              <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 neon-glow-green">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  ACTIVE ANALYSTS
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-extrabold text-white">14</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-dot animate-pulse"></span>
                </div>
                <div className="flex">
                  <span className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    LIVE OVERSIGHT
                  </span>
                </div>
              </div>

              {/* Box 2: SCANNED QUEUE */}
              <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 neon-glow-cyan">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  SCANNED QUEUE
                </span>
                <span className="text-4xl font-extrabold text-white">142</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                  TOTAL CHECKED DIRECTIVES
                </span>
              </div>

              {/* Box 3: INFRACTIONS RAISED */}
              <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 neon-glow-red">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  INFRACTIONS RAISED
                </span>
                <span className="text-4xl font-extrabold text-red-500">8</span>
                <div className="flex">
                  <span className="text-[9px] font-black uppercase text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                    ACTION DEMANDED
                  </span>
                </div>
              </div>

              {/* Box 4: SERVER INTEGRITY */}
              <div className="bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 neon-glow-green">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  SERVER INTEGRITY
                </span>
                <span className="text-4xl font-extrabold text-emerald-500">99.98%</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                  SHA-256 VALIDATED
                </span>
              </div>

            </div>

            {/* Split panel: Telemetry resource monitor & log ledgers */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Telemetry charts */}
              <div className="lg:col-span-5 bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <h3 className="text-sm font-black text-[#24b2f7] uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
                  <Cpu className="h-4.5 w-4.5 text-[#24b2f7]" />
                  RESOURCE TELEMETRY
                </h3>

                <div className="space-y-4">
                  {/* CPU bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>CPU Threshold</span>
                      <span className="text-white font-extrabold">{cpuUsage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-[#24b2f7] transition-all duration-500" style={{ width: `${cpuUsage}%` }}></div>
                    </div>
                  </div>

                  {/* RAM bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>RAM Allocation</span>
                      <span className="text-white font-extrabold">{ramUsage} GB / 16.0 GB</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#24b2f7] to-indigo-600 transition-all duration-500" style={{ width: `${(ramUsage / 16) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="border border-white/5 bg-[#030712] p-4 rounded-xl space-y-1 text-xs">
                  <p className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">REGISTRY STATUS</p>
                  <p className="font-extrabold text-[#24b2f7] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    SYNCED WITH CENTRAL GATEWAY
                  </p>
                </div>
              </div>

              {/* Event logs ledger */}
              <div className="lg:col-span-7 bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h3 className="text-sm font-black text-[#24b2f7] uppercase tracking-wider flex items-center gap-2">
                    <Database className="h-4.5 w-4.5 text-[#24b2f7]" />
                    SOVEREIGN EVENT AUDITING LEDGER
                  </h3>
                  <button 
                    onClick={() => {
                      setToast("Refreshing audit logs...");
                      setLogs(prev => [
                        { id: Date.now(), time: new Date().toTimeString().split(' ')[0], type: 'SUCCESS', msg: 'System integrity snapshot saved successfully' },
                        ...prev
                      ]);
                    }}
                    className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                    title="Refresh logs"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto max-h-[170px] custom-scrollbar space-y-3 pr-2 text-xs">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-3 bg-[#030712] border border-white/5 rounded-xl hover:border-white/10 transition-all">
                      <span className="text-[10px] font-mono text-slate-400 font-bold mt-0.5">{log.time}</span>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded leading-none ${
                        log.type === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' :
                        log.type === 'WARNING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' :
                        'bg-slate-800 text-slate-400'
                      }`}>{log.type}</span>
                      <p className="text-slate-350 font-semibold leading-normal text-left">{log.msg}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Access control and rules config panels styled in tactical dark obsidian */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
              
              {/* Access Clearance Desks Management */}
              <div className="lg:col-span-5 bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-black text-[#24b2f7] uppercase tracking-wider border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                    <Users className="h-4.5 w-4.5 text-[#24b2f7]" />
                    Desks Access Provisioning
                  </h3>

                  <div className="flex gap-2 bg-[#030712] p-1 border border-white/5 rounded-xl mb-4 text-xs font-bold w-full text-center">
                    {Object.keys(employees).map(k => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSelectedEmployee(k)}
                        className={`flex-grow py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                          selectedEmployee === k ? 'bg-[#0ea5e9] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {employees[k].name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                    {[
                      { id: 'risk', label: 'Customer Banking Desk' },
                      { id: 'geospatial', label: 'Loans & Finance Desk' },
                      { id: 'policy', label: 'Risk & Compliance Desk' },
                      { id: 'ops', label: 'Operation & Support Desk' }
                    ].map(desk => {
                      const hasAccess = !!employees[selectedEmployee].clearing[desk.id];
                      return (
                        <label
                          key={desk.id}
                          className="flex items-center gap-3 p-2 bg-[#030712] border border-white/5 rounded-xl cursor-pointer hover:border-white/10"
                        >
                          <input
                            type="checkbox"
                            checked={hasAccess}
                            onChange={() => toggleEmployeePermission(desk.id)}
                            className="rounded border-white/10 bg-[#090d16] text-[#0ea5e9] focus:ring-[#0ea5e9]/15 h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-350">{desk.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleUpdateAccess}
                  className="w-full mt-4 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Apply Provisioning
                </button>
              </div>

              {/* Policy Rules Config Toggles */}
              <div className="lg:col-span-7 bg-[#090d16] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-black text-[#24b2f7] uppercase tracking-wider border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                    <Sliders className="h-4.5 w-4.5 text-[#24b2f7]" />
                    Global Statute Rules Engine
                  </h3>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                    {policies.map(p => (
                      <div key={p.id} className="flex justify-between items-center p-3.5 bg-[#030712] border border-white/5 rounded-xl hover:border-white/10">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={p.active}
                            onChange={() => togglePolicy(p.id)}
                            className="rounded border-white/10 bg-[#090d16] text-[#0ea5e9] focus:ring-[#0ea5e9]/15 h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-350">{p.label.split(':')[0]}</span>
                        </label>
                        <div className="flex gap-1 bg-[#090d16] p-0.5 border border-white/5 rounded-lg text-[9.5px] font-black uppercase">
                          {['Medium', 'High', 'Critical'].map(s => (
                            <button
                              key={s}
                              onClick={() => handleSeverityChange(p.id, s)}
                              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                                p.severity === s ? 'bg-[#0ea5e9] text-white' : 'text-slate-550 hover:text-slate-300'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Cryptographic validated console ledger */}
            <div className="bg-[#090d16] border border-white/5 text-white rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="h-4.5 w-4.5 text-[#24b2f7]" />
                  AURIS Secure Terminal Console
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot animate-pulse"></span>
              </div>

              <div className="max-h-[140px] overflow-y-auto custom-scrollbar space-y-1 font-mono text-[11px] leading-relaxed text-slate-300 pr-2 pb-4 text-left">
                {cryptHistory.map((line, idx) => (
                  <pre key={idx} className="whitespace-pre-wrap break-all">{line}</pre>
                ))}
                <div ref={consoleEndRef} />
              </div>

              <form onSubmit={handleConsoleSubmit} className="border-t border-white/5 pt-4 flex gap-3">
                <span className="font-mono text-xs font-black text-[#24b2f7] mt-2">root@auris:~#</span>
                <input
                  type="text"
                  value={cryptInput}
                  onChange={(e) => setCryptInput(e.target.value)}
                  placeholder="Enter administrative directive sequence... (e.g. 'help', 'status', 'verify')"
                  className="flex-grow bg-[#030712] border border-white/5 rounded-xl px-4 py-2 text-xs font-mono outline-none text-[#24b2f7] placeholder-slate-600 focus:border-[#24b2f7]/50"
                />
                <button type="submit" className="bg-[#24b2f7] hover:bg-[#0ea5e9] text-white py-2 px-5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  Execute
                </button>
              </form>

              <div className="pt-2 flex justify-start gap-4">
                <button
                  onClick={handleSignLedger}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black rounded-lg transition-all uppercase tracking-wider cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Sign Compliance Ledger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </main>

      {/* SIGN OUT CONFIRMATION MODAL OVERLAY */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left ${
            isLightTheme ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <div className="p-6 space-y-6">
              
              <div className={`flex items-center gap-3 border-b pb-4 ${isLightTheme ? 'border-slate-100' : 'border-white/5'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isLightTheme ? 'bg-rose-50 border border-rose-100 text-rose-500' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                }`}>
                  <LogoutIcon className="h-5 w-5" />
                </div>
                <h3 className={`text-lg font-black uppercase tracking-wider leading-none ${isLightTheme ? 'text-slate-800' : 'text-white'}`}>
                  {currentLanguage === 'hi' ? 'लॉग आउट की पुष्टि करें' : 'Confirm Exit'}
                </h3>
              </div>

              <p className={`text-xs font-semibold leading-relaxed ${isLightTheme ? 'text-slate-500' : 'text-slate-350'}`}>
                {currentLanguage === 'hi'
                  ? 'क्या आप वास्तव में प्रशासनिक सत्र समाप्त करना चाहते हैं? सभी सक्रिय निगरानी डेस्क संकलित रहेंगे।'
                  : 'Are you sure you want to terminate your administrative session? All system audits and operational rule matrices will remain synced with the secure ledger.'}
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsSignOutModalOpen(false)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 border ${
                    isLightTheme 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200' 
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                  }`}
                >
                  {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    setIsSignOutModalOpen(false);
                    onNavigate('role-selection');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 ${
                    isLightTheme 
                      ? 'bg-[#001b3d] hover:bg-rose-600 text-white' 
                      : 'bg-rose-650 hover:bg-rose-600 text-white'
                  }`}
                >
                  {currentLanguage === 'hi' ? 'हां, लॉग आउट करें' : 'Confirm Sign Out'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

