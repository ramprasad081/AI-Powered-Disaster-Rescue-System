import { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  Send, 
  Loader2, 
  Phone, 
  Waves, 
  Wind, 
  Home
} from 'lucide-react';

export default function EmergencyReportModal({ isOpen, onClose, onSubmittedSOS, playAlertSound }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Submitting, 3: Dispatched confirmation
  const [formData, setFormData] = useState({
    emergencyType: 'FLOOD',
    location: '',
    gpsCoordinates: '',
    peopleCount: '3-5',
    hasInjured: true,
    hasElderlyChild: true,
    notes: 'Water level reached second floor balcony. Power cut off.',
    contactPhone: '+1 (555) 019-2834',
  });
  const [detectingGps, setDetectingGps] = useState(false);
  const [dispatchCode, setDispatchCode] = useState('');

  if (!isOpen) return null;

  const handleAutoGps = () => {
    setDetectingGps(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        gpsCoordinates: '28.6139° N, 77.2090° E (Accuracy: ±1.8m)',
        location: 'Riverbank Boulevard, Block D-14, Sector 4',
      }));
      setDetectingGps(false);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    if (playAlertSound) playAlertSound();

    setTimeout(() => {
      const code = `SOS-${Math.floor(1000 + Math.random() * 9000)}-ALPHA`;
      setDispatchCode(code);
      setStep(3);
      if (onSubmittedSOS) {
        onSubmittedSOS({
          code,
          type: formData.emergencyType,
          location: formData.location || 'Sector 4 Riverbank',
          people: formData.peopleCount,
          time: 'Just now',
          status: 'UNIT EN ROUTE',
        });
      }
    }, 1500);
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-md transition-opacity"
        onClick={resetAndClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-heavy border border-red-500/30 shadow-2xl glow-red-lg overflow-hidden z-10 my-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-red-500/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/20 text-[#EF4444] border border-red-500/40">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                Emergency Rescue SOS Dispatch
              </h3>
              <p className="text-xs font-mono text-red-300">PRIORITY 1 BROADCAST TO LOCAL RESCUE UNITS</p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Emergency SOS Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Emergency Type Selector */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
                SELECT EMERGENCY CATEGORY *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'FLOOD', label: 'Severe Flooding', icon: Waves, color: 'text-blue-400' },
                  { id: 'CYCLONE', label: 'Cyclone Damage', icon: Wind, color: 'text-emerald-400' },
                  { id: 'TRAPPED', label: 'Stranded on Roof', icon: Home, color: 'text-amber-400' },
                  { id: 'COLLAPSE', label: 'Structural Collapse', icon: AlertTriangle, color: 'text-red-400' },
                  { id: 'MEDICAL', label: 'Medical Emergency', icon: Activity, color: 'text-red-400' },
                  { id: 'OTHER', label: 'Water Extraction', icon: Waves, color: 'text-cyan-400' },
                ].map(type => {
                  const Icon = type.icon;
                  const isSelected = formData.emergencyType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, emergencyType: type.id })}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-500/20 border-red-500 text-white shadow-md shadow-red-500/20'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${type.color}`} />
                      <span className="text-xs font-semibold">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GPS & Location */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-semibold text-slate-300">
                  RESCUE LOCATION / ADDRESS *
                </label>
                <button
                  type="button"
                  onClick={handleAutoGps}
                  disabled={detectingGps}
                  className="text-xs text-[#2563EB] hover:text-blue-400 flex items-center gap-1 font-mono font-semibold cursor-pointer"
                >
                  {detectingGps ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Acquiring Satellite Fix...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5" />
                      Auto-Pin GPS Location
                    </>
                  )}
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="Enter street name, building number, landmark, or click Auto-Pin"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />

              {formData.gpsCoordinates && (
                <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>GPS Telemetry Locked: {formData.gpsCoordinates}</span>
                </div>
              )}
            </div>

            {/* Victim Count & Vulnerabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  NUMBER OF PEOPLE STRANDED
                </label>
                <select
                  value={formData.peopleCount}
                  onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-red-500"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-5">3 - 5 People (Family / Group)</option>
                  <option value="6-10">6 - 10 People</option>
                  <option value="10+">More than 10 People</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  CALLBACK CONTACT PHONE *
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

            {/* Checkbox Flags */}
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasElderlyChild}
                  onChange={(e) => setFormData({ ...formData, hasElderlyChild: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-red-500 focus:ring-0 w-4 h-4"
                />
                <span>Elderly persons or infants present</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasInjured}
                  onChange={(e) => setFormData({ ...formData, hasInjured: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-red-500 focus:ring-0 w-4 h-4"
                />
                <span className="text-red-300 font-semibold">Urgent medical attention needed</span>
              </label>
            </div>

            {/* Situation Notes */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                ADDITIONAL HAZARDS / CRITICAL DETAILS
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-red-500 placeholder-slate-500"
                placeholder="e.g., Water rising 1 ft/hour, downed power line nearby, roof access via fire ladder"
              />
            </div>

            {/* Submit SOS Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-poppins font-bold text-base shadow-2xl glow-red flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>TRANSMIT EMERGENCY SOS TO AI RESCUE GRID</span>
              </button>
              <p className="text-center text-[11px] font-mono text-slate-400 mt-2">
                Simulated AI Command Protocol — Immediate hovercraft & drone dispatch initiated
              </p>
            </div>

          </form>
        )}

        {/* Step 2: Transmitting State */}
        {step === 2 && (
          <div className="p-12 text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin"></div>
              <ShieldAlert className="w-8 h-8 text-[#EF4444] absolute" />
            </div>
            <h4 className="font-poppins font-bold text-xl text-white">Transmitting Encrypted SOS Telemetry...</h4>
            <p className="text-sm text-slate-400 max-w-sm mx-auto font-mono">
              AI Incident Engine triangulating coordinates, scanning flood depth, and assigning nearest hovercraft & rescue drone.
            </p>
          </div>
        )}

        {/* Step 3: Dispatched Confirmation State */}
        {step === 3 && (
          <div className="p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#10B981] glow-emerald">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-poppins font-bold text-2xl text-white">Rescue Operation Dispatched!</h4>
              <p className="text-sm text-emerald-400 font-mono">
                BROADCAST CONFIRMED • ASSIGNED INCIDENT ID: {dispatchCode}
              </p>
            </div>

            {/* Dispatch Telemetry Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400">Assigned Rescue Vessel:</span>
                <span className="font-bold text-white font-mono">Amphibious Hovercraft HC-01 (Valiant)</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400">Aerial Support:</span>
                <span className="font-bold text-blue-400 font-mono">Thermal Drone Unit D-04 (Airborne)</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400">Estimated Time of Arrival:</span>
                <span className="font-bold text-[#10B981] font-mono text-sm">3 min 45 sec</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Safe Evacuation Route:</span>
                <span className="font-bold text-slate-200 font-mono">Heading to Shelter Haven Alpha (+48m)</span>
              </div>
            </div>

            {/* Survival Guidance */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1 font-inter">
              <strong>SURVIVOR INSTRUCTIONS WHILE WAITING:</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                <li>Remain on the highest accessible dry platform or rooftop.</li>
                <li>Wave a bright fabric, flashlight, or phone screen toward approaching drones.</li>
                <li>Do not wade through flowing floodwaters due to submerged debris.</li>
              </ul>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              Return to Incident Command Center
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
