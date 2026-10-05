import { ShieldCheck, AlertTriangle, Phone } from 'lucide-react';

export default function ProtocolsSection({ onOpenReport }) {
  const protocols = [
    {
      step: '01',
      title: 'Immediate High-Ground Evacuation',
      text: 'If floodwater penetrates your lower floors, immediately relocate to the second floor or structurally sound rooftop. Disconnect the main electrical circuit breaker.',
    },
    {
      step: '02',
      title: 'Broadcast Beacon with Exact Geolocation',
      text: "Click 'Report Emergency' on this terminal or SMS 'HELP' with your landmark to 88200. The AI triangulation mesh will lock your position.",
    },
    {
      step: '03',
      title: 'Signal Incoming Drones & Hovercrafts',
      text: 'AI thermal drones look for heat signatures and reflective light. Wave a smartphone flashlight, reflective sheet, or bright orange garment into the open sky.',
    },
    {
      step: '04',
      title: 'Follow AI Flood-Free Corridors to Shelters',
      text: 'Do not attempt to drive through standing water deeper than 15 cm. Use the Safe Shelter Navigation map to follow verified dry high-elevation overpasses.',
    },
  ];

  return (
    <section id="protocols" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-[#EF4444] border border-red-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          CIVILIAN SURVIVAL PROTOCOLS
        </div>
        <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Life-Saving Emergency Action Guidelines
        </h2>
        <p className="text-slate-400 font-inter text-base">
          Standard operational protocols authorized by Disaster Management Command for flood and cyclone emergencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {protocols.map((p, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border border-white/5 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">
                {p.step}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 border border-slate-700 text-xs font-mono font-bold">
                ✓
              </div>
            </div>
            <h3 className="font-poppins font-bold text-lg text-white">
              {p.title}
            </h3>
            <p className="text-xs text-slate-300 font-inter leading-relaxed">
              {p.text}
            </p>
          </div>
        ))}
      </div>

      {/* Emergency Callout Box */}
      <div className="glass-panel-heavy rounded-3xl p-8 border border-red-500/30 glow-red flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#EF4444]">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            DIRECT SATELLITE DISPATCH UPLINK ACTIVE
          </div>
          <h3 className="font-poppins font-bold text-2xl text-white">
            Trapped or Facing Imminent Danger?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Don’t wait for phone lines to fail. Report an emergency now or call our emergency hotline directly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenReport}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-bold text-sm shadow-xl glow-red flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report Emergency (Red)</span>
          </button>
          
          <a
            href="tel:112"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-poppins font-bold text-sm border border-slate-600 flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call 112 (Helpline)</span>
          </a>
        </div>
      </div>

    </section>
  );
}
