import { 
  AlertTriangle, 
  Compass, 
  Radio, 
  Activity, 
  Wind, 
  Waves, 
  ShieldAlert, 
  Navigation, 
  Users, 
  Bot,
  ArrowUpRight
} from 'lucide-react';

export default function HeroSection({ onOpenReport, onOpenShelters, onScrollToRadar }) {
  return (
    <section id="overview" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8 sm:pt-12 pb-14 px-4 sm:px-6 lg:px-8">
      {/* Flood & Cyclone Rescue Illustration Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/disaster-rescue-hero.jpg"
          alt="AI-Powered Disaster Rescue Operation in Flood and Cyclone"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-10000 motion-safe:hover:scale-100"
        />
        {/* Dark Navy Glassmorphic Gradient Overlays for optimal readability & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/95 via-[#0B1220]/80 to-[#0B1220]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-[#0B1220]/60"></div>
        <div className="absolute inset-0 bg-radial-glow opacity-60"></div>
        <div className="absolute inset-0 bg-grid-dots opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Key Telemetry (Elevated for optimal visual balance) */}
          <div className="lg:col-span-7 space-y-6 text-left -mt-3 sm:-mt-6 lg:-mt-12 lg:-translate-y-3">
            
            {/* Main Title */}
            <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              AI-Powered <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-blue-400 to-emerald-400">
                Disaster Rescue
              </span>{' '}
              System
            </h1>

            {/* Exact Subtitle Requested */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl font-inter border-l-2 border-[#2563EB]/60 pl-4">
              &ldquo;Real-time emergency response, rescue coordination, and safe shelter navigation.&rdquo;
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenReport}
                className="px-6 py-3.5 rounded-2xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-bold text-sm sm:text-base shadow-xl glow-red flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer animate-emergency-pulse"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>REPORT EMERGENCY (SOS)</span>
              </button>

              <button
                onClick={onOpenShelters}
                className="px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-poppins font-bold text-sm sm:text-base shadow-xl glow-blue flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-emerald-300" />
                <span>FIND SAFE SHELTER</span>
              </button>
            </div>

            {/* Offline & Fast Assistance Info */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Offline SMS Dispatch: <strong className="text-white">HELP to 88200</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Emergency Helpline: <strong className="text-[#10B981]">112</strong>
              </span>
            </div>

            {/* Hero Quick Key Metrics */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-card p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>Active Rescues</span>
                </div>
                <div className="mt-1 text-xl font-bold font-poppins text-white">19 Units</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                  ● Sector 4 & 7 Deployed
                </div>
              </div>

              <div className="glass-card p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Sheltered Safe</span>
                </div>
                <div className="mt-1 text-xl font-bold font-poppins text-white">8,420+</div>
                <div className="text-[10px] text-slate-400 mt-0.5">14 High-Ground Hubs</div>
              </div>

              <div className="glass-card p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Bot className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>AI Drones Active</span>
                </div>
                <div className="mt-1 text-xl font-bold font-poppins text-white">36 Units</div>
                <div className="text-[10px] text-blue-400 mt-0.5">Thermal FLIR Mesh</div>
              </div>

              <div className="glass-card p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Avg Response</span>
                </div>
                <div className="mt-1 text-xl font-bold font-poppins text-white">2.4 min</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">AI Rapid Triage</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Glassmorphism HUD Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="relative glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl glow-blue">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-[#2563EB]">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-white text-base">
                      Incident Command Radar
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">ZONE 04 RIVERFRONT INUNDATION</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-[#EF4444] border border-red-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
                  LIVE OPS
                </span>
              </div>

              {/* Radar Sweeper Visual Mockup */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 flex items-center justify-center p-4">
                {/* Radar grid circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-blue-500/20"></div>
                  <div className="w-32 h-32 rounded-full border border-blue-500/30"></div>
                  <div className="w-16 h-16 rounded-full border border-blue-500/40"></div>
                  <div className="w-full h-[1px] bg-blue-500/20 absolute"></div>
                  <div className="h-full w-[1px] bg-blue-500/20 absolute"></div>
                </div>

                {/* Rotating sweep cone */}
                <div className="absolute w-48 h-48 rounded-full pointer-events-none animate-radar-sweep overflow-hidden">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-blue-500/40 via-emerald-500/10 to-transparent origin-bottom-right"></div>
                </div>

                {/* Plotted Live Nodes */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* Blip 1: Survivor Beacon */}
                  <div className="flex items-center gap-2 self-start animate-bounce">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]"></span>
                    </span>
                    <span className="text-[11px] font-mono bg-red-950/80 text-red-200 px-2 py-0.5 rounded border border-red-500/40">
                      SOS #9841: 4 Stranded on Roof
                    </span>
                  </div>

                  {/* Blip 2: Hovercraft Unit */}
                  <div className="flex items-center gap-2 self-center">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                    </span>
                    <span className="text-[11px] font-mono bg-blue-950/80 text-blue-200 px-2 py-0.5 rounded border border-blue-500/40">
                      Hovercraft HC-01 (Speed: 28 kts)
                    </span>
                  </div>

                  {/* Blip 3: Safe Shelter Alpha */}
                  <div className="flex items-center gap-2 self-end">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
                    </span>
                    <span className="text-[11px] font-mono bg-emerald-950/80 text-emerald-200 px-2 py-0.5 rounded border border-emerald-500/40">
                      Safe Shelter Alpha (+48m Elev)
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Operations Telemetry Feed */}
              <div className="mt-4 space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300">Flood Inundation Level:</span>
                  </div>
                  <span className="font-mono font-bold text-red-400">+3.82 m (Rising)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300">Sustained Cyclone Gusts:</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">145 km/h</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-slate-300">Autonomous AI Triage:</span>
                  </div>
                  <span className="font-mono font-bold text-[#10B981]">Priority 1 Dispatched</span>
                </div>
              </div>

              {/* Explore Tactical HUD button */}
              <button
                onClick={onScrollToRadar}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs font-mono font-medium border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>OPEN FULL SITUATIONAL COMMAND MAP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
