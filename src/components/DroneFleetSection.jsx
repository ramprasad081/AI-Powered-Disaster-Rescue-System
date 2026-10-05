import { useState } from 'react';
import { Bot, PlaneTakeoff, ShieldAlert } from 'lucide-react';

export default function DroneFleetSection({ onOpenReport }) {
  const [deployedUnits, setDeployedUnits] = useState({
    'HC-01': true,
    'D-04': true,
    'X-08': false,
  });

  const handleToggleDispatch = (id) => {
    setDeployedUnits(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const units = [
    {
      id: 'HC-01',
      name: 'Amphibious Rescue Hovercraft HC-01',
      callsign: 'VALIANT-1',
      type: 'WATER EXTRACTION CRAFT',
      image: '/fleet-hovercraft.jpg',
      role: 'Navigating inundated urban streets, fast currents, and debris-filled flood channels.',
      specs: {
        payload: '12 Survivors + 4 Crew',
        speed: '34 knots (Water & Land)',
        range: '180 km',
        sensor: 'Sonar Depth & Obstacle Radar',
      },
      status: deployedUnits['HC-01'] ? 'ACTIVE ON RESCUE MISSION' : 'STANDBY AT DOCK',
      statusColor: deployedUnits['HC-01'] ? 'text-[#EF4444] bg-red-500/10 border-red-500/30' : 'text-slate-400 bg-slate-800 border-slate-700',
      activeZone: 'Sector 4 Riverbank (Block D)',
    },
    {
      id: 'D-04',
      name: 'SkyGuard Thermal AI Drone D-04',
      callsign: 'NIGHTHAWK-4',
      type: 'AERIAL RECON & SURVIVOR LOCATOR',
      image: '/feat-drone-medical.jpg',
      role: 'Continuous aerial patrol with FLIR infrared cameras detecting human heat signatures through rain.',
      specs: {
        payload: 'Emergency Beacon Dropper',
        speed: '85 km/h',
        range: '45 mins flight endurance',
        sensor: '640x512 Radiometric Thermal Sensor',
      },
      status: deployedUnits['D-04'] ? 'AIRBORNE PATROL' : 'BATTERY RECHARGE',
      statusColor: deployedUnits['D-04'] ? 'text-[#2563EB] bg-blue-500/10 border-blue-500/30' : 'text-slate-400 bg-slate-800 border-slate-700',
      activeZone: 'Sector 7 Coastal Corridor',
    },
    {
      id: 'X-08',
      name: 'Heavy-Lift Supply Quad X-08',
      callsign: 'LIFELINE-8',
      type: 'AUTONOMOUS AIRDROP DRONE',
      image: '/fleet-supply-quad.jpg',
      role: 'Rapid precision delivery of inflatable life rafts, emergency rations, and trauma medical packs.',
      specs: {
        payload: '65 kg Heavy Medical Kit & Rafts',
        speed: '70 km/h',
        range: '32 km operational radius',
        sensor: 'Laser Guided Precision Drop Winch',
      },
      status: deployedUnits['X-08'] ? 'AIRDROP MISSION ACTIVE' : 'STANDBY ON HELIPAD ALPHA',
      statusColor: deployedUnits['X-08'] ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' : 'text-[#10B981] bg-emerald-500/10 border-emerald-500/30',
      activeZone: 'Highland Sports Base Helipad',
    },
  ];

  return (
    <section id="fleet" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-[#2563EB] border border-blue-500/30">
          <Bot className="w-3.5 h-3.5" />
          AUTONOMOUS RESPONSE FLEET
        </div>
        <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI-Coordinated Disaster Rescue Fleet
        </h2>
        <p className="text-slate-400 font-inter text-base">
          High-performance amphibious hovercrafts and thermal imaging drones operating in zero-visibility cyclone conditions.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={onOpenReport}
            className="px-5 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-[#EF4444] font-semibold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>REQUEST FLEET RESCUE DISPATCH</span>
          </button>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              {/* Status Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">
                  ID: {unit.callsign}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${unit.statusColor}`}>
                  {unit.status}
                </span>
              </div>

              {/* Craft Image Asset Banner */}
              {unit.image && (
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all shadow-inner bg-slate-950">
                  <img 
                    src={unit.image} 
                    alt={unit.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-70"></div>
                </div>
              )}

              {/* Title & Role */}
              <div>
                <h3 className="font-poppins font-bold text-xl text-white">
                  {unit.name}
                </h3>
                <p className="text-xs text-[#2563EB] font-mono font-semibold mt-0.5">
                  {unit.type}
                </p>
                <p className="text-xs text-slate-300 font-inter mt-2 leading-relaxed">
                  {unit.role}
                </p>
              </div>

              {/* Specs Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Capacity / Load:</span>
                  <span className="font-bold text-white">{unit.specs.payload}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Max Speed:</span>
                  <span className="font-bold text-emerald-400">{unit.specs.speed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mission Radius:</span>
                  <span className="font-bold text-white">{unit.specs.range}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">AI Payload:</span>
                  <span className="font-bold text-blue-300">{unit.specs.sensor}</span>
                </div>
              </div>
            </div>

            {/* Bottom active zone & interactive dispatch toggle */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Deployed In:</span>
                <span className="text-[#10B981] font-semibold">{unit.activeZone}</span>
              </div>

              <button
                onClick={() => handleToggleDispatch(unit.id)}
                className={`w-full py-2.5 px-4 rounded-xl font-poppins font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  deployedUnits[unit.id]
                    ? 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25'
                    : 'bg-emerald-500/20 text-[#10B981] border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
              >
                <PlaneTakeoff className="w-4 h-4" />
                <span>
                  {deployedUnits[unit.id] ? 'RECALL CRAFT TO BASE' : 'DISPATCH ON RESCUE MISSION'}
                </span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
