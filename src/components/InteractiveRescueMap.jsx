import { useState } from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Compass, 
  Wind, 
  Waves, 
  Radio, 
  ShieldCheck, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Ambulance as AmbulanceIcon,
  Navigation,
  Eye,
  ChevronRight
} from 'lucide-react';

export default function InteractiveRescueMap({ onOpenReport, onOpenShelters, liveIncidents = [] }) {
  // Layer visibility toggles
  const [layers, setLayers] = useState({
    floodZones: true,
    cyclonePath: true,
    rescueBoats: true,
    ambulances: true,
    shelters: true,
    userSos: true,
  });

  const [zoomLevel, setZoomLevel] = useState(1);

  // Selected item inspector
  const [selectedItem, setSelectedItem] = useState({
    type: 'SOS',
    id: 'SOS-9841',
    title: 'User SOS #9841 (Family Stranded)',
    location: 'Sector 4 Riverbank, Block D-14',
    coordinates: '28.6139° N, 77.2090° E',
    details: '4 citizens trapped on second-floor terrace. Water level rising +35cm/hr. Power cut off.',
    status: 'HOVERCRAFT HC-01 DISPATCHED',
    eta: '3 mins 20 sec',
    urgency: 'PRIORITY 1 - IMMEDIATE EXTRACTION',
    color: 'text-[#EF4444]',
    badgeBg: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
  });

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // 1. User SOS Locations
  const userSosLocations = [
    {
      id: 'SOS-9841',
      x: 36,
      y: 42,
      type: 'SOS',
      title: 'User SOS #9841 (Family of 4)',
      location: 'Sector 4 Riverfront, Block D-14',
      coordinates: '28.6139° N, 77.2090° E',
      details: '4 citizens trapped on second-floor terrace. Water level rising +35cm/hr. Power cut off.',
      status: 'HOVERCRAFT HC-01 EN ROUTE',
      eta: '3 mins 20 sec',
      urgency: 'PRIORITY 1 - IMMEDIATE EXTRACTION',
      color: 'text-[#EF4444]',
      badgeBg: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
      victims: '4 Persons (1 Infant, 1 Elderly)',
    },
    {
      id: 'SOS-9855',
      x: 58,
      y: 62,
      type: 'SOS',
      title: 'User SOS #9855 (12 Schoolhouse Stranded)',
      location: 'Sector 4 East Gymnasium Roof',
      coordinates: '28.6180° N, 77.2155° E',
      details: '12 citizens assembled on elevated gymnasium roof. Structural integrity safe, rations and drinking water needed.',
      status: 'CARGO DRONE X-8 AIRDROP READY',
      eta: '6 mins 45 sec',
      urgency: 'PRIORITY 2 - SUPPLY AIRDROP',
      color: 'text-[#EF4444]',
      badgeBg: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
      victims: '12 Persons (School staff & neighbors)',
    },
    {
      id: 'SOS-9872',
      x: 22,
      y: 74,
      type: 'SOS',
      title: 'User SOS #9872 (Medical Trauma)',
      location: 'South Lowlands, House #88',
      coordinates: '28.6088° N, 77.2012° E',
      details: 'Elderly diabetic patient needing emergency insulin and dry evacuation. Water at door threshold.',
      status: 'AMBULANCE MED-02 & BOAT DISPATCHED',
      eta: '4 mins 10 sec',
      urgency: 'CRITICAL MEDICAL PRIORITY',
      color: 'text-[#EF4444]',
      badgeBg: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
      victims: '2 Persons (1 Injured / Medical)',
    },
  ];

  // Combine default SOS locations with any newly submitted SOS incidents
  const allSosLocations = [
    ...liveIncidents.map((inc, i) => ({
      id: inc.code || `SOS-LIVE-${i}`,
      x: 30 + ((i * 19) % 45),
      y: 35 + ((i * 17) % 40),
      type: 'SOS',
      title: `Distress #${inc.code || 'LIVE'} (${inc.type || 'Emergency'})`,
      location: inc.location || 'Reported Location',
      coordinates: '28.6139° N, 77.2090° E',
      details: `Live reported incident: ${inc.people || 'Citizens'} stranded. Status: ${inc.status || 'Dispatched'}.`,
      status: inc.status || 'UNITS DISPATCHED',
      eta: '3 mins 30 sec',
      urgency: 'PRIORITY 1 - IMMEDIATE EXTRACTION',
      color: 'text-[#EF4444]',
      badgeBg: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
      victims: `${inc.people || 'Multiple'} Persons`,
    })),
    ...userSosLocations,
  ];

  // 2. Rescue Boats
  const rescueBoats = [
    {
      id: 'BOAT-HC01',
      x: 44,
      y: 48,
      type: 'BOAT',
      title: 'Hovercraft HC-01 "Valiant"',
      location: 'River Delta Main Channel',
      coordinates: '28.6155° N, 77.2110° E',
      details: 'Twin turbofan amphibious rescue hovercraft. Operating with 4 tactical rescue swimmers.',
      status: 'APPROACHING SOS #9841',
      eta: 'Speed: 28 knots',
      urgency: 'ON ACTIVE MISSION',
      color: 'text-[#2563EB]',
      badgeBg: 'bg-blue-500/20 text-[#2563EB] border-blue-500/40',
      capacity: '12 Survivor Capacity (8 Available)',
    },
    {
      id: 'BOAT-RB04',
      x: 28,
      y: 68,
      type: 'BOAT',
      title: 'Inflatable Rescue Boat RB-04',
      location: 'South Inundation Canal',
      coordinates: '28.6102° N, 77.2045° E',
      details: 'Rigid inflatable jet-drive boat navigating narrow streets with debris obstacles.',
      status: 'DISPATCHED TO SOS #9872',
      eta: 'Speed: 18 knots',
      urgency: 'DEPLOYED',
      color: 'text-[#2563EB]',
      badgeBg: 'bg-blue-500/20 text-[#2563EB] border-blue-500/40',
      capacity: '6 Survivor Capacity (6 Available)',
    },
    {
      id: 'BOAT-Z02',
      x: 66,
      y: 38,
      type: 'BOAT',
      title: 'Tactical Rescue Craft Z-02',
      location: 'North Reservoir Spillway',
      coordinates: '28.6220° N, 77.2190° E',
      details: 'Heavy-duty catamaran rescue vessel deployed for deep water barrier inspection.',
      status: 'PERIMETER PATROL',
      eta: 'Speed: 22 knots',
      urgency: 'STANDBY PATROL',
      color: 'text-[#2563EB]',
      badgeBg: 'bg-blue-500/20 text-[#2563EB] border-blue-500/40',
      capacity: '16 Survivor Capacity (16 Available)',
    },
  ];

  // 3. Ambulances
  const ambulances = [
    {
      id: 'AMB-01',
      x: 74,
      y: 28,
      type: 'AMBULANCE',
      title: 'Mobile ICU Ambulance Med-01',
      location: 'Highland Overpass Staging Point',
      coordinates: '28.6250° N, 77.2280° E',
      details: 'Advanced Life Support trauma unit stationed on dry flyover ramp receiving water evacuees.',
      status: 'RECEIVING PATIENTS',
      eta: 'On-Site Staged',
      urgency: 'MEDICAL TRIAGE ACTIVE',
      color: 'text-red-400',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
      capacity: '2 Trauma Stretchers • Defibrillator Ready',
    },
    {
      id: 'AMB-02',
      x: 26,
      y: 84,
      type: 'AMBULANCE',
      title: 'Rapid Response Ambulance Med-02',
      location: 'South Ridge Highway Checkpoint',
      coordinates: '28.6040° N, 77.2005° E',
      details: 'High-clearance 4x4 paramedic ambulance waiting at water edge for boat transfer.',
      status: 'WAITING FOR RB-04 BOAT EXTRACTION',
      eta: 'Standby at Waterline',
      urgency: 'PARAMEDIC CREW READY',
      color: 'text-red-400',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
      capacity: 'Emergency Oxygen & Burn Care Kits',
    },
    {
      id: 'AMB-03',
      x: 82,
      y: 65,
      type: 'AMBULANCE',
      title: 'Disaster Transit Ambulance Med-03',
      location: 'Central University Hospital Gate 2',
      coordinates: '28.6185° N, 77.2340° E',
      details: 'Shuttle ambulance transporting stabilized survivors from Safe Haven Bravo to regional trauma wing.',
      status: 'TRANSIT CORRIDOR CLEAR',
      eta: 'Operational',
      urgency: 'HOSPITAL LINK',
      color: 'text-red-400',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
      capacity: '4 Bed Transit Capacity',
    },
  ];

  // 4. Safe Shelters
  const sheltersList = [
    {
      id: 'SHELTER-ALPHA',
      x: 78,
      y: 22,
      type: 'SHELTER',
      title: 'Safe Haven Alpha (Highland Sports Arena)',
      location: '74 Ridge Crest Way, Sector 2 Highland',
      coordinates: '28.6275° N, 77.2310° E',
      details: 'Elevated concrete structure (+48m above sea level). Completely out of flood surge zone. 100% solar generator backup.',
      status: 'OPEN & ACCEPTING',
      eta: 'Elevation: +48m (Safe)',
      urgency: 'HIGH-GROUND REFUGE',
      color: 'text-[#10B981]',
      badgeBg: 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40',
      capacity: '412 / 650 Beds Occupied (238 Vacant)',
    },
    {
      id: 'SHELTER-BRAVO',
      x: 86,
      y: 52,
      type: 'SHELTER',
      title: 'Safe Haven Bravo (Central University)',
      location: '108 Campus Drive, Academic Ridge',
      coordinates: '28.6210° N, 77.2385° E',
      details: 'Multi-story campus complex with surgical triage bay and active helicopter landing pad (+42m elevation).',
      status: 'OPEN & ACCEPTING',
      eta: 'Elevation: +42m (Safe)',
      urgency: 'SURGICAL TRAUMA CENTER',
      color: 'text-[#10B981]',
      badgeBg: 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40',
      capacity: '610 / 800 Beds Occupied (190 Vacant)',
    },
    {
      id: 'SHELTER-CHARLIE',
      x: 64,
      y: 88,
      type: 'SHELTER',
      title: 'Safe Haven Charlie (Naval Reserve Outpost)',
      location: '22 Admiral Ridge, North Harbor Bluffs',
      coordinates: '28.6015° N, 77.2240° E',
      details: 'Reinforced naval base with deep flood defense barriers, pet shelters, and large food reserves (+55m elevation).',
      status: 'OPEN (AMPLE CAPACITY)',
      eta: 'Elevation: +55m (High Ground)',
      urgency: 'MILITARY DISASTER BASE',
      color: 'text-[#10B981]',
      badgeBg: 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40',
      capacity: '520 / 1,200 Beds Occupied (680 Vacant)',
    },
  ];

  return (
    <section id="radar" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header with Title and Quick Layers Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-[#2563EB] border border-blue-500/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            CENTRAL SITUATIONAL COMMAND MAP
          </div>

          <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Rescue Map
          </h2>

          <p className="text-slate-300 font-inter text-sm sm:text-base">
            Live multi-layer map showing flood zones, cyclone trajectory, rescue boats, ambulances, and SOS beacons.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.45))}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>TELEMETRY: 24 FPS LIVE</span>
          </div>
        </div>
      </div>

      {/* Layer Visibility Toggles Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 px-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>MAP LAYERS:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Flood Zones Toggle */}
          <button
            onClick={() => toggleLayer('floodZones')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              layers.floodZones
                ? 'bg-red-500/20 text-[#EF4444] border-red-500/50 shadow-sm shadow-red-500/20'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Flood Zones (Red Overlay)</span>
          </button>

          {/* Cyclone Path Toggle */}
          <button
            onClick={() => toggleLayer('cyclonePath')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              layers.cyclonePath
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Cyclone Path</span>
          </button>

          {/* Rescue Boats Toggle */}
          <button
            onClick={() => toggleLayer('rescueBoats')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              layers.rescueBoats
                ? 'bg-blue-500/20 text-[#2563EB] border-blue-500/50 shadow-sm shadow-blue-500/20'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Rescue Boats</span>
          </button>

          {/* Ambulances Toggle */}
          <button
            onClick={() => toggleLayer('ambulances')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              layers.ambulances
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <AmbulanceIcon className="w-3.5 h-3.5" />
            <span>Ambulances</span>
          </button>

          {/* Safe Shelters Toggle */}
          <button
            onClick={() => toggleLayer('shelters')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              layers.shelters
                ? 'bg-emerald-500/20 text-[#10B981] border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Shelter Markers</span>
          </button>

          {/* User SOS Toggle */}
          <button
            onClick={() => toggleLayer('userSos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              layers.userSos
                ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-sm shadow-red-500/20'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>User SOS Locations</span>
          </button>
        </div>
      </div>

      {/* Large Center Map Container + Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* The Large Map Surface (Center of the page) */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/11] rounded-3xl bg-[#08101E] border border-white/15 overflow-hidden shadow-2xl glow-blue">
          
          {/* Zoomable Canvas Container */}
          <div 
            className="w-full h-full relative transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* SVG Base Tactical Map with River Channels, Elevation Grid & Coastal Topography */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                {/* Flood Zone Gradient */}
                <radialGradient id="floodGradient" cx="42%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#EF4444" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
                </radialGradient>

                {/* Second Inundation Pocket */}
                <radialGradient id="floodGradient2" cx="24%" cy="72%" r="28%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.48" />
                  <stop offset="70%" stopColor="#EF4444" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.03" />
                </radialGradient>

                {/* Cyclone Trajectory Glow */}
                <linearGradient id="cycloneGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
                </linearGradient>

                {/* Water River Hatch */}
                <pattern id="waterHatch" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 Q 5 5, 10 10 T 20 10" fill="none" stroke="rgba(37, 99, 235, 0.3)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Grid Lines */}
              <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1">
                <line x1="200" y1="0" x2="200" y2="600" />
                <line x1="400" y1="0" x2="400" y2="600" />
                <line x1="600" y1="0" x2="600" y2="600" />
                <line x1="800" y1="0" x2="800" y2="600" />
                <line x1="0" y1="150" x2="1000" y2="150" />
                <line x1="0" y1="300" x2="1000" y2="300" />
                <line x1="0" y1="450" x2="1000" y2="450" />
              </g>

              {/* Natural River Course (Blue Waterway) */}
              <path
                d="M 120 600 C 220 520, 260 440, 360 380 C 440 330, 480 340, 560 260 C 640 180, 720 190, 850 60 L 910 60 C 780 200, 680 210, 600 290 C 520 370, 480 370, 400 420 C 310 480, 270 540, 180 600 Z"
                fill="rgba(37, 99, 235, 0.25)"
                stroke="rgba(59, 130, 246, 0.45)"
                strokeWidth="2"
              />

              {/* High Ground Ridges (Elevation contours - safe ground) */}
              <path
                d="M 680 80 Q 780 140, 880 110 T 980 220"
                fill="none"
                stroke="rgba(16, 185, 129, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 740 150 Q 820 200, 920 180 T 990 320"
                fill="none"
                stroke="rgba(16, 185, 129, 0.25)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* 1. FLOOD ZONES (RED OVERLAY) */}
              {layers.floodZones && (
                <g id="flood-layer">
                  {/* Primary River Overflow Inundation Zone (Red Overlay) */}
                  <polygon
                    points="260,320 480,240 590,320 560,460 380,510 240,430"
                    fill="url(#floodGradient)"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />

                  {/* Secondary Lowlands Breach Zone (Red Overlay) */}
                  <polygon
                    points="120,440 280,410 320,560 180,590"
                    fill="url(#floodGradient2)"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                  />

                  {/* Coastal Surge Margin */}
                  <path
                    d="M 0 540 Q 150 510, 280 530 T 450 580 L 450 600 L 0 600 Z"
                    fill="rgba(239, 68, 68, 0.3)"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* 2. CYCLONE PATH & CONE OF DANGER */}
              {layers.cyclonePath && (
                <g id="cyclone-layer">
                  {/* Projected Cone of Danger */}
                  <polygon
                    points="950,20 800,240 70,580 40,510 650,160 880,10"
                    fill="rgba(6, 182, 212, 0.08)"
                    stroke="rgba(6, 182, 212, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                  {/* Projected Track Centerline */}
                  <path
                    d="M 80 540 C 350 430, 600 310, 890 80"
                    fill="none"
                    stroke="url(#cycloneGrad)"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                  />

                  {/* Cyclone Eye Position (Animated Vortex) */}
                  <circle cx="280" cy="460" r="24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 3" className="animate-spin origin-center" />
                  <circle cx="280" cy="460" r="8" fill="#06b6d4" className="animate-ping" />
                  <circle cx="280" cy="460" r="5" fill="#ffffff" />
                </g>
              )}

              {/* Safe Road Corridor (Dry Elevated Highway 4) */}
              <path
                d="M 380 420 L 520 340 L 720 260 L 780 220"
                fill="none"
                stroke="rgba(16, 185, 129, 0.6)"
                strokeWidth="3"
              />
            </svg>

            {/* Inundation Warning Badges on Map */}
            {layers.floodZones && (
              <div 
                onClick={() => setSelectedItem({
                  type: 'FLOOD',
                  id: 'FLOOD-04',
                  title: 'Sector 4 Inundation Basin',
                  location: 'Riverfront Basin Core',
                  coordinates: '28.6145° N, 77.2100° E',
                  details: 'Flood level at +3.82m above danger datum. 18 rescue hovercrafts dispatched. Avoid ground transit.',
                  status: 'SURGE INUNDATION +3.82M',
                  eta: 'Water rising +35cm/hr',
                  urgency: 'SEVERE FLOOD HAZARD',
                  color: 'text-[#EF4444]',
                  badgeBg: 'bg-red-500/20 text-[#EF4444] border-red-500/40',
                })}
                style={{ left: '42%', top: '38%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500 text-[10px] font-mono font-bold text-red-200 flex items-center gap-1.5 shadow-lg glow-red cursor-pointer hover:scale-105 transition-transform"
              >
                <Waves className="w-3 h-3 text-[#EF4444]" />
                <span>FLOOD ZONE (+3.8M)</span>
              </div>
            )}

            {/* Cyclone Center Badge */}
            {layers.cyclonePath && (
              <div 
                onClick={() => setSelectedItem({
                  type: 'CYCLONE',
                  id: 'CYCLONE-VARUNA',
                  title: 'Cyclone "Varuna" Eye',
                  location: 'Approaching Coastal Sector 4',
                  coordinates: '28.6080° N, 77.2020° E',
                  details: 'Category 4 Cyclone with sustained winds of 145 km/h and gusts up to 170 km/h. Landfall in approx 2.5 hours.',
                  status: 'CATEGORY 4 SEVERE CYCLONE',
                  eta: 'Landfall: 2h 25m',
                  urgency: 'EXTREME WEATHER THREAT',
                  color: 'text-cyan-300',
                  badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                })}
                style={{ left: '28%', top: '76%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-200 flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105 transition-transform"
              >
                <Wind className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>CYCLONE EYE (145 KM/H)</span>
              </div>
            )}

            {/* 3. RESCUE BOATS MARKERS */}
            {layers.rescueBoats && rescueBoats.map(boat => (
              <button
                key={boat.id}
                onClick={() => setSelectedItem(boat)}
                style={{ left: `${boat.x}%`, top: `${boat.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-30"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-[#2563EB] opacity-60"></span>
                  <div className="relative w-8 h-8 rounded-xl bg-blue-600 border border-blue-300 text-white flex items-center justify-center shadow-lg glow-blue hover:scale-110 transition-transform">
                    <Navigation className="w-4 h-4 transform -rotate-45" />
                  </div>
                </div>
                <span className="absolute left-9 top-0 hidden group-hover:block whitespace-nowrap bg-slate-900 text-blue-200 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-500/50 shadow-xl z-40">
                  🚤 {boat.title}
                </span>
              </button>
            ))}

            {/* 4. AMBULANCES MARKERS */}
            {layers.ambulances && ambulances.map(amb => (
              <button
                key={amb.id}
                onClick={() => setSelectedItem(amb)}
                style={{ left: `${amb.x}%`, top: `${amb.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-30"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-amber-400 opacity-60"></span>
                  <div className="relative w-8 h-8 rounded-xl bg-amber-500 border border-amber-300 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold">
                    <AmbulanceIcon className="w-4 h-4" />
                  </div>
                </div>
                <span className="absolute left-9 top-0 hidden group-hover:block whitespace-nowrap bg-slate-900 text-amber-200 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/50 shadow-xl z-40">
                  🚑 {amb.title}
                </span>
              </button>
            ))}

            {/* 5. SAFE SHELTER MARKERS */}
            {layers.shelters && sheltersList.map(shelter => (
              <button
                key={shelter.id}
                onClick={() => setSelectedItem(shelter)}
                style={{ left: `${shelter.x}%`, top: `${shelter.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-30"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#10B981] opacity-75"></span>
                  <div className="relative w-9 h-9 rounded-xl bg-emerald-600 border border-emerald-300 text-white flex items-center justify-center shadow-lg glow-emerald hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute left-10 top-0 hidden group-hover:block whitespace-nowrap bg-slate-900 text-emerald-200 text-[10px] font-mono px-2.5 py-1 rounded border border-emerald-500/50 shadow-xl z-40">
                  🛡️ {shelter.title}
                </span>
              </button>
            ))}

            {/* 6. USER SOS LOCATIONS */}
            {layers.userSos && allSosLocations.map(sos => (
              <button
                key={sos.id}
                onClick={() => setSelectedItem(sos)}
                style={{ left: `${sos.x}%`, top: `${sos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-30 animate-bounce"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-[#EF4444] opacity-90"></span>
                  <div className="relative w-8 h-8 rounded-full bg-[#EF4444] border-2 border-white text-white flex items-center justify-center shadow-2xl glow-red-lg hover:scale-115 transition-transform">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="absolute left-9 top-0 hidden group-hover:block whitespace-nowrap bg-red-950 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-red-500 shadow-xl z-40">
                  🚨 {sos.title}
                </span>
              </button>
            ))}

          </div>

          {/* Map Legend Overlay in Bottom Corner */}
          <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-700/80 text-[11px] font-mono space-y-1.5 shadow-2xl z-40 pointer-events-auto">
            <div className="font-bold text-slate-200 text-[10px] border-b border-slate-800 pb-1 uppercase tracking-wider">
              Interactive Map Elements
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-red-500/70 border border-red-400"></span>
                <span>Flood Zones (Red)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span>Cyclone Track</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
                <span>Rescue Boats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                <span>Ambulances</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                <span>Shelter Markers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span>User SOS Distress</span>
              </div>
            </div>
          </div>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-sm p-2 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-400 flex flex-col items-center">
            <span className="text-red-400 font-bold">N</span>
            <Compass className="w-4 h-4 text-slate-300" />
            <span>S</span>
          </div>

        </div>

        {/* Live Tactical Telemetry Inspector (Right Column) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              LIVE OBJECT TELEMETRY
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${selectedItem.badgeBg}`}>
              {selectedItem.urgency}
            </span>
          </div>

          {/* Title & Coordinates */}
          <div>
            <h3 className="font-poppins font-bold text-xl text-white">
              {selectedItem.title}
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {selectedItem.location}
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              GPS: {selectedItem.coordinates}
            </p>
          </div>

          {/* Situation Details */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 font-inter leading-relaxed">
            {selectedItem.details}
          </div>

          {/* Dynamic Metrics */}
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Mission Coordination:</span>
              <span className="font-bold text-white">{selectedItem.status}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Speed / ETA:</span>
              <span className="font-bold text-emerald-400">{selectedItem.eta}</span>
            </div>

            {selectedItem.capacity && (
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Payload / Capacity:</span>
                <span className="font-bold text-blue-300">{selectedItem.capacity}</span>
              </div>
            )}

            {selectedItem.victims && (
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Stranded Persons:</span>
                <span className="font-bold text-red-300">{selectedItem.victims}</span>
              </div>
            )}
          </div>

          {/* Contextual Action Buttons */}
          <div className="pt-2 space-y-2.5">
            {selectedItem.type === 'SOS' && (
              <button
                onClick={onOpenReport}
                className="w-full py-3 px-4 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-semibold text-xs shadow-lg glow-red flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Coordinate Backup For This SOS</span>
              </button>
            )}

            {selectedItem.type === 'SHELTER' ? (
              <button
                onClick={onOpenShelters}
                className="w-full py-3 px-4 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-poppins font-semibold text-xs shadow-lg glow-emerald flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Navigate To This Shelter</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  const el = document.getElementById('shelters');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
              >
                <span>EXPLORE ALL EVACUATION SHELTERS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}
