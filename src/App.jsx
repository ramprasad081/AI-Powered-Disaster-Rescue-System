import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import EmergencyTicker from './components/EmergencyTicker';
import HeroSection from './components/HeroSection';
import LiveDisasterOverview from './components/LiveDisasterOverview';
import InteractiveRescueMap from './components/InteractiveRescueMap';
import AIEmergencyFeatures from './components/AIEmergencyFeatures';
import EmergencyTimeline from './components/EmergencyTimeline';
import RescueSimulationVideo from './components/RescueSimulationVideo';
import SheltersSection from './components/SheltersSection';
import DroneFleetSection from './components/DroneFleetSection';
import ProtocolsSection from './components/ProtocolsSection';
import Footer from './components/Footer';
import EmergencyReportModal from './components/EmergencyReportModal';
import ShelterFinderModal from './components/ShelterFinderModal';

export default function App() {
  const [activePage, setActivePage] = useState('all'); // 'all', 'overview', 'map', 'features', 'shelters', 'fleet'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShelterModalOpen, setIsShelterModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [liveIncidents, setLiveIncidents] = useState([]);

  // Synthesizes a clean emergency command center alert beep using Web Audio API
  const playAlertSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Dual tone emergency chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1320, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio play restricted or unsupported:', e);
    }
  }, []);

  const handleOpenReport = () => {
    setIsReportModalOpen(true);
    if (soundEnabled) playAlertSound();
  };

  const handleOpenShelters = () => {
    setIsShelterModalOpen(true);
  };

  const handleScrollToRadar = () => {
    const el = document.getElementById('radar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmittedSOS = (newIncident) => {
    setLiveIncidents(prev => [newIncident, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 selection:bg-[#EF4444] selection:text-white font-inter relative overflow-x-hidden">
      
      {/* Fixed Command Bar Navigation */}
      <Navbar
        onOpenReport={handleOpenReport}
        onOpenShelters={handleOpenShelters}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playAlertSound={playAlertSound}
        activePage={activePage}
        onSelectPage={setActivePage}
      />

      <div className="pt-20">
        {/* Emergency Alert Broadcast Marquee */}
        <EmergencyTicker onOpenReport={handleOpenReport} />

        <main>
          {/* Hero Section */}
          <HeroSection
            onOpenReport={handleOpenReport}
            onOpenShelters={handleOpenShelters}
            onScrollToRadar={handleScrollToRadar}
          />

          {/* Live Disaster Overview */}
          <LiveDisasterOverview
            onOpenReport={handleOpenReport}
            onOpenShelters={handleOpenShelters}
          />

          {/* Interactive Rescue Map */}
          <InteractiveRescueMap
            onOpenReport={handleOpenReport}
            onOpenShelters={handleOpenShelters}
            liveIncidents={liveIncidents}
          />

          {/* AI Emergency Features (3 in row 1, 2 left in row 2 below) */}
          <AIEmergencyFeatures
            onOpenReport={handleOpenReport}
            onOpenShelters={handleOpenShelters}
            onNavigateToPage={setActivePage}
          />

          {/* Emergency Timeline */}
          <EmergencyTimeline
            onOpenReport={handleOpenReport}
          />

          {/* Safe Shelters & High-Ground Hubs Directory */}
          <SheltersSection
            onOpenSheltersModal={handleOpenShelters}
          />

          {/* AI Rescue Mission Simulation Video Player */}
          <RescueSimulationVideo
            onOpenReport={handleOpenReport}
          />

          {/* Autonomous AI Rescue Drone & Hovercraft Fleet */}
          <DroneFleetSection
            onOpenReport={handleOpenReport}
          />

          {/* Survival Protocols & Civilian Action Guide */}
          <ProtocolsSection
            onOpenReport={handleOpenReport}
          />
        </main>

        {/* Command Center Footer */}
        <Footer
          onOpenReport={handleOpenReport}
          onOpenShelters={handleOpenShelters}
        />
      </div>

      {/* Emergency Report Modal (Red Button Trigger) */}
      <EmergencyReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmittedSOS={handleSubmittedSOS}
        playAlertSound={playAlertSound}
      />

      {/* Shelter Finder & Safe Navigation Modal (Blue Button Trigger) */}
      <ShelterFinderModal
        isOpen={isShelterModalOpen}
        onClose={() => setIsShelterModalOpen(false)}
      />

    </div>
  );
}
