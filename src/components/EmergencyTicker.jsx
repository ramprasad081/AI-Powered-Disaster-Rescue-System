import { AlertTriangle, Waves, Wind, Radio } from 'lucide-react';

export default function EmergencyTicker({ onOpenReport }) {
  const alerts = [
    {
      id: 1,
      type: 'CYCLONE',
      badge: 'RED ALERT',
      badgeColor: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
      icon: Wind,
      text: "Cyclone 'Varuna' Category 4 — Sustained winds 145 km/h. Landfall expected within 2.5 hours.",
    },
    {
      id: 2,
      type: 'FLOOD',
      badge: 'URGENT',
      badgeColor: 'bg-blue-500/20 text-[#2563EB] border-blue-500/40',
      icon: Waves,
      text: 'Lower Basin Flood Barrier breach at Sector 4. Water rising +35cm/hr. Immediate vertical evacuation required.',
    },
    {
      id: 3,
      type: 'AI DISPATCH',
      badge: 'ACTIVE',
      badgeColor: 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40',
      icon: Radio,
      text: '36 Autonomous Rescue Drones & 8 Amphibious Hovercrafts operating on grid. 8,420 evacuees secured.',
    },
  ];

  return (
    <div className="relative z-40 bg-[#070c16] border-b border-red-500/20 overflow-hidden py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 shrink-0 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/30 text-[#EF4444]">
          <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
          <span className="font-bold tracking-wider">LIVE DEFCON ALERT</span>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-8 py-0.5 whitespace-nowrap text-slate-300">
          {alerts.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-200">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <button
          onClick={onOpenReport}
          className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-white shrink-0 cursor-pointer font-sans text-xs underline underline-offset-2 decoration-red-500/50 hover:decoration-red-500"
        >
          <span>Need Rescue? Broadcast SOS</span>
          <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
        </button>
      </div>
    </div>
  );
}
