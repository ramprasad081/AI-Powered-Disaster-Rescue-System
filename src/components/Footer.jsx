import { 
  Radio, 
  Phone, 
  ExternalLink, 
  ArrowUp,
  Landmark,
  ShieldCheck
} from 'lucide-react';

export default function Footer({ onOpenReport, onOpenShelters }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Emergency Helpline Numbers
  const helplines = [
    { label: 'National Emergency', number: '112', color: 'text-red-400', badge: 'DEFCON 1' },
    { label: 'Disaster Management (NDMA)', number: '1078', color: 'text-blue-400', badge: '24/7 TOLL FREE' },
    { label: 'Medical & Ambulance Service', number: '108', color: 'text-emerald-400', badge: 'PARAMEDIC' },
    { label: 'Coast Guard & Maritime Rescue', number: '1554', color: 'text-cyan-400', badge: 'BOAT RESCUE' },
    { label: 'Fire & Flood Rescue Squad', number: '101', color: 'text-amber-400', badge: 'RAPID RESPONSE' },
    { label: 'Offline SMS Distress Dispatch', number: '88200', color: 'text-white', badge: 'SMS ONLY' },
  ];

  // Government & Regulatory Agency Badges/Logos
  const govAgencies = [
    {
      code: 'NDMA',
      name: 'National Disaster Management Authority',
      role: 'Apex Crisis Command & Mitigation',
      sealColor: 'border-red-500/40 text-red-400 bg-red-500/10'
    },
    {
      code: 'NDRF',
      name: 'National Disaster Response Force',
      role: 'Specialized Multi-Hazard Search & Rescue',
      sealColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10'
    },
    {
      code: 'IMD',
      name: 'Meteorological Department (Cyclone Radar)',
      role: 'Doppler Radar Storm Surge Tracking',
      sealColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      code: 'WHO',
      name: 'World Health Organization Emergencies',
      role: 'Global Health Emergency Relief Protocol',
      sealColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      code: 'ISRO',
      name: 'Disaster Management Support Program',
      role: 'Satellite Earth Observation & Flood Inundation',
      sealColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    }
  ];

  // Social Network Channels
  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.4 9.74V9.93H5.06v8.57z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      name: 'Telegram SOS Mesh',
      href: 'https://telegram.org',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="glass-panel-heavy border-t border-white/10 mt-20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Status (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden border border-red-500/40 shadow-lg shadow-red-500/20 bg-slate-950">
                <img 
                  src={`${import.meta.env.BASE_URL}disaster-rescue-logo.jpg`} 
                  alt="Disaster Rescue AI Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-poppins font-bold text-2xl text-white tracking-tight">
                Disaster Rescue <span className="text-[#EF4444]">AI</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 font-inter leading-relaxed">
              AI-Powered emergency response command center integrating satellite mesh communications, autonomous rescue fleets, and real-time flood intelligence.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>CENTRAL COMMAND NETWORK: OPERATIONAL</span>
              </div>
              <div className="text-slate-400 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span>STARLINK & GEO-SATELLITE SYNC ACTIVE</span>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                Emergency Broadcast Channels
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-white/40 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Emergency Helpline Numbers (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-400" />
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Emergency Helpline Numbers
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {helplines.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-300 font-medium block">{item.label}</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  
                  <a 
                    href={`tel:${item.number}`}
                    className={`font-mono text-base font-bold ${item.color} hover:underline pl-3`}
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation & Action (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Tactical Quick Access
            </h4>

            <div className="space-y-2 text-sm font-inter">
              <button 
                onClick={onOpenReport}
                className="w-full py-2.5 px-3.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-[#EF4444] font-semibold text-xs font-mono flex items-center justify-between transition-all cursor-pointer"
              >
                <span>TRANSMIT SOS BEACON</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20">DEFCON 1</span>
              </button>

              <button 
                onClick={onOpenShelters}
                className="w-full py-2.5 px-3.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-[#2563EB] font-semibold text-xs font-mono flex items-center justify-between transition-all cursor-pointer"
              >
                <span>FIND SAFE HIGH GROUND</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20">14 HUBS</span>
              </button>
            </div>

            <div className="pt-2">
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li>
                  <a href="#radar" className="hover:text-white transition-colors flex items-center justify-between py-1 border-b border-white/5">
                    <span>Tactical Radar & Flood Zones</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors flex items-center justify-between py-1 border-b border-white/5">
                    <span>AI Risk Prediction & Drones</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="hover:text-white transition-colors flex items-center justify-between py-1 border-b border-white/5">
                    <span>Mission Execution Timeline</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full mt-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>RETURN TO TOP</span>
            </button>
          </div>

        </div>

        {/* Government & Relief Agency Seals / Logos Banner */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Landmark className="w-4 h-4 text-blue-400" />
            <span className="font-bold tracking-wider uppercase text-slate-300">
              Government & International Relief Agency Integration:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {govAgencies.map((agency) => (
              <div 
                key={agency.code}
                className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between space-y-2 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-extrabold border ${agency.sealColor}`}>
                    {agency.code}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div>
                  <h5 className="font-poppins font-semibold text-xs text-white leading-tight">
                    {agency.name}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-inter mt-1 leading-snug">
                    {agency.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Security Strip */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Disaster Rescue AI System. All rights reserved. Designed for life preservation & disaster command operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              256-BIT SATELLITE ENCRYPTION
            </span>
            <span>•</span>
            <span>GOV-AUTH CERTIFIED</span>
            <span>•</span>
            <span>LATENCY: 24ms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
