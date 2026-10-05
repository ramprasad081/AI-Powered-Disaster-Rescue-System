import { useState } from 'react';
import { ShieldAlert, Radio, Volume2, VolumeX, AlertTriangle, Menu, X, Compass, Sparkles, Activity } from 'lucide-react';

export default function Navbar({ onOpenReport, onOpenShelters, soundEnabled, setSoundEnabled, playAlertSound, activePage = 'all', onSelectPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next && playAlertSound) {
      playAlertSound();
    }
  };

  const handleNavClick = (pageId, anchorId) => {
    if (onSelectPage) {
      onSelectPage(pageId);
    }
    setMobileMenuOpen(false);
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel-heavy border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('all', 'overview')}>
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden border border-red-500/40 shadow-lg shadow-red-500/20 bg-slate-950 group">
            <img 
              src="/disaster-rescue-logo.jpg" 
              alt="Disaster Rescue AI Logo" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-poppins font-bold text-lg sm:text-xl tracking-tight text-white">
                Disaster Rescue <span className="text-[#EF4444]">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-emerald-500/10 text-[#10B981] border border-emerald-500/30">
                DEFCON 1 ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              COMMAND CENTER • SATELLITE MESH ONLINE
            </p>
          </div>
        </div>

        {/* Desktop Multi-Page Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('overview', 'disaster-overview')}
            className={`hover:text-white transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
              activePage === 'overview' ? 'text-white font-bold' : ''
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Overview
          </button>

          <button
            onClick={() => handleNavClick('map', 'radar')}
            className={`hover:text-[#2563EB] transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
              activePage === 'map' ? 'text-[#2563EB] font-bold' : ''
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#2563EB]" />
            Rescue Map
          </button>

          <button
            onClick={() => handleNavClick('features', 'features')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              activePage === 'features'
                ? 'bg-blue-600/30 text-white border-blue-400 shadow-md shadow-blue-500/20 font-bold'
                : 'text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/10'
            }`}
          >
            <span>AI Features</span>
          </button>

          <button
            onClick={() => handleNavClick('timeline', 'timeline')}
            className={`hover:text-amber-400 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
              activePage === 'timeline' ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span>Timeline</span>
          </button>

          <button
            onClick={() => handleNavClick('shelters', 'shelters')}
            className={`hover:text-[#10B981] transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
              activePage === 'shelters' ? 'text-[#10B981] font-bold' : ''
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#10B981]" />
            Safe Shelters
          </button>

          <button
            onClick={() => handleNavClick('video', 'simulation-video')}
            className={`hover:text-red-400 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
              activePage === 'video' ? 'text-red-400 font-bold' : ''
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Simulation
          </button>

          <button
            onClick={() => handleNavClick('fleet', 'fleet')}
            className={`hover:text-white transition-colors duration-200 cursor-pointer ${
              activePage === 'fleet' ? 'text-white font-bold' : ''
            }`}
          >
            Drone Fleet
          </button>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Emergency Audio Enabled' : 'Audio Muted'}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer ${
              soundEnabled
                ? 'bg-red-500/10 border-red-500/40 text-[#EF4444] shadow-sm shadow-red-500/20'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#EF4444]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenReport}
            className="relative px-4 py-2.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-semibold text-sm shadow-lg shadow-red-500/30 flex items-center gap-2 animate-emergency-pulse transition-all duration-200 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span>REPORT SOS</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenReport}
            className="px-3 py-1.5 rounded-lg bg-[#EF4444] text-white font-semibold text-xs flex items-center gap-1 shadow-md shadow-red-500/30"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            SOS
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-heavy border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-2 font-medium text-slate-200 text-sm">
            <button 
              onClick={() => handleNavClick('overview', 'disaster-overview')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Overview
            </button>
            <button 
              onClick={() => handleNavClick('map', 'radar')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left cursor-pointer"
            >
              <Radio className="w-4 h-4 text-[#2563EB]" />
              Rescue Map
            </button>
            <button 
              onClick={() => handleNavClick('features', 'features')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-500/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Emergency Features
            </button>
            <button 
              onClick={() => handleNavClick('timeline', 'timeline')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left text-amber-300 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              Emergency Timeline
            </button>
            <button 
              onClick={() => handleNavClick('shelters', 'shelters')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#10B981]" />
              Safe Shelters
            </button>
            <button 
              onClick={() => handleNavClick('video', 'simulation-video')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left text-red-300 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Live Simulation Video
            </button>
            <button 
              onClick={() => handleNavClick('fleet', 'fleet')}
              className="p-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-2 text-left cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              Drone Fleet & Protocols
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport();
              }}
              className="w-full py-3 rounded-xl bg-[#EF4444] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
            >
              <AlertTriangle className="w-5 h-5" />
              Report Emergency (Red)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShelters();
              }}
              className="w-full py-3 rounded-xl bg-[#2563EB] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <Compass className="w-5 h-5" />
              Find Safe Shelter (Blue)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
