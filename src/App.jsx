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

// Default settings — used as the immediate initial value so the page renders
// instantly without waiting for any async/localStorage work.
const INITIAL_SETTINGS = {
  brideName: "Diksha",
  groomName: "Rahul",
  weddingDate: "2026-12-26T11:30:00",
  brideParents: "Mr. & Mrs. Sharma",
  groomParents: "Mr. & Mrs. Gupta",
  brideTagline: "A heart full of grace, traditional values, and dreams.",
  groomTagline: "A kind soul, ready for a lifetime of love and togetherness.",
  brideSiblings: "Brother: Ravi · Sister: Pooja",
  groomSiblings: "Brother: Aman · Sister: Ritu",
  venue: "Shree Ram Mandir",
  venueAddress: "Shree Ram Mandir, Ujjain, Madhya Pradesh",
  venueMapsUrl: "https://maps.google.com/?q=Shree+Ram+Mandir+Ujjain",
  events: [
    { id: "haldi", name: "Haldi", icon: "sun", date: "December 24, 2026", time: "10:00 AM", venue: "Rajwada Palace, Indore" },
    { id: "mehendi", name: "Mehendi", icon: "leaf", date: "December 24, 2026", time: "06:00 PM", venue: "Rajwada Palace, Indore" },
    { id: "sangeet", name: "Sangeet", icon: "music", date: "December 25, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" },
    { id: "wedding", name: "Wedding", icon: "heart", date: "December 26, 2026", time: "11:30 AM", venue: "Shree Ram Mandir, Ujjain" },
    { id: "reception", name: "Reception", icon: "star", date: "December 26, 2026", time: "07:00 PM", venue: "Rajwada Palace, Indore" },
  ],
  bankAccount: "Rahul Sharma",
  bankName: "State Bank of India",
  bankACNo: "9876 5432 1098",
  upiId: "rahul@sbi",
  contactWhatsapp: "+919995541652",
  contactPhone: "+919995541652",
  contactEmail: "rahul.diksha@wedding.com",
};

function InvitationPage() {
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('guest');

  const [opened, setOpened] = useState(false);
  // Initialize with INITIAL_SETTINGS immediately so the page renders with no
  // loading delay. getSettings() then merges any user-customized localStorage
  // values on top without causing a blank-screen wait.
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
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
      {/* Invitation page \u2014 settings always available (pre-initialized), no loading wait */}
      <div>
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
      </div>

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
