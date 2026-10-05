import { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Send, 
  Users, 
  Activity, 
  CheckCircle2, 
  Radio, 
  Phone, 
  Waves, 
  Wind, 
  Home, 
  Loader2, 
  Clock
} from 'lucide-react';

export default function ReportEmergencySection({ onSubmittedSOS, playAlertSound }) {
  const [formData, setFormData] = useState({
    emergencyType: 'FLOOD',
    location: '',
    gpsCoordinates: '',
    peopleCount: '3-5',
    hasInjured: false,
    hasElderlyChild: true,
    waterRisingFast: true,
    notes: 'Flood waters reached 2nd floor stairs. Power cut off.',
    contactPhone: '+1 (555) 019-2834',
  });

  const [detectingGps, setDetectingGps] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDispatch, setActiveDispatch] = useState(null);

  // Auto-Pin GPS Coordinates Simulation
  const handleAutoGps = () => {
    setDetectingGps(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        gpsCoordinates: '28.6139° N, 77.2090° E (Accuracy: ±1.8m)',
        location: 'Riverbank Boulevard, Block D-14, Sector 4',
      }));
      setDetectingGps(false);
    }, 800);
  };

  // Instant 1-Click Fast SOS
  const handleInstantSOS = () => {
    if (playAlertSound) playAlertSound();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = `SOS-${Math.floor(1000 + Math.random() * 9000)}-ALPHA`;
      const newDispatch = {
        code,
        type: 'FLASH FLOOD WATER EXTRACTION',
        location: formData.location || 'Sector 4 Riverfront Corridor (GPS Auto-Locked)',
        people: formData.peopleCount,
        assignedVessel: 'Amphibious Hovercraft HC-01 (Valiant)',
        assignedDrone: 'Thermal Recon Drone D-04',
        etaMinutes: 3,
        etaSeconds: 45,
        status: 'HOVERCRAFT DISPATCHED',
      };
      setActiveDispatch(newDispatch);
      setIsSubmitting(false);
      if (onSubmittedSOS) onSubmittedSOS(newDispatch);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playAlertSound) playAlertSound();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = `SOS-${Math.floor(1000 + Math.random() * 9000)}-ALPHA`;
      const newDispatch = {
        code,
        type: formData.emergencyType,
        location: formData.location || 'Sector 4 Riverbank (Auto-Pinned)',
        people: formData.peopleCount,
        assignedVessel: 'Amphibious Hovercraft HC-01 (Valiant)',
        assignedDrone: 'Thermal Recon Drone D-04',
        etaMinutes: 4,
        etaSeconds: 15,
        status: 'HOVERCRAFT DISPATCHED',
      };
      setActiveDispatch(newDispatch);
      setIsSubmitting(false);
      if (onSubmittedSOS) onSubmittedSOS(newDispatch);
    }, 1200);
  };

  return (
    <section id="report-emergency" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-red-500/15 text-[#EF4444] border border-red-500/40 glow-red">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]"></span>
          </span>
          <span>EMERGENCY INCIDENT DISPATCH CONSOLE</span>
        </div>
        
        <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Report Emergency
        </h2>
        
        <p className="text-slate-300 font-inter text-base max-w-2xl mx-auto">
          Need immediate rescue? Broadcast your location directly to AI-coordinated autonomous hovercrafts, NDRF rescue teams, and FLIR thermal drones.
        </p>
      </div>

      {/* 1-Click Fast Track SOS Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-red-500/40 glow-red-lg bg-gradient-to-r from-red-950/40 via-slate-900/60 to-red-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-red-400 text-xs font-mono font-bold">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>TIME-CRITICAL IMMINENT LIFE THREAT</span>
          </div>
          <h3 className="font-poppins font-bold text-2xl text-white">
            1-Click Instant Emergency SOS
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-inter">
            Immediately triggers automated satellite GPS lock, sounds emergency audio alarm, and deploys the nearest amphibious rescue hovercraft.
          </p>
        </div>

        <button
          onClick={handleInstantSOS}
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-extrabold text-base shadow-2xl glow-red-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 animate-emergency-pulse"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>TRANSMITTING SOS...</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-white" />
              <span>BROADCAST 1-CLICK SOS NOW</span>
            </>
          )}
        </button>
      </div>

      {/* Detailed Form & Real-Time Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Full Emergency Dispatch Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <h3 className="font-poppins font-bold text-xl text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#EF4444]" />
                SOS Rescue Request Form
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ENCRYPTED DIRECT BROADCAST TO INCIDENT COMMAND
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-[#EF4444] border border-red-500/30">
              PRIORITY 1
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Emergency Type Selection */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
                1. SELECT DISASTER CATEGORY *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'FLOOD', label: 'Severe Flooding', icon: Waves, color: 'text-blue-400' },
                  { id: 'CYCLONE', label: 'Cyclone Gale Winds', icon: Wind, color: 'text-emerald-400' },
                  { id: 'TRAPPED', label: 'Stranded on Roof', icon: Home, color: 'text-amber-400' },
                  { id: 'COLLAPSE', label: 'Building Collapse', icon: AlertTriangle, color: 'text-red-400' },
                  { id: 'MEDICAL', label: 'Critical Medical', icon: Activity, color: 'text-red-400' },
                  { id: 'WATER_RESCUE', label: 'Fast Water Current', icon: Waves, color: 'text-cyan-400' },
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = formData.emergencyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, emergencyType: item.id })}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-500/20 border-red-500 text-white shadow-md shadow-red-500/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GPS Location Auto-Pin & Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-semibold text-slate-300">
                  2. YOUR LOCATION / NEAREST LANDMARK *
                </label>
                <button
                  type="button"
                  onClick={handleAutoGps}
                  disabled={detectingGps}
                  className="text-xs text-[#2563EB] hover:text-blue-400 flex items-center gap-1 font-mono font-semibold cursor-pointer"
                >
                  {detectingGps ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                      Acquiring GPS Satellite Fix...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      Auto-Detect My GPS
                    </>
                  )}
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="Enter street, building, rooftop color or click 'Auto-Detect My GPS'"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />

              {formData.gpsCoordinates && (
                <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>GPS Fix Locked: {formData.gpsCoordinates}</span>
                </div>
              )}
            </div>

            {/* Stranded Count & Callback Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  3. STRANDED PEOPLE COUNT
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={formData.peopleCount}
                    onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-red-500"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-5">3 - 5 People (Family / Household)</option>
                    <option value="6-10">6 - 10 People (Neighborhood Group)</option>
                    <option value="10+">More than 10 People</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  4. CALLBACK CONTACT NUMBER *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Critical Flags */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                Special Priority Flags
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasElderlyChild}
                    onChange={(e) => setFormData({ ...formData, hasElderlyChild: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-red-500 w-4 h-4"
                  />
                  <span>Infants / Elderly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasInjured}
                    onChange={(e) => setFormData({ ...formData, hasInjured: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-red-500 w-4 h-4"
                  />
                  <span className="text-red-300 font-semibold">Injured / Bleeding</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.waterRisingFast}
                    onChange={(e) => setFormData({ ...formData, waterRisingFast: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-red-500 w-4 h-4"
                  />
                  <span className="text-blue-300 font-semibold">Rapid Flood Surge</span>
                </label>
              </div>
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                5. HAZARDS / STRUCTURAL OBSERVATIONS
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-red-500 placeholder-slate-500"
                placeholder="e.g. Downed electrical cables in water, staircase submerged, roof access via window"
              />
            </div>

            {/* Submit Emergency Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-poppins font-bold text-base shadow-2xl glow-red flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>TRANSMITTING EMERGENCY RESCUE BEACON...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>TRANSMIT EMERGENCY SOS (RED)</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
                <span>Direct Satellite Mesh Uplink</span>
                <span className="text-emerald-400">● 256-Bit Encrypted Broadcast</span>
              </div>
            </div>

          </form>
        </div>

        {/* Right Column: Live Dispatch Response HUD Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Dispatched Mission Display */}
          {activeDispatch ? (
            <div className="glass-panel rounded-3xl p-6 border border-emerald-500/40 glow-emerald shadow-2xl space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-2 text-[#10B981] font-mono text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>DISPATCH CONFIRMED</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-[#10B981] border border-emerald-500/40">
                  {activeDispatch.code}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-poppins font-bold text-2xl text-white">
                  Rescue Units En Route
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  Location: {activeDispatch.location}
                </p>
              </div>

              {/* Countdown & Vessel */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">Estimated Arrival:</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>{activeDispatch.etaMinutes}m {activeDispatch.etaSeconds}s</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assigned Craft:</span>
                    <span className="font-bold text-white">{activeDispatch.assignedVessel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Aerial Support:</span>
                    <span className="font-bold text-blue-400">{activeDispatch.assignedDrone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="font-bold text-[#10B981]">Shelter Haven Alpha (+48m Elev)</span>
                  </div>
                </div>
              </div>

              {/* Survivor Action Tips */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1 font-inter">
                <strong>INSTRUCTIONS UNTIL CRAFT ARRIVES:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                  <li>Move to the highest elevated dry floor or rooftop.</li>
                  <li>Flash smartphone screen or reflective material to air drones.</li>
                  <li>Do not enter fast-moving flood waters.</li>
                </ul>
              </div>

              <button
                onClick={() => setActiveDispatch(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              >
                SUBMIT ANOTHER INCIDENT REPORT
              </button>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold text-slate-400">
                  AI DISPATCH TRIAGE MONITOR
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-[#10B981] border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  READY
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-inter">
                <p className="leading-relaxed">
                  Upon transmitting your report, the AI Incident Command System automatically calculates water depth via synthetic aperture satellite radar and routes the fastest amphibious hovercraft or high-lift medical drone.
                </p>
                
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Average Dispatch Speed:</span>
                    <strong className="text-emerald-400">2.4 mins</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Amphibious Craft Ready:</span>
                    <strong className="text-blue-400">8 Hovercrafts</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Airborne Thermal Drones:</span>
                    <strong className="text-cyan-400">36 Units</strong>
                  </div>
                </div>
              </div>

              {/* Direct Hotlines Card */}
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
                <div className="text-xs font-mono font-bold text-red-300 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#EF4444]" />
                  <span>DIRECT EMERGENCY VOICE LINES</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href="tel:112"
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-white"
                  >
                    <span className="text-[10px] text-slate-400">National SOS</span>
                    <span className="font-bold text-base text-red-400">112</span>
                  </a>

                  <a
                    href="tel:108"
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-white"
                  >
                    <span className="text-[10px] text-slate-400">Medical Trauma</span>
                    <span className="font-bold text-base text-[#10B981]">108</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 font-mono text-center">
                  Offline SMS Fallback: Text <strong className="text-white">HELP</strong> to <strong className="text-emerald-400">88200</strong>
                </p>
              </div>

            </div>
          )}

          {/* Survival Quick Checklist */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2 text-xs font-inter text-slate-300">
            <span className="font-mono font-bold text-white text-xs block mb-1">
              ⚡ IMMEDIATE SURVIVAL PROTOCOL
            </span>
            <p>
              • Keep your device charged with brightness reduced to conserve battery.
            </p>
            <p>
              • If water reaches outlets, switch off power at the main circuit breaker.
            </p>
            <p>
              • Secure drinking water in sealed bottles before municipal water becomes contaminated.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
