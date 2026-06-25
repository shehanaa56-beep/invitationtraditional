import { motion } from 'framer-motion';
import styles from './Family.module.css';

export default function Family({ settings }) {
  return (
    <section className={styles.section} id="invitation-card">
      <motion.div
        className={styles.archCard}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.archCardDecoration}>❧</div>

        <motion.p className={styles.shlokaDevanagari} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          വക്രതുണ്ഡ മഹാകായ സൂര്യകോടി സമപ്രഭ।<br />
          നിർവിഘ്നം കുരു മേ ദേവ സർവ്വകാര്യേഷു സർവ്വദാ॥
        </motion.p>
        <motion.p className={styles.shlokaTranslation} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          || ശ്രീ ഗണേശായ നമഃ ||
        </motion.p>

        <motion.p className={styles.intro} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Together with the blessings of our families, we invite you to celebrate the wedding of
        </motion.p>

        <motion.div className={styles.familyBlock} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className={styles.parents}>{settings?.brideParents || 'Mr. & Mrs. Sharma'}</h3>
          <p className={styles.andFamily}>&amp; FAMILY</p>
        </motion.div>

        <motion.p className={styles.joinedWith} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          JOINED WITH
        </motion.p>

        <motion.div className={styles.familyBlock} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <h3 className={styles.parents}>{settings?.groomParents || 'Mr. & Mrs. Gupta'}</h3>
          <p className={styles.andFamily}>&amp; FAMILY</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
