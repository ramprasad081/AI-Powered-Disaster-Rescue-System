import { useState } from 'react';
import { 
  Activity, 
  Users, 
  Bot, 
  Clock, 
  Radio, 
  AlertTriangle, 
  MapPin, 
  Waves, 
  Wind, 
  Compass
} from 'lucide-react';

export default function LiveCommandGrid({ onOpenReport, onOpenShelters }) {
  const [activeSector, setActiveSector] = useState('sector-4');
  const [selectedNode, setSelectedNode] = useState({
    id: 'SOS-9841',
    title: 'Distress Beacon #9841',
    type: 'SOS',
    location: 'Sector 4 Riverbank, Block D',
    details: 'Family of 4 stranded on 2nd floor balcony. Water rising +35cm/hr.',
    assignedUnit: 'Amphibious Hovercraft HC-01',
    eta: '3 mins',
    urgency: 'CRITICAL PRIORITY 1',
    status: 'RESCUE IN PROGRESS',
  });

  const sectors = [
    { id: 'sector-4', name: 'Sector 4: Riverfront Basin', waterLevel: '+3.82m', wind: '120 km/h', status: 'SEVERE FLOODING' },
    { id: 'sector-7', name: 'Sector 7: Coastal Delta', waterLevel: '+2.90m', wind: '145 km/h', status: 'CYCLONE LANDFALL' },
    { id: 'sector-11', name: 'Sector 11: Urban Lowlands', waterLevel: '+1.65m', wind: '85 km/h', status: 'STORM SURGE DRAINAGE' },
  ];

  const radarNodes = [
    {
      id: 'SOS-9841',
      x: '38%',
      y: '32%',
      type: 'SOS',
      title: 'Distress Beacon #9841',
      location: 'Sector 4 Riverbank, Block D',
      details: 'Family of 4 stranded on 2nd floor balcony. Water rising +35cm/hr.',
      assignedUnit: 'Amphibious Hovercraft HC-01',
      eta: '3 mins',
      urgency: 'CRITICAL PRIORITY 1',
      status: 'RESCUE IN PROGRESS',
      color: 'bg-[#EF4444]',
      glow: 'glow-red',
    },
    {
      id: 'HC-01',
      x: '46%',
      y: '42%',
      type: 'UNIT',
      title: 'Hovercraft HC-01 (Valiant)',
      location: 'Main Inundation Channel',
      details: 'Navigating flood waters with 6-person recovery team. Speed: 28 knots.',
      assignedUnit: 'Fleet Lead Unit',
      eta: 'Approaching SOS-9841',
      urgency: 'ON MISSION',
      status: 'DISPATCHED',
      color: 'bg-[#2563EB]',
      glow: 'glow-blue',
    },
    {
      id: 'SHELTER-A',
      x: '72%',
      y: '22%',
      type: 'SHELTER',
      title: 'Safe Haven Alpha (Sports Arena)',
      location: 'Sector 2 Ridge (+48m Elev)',
      details: 'Capacity: 412/650 beds. High ground dry corridor secure.',
      assignedUnit: 'Emergency Response Base',
      eta: 'Open & Active',
      urgency: 'VERIFIED DRY',
      status: 'ACCEPTING EVACUEES',
      color: 'bg-[#10B981]',
      glow: 'glow-emerald',
    },
    {
      id: 'DRONE-04',
      x: '24%',
      y: '58%',
      type: 'DRONE',
      title: 'Thermal Recon Drone D-04',
      location: 'Grid 04-Delta Overhead',
      details: 'FLIR optical sensor scanning residential rooftops for survivor body heat.',
      assignedUnit: 'Autonomous Air Patrol',
      eta: 'Patrolling Grid',
      urgency: 'RECON PATROL',
      status: 'AIRBORNE',
      color: 'bg-cyan-400',
      glow: 'shadow-cyan-500/50',
    },
    {
      id: 'SOS-9855',
      x: '62%',
      y: '68%',
      type: 'SOS',
      title: 'Distress Beacon #9855',
      location: 'Sector 4 East Schoolhouse',
      details: '12 citizens sheltered on gymnasium roof. Food and clean water requested.',
      assignedUnit: 'Cargo Drone X-8 & Team Bravo',
      eta: '8 mins',
      urgency: 'HIGH PRIORITY 2',
      status: 'CARGO AIRDROP SCHEDULED',
      color: 'bg-[#EF4444]',
      glow: 'glow-red',
    }
  ];

  return (
    <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-[#2563EB] border border-blue-500/30">
          <Radio className="w-3.5 h-3.5" />
          CENTRAL COMMAND TELEMETRY
        </div>
        <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Real-Time Emergency Command Grid
        </h2>
        <p className="text-slate-400 font-inter text-base">
          Autonomous AI coordination orchestrating air reconnaissance, amphibious flood rescue craft, and high-ground safe corridors.
        </p>
      </div>

      {/* 4 Core Vital Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Active Missions (Red Accent) */}
        <div className="glass-card glass-card-red p-6 rounded-3xl border border-red-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-red-400 tracking-wider">ACTIVE RESCUE OPS</span>
            <div className="p-2.5 rounded-xl bg-red-500/10 text-[#EF4444] border border-red-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-poppins text-4xl font-extrabold text-white">19</span>
            <span className="text-xs font-mono text-red-400 font-semibold">+4 past hour</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Amphibious hovercrafts and search teams deployed in submerged sectors.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Priority 1 Triage:</span>
            <span className="text-[#EF4444] font-bold">100% Deployed</span>
          </div>
        </div>

        {/* Metric 2: Evacuees Sheltered (Emerald Accent) */}
        <div className="glass-card glass-card-emerald p-6 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#10B981] tracking-wider">LIVES SECURED</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-[#10B981] border border-emerald-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-poppins text-4xl font-extrabold text-white">8,420</span>
            <span className="text-xs font-mono text-[#10B981] font-semibold">↑ Verified Safe</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Civilians navigated to elevated shelters with clean water, medicine, and food.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Available Beds:</span>
            <span className="text-[#10B981] font-bold">2,180 Vacant</span>
          </div>
        </div>

        {/* Metric 3: AI Drones Deployed (Blue Accent) */}
        <div className="glass-card p-6 rounded-3xl border border-blue-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#2563EB] tracking-wider">AI DRONE FLEET</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-[#2563EB] border border-blue-500/30">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-poppins text-4xl font-extrabold text-white">36</span>
            <span className="text-xs font-mono text-blue-400 font-semibold">Airborne</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Equipped with FLIR infrared cameras, life raft drops, and flood depth radar.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Grid Scan Coverage:</span>
            <span className="text-[#2563EB] font-bold">96.4% Mapped</span>
          </div>
        </div>

        {/* Metric 4: Avg Response Time (Amber/Cyan Accent) */}
        <div className="glass-card p-6 rounded-3xl border border-amber-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">AVG DISPATCH SPEED</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-poppins text-4xl font-extrabold text-white">2.4</span>
            <span className="text-xs font-mono text-amber-400 font-semibold">Minutes</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            From initial SOS beacon transmission to autonomous rescue vessel assignment.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Triage Efficiency:</span>
            <span className="text-emerald-400 font-bold">4.8x Human Baseline</span>
          </div>
        </div>

      </div>

      {/* Interactive Tactical Command Radar & Sector Monitor */}
      <div id="radar" className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
        
        {/* Sector Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-poppins font-bold text-xl text-white flex items-center gap-2.5">
              <Radio className="w-5 h-5 text-[#2563EB] animate-pulse" />
              Interactive Tactical Radar & Zone Monitor
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              CLICK ANY PLOTTED NODE ON THE RADAR MAP TO INSPECT RESCUE STATUS
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {sectors.map(sector => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeSector === sector.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700'
                }`}
              >
                {sector.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Tactical Map Container + Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Radar Map Graphic */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-inner p-4">
            
            {/* Background Grid & Radar Rings */}
            <div className="absolute inset-0 bg-grid-dense opacity-40"></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full border border-blue-500/15"></div>
              <div className="w-[60%] h-[60%] rounded-full border border-blue-500/20"></div>
              <div className="w-[35%] h-[35%] rounded-full border border-blue-500/25"></div>
              <div className="w-full h-[1px] bg-blue-500/15 absolute"></div>
              <div className="h-full w-[1px] bg-blue-500/15 absolute"></div>
            </div>

            {/* Sweep radar animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full animate-radar-sweep overflow-hidden">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-blue-500/30 via-emerald-500/10 to-transparent origin-bottom-right"></div>
              </div>
            </div>

            {/* Flood Inundation Contour Visualizer */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-2.5 rounded-xl flex items-center justify-between text-[11px] font-mono text-slate-300 z-10">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-400" />
                <span>RIVER CREST: +3.82M</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                <span>WIND: 120 KM/H</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>UPLINK: NOMINAL</span>
              </div>
            </div>

            {/* Plotted Interactive Radar Nodes */}
            {radarNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: node.x, top: node.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer focus:outline-none`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full ${node.color} opacity-40`}></span>
                    {/* Center point */}
                    <span className={`relative inline-flex items-center justify-center h-5 w-5 rounded-full ${node.color} text-white font-mono text-[9px] font-bold shadow-lg ${
                      isSelected ? 'ring-4 ring-white' : ''
                    }`}>
                      {node.type === 'SOS' ? '!' : node.type === 'SHELTER' ? 'S' : node.type === 'UNIT' ? 'H' : 'D'}
                    </span>
                  </div>

                  {/* Hover Tag */}
                  <span className="absolute left-6 top-0 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[11px] font-mono px-2 py-0.5 rounded border border-slate-700 shadow-lg z-30">
                    {node.title}
                  </span>
                </button>
              );
            })}

            {/* Radar Legend in Top Corner */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                <span>RED: Distress SOS Beacon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>BLUE: Rescue Hovercraft</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span>GREEN: Safe Haven Shelter</span>
              </div>
            </div>

          </div>

          {/* Right Column: Selected Node Inspection Drawer */}
          <div className="lg:col-span-4 glass-card p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-slate-400">NODE TELEMETRY INSPECTOR</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                selectedNode.type === 'SOS' 
                  ? 'bg-red-500/20 text-[#EF4444] border border-red-500/40' 
                  : selectedNode.type === 'SHELTER'
                  ? 'bg-emerald-500/20 text-[#10B981] border border-emerald-500/40'
                  : 'bg-blue-500/20 text-[#2563EB] border border-blue-500/40'
              }`}>
                {selectedNode.urgency}
              </span>
            </div>

            <div>
              <h4 className="font-poppins font-bold text-lg text-white">
                {selectedNode.title}
              </h4>
              <p className="text-xs text-slate-300 font-mono mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {selectedNode.location}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-inter">
              {selectedNode.details}
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                <span className="text-slate-400">Assigned Unit:</span>
                <span className="font-bold text-white">{selectedNode.assignedUnit}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                <span className="text-slate-400">ETA / Mission Status:</span>
                <span className="font-bold text-[#10B981]">{selectedNode.eta}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50">
                <span className="text-slate-400">Coordination State:</span>
                <span className="font-bold text-blue-400">{selectedNode.status}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenReport}
                className="w-full py-2.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-semibold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Broadcast Emergency In This Zone</span>
              </button>

              <button
                onClick={onOpenShelters}
                className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-poppins font-semibold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Navigate To Nearest Safe Shelter</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
