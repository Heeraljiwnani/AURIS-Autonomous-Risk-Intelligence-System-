import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Trigger padlock shackle opening transition
    const tUnlock = setTimeout(() => setIsUnlocked(true), 1200);
    
    // Complete splash screen duration
    const tComplete = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(tUnlock);
      clearTimeout(tComplete);
    };
  }, [onComplete]);

  return (
    <div className="splash-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;800;900&family=Inter:wght@400;600;800&display=swap');

        .splash-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15)), 
                      url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhSOT0Czd6f4T_dXO6GKmtryah04mxLYTQqqQq0Ndyh8vigDZi9VDa3mg9bJ6CnAJiZ28nzMxXAlO3Qe_wkjNDm3kqd5kuU_NaNmfdoYh3ZsBkGeNJL3UsRga2IQmS1RYnjAMWBrw3U4m_5b0aY3CuZdP1zvQwe2-AIwOUNaNFfXMv-1oehpjHjJoQbyqyNegbXjL0TcXNbrWAcsh-QmA0Seqqov7_MvYq80Gv4Tn5bAK7W-T4rdeeXzJpRT0QErmyzpevMfHUMUo');
          background-size: cover;
          background-position: center;
          font-family: 'Public Sans', 'Inter', sans-serif;
          color: #191c1d;
          user-select: none;
          z-index: 9999;
          position: fixed;
          top: 0;
          left: 0;
        }

        /* Centered Frosted Glass Canvas */
        .splash-card {
          width: 280px;
          height: 320px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 2px solid rgba(188, 155, 106, 0.5); /* Metallic Gold border */
          border-radius: 28px;
          box-shadow: 0 20px 45px rgba(0, 50, 98, 0.12); /* Subtle Berkeley Blue shadow */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          animation: cardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Circular radial gradient badge for lock */
        .splash-badge {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(254, 240, 138, 0.4) 0%, rgba(188, 155, 106, 0.25) 100%);
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.9),
            0 8px 24px rgba(0, 50, 98, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease;
        }

        .splash-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #003262; /* Berkeley Blue */
          text-transform: uppercase;
          margin-top: -4px;
        }

        /* Bottom Copyright */
        .splash-footer {
          position: absolute;
          bottom: 30px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          text-align: center;
        }

        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      
      <div className="splash-card">
        {/* Animated Custom Lock Badge */}
        <div className="splash-badge">
          <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shackle loop - moves up and tilts open */}
            <path 
              d="M11 17.5V13C11 8.02944 15.0294 4 20 4C24.9706 4 29 8.02944 29 13V17.5" 
              stroke="#003262" /* Berkeley Blue shackle */
              strokeWidth="4.2" 
              strokeLinecap="round"
              style={{
                transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: '25px 17.5px',
                transform: isUnlocked ? 'translateY(-4.5px) rotate(-14deg)' : 'translateY(0) rotate(0)'
              }}
            />
            {/* Solid Lock Body */}
            <rect x="5" y="17.5" width="30" height="21.5" rx="5.5" fill="#FDB515" /> {/* California Gold lock body */}
            {/* Padlock Keyhole Dot */}
            <circle cx="20" cy="26" r="2.2" fill="#003262" />
            <rect x="18.8" y="27.5" width="2.4" height="4.5" rx="0.5" fill="#003262" />
          </svg>
        </div>

        {/* Brand label */}
        <span className="splash-title">AURIS</span>
      </div>

      <div className="splash-footer">
        {"\u00A9"} 2024 AURIS Intelligence. Sovereign Security.
      </div>
    </div>
  );
}
