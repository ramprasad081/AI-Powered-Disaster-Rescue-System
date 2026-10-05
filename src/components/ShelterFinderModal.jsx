import { useState } from 'react';
import { 
  X, 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Navigation, 
  Check, 
  Waves, 
  PhoneCall
} from 'lucide-react';

export default function ShelterFinderModal({ isOpen, onClose, shelters = [] }) {
  const [selectedShelterId, setSelectedShelterId] = useState(1);
  const [navigating, setNavigating] = useState(false);
  const [activeRouteInfo, setActiveRouteInfo] = useState(null);

  if (!isOpen) return null;

  const defaultShelters = shelters.length > 0 ? shelters : [
    {
      id: 1,
      name: 'Highland Sports Arena (Safe Haven Alpha)',
      distance: '1.4 km',
      elevation: '+48m (Flood Safe)',
      capacityTotal: 650,
      capacityOccupied: 412,
      status: 'OPEN & ACCEPTING',
      statusColor: 'text-[#10B981] bg-emerald-500/10 border-emerald-500/30',
      address: '74 Ridge Crest Way, Sector 2 Highland',
      amenities: ['24/7 Trauma Care', 'Purified Water Station', 'Pet Friendly Zone', 'Starlink Satellite Comms'],
      phone: '+1 (555) 012-9840',
      safeRouteRating: '99% Dry Route (Elevated Highway 4)',
    },
    {
      id: 2,
      name: 'Central University Poly-Shelter (Safe Haven Bravo)',
      distance: '2.8 km',
      elevation: '+42m (Flood Safe)',
      capacityTotal: 800,
      capacityOccupied: 610,
      status: 'OPEN & ACCEPTING',
      statusColor: 'text-[#10B981] bg-emerald-500/10 border-emerald-500/30',
      address: '108 Campus Drive, Academic Ridge',
      amenities: ['Emergency Surgery Unit', 'Solar Power Backup', 'Infant Care Rations', 'Helipad Active'],
      phone: '+1 (555) 013-4411',
      safeRouteRating: '94% Dry Route (Avoid Riverside underpass)',
    },
    {
      id: 3,
      name: 'Naval Reserve Base Station (Safe Haven Charlie)',
      distance: '4.1 km',
      elevation: '+55m (High Ground)',
      capacityTotal: 1200,
      capacityOccupied: 520,
      status: 'HIGH CAPACITY OPEN',
      statusColor: 'text-[#2563EB] bg-blue-500/10 border-blue-500/30',
      address: '22 Admiral Ridge, North Harbor Bluffs',
      amenities: ['Military Medical Corps', 'Amphibious Fleet Hub', 'Decontamination Unit', 'Heavy Generator Power'],
      phone: '+1 (555) 018-7733',
      safeRouteRating: '100% Dry Route (Ridge Expressway)',
    },
  ];

  const current = defaultShelters.find(s => s.id === selectedShelterId) || defaultShelters[0];

  const handleStartNav = () => {
    setNavigating(true);
    setTimeout(() => {
      setActiveRouteInfo({
        steps: [
          'Head East away from riverbank towards Highcrest Overpass (0.3 km)',
          'Take Elevated Flyover 4 — All ramps verified dry by AI drone radar (0.8 km)',
          'Continue straight into Highland Sports Arena Gate 3 reception checkpoint (0.3 km)',
        ],
        hazardAvoided: 'Avoided submerged Main Street underpass (-2.4m floodwater)',
      });
      setNavigating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel-heavy border border-blue-500/30 shadow-2xl glow-blue-lg overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-blue-500/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-[#2563EB] border border-blue-500/40">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                Safe Shelter Navigation Network
              </h3>
              <p className="text-xs font-mono text-blue-300">REAL-TIME FLOOD-AVOIDANCE ROUTE GUIDANCE</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Shelter Selection List */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
              Closest Safe Shelters (Verified Dry)
            </h4>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {defaultShelters.map((shelter) => {
                const isSelected = shelter.id === current.id;
                const percent = Math.round((shelter.capacityOccupied / shelter.capacityTotal) * 100);

                return (
                  <div
                    key={shelter.id}
                    onClick={() => {
                      setSelectedShelterId(shelter.id);
                      setActiveRouteInfo(null);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-poppins font-semibold text-white text-sm">
                        {shelter.name.split('(')[0]}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#2563EB]">
                        {shelter.distance}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mb-2 font-mono">
                      <span>{shelter.elevation}</span>
                      <span>•</span>
                      <span className="text-[#10B981]">{shelter.capacityTotal - shelter.capacityOccupied} beds left</span>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          percent > 85 ? 'bg-amber-400' : 'bg-[#10B981]'
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Shelter View & AI Safe Route */}
          <div className="md:col-span-7 space-y-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border mb-1.5 ${current.statusColor}`}>
                    {current.status}
                  </span>
                  <h4 className="font-poppins font-bold text-white text-lg">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {current.address}
                  </p>
                </div>
              </div>

              {/* Vital Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 my-4">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 font-mono">Elevation Level</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{current.elevation}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 font-mono">Capacity Occupancy</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {current.capacityOccupied} / {current.capacityTotal} ({Math.round((current.capacityOccupied / current.capacityTotal) * 100)}%)
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-xs font-mono font-semibold text-slate-300 mb-2">VERIFIED AMENITIES ON-SITE</div>
                <div className="flex flex-wrap gap-1.5">
                  {current.amenities.map((item, idx) => (
                    <span key={idx} className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#10B981]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Route calculation output */}
              {activeRouteInfo ? (
                <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-2">
                  <div className="font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    AI SAFE ROUTE LOCKED — AVOIDING FLOOD CORRIDORS
                  </div>
                  <ol className="list-decimal pl-4 text-slate-200 space-y-1 font-sans">
                    {activeRouteInfo.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <p className="text-[11px] font-mono text-amber-300 pt-1 border-t border-emerald-500/20">
                    ⚠ {activeRouteInfo.hazardAvoided}
                  </p>
                </div>
              ) : (
                <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-[#2563EB]" />
                    <span>Safety Index: {current.safeRouteRating}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleStartNav}
                disabled={navigating}
                className="flex-1 py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-poppins font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/30"
              >
                <Navigation className="w-4 h-4" />
                <span>{navigating ? 'Calculating Elevation Route...' : 'Start AI Safe Navigation (Blue)'}</span>
              </button>

              <a
                href={`tel:${current.phone}`}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Shelter</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
