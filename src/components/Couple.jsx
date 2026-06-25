import { motion } from 'framer-motion';
import styles from './Couple.module.css';

export default function Couple({ settings }) {
  const brideName = settings?.brideName || 'Aaliya';
  const groomName = settings?.groomName || 'Ibrahim';
  const brideParents = settings?.brideParents || 'Mr. & Mrs. Rahman';
  const groomParents = settings?.groomParents || 'Mr. & Mrs. Hussain';
  const brideTagline = settings?.brideTagline || 'A heart full of grace, dreams as soft as petals.';
  const groomTagline = settings?.groomTagline || 'A gentleman with a kind soul and steady love.';

  // Use local custom images as fallbacks since they match the theme, otherwise settings/unsplash
  const brideImage = settings?.brideImage || '/images/bg2.jpeg';
  const groomImage = settings?.groomImage || '/images/bg8.jpeg';

  return (
    <section className={styles.section} id="couple">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        The Beloved
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Bride &amp; Groom
      </motion.h2>

      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>

      {/* Royal Staggered Photo Frame Container */}
      <motion.div
        className={styles.frameWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.frameContainer}>
          {/* Bride Photo - Top Left Frame */}
          <motion.div
            className={styles.bridePhotoContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <img src={brideImage} alt={brideName} className={styles.photo} />
          </motion.div>

          {/* Groom Photo - Bottom Right Frame */}
          <motion.div
            className={styles.groomPhotoContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img src={groomImage} alt={groomName} className={styles.photo} />
          </motion.div>
        </div>
      </motion.div>

      {/* Details Row */}
      <div className={styles.detailsRow}>
        <motion.div
          className={styles.personDetails}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className={styles.name}>{brideName}</h3>
          <p className={styles.role}>THE BRIDE</p>
          <p className={styles.parents}>Daughter of {brideParents}</p>
          <p className={styles.tagline}>"{brideTagline}"</p>
        </motion.div>

        <motion.div
          className={styles.personDetails}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={styles.name}>{groomName}</h3>
          <p className={styles.role}>THE GROOM</p>
          <p className={styles.parents}>Son of {groomParents}</p>
          <p className={styles.tagline}>"{groomTagline}"</p>
        </motion.div>
      </div>
    </section>
  );
}
