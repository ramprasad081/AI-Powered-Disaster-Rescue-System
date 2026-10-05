import { useState, useEffect } from 'react';
import { 
  Radio, 
  Cpu, 
  Send, 
  Crosshair, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Play, 
  RotateCcw,
  ChevronRight,
  Activity
} from 'lucide-react';

export default function EmergencyTimeline({ onOpenReport }) {
  const [activeStep, setActiveStep] = useState(2); // default: Rescue Team Dispatched is in progress
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const timelineSteps = [
    {
      id: 'alert-received',
      title: 'Alert Received',
      tag: 'SOS SATELLITE UPLINK',
      time: '00:00:12',
      status: 'VERIFIED & LOGGED',
      icon: Radio,
      accentColor: 'text-[#EF4444]',
      badgeColor: 'bg-red-500/15 text-[#EF4444] border-red-500/30',
      dotColor: 'bg-[#EF4444]',
      glowColor: 'shadow-red-500/30',
      description: 'Satellite distress beacon received from stranded citizens. Sub-meter GPS lock established over Starlink mesh uplink.',
      telemetry: [
        { label: 'Signal Protocol', value: 'Starlink Gen-3 Direct Uplink' },
        { label: 'Distress Beacon ID', value: 'SOS-9841' },
        { label: 'Initial Triage', value: 'Level 1 Critical Flood Surge' }
      ]
    },
    {
      id: 'ai-analysis',
      title: 'AI Analysis',
      tag: 'NEURAL HYDRO-PREDICTION',
      time: '00:00:34',
      status: 'ROUTE OPTIMIZED',
      icon: Cpu,
      accentColor: 'text-[#2563EB]',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      dotColor: 'bg-[#2563EB]',
      glowColor: 'shadow-blue-500/30',
      description: 'Neural model evaluates surge velocity and road submergence to compute the fastest safe water-transit route.',
      telemetry: [
        { label: 'AI Risk Prediction', value: 'Submerged Road Risk: 96%' },
        { label: 'Recommended Craft', value: 'Amphibious Rescue Hovercraft HC-01' },
        { label: 'Calculated Route ETA', value: '4 mins 10 sec' }
      ]
    },
    {
      id: 'team-dispatched',
      title: 'Rescue Team Dispatched',
      tag: 'UNITS EN ROUTE',
      time: '00:01:15',
      status: 'IN TRANSIT',
      icon: Send,
      accentColor: 'text-amber-400',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      dotColor: 'bg-amber-400',
      glowColor: 'shadow-amber-500/30',
      description: 'Hovercraft HC-01 and Tactical Drone Alpha-1 mobilized with FLIR thermal scanners and inflatable life rafts.',
      telemetry: [
        { label: 'Assigned Unit', value: 'Hovercraft HC-01 (4 Rescuers)' },
        { label: 'Support Escort', value: 'Autonomous FLIR Drone Unit 04' },
        { label: 'Current Speed', value: '46 km/h over flood surge' }
      ]
    },
    {
      id: 'victim-located',
      title: 'Victim Located',
      tag: 'THERMAL FLIR CONFIRMATION',
      time: '00:03:48',
      status: 'VISUAL & SENSOR CONTACT',
      icon: Crosshair,
      accentColor: 'text-cyan-400',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      dotColor: 'bg-cyan-400',
      glowColor: 'shadow-cyan-500/30',
      description: 'Overhead FLIR drone confirms 4 stranded citizens on terrace. Emergency line secured for rooftop extraction.',
      telemetry: [
        { label: 'Thermal Sensor Read', value: '4 Core Heat Signatures' },
        { label: 'Vitals Assessment', value: 'Conscious, Mild Hypothermia' },
        { label: 'Extraction Point', value: 'North-East Terrace Balcony' }
      ]
    },
    {
      id: 'rescue-completed',
      title: 'Rescue Completed',
      tag: 'SAFE SHELTER TRANSFER',
      time: '00:06:20',
      status: 'MISSION SUCCESS',
      icon: CheckCircle2,
      accentColor: 'text-[#10B981]',
      badgeColor: 'bg-emerald-500/15 text-[#10B981] border-emerald-500/30',
      dotColor: 'bg-[#10B981]',
      glowColor: 'shadow-emerald-500/30',
      description: 'Citizens safely evacuated via hovercraft to high-ground stadium shelter. Medical check complete.',
      telemetry: [
        { label: 'Safe Destination', value: 'Stadium Sector 1 High-Ground' },
        { label: 'Medical Status', value: 'Stable • Paramedic Triage Complete' },
        { label: 'Mission Outcome', value: '100% Extraction Success' }
      ]
    }
  ];

  // Auto-progress through the timeline
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % timelineSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, timelineSteps.length]);

  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-[#10B981] border border-emerald-500/30 shadow-lg">
            <Activity className="w-3.5 h-3.5 text-[#10B981]" />
            <span>MISSION EXECUTION LIFECYCLE</span>
          </div>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Emergency Timeline
          </h2>
          <p className="text-slate-300 font-inter text-sm sm:text-base max-w-2xl">
            Live operational pipeline from distress alert to complete victim extraction.
          </p>
        </div>

        {/* Timeline Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
              isAutoPlaying 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm shadow-blue-500/20' 
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>AUTO-PLAYING SIMULATION</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-300" />
                <span>RESUME AUTO-PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveStep(0)}
            title="Reset Timeline to Alert Received"
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10">
        
        {/* Continuous Central Vertical Line */}
        <div className="absolute left-[23px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-red-500 via-blue-500 via-amber-400 via-cyan-400 to-emerald-500 opacity-30"></div>

        {/* Dynamic Progress Fill Line */}
        <div 
          className="absolute left-[23px] sm:left-[39px] top-6 w-0.5 bg-gradient-to-b from-[#EF4444] via-[#2563EB] to-[#10B981] transition-all duration-700 shadow-lg shadow-blue-500/50"
          style={{
            height: `${(activeStep / (timelineSteps.length - 1)) * 100}%`
          }}
        ></div>

        <div className="space-y-8 sm:space-y-12">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <div 
                key={step.id} 
                className={`relative transition-all duration-300 ${
                  isCurrent ? 'scale-[1.01]' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {/* Node Milestone Marker */}
                <div 
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`absolute -left-[23px] sm:-left-[39px] -translate-x-1/2 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl border-2 transition-all duration-300 cursor-pointer z-10 ${
                    isCurrent
                      ? `${step.dotColor} border-white text-slate-950 shadow-xl ${step.glowColor} scale-110`
                      : isCompleted
                      ? 'bg-slate-900 border-[#10B981] text-[#10B981]'
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  ) : (
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isCurrent ? 'text-slate-950 stroke-[2.5]' : ''}`} />
                  )}

                  {/* Pulsing ring for the currently active stage */}
                  {isCurrent && (
                    <span className="absolute -inset-1.5 rounded-2xl border border-white/40 animate-ping opacity-60 pointer-events-none"></span>
                  )}
                </div>

                {/* Timeline Card */}
                <div 
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`ml-6 sm:ml-8 rounded-3xl p-5 sm:p-7 border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'glass-card border-white/25 shadow-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 ring-1 ring-white/10'
                      : 'glass-panel border-white/10 bg-slate-900/40 hover:border-white/20'
                  }`}
                >
                  {/* Top Bar: Title, Tag, and Elapsed Time */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={`font-poppins text-lg sm:text-xl font-bold tracking-tight ${
                        isCurrent ? 'text-white' : 'text-slate-200'
                      }`}>
                        {step.title}
                      </h3>
                      
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold border ${step.badgeColor}`}>
                        {step.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>T+{step.time}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                        isCompleted 
                          ? 'bg-emerald-500/20 text-[#10B981]' 
                          : isCurrent 
                          ? 'bg-blue-500/20 text-cyan-300 border border-cyan-400/30' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                  </div>

                  {/* Main Narrative Description */}
                  <p className="mt-3 text-slate-300 font-inter text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>

                  {/* Operational Telemetry Sub-grid */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/5 font-mono text-xs">
                    {step.telemetry.map((item, tIdx) => (
                      <div key={tIdx} className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                        <span className="text-slate-400 text-[11px] block">{item.label}</span>
                        <span className="font-semibold text-slate-200 block truncate">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Step Actions */}
                  {isCurrent && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                        <span>TELEMETRY STREAM SYNCHRONIZED</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {idx < timelineSteps.length - 1 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveStep(idx + 1);
                              setIsAutoPlaying(false);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/30"
                          >
                            <span>Next Stage ({timelineSteps[idx + 1].title})</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenReport) onOpenReport();
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-500/30"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Log New Emergency Mission</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
