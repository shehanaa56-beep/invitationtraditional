import { motion } from 'framer-motion';
import { FiSun, FiFeather, FiMusic, FiHeart, FiStar, FiCalendar } from 'react-icons/fi';
import styles from './Events.module.css';

const getEventIcon = (id) => {
  switch (id?.toLowerCase()) {
    case 'haldi': return <FiSun />;
    case 'mehendi': return <FiFeather />;
    case 'sangeet': return <FiMusic />;
    case 'wedding': return <FiHeart />;
    case 'reception': return <FiStar />;
    default: return <FiCalendar />;
  }
};

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 12px 25px rgba(107, 29, 27, 0.2)' }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          {getEventIcon(event.id)}
        </div>
        <div>
          <h3 className={styles.name}>{event.name}</h3>
          <span className={styles.date}>{event.date}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>TIME</span>
          <span className={styles.detailVal}>{event.time}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>VENUE</span>
          <span className={styles.detailVal}>{event.venue}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Events({ settings }) {
  // Use settings events or fallback
  const events = settings?.events || [];
  return (
    <section className={styles.section} id="events">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Save the Dates
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Wedding Events
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>
      
      <div className={styles.list}>
        {events.map((ev, i) => <EventCard key={ev.id || i} event={ev} index={i} />)}
      </div>
    </section>
  );
}
