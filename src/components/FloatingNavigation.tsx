import React, { useEffect, useState } from 'react';
import { Home, GitBranch, Target, Flag, MessageSquare } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'workflow', label: 'Workflow', icon: GitBranch },
  { id: 'aim', label: 'Aim', icon: Target },
  { id: 'goals', label: 'Goals', icon: Flag },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare }
];

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    // 1. Intersection Observer configuration
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find entries that are intersecting the viewport
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Find the one that has the highest intersection ratio
        const bestEntry = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        setActiveSection(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-33% 0px -33% 0px', // Active detection zone in middle 34% of viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    });

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 2. Scroll listener fallback for top/bottom edge cases
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Force Home active when scrolled to the very top
      if (scrollPosition < 80) {
        setActiveSection('home');
        return;
      }

      // Force Feedback active when scrolled to the bottom
      if (scrollPosition + windowHeight >= docHeight - 80) {
        setActiveSection('feedback');
        return;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      setActiveSection(id);
    }
  };

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);

  return (
    <nav 
      className="fixed z-50 flex flex-col items-center gap-5 bg-transparent select-none transition-all duration-300
                 bottom-6 right-6 
                 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-6"
      aria-label="Floating Navigation Menu"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeSection;

        return (
          <div 
            key={item.id}
            className="relative flex items-center justify-center h-11 w-11 flex-shrink-0 group"
          >
            <button
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-300 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                isActive 
                  ? 'text-emerald-500 scale-110 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.45)]' 
                  : 'text-emerald-800 hover:text-emerald-600 filter drop-shadow-[0_2px_4px_rgba(6,78,59,0.2)]'
              }`}
              aria-label={`Scroll to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 transition-transform duration-300" />
            </button>

            {/* Tooltip visible on hover (floats left, glassmorphic style) */}
            <div 
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 scale-90 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-300 ease-out z-50"
              role="tooltip"
            >
              <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.35)] whitespace-nowrap">
                {item.label}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
