export default function RoleSelectionPage({ onSelectRole, onNavigate }) {
  return (
    <div className="role-selection-container min-h-screen flex flex-col justify-between items-center py-10 px-4 select-none relative overflow-hidden">
      
      {/* Back button to go back to home (landing page) with premium glassmorphism */}
      <button 
        onClick={() => onNavigate('home')}
        className="absolute top-6 left-6 flex items-center gap-1.5 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[11px] font-black text-white hover:bg-white/20 hover:border-white/30 hover:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-all duration-200 cursor-pointer active:scale-95 z-50 uppercase tracking-wider"
        title="Back to Landing Page"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back</span>
      </button>

      {/* Premium glassmorphism design system styles */}
      <style>{`
        .role-selection-container {
          background-image: linear-gradient(rgba(4, 15, 12, 0.25), rgba(4, 15, 12, 0.35)), url('/role-selection-bg.jpg');
          background-size: cover;
          background-position: 30% center;
          font-family: 'Public Sans', 'Inter', -apple-system, sans-serif;
        }

        /* Access card styled with glassmorphism */
        .title-card {
          width: 100%;
          max-w-[360px];
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1);
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .title-brand {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .title-subtitle {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #10b981; /* Premium Emerald/Mint color matching green background */
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
          text-transform: uppercase;
        }

        /* Selection Cards wrapper */
        .cards-grid {
          display: flex;
          gap: 20px;
          margin-top: 24px;
          width: 100%;
          max-w-[360px];
          justify-content: center;
        }

        /* Selection cards with premium glassmorphism */
        .selection-card {
          flex: 1;
          height: 156px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px) saturate(120%);
          -webkit-backdrop-filter: blur(20px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.25),
                      inset 0 1px 1px rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .selection-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 25px 45px -15px rgba(16, 185, 129, 0.3),
                      inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .selection-card:active {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.08);
        }

        .card-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .selection-card:hover .card-icon-wrapper {
          transform: scale(1.08);
        }

        .card-label {
          font-size: 13.5px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.03em;
        }

        /* Copyright Footer */
        .footer-copyright {
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          text-align: center;
          margin-top: auto;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Top spacer to balance the layout vertically */}
      <div className="flex-shrink-0 h-4 md:h-12"></div>

      {/* Access Flow Container */}
      <div className="flex flex-col items-center justify-center flex-grow">
        
        {/* Logo Card with Glassmorphism */}
        <div className="title-card flex flex-col items-center">
          {/* Logo Symbol inside a perfect rounded square glass box */}
          <div className="overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.35)] mb-5 flex items-center justify-center border border-white/15">
            <img 
              src="/auris-logo.png" 
              alt="AURIS Symbol" 
              className="h-20 w-20 object-cover"
            />
          </div>
          <h1 className="title-brand">AURIS</h1>
          <p className="title-subtitle">Secure Access Point</p>
        </div>

        {/* Dynamic Selection Cards Grid */}
        <div className="cards-grid">
          
          {/* Admin Role Selection Card */}
          <div 
            onClick={() => onSelectRole('admin')}
            className="selection-card"
            title="Access system as Administrator"
          >
            <div className="card-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Shield Path */}
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                {/* Padlock loop inside shield */}
                <path d="M9.5 11.5v-1.5a2.5 2.5 0 0 1 5 0v1.5" />
                {/* Padlock body inside shield */}
                <rect x="8.5" y="11.5" width="7" height="5" rx="1.5" fill="#ffffff" />
                {/* Padlock keyhole */}
                <circle cx="12" cy="14" r="0.75" fill="#10b981" />
              </svg>
            </div>
            <span className="card-label">Admin</span>
          </div>

          {/* Employee Role Selection Card */}
          <div 
            onClick={() => onSelectRole('employee')}
            className="selection-card"
            title="Access system as Employee"
          >
            <div className="card-icon-wrapper">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Lanyard Ring/Hook */}
                <path d="M10 2.5h4" />
                <path d="M12 2.5v1.5" />
                {/* ID badge frame */}
                <rect x="5.5" y="4" width="13" height="17.5" rx="2" />
                {/* Badge portrait border */}
                <circle cx="12" cy="9.5" r="2.5" />
                <path d="M8.5 16.5c0-1.8 1.5-2.8 3.5-2.8s3.5 1 3.5 2.8" />
                {/* Text lines */}
                <line x1="8.5" y1="18.5" x2="15.5" y2="18.5" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="card-label">Employee</span>
          </div>

        </div>

      </div>

      {/* Copyright Footer */}
      <footer className="footer-copyright pt-8">
        ©2024 AURIS Solutions. All Rights Reserved.
      </footer>

    </div>
  );
}
