import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Envelope from './components/Envelope';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Couple from './components/Couple';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Venue from './components/Venue';
import Family from './components/Family';
import Timeline from './components/Timeline';
import RSVP from './components/RSVP';
import Share from './components/Share';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Admin from './components/Admin';
import Moving from './components/Moving';
import FallingPetals from './components/FallingPetals';
import Wishes from './components/Wishes';
import { getSettings } from './services/firebase';

function InvitationPage() {
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('guest');

  const [opened, setOpened] = useState(false);
  const [settings, setSettings] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    getSettings().then(setSettings);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpen = (audio) => {
    audioRef.current = audio;
    setTimeout(() => setOpened(true), 400);
  };

  return (
    <div style={{ position: 'relative' }}>
      {opened && <FallingPetals />}
      {/* Invitation page is rendered directly behind the envelope so it is immediately visible as panels slide open */}
      {settings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Elegant Double-line Gold Border Overlay with Floral Corners */}
          <div className="gold-frame">
            <span className="frame-corner top-left">✿</span>
            <span className="frame-corner top-right">✿</span>
            <span className="frame-corner bottom-left">✿</span>
            <span className="frame-corner bottom-right">✿</span>
          </div>

          <Hero settings={settings} guestName={guestName} />
          <Countdown settings={settings} />
          <Couple settings={settings} />
          <Family settings={settings} />
          <Timeline />
          <Moving />
          <Events settings={settings} />
          <Venue settings={settings} />
          <Share settings={settings} />
          <Gallery />
          <Wishes />
          <RSVP />
          <Footer settings={settings} />
          <MusicPlayer audioRef={audioRef} />
        </motion.div>
      )}

      <AnimatePresence>
        {!opened && <Envelope onOpen={handleOpen} />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<InvitationPage />} />
        <Route path="/invitation" element={<InvitationPage />} />
        <Route path="/admin"      element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
