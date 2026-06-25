import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Envelope.module.css';

export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | breaking | opening | done
  const audioRef = useRef(null);

  useEffect(() => {
    // Shehnai instrumental traditional track for Hindu Wedding
    audioRef.current = new Audio('/music/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
  }, []);

  const handleSealClick = async () => {
    if (phase !== 'idle') return;
    setPhase('breaking');

    // Play shehnai music with soft fade in
    try {
      await audioRef.current.play();
      let vol = 0;
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.05, 0.8);
        audioRef.current.volume = vol;
        if (vol >= 0.8) clearInterval(fade);
      }, 200);
    } catch (error) {
      console.error('Audio playback blocked by browser:', error);
    }

    setTimeout(() => setPhase('opening'), 800);
    setTimeout(() => {
      setPhase('done');
      onOpen(audioRef.current);
    }, 2800);
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {phase !== 'done' && (
          <div className={styles.splitEnvelope}>
            
            {/* Left Panel - Vintage Cream */}
            <motion.div
              className={styles.leftPanel}
              initial={{ x: 0 }}
              animate={phase === 'opening' ? { x: '-100%' } : { x: 0 }}
              transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className={styles.leftBorder} />
              
              <div className={styles.crestContainer}>
                <h2 className={styles.invitedText}>YOU ARE INVITED</h2>
                
                {/* Traditional Gold Separator Line */}
                <div className={styles.separatorLine}>
                  <div className={styles.lineLeft} />
                  <span className={styles.diamond}>♦</span>
                  <div className={styles.lineRight} />
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Traditional Maroon */}
            <motion.div
              className={styles.rightPanel}
              initial={{ x: 0 }}
              animate={phase === 'opening' ? { x: '100%' } : { x: 0 }}
              transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
            >
              {/* Corner Gold Floral Outline Pattern top right */}
              <div className={styles.floralCornerTR}>
                <svg viewBox="0 0 100 100" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1">
                  <path d="M100,0 Q80,20 80,40 T60,60 T40,65" />
                  <path d="M100,0 Q90,30 75,45 T50,50" />
                  <path d="M100,0 Q70,10 60,30 T35,45" />
                  <circle cx="80" cy="20" r="2" fill="rgba(212, 175, 55, 0.35)" />
                  <circle cx="60" cy="40" r="1.5" fill="rgba(212, 175, 55, 0.35)" />
                  {/* Lotus sketch */}
                  <path d="M85,15 C88,10 92,10 95,15 C92,18 88,18 85,15 Z" fill="rgba(212, 175, 55, 0.15)" />
                </svg>
              </div>
              
              {/* Corner Gold Floral Outline Pattern bottom right */}
              <div className={styles.floralCornerBR}>
                <svg viewBox="0 0 100 100" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1">
                  <path d="M100,100 Q80,80 80,60 T60,40 T40,35" />
                  <path d="M100,100 Q90,70 75,55 T50,50" />
                  <path d="M100,100 Q70,90 60,70 T35,55" />
                  <circle cx="80" cy="80" r="2" fill="rgba(212, 175, 55, 0.35)" />
                  <circle cx="60" cy="60" r="1.5" fill="rgba(212, 175, 55, 0.35)" />
                </svg>
              </div>

              {/* Bottom Tap to Open Hint inside Right Panel */}
              {phase === 'idle' && (
                <motion.div
                  className={styles.tapHint}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className={styles.tapText}>TAP TO OPEN</div>
                  <div className={styles.chevron}>
                    <svg width="20" height="12" viewBox="0 0 24 14" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M4 4 L12 11 L20 4" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Central Wax Seal */}
            <motion.div
              className={`${styles.sealWrapper} ${phase === 'breaking' ? styles.sealBreaking : ''}`}
              initial={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
              animate={
                phase === 'opening'
                  ? { scale: 0.5, opacity: 0, x: '-50%', y: '-50%', rotate: 45 }
                  : phase === 'breaking'
                  ? { scale: [1, 1.15, 1], rotate: [0, -10, 10, 0] }
                  : { scale: 1 }
              }
              transition={{
                duration: phase === 'opening' ? 0.8 : 0.6,
                ease: 'easeInOut',
              }}
              onClick={handleSealClick}
            >
              <div className={styles.sealCircle}>
                {/* Wreath Monogram Crest inside Seal */}
                <div className={styles.sealMonogram}>
                  <svg className={styles.sealWreathSvg} viewBox="0 0 200 200" fill="none" stroke="#D4AF37" strokeWidth="3">
                    {/* Floral Wreath Left */}
                    <path d="M100,30 C60,30 35,65 35,100 C35,145 70,170 100,170" strokeDasharray="3,3" />
                    <path d="M100,30 C50,40 45,80 45,100 C45,130 65,160 100,170" />
                    {/* Floral Wreath Right */}
                    <path d="M100,30 C140,30 165,65 165,100 C165,145 130,170 100,170" strokeDasharray="3,3" />
                    <path d="M100,30 C150,40 155,80 155,100 C155,130 135,160 100,170" />
                    
                    {/* Wreath Leaves Left */}
                    <path d="M50,70 Q40,65 45,55 Q50,65 52,70" fill="#D4AF37" />
                    <path d="M42,95 Q32,92 35,82 Q42,90 44,95" fill="#D4AF37" />
                    <path d="M44,120 Q34,120 35,110 Q43,115 45,120" fill="#D4AF37" />
                    <path d="M55,145 Q47,150 45,140 Q53,140 56,145" fill="#D4AF37" />
                    
                    {/* Wreath Leaves Right */}
                    <path d="M150,70 Q160,65 155,55 Q150,65 148,70" fill="#D4AF37" />
                    <path d="M158,95 Q168,92 165,82 Q158,90 156,95" fill="#D4AF37" />
                    <path d="M156,120 Q166,120 165,110 Q157,115 155,120" fill="#D4AF37" />
                    <path d="M145,145 Q153,150 155,140 Q147,140 144,145" fill="#D4AF37" />
                    
                    {/* Center Bow / Knot */}
                    <path d="M90,170 Q100,165 110,170 Q105,180 100,173 Q95,180 90,170" fill="#D4AF37" />
                  </svg>
                  <div className={styles.sealInitials}>R | D</div>
                </div>
              </div>
            </motion.div>
            
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
