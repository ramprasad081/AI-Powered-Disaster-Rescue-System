import { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Search, 
  Navigation, 
  Waves, 
  Check
} from 'lucide-react';

export default function SheltersSection({ onOpenSheltersModal }) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const shelters = [
    {
      id: 1,
      name: 'Highland Sports Arena (Safe Haven Alpha)',
      tag: 'REGIONAL MEGA-SHELTER',
      elevation: '+48m (High Ground)',
      image: '/feat-shelter-find.jpg',
      distance: '1.4 km away',
      address: '74 Ridge Crest Way, Sector 2 Highland',
      occupied: 412,
      total: 650,
      status: 'OPEN & ACCEPTING',
      type: 'HIGH_GROUND',
      amenities: ['Emergency Medical Bay', 'Purified Water Well', 'Pet Friendly Area', 'Solar + Diesel Generators'],
      phone: '+1 (555) 012-9840',
      safeRoute: 'Flyover Route 4 (100% Dry)',
    },
    {
      id: 2,
      name: 'Central University Poly-Shelter (Safe Haven Bravo)',
      tag: 'CAMPUS RELIEF COMPLEX',
      elevation: '+42m (High Ground)',
      distance: '2.8 km away',
      address: '108 Campus Drive, Academic Ridge',
      occupied: 610,
      total: 800,
      status: 'OPEN & ACCEPTING',
      type: 'MEDICAL',
      amenities: ['24/7 Trauma Surgeons', 'Infant Care Rations', 'Satellite Starlink Hub', 'Helipad Active'],
      phone: '+1 (555) 013-4411',
      safeRoute: 'Ridge Highway East (94% Dry)',
    },
    {
      id: 3,
      name: 'Naval Reserve Base Station (Safe Haven Charlie)',
      tag: 'MILITARY DISASTER OUTPOST',
      elevation: '+55m (High Ground)',
      distance: '4.1 km away',
      address: '22 Admiral Ridge, North Harbor Bluffs',
      occupied: 520,
      total: 1200,
      status: 'AMPLE CAPACITY',
      type: 'PETS',
      amenities: ['Military Medical Corps', 'Amphibious Fleet Dock', 'Full Decontamination', 'Heavy Generator Power'],
      phone: '+1 (555) 018-7733',
      safeRoute: 'Bluff Expressway (100% Dry)',
    },
    {
      id: 4,
      name: 'St. Jude Elevated Community Center',
      tag: 'COMMUNITY REFUGE',
      elevation: '+38m (Flood Clearance)',
      distance: '3.2 km away',
      address: '410 Hillside Ave, Sector 8',
      occupied: 280,
      total: 350,
      status: 'LIMITED BEDS',
      type: 'MEDICAL',
      amenities: ['First Aid Clinic', 'Warm Meal Kitchen', 'Elderly Assistance', 'Emergency Radio'],
      phone: '+1 (555) 019-3322',
      safeRoute: 'Hillside Bypass (Elevated)',
    },
  ];

  const filtered = shelters.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.address.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && s.type === filterType;
  });

  return (
    <section id="shelters" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-[#10B981] border border-emerald-500/30">
            <Compass className="w-3.5 h-3.5" />
            SAFE SHELTER NAVIGATION SYSTEM
          </div>
          <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Safe Shelters & High-Ground Hubs
          </h2>
          <p className="text-slate-400 font-inter text-base">
            AI-monitored safe zones with live capacity tracking, flood elevation clearance, and dry path guidance.
          </p>
        </div>

        <button
          onClick={onOpenSheltersModal}
          className="px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-poppins font-bold text-sm shadow-xl glow-blue flex items-center justify-center gap-2.5 transition-all cursor-pointer shrink-0"
        >
          <Navigation className="w-4 h-4" />
          <span>Launch AI Safe Navigator (Blue)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search shelters by name or zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'ALL', label: 'All Shelters' },
            { id: 'HIGH_GROUND', label: 'High Ground (+40m)' },
            { id: 'MEDICAL', label: 'Trauma & Medical' },
            { id: 'PETS', label: 'Pet Friendly' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-emerald-500/20 text-[#10B981] border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shelter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(shelter => {
          const occupancy = Math.round((shelter.occupied / shelter.total) * 100);
          const isCrowded = occupancy > 80;

          return (
            <div
              key={shelter.id}
              className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 space-y-4 relative group flex flex-col justify-between"
            >
              <div>
                {/* Top meta */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-[#2563EB] border border-blue-500/30">
                    {shelter.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {shelter.elevation}
                  </span>
                </div>

                {/* Shelter Image Asset */}
                {shelter.image && (
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-white/10 mb-3 shadow-inner bg-slate-950">
                    <img 
                      src={shelter.image} 
                      alt={shelter.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-70"></div>
                  </div>
                )}

                {/* Name & Address */}
                <h3 className="font-poppins font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                  {shelter.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-inter">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{shelter.address}</span>
                  <span className="text-slate-500">•</span>
                  <strong className="text-blue-400 font-mono">{shelter.distance}</strong>
                </p>

                {/* Capacity Bar */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Live Capacity:</span>
                    <span className="font-bold text-white">
                      {shelter.occupied} / {shelter.total} Beds ({occupancy}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCrowded ? 'bg-amber-400' : 'bg-[#10B981]'
                      }`}
                      style={{ width: `${occupancy}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{shelter.total - shelter.occupied} spots available</span>
                    <span className="text-[#10B981] font-semibold">{shelter.status}</span>
                  </div>
                </div>

                {/* Amenities List */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {shelter.amenities.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono bg-slate-900/80 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#10B981]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Verified Path:</span>
                  <span className="text-slate-200">{shelter.safeRoute}</span>
                </div>

                <button
                  onClick={onOpenSheltersModal}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-poppins font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
