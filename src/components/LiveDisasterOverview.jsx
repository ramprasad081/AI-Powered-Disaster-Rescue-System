import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  LifeBuoy, 
  ShieldAlert, 
  Building2, 
  Radio, 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';

// Smooth 60fps Count-Up Animation Hook
function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo easing function for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * end);
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function LiveDisasterOverview({ onOpenReport, onOpenShelters }) {
  // Live simulated metric values that can subtly update to show live responsiveness
  const [stats, setStats] = useState({
    activeEmergencies: 47,
    peopleRescued: 1284,
    availableTeams: 38,
    safeShelters: 24,
  });

  const [lastUpdated, setLastUpdated] = useState('Just now');

  // Subtle real-time live simulation ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        peopleRescued: prev.peopleRescued + Math.floor(Math.random() * 2),
      }));
      setLastUpdated('Updated 2s ago');
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: 'active-emergencies',
      title: 'Active Emergencies',
      number: stats.activeEmergencies,
      suffix: '',
      icon: AlertTriangle,
      iconColor: 'text-[#EF4444]',
      iconBg: 'bg-red-500/10 border-red-500/30',
      borderColor: 'border-red-500/30 hover:border-red-500/60',
      glowClass: 'glow-red',
      statusIndicator: {
        text: 'CRITICAL (DEFCON 1)',
        color: 'text-[#EF4444]',
        bg: 'bg-red-500/15 border-red-500/40',
        dotColor: 'bg-[#EF4444]',
        pulse: true,
      },
      badgeTrend: '+3 new in last 15m',
      trendColor: 'text-red-400',
      description: '18 Flash floods, 12 Cyclone gale zones, 17 Structural traps.',
      actionText: 'Report Incident',
      actionOnClick: onOpenReport,
    },
    {
      id: 'people-rescued',
      title: 'People Rescued',
      number: stats.peopleRescued,
      suffix: '+',
      icon: LifeBuoy,
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      glowClass: 'glow-emerald',
      statusIndicator: {
        text: 'RAPID EVACUATION ONGOING',
        color: 'text-[#10B981]',
        bg: 'bg-emerald-500/15 border-emerald-500/40',
        dotColor: 'bg-[#10B981]',
        pulse: true,
      },
      badgeTrend: '↑ 98.6% Survival Rate',
      trendColor: 'text-emerald-400',
      description: 'All survivors transported to elevated hubs with trauma triage.',
      actionText: 'View Evacuation Log',
      actionOnClick: () => {
        const el = document.getElementById('timeline');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'available-teams',
      title: 'Available Rescue Teams',
      number: stats.availableTeams,
      suffix: ' Units',
      icon: ShieldAlert,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-blue-500/10 border-blue-500/30',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
      glowClass: 'glow-blue',
      statusIndicator: {
        text: 'HIGH READINESS DISPATCH',
        color: 'text-[#2563EB]',
        bg: 'bg-blue-500/15 border-blue-500/40',
        dotColor: 'bg-[#2563EB]',
        pulse: true,
      },
      badgeTrend: '16 Active • 22 Standby',
      trendColor: 'text-blue-400',
      description: 'NDRF squads, amphibious hovercraft crews & AI drone operators.',
      actionText: 'Inspect Fleet Status',
      actionOnClick: () => {
        const el = document.getElementById('fleet');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'safe-shelters',
      title: 'Safe Shelters',
      number: stats.safeShelters,
      suffix: ' Hubs',
      icon: Building2,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      borderColor: 'border-emerald-500/25 hover:border-emerald-500/50',
      glowClass: 'glow-emerald',
      statusIndicator: {
        text: '100% DRY & OPERATIONAL',
        color: 'text-[#10B981]',
        bg: 'bg-emerald-500/15 border-emerald-500/40',
        dotColor: 'bg-[#10B981]',
        pulse: false,
      },
      badgeTrend: '2,548 Beds Vacant',
      trendColor: 'text-emerald-300',
      description: 'High-elevation shelters with food, clean water & power generators.',
      actionText: 'Find Nearest Safe Shelter',
      actionOnClick: onOpenShelters,
    },
  ];

  return (
    <section id="disaster-overview" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-[#EF4444] border border-red-500/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            REAL-TIME SATELLITE & SENSOR TELEMETRY
          </div>
          
          <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Live Disaster Overview
          </h2>
          
          <p className="text-slate-400 font-inter text-sm sm:text-base max-w-2xl">
            Real-time emergency telemetry, rescue fleet deployments, and high-ground safe shelters.
          </p>
        </div>

        {/* Live sync pill */}
        <div className="flex items-center gap-3 self-start md:self-end text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-slate-200">Sensor Feed: Live</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">{lastUpdated}</span>
        </div>
      </div>

      {/* 4 Required Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          const status = card.statusIndicator;

          return (
            <div
              key={card.id}
              className={`glass-panel rounded-3xl p-6 border ${card.borderColor} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-6 relative group overflow-hidden shadow-2xl`}
            >
              {/* Subtle accent glow behind card */}
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-3xl opacity-15 pointer-events-none ${
                card.id === 'active-emergencies' ? 'bg-red-500' :
                card.id === 'people-rescued' ? 'bg-emerald-500' :
                card.id === 'available-teams' ? 'bg-blue-500' : 'bg-emerald-400'
              }`}></div>

              <div>
                {/* Top Row: Icon + Colored Status Indicator */}
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-3 rounded-2xl border ${card.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>

                  {/* Colored Status Indicator */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${status.bg} ${status.color}`}>
                    <span className="relative flex h-2 w-2">
                      {status.pulse && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.dotColor} opacity-75`}></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dotColor}`}></span>
                    </span>
                    <span className="tracking-wider">{status.text}</span>
                  </div>
                </div>

                {/* Card Title */}
                <div className="mt-5">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                    {card.title}
                  </span>

                  {/* Animated Number */}
                  <div className="mt-1 flex items-baseline gap-2 font-poppins text-4xl sm:text-5xl font-black text-white tracking-tight">
                    <AnimatedCounter target={card.number} suffix={card.suffix} duration={1800} />
                  </div>
                </div>

                {/* Trend Badge */}
                <div className="mt-2 flex items-center gap-1.5 text-xs font-mono">
                  <TrendingUp className={`w-3.5 h-3.5 ${card.trendColor}`} />
                  <span className={card.trendColor}>{card.badgeTrend}</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-300 font-inter leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Action Link */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={card.actionOnClick}
                  className={`text-xs font-poppins font-semibold flex items-center gap-1 transition-colors cursor-pointer ${card.iconColor} hover:brightness-125`}
                >
                  <span>{card.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-[10px] font-mono text-slate-500">
                  REF #{card.id.substring(0, 3).toUpperCase()}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
