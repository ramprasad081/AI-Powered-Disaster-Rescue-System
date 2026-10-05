import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Video, 
  Upload,
  HelpCircle,
  Sparkles,
  Link as LinkIcon,
  Check,
  X,
  FileVideo
} from 'lucide-react';

export default function RescueSimulationVideo({ onOpenReport }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackTime, setPlaybackTime] = useState(14); // seconds (out of 45s loop)
  const [activeCam, setActiveCam] = useState('CAM-01'); // CAM-01 (Drone FLIR), CAM-02 (Hovercraft Hydro), CAM-03 (Satellite Surge)
  const [hudScanActive, setHudScanActive] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [customVideoSrc, setCustomVideoSrc] = useState(null);
  const [videoMode, setVideoMode] = useState('simulation'); // 'simulation' (Canvas Animation) or 'video' (MP4 Player)
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [copiedNote, setCopiedNote] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoElementRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const stateRef = useRef({ time: 14, isPlaying: true, activeCam: 'CAM-01' });

  const duration = 45; // loop length in seconds

  // Keep stateRef synced for the 60fps canvas loop
  useEffect(() => {
    stateRef.current = { time: playbackTime, isPlaying, activeCam };
  }, [playbackTime, isPlaying, activeCam]);

  // Video playback timer simulation loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackTime(prev => {
        if (prev >= duration) return 0;
        return Number((prev + 0.5).toFixed(1));
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video sync with play/pause
  useEffect(() => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.play().catch(() => {});
      } else {
        videoElementRef.current.pause();
      }
    }
  }, [isPlaying, customVideoSrc]);

  // Auto-detect if user has placed /rescue-sim.mp4 in the public directory
  useEffect(() => {
    fetch('/rescue-sim.mp4', { method: 'HEAD' })
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('video')) {
          setCustomVideoSrc('/rescue-sim.mp4');
          setVideoMode('video');
        }
      })
      .catch(() => {});
  }, []);

  // Canvas 60FPS Disaster Rescue Animation Engine
  useEffect(() => {
    if (videoMode !== 'simulation') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    // Pre-generate rain particles
    const rainParticles = Array.from({ length: 120 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 562,
      length: 12 + Math.random() * 18,
      speed: 16 + Math.random() * 12,
      opacity: 0.2 + Math.random() * 0.4
    }));

    // Water wave particles for boat cam
    const waveParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 1000,
      y: 280 + Math.random() * 280,
      size: 1 + Math.random() * 3,
      speedX: -2 + Math.random() * 4,
      speedY: 2 + Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.6
    }));

    const render = () => {
      if (stateRef.current.isPlaying) {
        frame++;
      }

      const t = frame * 0.03;
      const cam = stateRef.current.activeCam;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (cam === 'CAM-01') {
        // ====================================================
        // CAM-01: DRONE FLIR THERMAL SCAN (Aerial Top-Down View)
        // ====================================================
        // Background: Deep dark turbulent floodwater
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#06101E');
        bgGrad.addColorStop(0.5, '#091A2E');
        bgGrad.addColorStop(1, '#050D18');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Dynamic flowing water ripples & current lines
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.12)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 9; i++) {
          ctx.beginPath();
          const baseY = 80 + i * 55;
          for (let x = 0; x <= width; x += 40) {
            const waveY = baseY + Math.sin(x * 0.015 + t * 2 + i) * 12;
            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }

        // Submerged Building Roof 1 (Target Area Alpha)
        ctx.fillStyle = '#0D1B2A';
        ctx.strokeStyle = '#1E3A5F';
        ctx.lineWidth = 3;
        ctx.fillRect(160, 200, 260, 190);
        ctx.strokeRect(160, 200, 260, 190);

        // Roof textures/solar panels
        ctx.fillStyle = '#112233';
        ctx.fillRect(180, 220, 100, 70);
        ctx.fillRect(300, 220, 100, 70);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.strokeRect(180, 220, 100, 70);
        ctx.strokeRect(300, 220, 100, 70);

        // Submerged Building Roof 2 (Right side)
        ctx.fillStyle = '#0C1827';
        ctx.fillRect(660, 140, 280, 220);
        ctx.strokeRect(660, 140, 280, 220);

        // Water Swirls & Foam around buildings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(150, 290, 35 + Math.sin(t * 3) * 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(650, 250, 45 + Math.cos(t * 2.5) * 8, 0, Math.PI * 2);
        ctx.stroke();

        // Stranded Survivors on Roof 1 (Pulsing FLIR Infrared Thermal Heat Map)
        const survivorX = 230 + Math.sin(t * 1.5) * 5;
        const survivorY = 320;
        const pulseSize = 22 + Math.sin(t * 4) * 6;

        // Thermal Infrared Gradient (Core White-Yellow -> Orange -> Red -> Purple dissipation)
        const flirGrad = ctx.createRadialGradient(survivorX, survivorY, 3, survivorX, survivorY, pulseSize * 1.6);
        flirGrad.addColorStop(0, '#FFFFFF');
        flirGrad.addColorStop(0.25, '#FFD600');
        flirGrad.addColorStop(0.55, '#FF3B30');
        flirGrad.addColorStop(0.85, 'rgba(168, 85, 247, 0.4)');
        flirGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = flirGrad;
        ctx.beginPath();
        ctx.arc(survivorX, survivorY, pulseSize * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Survivor 2 nearby
        const flirGrad2 = ctx.createRadialGradient(survivorX + 35, survivorY - 15, 3, survivorX + 35, survivorY - 15, pulseSize * 1.3);
        flirGrad2.addColorStop(0, '#FFFFFF');
        flirGrad2.addColorStop(0.3, '#FF9500');
        flirGrad2.addColorStop(0.65, '#EF4444');
        flirGrad2.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = flirGrad2;
        ctx.beginPath();
        ctx.arc(survivorX + 35, survivorY - 15, pulseSize * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Waving Survivor Silhouette (Human Figures signaling for help)
        ctx.fillStyle = '#FFFFFF';
        // Head
        ctx.beginPath();
        ctx.arc(survivorX, survivorY - 16, 4, 0, Math.PI * 2);
        ctx.fill();
        // Body
        ctx.fillRect(survivorX - 3, survivorY - 12, 6, 14);
        // Waving arm
        const armWave = Math.sin(t * 6) * 12;
        ctx.beginPath();
        ctx.moveTo(survivorX - 3, survivorY - 8);
        ctx.lineTo(survivorX - 14, survivorY - 20 + armWave);
        ctx.moveTo(survivorX + 3, survivorY - 8);
        ctx.lineTo(survivorX + 14, survivorY - 20 - armWave);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        // Moving AI Rescue Hovercraft traversing the floodwaters toward survivors
        const boatX = 640 - (frame % 700) * 0.65;
        const boatY = 380 + Math.sin(t * 2) * 10;

        // Hovercraft wake spray in water
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.beginPath();
        ctx.ellipse(boatX + 60, boatY + 8, 45, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
        ctx.beginPath();
        ctx.ellipse(boatX + 90, boatY + 8, 65, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hovercraft Body
        ctx.fillStyle = '#1E293B';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(boatX - 30, boatY - 16, 80, 32, 10);
        ctx.fill();
        ctx.stroke();

        // Flashing Emergency Beacon on Boat (Red / Blue alternating)
        const strobeBlue = Math.floor(t * 8) % 2 === 0;
        ctx.fillStyle = strobeBlue ? '#38BDF8' : '#EF4444';
        ctx.shadowColor = strobeBlue ? '#38BDF8' : '#EF4444';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(boatX + 10, boatY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Moving Aerial Drone Searchlight sweeping over the water
        const lightX = 240 + Math.sin(t * 1.8) * 90;
        const lightY = 300 + Math.cos(t * 1.4) * 60;
        const spotlight = ctx.createRadialGradient(lightX, lightY, 10, lightX, lightY, 140);
        spotlight.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
        spotlight.addColorStop(0.5, 'rgba(56, 189, 248, 0.18)');
        spotlight.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(lightX, lightY, 140, 0, Math.PI * 2);
        ctx.fill();

      } else if (cam === 'CAM-02') {
        // ====================================================
        // CAM-02: AMPHIBIOUS HOVERCRAFT FORWARD CAM (Water-level)
        // ====================================================
        // Sky & Storm Clouds Horizon
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 240);
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(0.7, '#0F172A');
        skyGrad.addColorStop(1, '#1E293B');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, 240);

        // Distant Flooded City Skyline in Mist
        ctx.fillStyle = '#0B132B';
        ctx.fillRect(80, 140, 60, 100);
        ctx.fillRect(160, 110, 80, 130);
        ctx.fillRect(260, 150, 70, 90);
        ctx.fillRect(450, 130, 110, 110);
        ctx.fillRect(680, 120, 90, 120);
        ctx.fillRect(820, 150, 75, 90);

        // Water level line & turbulent foreground flood surface
        const waterGrad = ctx.createLinearGradient(0, 230, 0, height);
        waterGrad.addColorStop(0, '#0F2537');
        waterGrad.addColorStop(0.4, '#0A192F');
        waterGrad.addColorStop(1, '#050D1A');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, 230, width, height - 230);

        // Rapid moving water waves rushing past the hovercraft
        for (let i = 0; i < 16; i++) {
          const waveY = 240 + i * 22;
          const speed = (i + 1) * 3.5;
          const shift = (frame * speed) % 120;
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 + (i / 16) * 0.3})`;
          ctx.lineWidth = 2 + (i / 16) * 4;
          ctx.beginPath();
          for (let x = -100; x <= width + 100; x += 50) {
            const yOffset = Math.sin((x + shift) * 0.03 + t * 4) * (4 + i * 1.5);
            if (x === -100) ctx.moveTo(x, waveY + yOffset);
            else ctx.lineTo(x, waveY + yOffset);
          }
          ctx.stroke();
        }

        // Animated Water Spray & Foam Droplets hitting camera lens
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        waveParticles.forEach(p => {
          if (stateRef.current.isPlaying) {
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y > height) {
              p.y = 240;
              p.x = 400 + Math.random() * 200;
            }
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Hovercraft Bow / Dashboard HUD at bottom
        ctx.fillStyle = '#0F172A';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(100, height);
        ctx.lineTo(350, 430);
        ctx.lineTo(650, 430);
        ctx.lineTo(900, height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Dual Emergency Strobe Beacons illuminating water surface
        const strobe = Math.sin(t * 10) > 0;
        // Red Port Strobe
        ctx.fillStyle = strobe ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.05)';
        ctx.beginPath();
        ctx.ellipse(330, 400, 160, 60, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Blue Starboard Strobe
        ctx.fillStyle = !strobe ? 'rgba(37, 99, 235, 0.55)' : 'rgba(37, 99, 235, 0.08)';
        ctx.beginPath();
        ctx.ellipse(670, 400, 160, 60, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Approaching Submerged Roof with Survivors in Distance
        const distRoofX = 460;
        const distRoofY = 220;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(distRoofX, distRoofY, 90, 40);
        // Survivor signaling with red flashlight flare
        const flarePulse = 8 + Math.sin(t * 12) * 5;
        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(distRoofX + 45, distRoofY + 12, flarePulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

      } else {
        // ====================================================
        // CAM-03: SATELLITE DOPPLER RADAR MESH (Cyclone Varuna Track)
        // ====================================================
        // Deep Space / High Atmosphere Background
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, width, height);

        // Satellite GIS Grid Mesh
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 50) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 50) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Coastline & Inundation Boundaries
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(120, 0);
        ctx.bezierCurveTo(240, 180, 200, 360, 380, height);
        ctx.stroke();

        // Swirling Cyclone Spiral Rainbands (Doppler False-Color Radar)
        const eyeX = 520;
        const eyeY = 270;
        const rotation = t * 1.2;

        // Multiple spiral arms
        const arms = 5;
        for (let a = 0; a < arms; a++) {
          const armAngle = (a / arms) * Math.PI * 2 + rotation;
          ctx.beginPath();
          for (let r = 25; r < 240; r += 6) {
            const theta = armAngle + (r * 0.035);
            const px = eyeX + Math.cos(theta) * r;
            const py = eyeY + Math.sin(theta) * (r * 0.7);
            if (r === 25) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          // Doppler color bands
          if (a % 3 === 0) {
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; // Red = Severe Inundation
            ctx.lineWidth = 12;
          } else if (a % 3 === 1) {
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)'; // Yellow = High Rain
            ctx.lineWidth = 9;
          } else {
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)'; // Green = Moderate
            ctx.lineWidth = 7;
          }
          ctx.stroke();
        }

        // Cyclone Eye (Calm Center)
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Revolving 360° Doppler Radar Sweep Beam
        const sweepAngle = (frame * 0.04) % (Math.PI * 2);
        const sweepLength = 320;
        const sweepGrad = ctx.createLinearGradient(
          eyeX, eyeY,
          eyeX + Math.cos(sweepAngle) * sweepLength,
          eyeY + Math.sin(sweepAngle) * sweepLength
        );
        sweepGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        sweepGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.strokeStyle = sweepGrad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(eyeX, eyeY);
        ctx.lineTo(
          eyeX + Math.cos(sweepAngle) * sweepLength,
          eyeY + Math.sin(sweepAngle) * sweepLength
        );
        ctx.stroke();

        // Concentric Range Rings
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1.5;
        [70, 140, 210, 280].forEach(rad => {
          ctx.beginPath();
          ctx.arc(eyeX, eyeY, rad, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      // ====================================================
      // SHARED ATMOSPHERE: Torrential Cyclone Rain Particles
      // ====================================================
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
      ctx.lineWidth = 1.2;
      rainParticles.forEach(p => {
        if (stateRef.current.isPlaying) {
          p.y += p.speed;
          p.x += p.speed * 0.3; // wind angle
          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * (width + 200) - 100;
          }
        }
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length * 0.3, p.y + p.length);
        ctx.stroke();
      });

      // Occasional Dramatic Lightning Flash
      if (stateRef.current.isPlaying && frame % 180 >= 177) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(0, 0, width, height);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [videoMode]);

  const cameraFeeds = [
    {
      id: 'CAM-01',
      title: 'Drone FLIR Thermal Scan',
      location: 'Sector 4 Riverbank Rooftops',
      status: 'TARGET LOCATED',
      statusColor: 'text-red-400 bg-red-500/15 border-red-500/30',
      telemetry: 'ALT: 42m • FLIR: 36.8°C CORE HEAT',
      description: 'Airborne Sentinel Drone executing 360° lidar and radiometric thermal survivor scan in heavy rain.'
    },
    {
      id: 'CAM-02',
      title: 'Amphibious Hovercraft Forward Cam',
      location: 'Main Delta Inundation Canal',
      status: 'APPROACHING EXTRACTION',
      statusColor: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
      telemetry: 'SPEED: 32 KTS • SURGE DEPTH: 3.8m',
      description: 'Hovercraft HC-01 cutting through high-velocity flood currents toward rooftop stranded victims.'
    },
    {
      id: 'CAM-03',
      title: 'Satellite Doppler Radar Mesh',
      location: 'Cyclone Varuna Eye Track',
      status: 'RADAR LOCK',
      statusColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      telemetry: 'WINDS: 145 KM/H • DEFCON 1 ACTIVE',
      description: 'Geostationary synthetic aperture radar mapping real-time street-level water inundation.'
    }
  ];

  const currentCamObj = cameraFeeds.find(c => c.id === activeCam) || cameraFeeds[0];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoSrc(url);
      setVideoMode('video');
      setIsPlaying(true);
    }
  };

  const handleApplyVideoUrl = () => {
    if (videoUrlInput.trim()) {
      setCustomVideoSrc(videoUrlInput.trim());
      setVideoMode('video');
      setIsPlaying(true);
      setShowHelpModal(false);
    }
  };

  const handleSelectSimMode = () => {
    setVideoMode('simulation');
    setIsPlaying(true);
  };

  const copyPublicPathSnippet = () => {
    navigator.clipboard.writeText('/rescue-sim.mp4');
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <section id="simulation-video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/15 text-[#EF4444] border border-red-500/30 shadow-lg">
            <Video className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>AI RESCUE MISSION SIMULATION</span>
          </div>

          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Live AI Rescue Video Stream
          </h2>

          <p className="text-slate-300 font-inter text-sm sm:text-base">
            Real-time animated tactical stream tracking drone lidar scanning, amphibious rescue navigation, and survivor extraction.
          </p>
        </div>

        {/* Action Badges & Help Trigger */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs font-mono">
            <button
              onClick={handleSelectSimMode}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                videoMode === 'simulation'
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>AI Simulation</span>
            </button>
            <button
              onClick={() => {
                if (customVideoSrc) {
                  setVideoMode('video');
                } else {
                  setShowHelpModal(true);
                }
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                videoMode === 'video'
                  ? 'bg-red-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileVideo className="w-3.5 h-3.5" />
              <span>{customVideoSrc ? 'Video File' : 'Add Video'}</span>
            </button>
          </div>

          {/* Guide Modal Trigger Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
            title="How to add and customize rescue videos"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">How to Add Video</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Video Player Theater */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl glow-blue">
        
        {/* Video Canvas / Render Viewport */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden select-none">
          
          {/* 1. Real MP4/WebM Video Element (when video mode is active) */}
          {videoMode === 'video' && customVideoSrc ? (
            <video
              ref={videoElementRef}
              src={customVideoSrc}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
          ) : (
            /* 2. Interactive 60FPS Dynamic Canvas Disaster Rescue Animation */
            <canvas
              ref={canvasRef}
              width={1000}
              height={562}
              className="w-full h-full object-cover block"
            />
          )}

          {/* Hidden File Input for Custom Asset Video Loading */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Environmental Atmosphere Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-[#0B1220]/60 pointer-events-none"></div>
          
          {/* Scanline CRT simulation */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"></div>

          {/* Glowing Animated Lidar Scanning Beams (SVG Overlay) */}
          {hudScanActive && isPlaying && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-90" viewBox="0 0 1000 562">
              <defs>
                <linearGradient id="lidarPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Drone Lidar Cones sweep */}
              <polygon points="260,195 90,440 250,490" fill="url(#lidarPulse)" className="animate-pulse">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
              </polygon>
              <polygon points="325,200 480,480 620,440" fill="url(#lidarPulse)">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
              </polygon>

              {/* Survivor Targeting Reticles */}
              <g className="animate-pulse">
                <circle cx="230" cy="320" r="26" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,3" />
                <circle cx="230" cy="320" r="14" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="205" y1="320" x2="255" y2="320" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="230" y1="295" x2="230" y2="345" stroke="#EF4444" strokeWidth="1.5" />
                <text x="265" y="315" fill="#EF4444" fontSize="13" fontFamily="monospace" fontWeight="bold">TARGET 01: 2 CITIZENS</text>
                <text x="265" y="333" fill="#38BDF8" fontSize="11" fontFamily="monospace">VITALS: 98.4°F • CONSCIOUS</text>
              </g>

              {/* Hovercraft Tracking Box */}
              <g>
                <rect x="580" y="330" width="220" height="120" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="10,6" />
                <text x="585" y="322" fill="#60A5FA" fontSize="13" fontFamily="monospace" fontWeight="bold">HOVERCRAFT HC-01 [VALIANT]</text>
                <text x="585" y="468" fill="#34D399" fontSize="11" fontFamily="monospace">SPEED: 32 KTS • ETA: 45 SEC</text>
              </g>

              {/* Sweeping radar line horizontally */}
              <line x1="0" y1="100" x2="1000" y2="100" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4">
                <animate attributeName="y1" values="50;520;50" dur="4.5s" repeatCount="indefinite" />
                <animate attributeName="y2" values="50;520;50" dur="4.5s" repeatCount="indefinite" />
              </line>
            </svg>
          )}

          {/* Top HUD Telemetry Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4 pointer-events-none font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/85 border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-white uppercase">{currentCamObj.id}: {currentCamObj.title}</span>
              </div>
              <p className="text-[11px] text-slate-400">{currentCamObj.location}</p>
              <p className="text-[11px] text-cyan-300">{currentCamObj.telemetry}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${currentCamObj.statusColor}`}>
                {currentCamObj.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950/85 text-slate-300 border border-white/10 backdrop-blur-md">
                TIME: 00:{playbackTime < 10 ? `0${playbackTime}` : playbackTime} / 00:45
              </span>
            </div>
          </div>

          {/* Center Big Play Trigger when Paused */}
          {!isPlaying && (
            <div 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm cursor-pointer z-20 group"
            >
              <div className="w-20 h-20 rounded-3xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl glow-blue transform group-hover:scale-110 transition-all">
                <Play className="w-9 h-9 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Bottom HUD Floating Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 pointer-events-auto">
            
            {/* Timeline Progress Bar */}
            <div 
              className="h-1.5 w-full bg-slate-800/90 rounded-full overflow-hidden cursor-pointer backdrop-blur-md"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = clickX / rect.width;
                setPlaybackTime(Number((pct * duration).toFixed(1)));
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(playbackTime / duration) * 100}%` }}
              ></div>
            </div>

            {/* Video Controls and Angle Selectors */}
            <div className="p-3 rounded-2xl bg-slate-950/85 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              
              {/* Play / Pause / Reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setPlaybackTime(0)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Rewind Simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isMuted ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}
                  title={isMuted ? 'Radio Stream Muted' : 'Radio Stream Active'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setHudScanActive(!hudScanActive)}
                  className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer font-bold ${
                    hudScanActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {hudScanActive ? 'HUD LIDAR: ON' : 'HUD LIDAR: OFF'}
                </button>

                {/* Load Custom Video File */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Choose video file (.mp4 / .webm) from your computer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-400" />
                  <span>LOAD VIDEO</span>
                </button>
              </div>

              {/* Multi-Camera Angle Selectors */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 mr-1 hidden sm:inline">ANGLES:</span>
                {cameraFeeds.map(cam => (
                  <button
                    key={cam.id}
                    onClick={() => {
                      setActiveCam(cam.id);
                      setVideoMode('simulation');
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      activeCam === cam.id && videoMode === 'simulation'
                        ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-md shadow-blue-500/30'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cam.id}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Video Information & Situation Synopsis Bar */}
        <div className="p-5 sm:p-6 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <h4 className="font-poppins font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>{currentCamObj.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {videoMode === 'simulation' ? 'AI SIMULATION' : 'CUSTOM VIDEO'}
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-inter">
              {currentCamObj.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelpModal(true)}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-poppins font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>How to Add Video</span>
            </button>

            <button
              onClick={onOpenReport}
              className="px-5 py-3 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-poppins font-semibold text-xs sm:text-sm shadow-lg glow-red flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>DISPATCH RESCUE TO THIS TARGET</span>
            </button>
          </div>
        </div>

      </div>

      {/* ====================================================
          "HOW TO ADD VIDEO" HELPER MODAL & URL LOADER
         ==================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-panel-heavy rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl text-left">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-xl text-white">How to Add a Rescue Video</h3>
                  <p className="text-xs text-slate-400 font-inter">Choose one of the 3 quick methods below to play any video.</p>
                </div>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Method 1: Instant File Selector */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-poppins font-bold text-sm text-white">
                  <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500 text-blue-400 flex items-center justify-center text-xs">1</span>
                  <span>Select Any Video from Your Computer</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Instant Preview</span>
              </div>
              <p className="text-xs text-slate-300 font-inter">
                Pick an MP4, WebM, or MOV file from your device. It plays instantly in the simulator.
              </p>
              <button
                onClick={() => {
                  setShowHelpModal(false);
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold font-poppins flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-blue-600/30"
              >
                <Upload className="w-4 h-4" />
                <span>Browse & Select Video File</span>
              </button>
            </div>

            {/* Method 2: Video URL Stream */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-poppins font-bold text-sm text-white">
                  <span className="w-6 h-6 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-400 flex items-center justify-center text-xs">2</span>
                  <span>Stream from Online Video URL</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">Direct Link</span>
              </div>
              <p className="text-xs text-slate-300 font-inter">
                Paste any direct link to an MP4 or WebM video file on the web:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://example.com/rescue-drone-stream.mp4"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  onClick={handleApplyVideoUrl}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-poppins flex items-center gap-1.5 cursor-pointer"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Play URL</span>
                </button>
              </div>
            </div>

            {/* Method 3: Permanent Video in Project */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-poppins font-bold text-sm text-white">
                  <span className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-500 text-emerald-400 flex items-center justify-center text-xs">3</span>
                  <span>Save Video Permanently in Project (Recommended)</span>
                </div>
                <span className="text-[11px] font-mono text-amber-400">Permanent</span>
              </div>
              <p className="text-xs text-slate-300 font-inter">
                Copy your rescue video file into the project's <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">public/</code> directory:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex items-center justify-between gap-2">
                <span className="text-slate-300">d:\disaster-rescue-ai1\public\<span className="text-emerald-400 font-bold">rescue-sim.mp4</span></span>
                <button
                  onClick={copyPublicPathSnippet}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedNote ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                  <span>{copiedNote ? 'Copied' : 'Copy Name'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-inter">
                Once saved as <code className="text-slate-200">public/rescue-sim.mp4</code>, it loads automatically whenever anyone opens your web app!
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <button
                onClick={handleSelectSimMode}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Return to AI Animated Simulation</span>
              </button>

              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-poppins font-medium text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
