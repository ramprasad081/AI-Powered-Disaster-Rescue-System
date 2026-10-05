import { useState } from 'react';
import { 
  AlertTriangle, 
  Cpu, 
  Compass, 
  Users, 
  Bot, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function AIEmergencyFeatures({ onOpenReport, onOpenShelters, onNavigateToPage }) {
  const [sosTriggered, setSosTriggered] = useState(false);
  const [airdropTriggered, setAirdropTriggered] = useState(false);
  const [volunteerJoined, setVolunteerJoined] = useState(false);

  // Row 1: Exactly 3 cards in a row
  const row1Features = [
    {
      id: 'sos-alert',
      title: 'SOS Alert',
      tag: 'INSTANT BROADCAST',
      image: `${import.meta.env.BASE_URL}feat-sos-alert.jpg`,
      tagColor: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
      icon: AlertTriangle,
      iconColor: 'text-[#EF4444]',
      iconBg: 'bg-red-500/15 border-red-500/30',
      borderColor: 'border-red-500/30 hover:border-red-500/60',
      glowClass: 'glow-red',
      description: 'One-touch encrypted satellite beacon broadcasting sub-meter GPS coordinates and flood depth over  mesh uplink.',
      specs: [
        'Starlink direct mesh satellite uplink (<1.2s latency)',
        'Sub-meter pinpoint accuracy (±1.8m GPS lock)',
        'Automatic hovercraft & amphibious craft dispatch assignment',
      ],
      metric: 'Priority 1 Defcon Beacon',
      actionText: sosTriggered ? 'SOS Beacon Transmitted (#SOS-9844)' : 'Broadcast Emergency SOS',
      actionOnClick: () => {
        setSosTriggered(true);
        if (onOpenReport) onOpenReport();
      },
    },
    {
      id: 'ai-risk-prediction',
      title: 'AI Risk Prediction',
      tag: 'NEURAL HYDROLOGY',
      image: `${import.meta.env.BASE_URL}feat-risk-pred.jpg`,
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: Cpu,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
      glowClass: 'shadow-cyan-500/20',
      description: 'Neural networks analyzing rainfall radar and storm surge to forecast flood breaches up to 6 hours in advance.',
      specs: [
        'Predictive inundation modeling at 98.2% historical accuracy',
        'Cyclone landfall wind vector & eye trajectory tracking',
        'Automated early-warning evacuation alerts for lowlands',
      ],
      metric: '6-Hour Advance Inundation Model',
      actionText: 'View Interactive Risk Map',
      actionOnClick: () => {
        if (onNavigateToPage) onNavigateToPage('map');
        const el = document.getElementById('radar');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'shelter-finder',
      title: 'Shelter Finder',
      tag: 'DRY PATH NAVIGATION',
      image: `${import.meta.env.BASE_URL}feat-shelter-find.jpg`,
      tagColor: 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40',
      icon: Compass,
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      glowClass: 'glow-emerald',
      description: 'Real-time navigation directing evacuees along elevated highways and verified dry paths, avoiding submerged roads.',
      specs: [
        'Live shelter capacity & bed availability tracking',
        'Elevation safety rating (+40m to +55m safe high ground)',
        'Turn-by-turn flood-safe directions with emergency contacts',
      ],
      metric: '14 Active High-Ground Hubs',
      actionText: 'Find Nearest Safe Shelter',
      actionOnClick: onOpenShelters,
    },
  ];

  // Row 2: Exactly 2 cards placed below
  const row2Features = [
    {
      id: 'volunteer-network',
      title: 'Volunteer Network',
      tag: 'COMMUNITY CRISIS MESH',
      image: `${import.meta.env.BASE_URL}feat-volunteer-net.jpg`,
      tagColor: 'bg-blue-500/20 text-[#2563EB] border-blue-500/40',
      icon: Users,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-blue-500/15 border-blue-500/30',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
      glowClass: 'glow-blue',
      description: 'Decentralized crisis volunteer coordination mobilizing verified boat owners, first-aid medics, and ham radio operators.',
      specs: [
        'Skill-matched rescue delegation & civilian welfare checks',
        'Encrypted peer-to-peer radio frequency communication channels',
        '2,420+ active community volunteers & 48 civilian rescue boats',
      ],
      metric: '2,420+ Verified Responders',
      actionText: volunteerJoined ? 'Registered in Volunteer Network' : 'Join Volunteer Responder Grid',
      actionOnClick: () => setVolunteerJoined(true),
    },
    {
      id: 'drone-medical',
      title: 'Drone Monitoring & Medical Aid',
      tag: 'THERMAL FLIR & TELEMEDICINE',
      image: `${import.meta.env.BASE_URL}feat-drone-medical.jpg`,
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      icon: Bot,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/15 border-indigo-500/30',
      borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
      glowClass: 'shadow-indigo-500/20',
      description: 'Autonomous FLIR thermal drone swarm detecting trapped survivors, dropping life rafts, and connecting on-call doctors.',
      specs: [
        '36 Autonomous drones conducting 360° survivor heat scans',
        'Precision life raft & emergency medical supply drop winch',
        'Emergency telemedicine link to on-call trauma surgeons (Call 108)',
      ],
      metric: '36 Airborne Units • 24/7 Trauma ICU',
      actionText: airdropTriggered ? 'Emergency Life Raft Deployed' : 'Deploy Drone Emergency Raft',
      actionOnClick: () => setAirdropTriggered(true),
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AI Emergency Features
          </h2>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>CORE SYSTEMS ACTIVE</span>
        </div>
      </div>

      {/* Feature Cards: 3 in top row, 2 below */}
      <div className="space-y-8">
        
        {/* Top Row: 3 Feature Cards */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>PRIMARY INCIDENT SYSTEMS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {row1Features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`glass-panel rounded-3xl p-6 sm:p-7 border ${item.borderColor} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-6 relative group overflow-hidden shadow-2xl ${item.glowClass}`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`p-3.5 rounded-2xl border ${item.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border tracking-wider ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Feature Illustrative Asset Image */}
                    {item.image && (
                      <div className="relative h-36 sm:h-40 w-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all shadow-inner bg-slate-950">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0  from-[#0B1220] via-transparent to-transparent opacity-80"></div>
                      </div>
                    )}bg-gradient-to-t

                    {/* Title & Metric */}
                    <div>
                      <h3 className="font-poppins font-bold text-2xl text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="mt-1 text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{item.metric}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
                      {item.description}
                    </p>

                    {/* Specs List */}
                    <div className="pt-2 space-y-2 border-t border-white/5">
                      {item.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-inter text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={item.actionOnClick}
                      className="w-full py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-blue-600 hover:border-blue-500 text-white font-poppins font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer shadow-md group-hover:shadow-blue-500/20"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: 2 Feature Cards Centered Below */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>COMMUNITY & FIELD DEPLOYMENT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-5xl mx-auto">
            {row2Features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`glass-panel rounded-3xl p-6 sm:p-7 border ${item.borderColor} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-6 relative group overflow-hidden shadow-2xl ${item.glowClass}`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`p-3.5 rounded-2xl border ${item.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border tracking-wider ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Feature Illustrative Asset Image */}
                    {item.image && (
                      <div className="relative h-40 sm:h-44 w-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all shadow-inner bg-slate-950">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0   from-[#0B1220] via-transparent to-transparent opacity-80"></div>
                      </div>
                    )}

                    {/* Title & Metric */}
                    <div>
                      <h3 className="font-poppins font-bold text-2xl text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="mt-1 text-xs font-mono font-semibold text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{item.metric}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
                      {item.description}
                    </p>

                    {/* Specs List */}
                    <div className="pt-2 space-y-2 border-t border-white/5">
                      {item.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-inter text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={item.actionOnClick}
                      className="w-full py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-blue-600 hover:border-blue-500 text-white font-poppins font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer shadow-md group-hover:shadow-blue-500/20"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
