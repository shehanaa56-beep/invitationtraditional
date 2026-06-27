import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: customDelay, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Hero({ settings, guestName }) {
  const bride = (settings?.brideName || 'Diksha');
  const groom = (settings?.groomName || 'Rahul');

  return (
    <section className={styles.hero} id="hero">
      {/* Decorative corner peacock feather and brass items overlay */}
      <div className={styles.peacockOverlay} />

      <div className={styles.content}>
        {/* Guest greeting card overlay */}
        {guestName && (
          <motion.div
            className={styles.guestGreeting}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <p>सादर आमंत्रित <span className={styles.guestName}>{guestName}</span>,</p>
            <p className={styles.guestSubtitle}>You Are Cordially Invited</p>
          </motion.div>
        )}

        {/* Vintage Royal Invitation Card */}
        <motion.div
          className={styles.invitationCard}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          {/* Ganesh Silhouette Motif */}
          <div className={styles.ganeshaHeader}>
            <svg className={styles.ganeshaSvg} viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="2.5">
              <path d="M50,18 C54,18 57,20 57,25 C57,30 50,33 50,38" />
              <path d="M50,38 C50,42 53,44 57,44" />
              <path d="M46,25 C46,21 48,18 50,18" />
              <path d="M41,28 C38,28 36,31 38,36 C40,40 48,41 50,38" />
              <path d="M50,28 C48,30 47,34 48,41 C49,44 51,45 50,48 C49,50 46,48 44,47" />
              <path d="M41,23 C35,23 31,27 35,32 C37,34 39,34 41,32" />
              <path d="M59,23 C65,23 69,27 65,32 C63,34 61,34 59,32" />
              <path d="M47,18 L50,8 L53,18 Z" fill="#D4AF37" />
              <circle cx="50" cy="23" r="1.5" fill="#D4AF37" />
            </svg>
            <div className={styles.ganeshaText}>|| ശ്രീ ഗണേശായ നമഃ ||</div>
          </div>

          <p className={styles.togetherText}>TOGETHER WITH OUR FAMILIES</p>
          <p className={styles.togetherTextDevanagari}>സാന്നിധ്യത്തിൽ</p>

          {/* Bride & Groom names in Hindi/Malayalam and English */}
          <div className={styles.coupleNamesBlock}>
            <h2 className={styles.namesDevanagari}>
              {groom === 'Rahul' ? 'രാഹുലും' : groom} <span className={styles.andDevanagari}>&amp;</span> {bride === 'Diksha' ? 'ദീക്ഷയും' : bride}
            </h2>

            <h1 className={styles.namesEnglish}>
              {groom.toUpperCase()} &amp; {bride.toUpperCase()}
            </h1>
          </div>

          {/* Gold Decorative Border Line */}
          <div className={styles.goldSeparator}>
            <span className={styles.goldLeaf}>✿</span>
          </div>

          <div className={styles.dateBlock}>
            <p className={styles.weddingDateText}>2026 ഏപ്രിൽ 26</p>
            <p className={styles.subDateText}>26 July, 2026</p>
            <p className={styles.shubhVivah}>|| ശുഭ വിവാഹം ||</p>
          </div>

          {/* Corner floral illustrations — rendered last so they paint above all text */}
          <img src="/images/flower_corner_top_left.png" alt="" className={styles.flowerTopLeft} />
          <img src="/images/flower_corner_bottom_right.png" alt="" className={styles.flowerBottomRight} />

        </motion.div>
      </div>
    </section>
  );
}
