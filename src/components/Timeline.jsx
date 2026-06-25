import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const storyEvents = [
  {
    id: 1,
    title: 'FIRST MEET',
    date: '12 May 2018',
    desc: 'Where our journey began',
    image: '/images/bg4.jpeg'
  },
  {
    id: 2,
    title: 'ENGAGED',
    date: '10 Dec 2022',
    desc: 'The day we promised forever',
    image: '/images/bg6.jpeg'
  },
  {
    id: 3,
    title: 'TOGETHER',
    date: '26 July 2026',
    desc: 'The day we become one',
    image: '/images/bg1.jpeg'
  }
];

export default function Timeline() {
  return (
    <section className={styles.section} id="story">
      <div className={styles.container}>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Journey
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Our Story
        </motion.h2>

        <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>

        <div className={styles.timelineList}>
          {/* Vertical line indicator */}
          <div className={styles.verticalLine} />

          {storyEvents.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* circular image */}
              <div className={styles.imageContainer}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.imageBorder} />
              </div>

              {/* Text content details */}
              <div className={`${styles.details} parchment-card`} style={{ padding: '14px 16px', margin: '0 0 0 10px', minWidth: '150px' }}>
                <h3 className={styles.title}>{item.title}</h3>
                <span className={styles.date}>{item.date}</span>
                <p className={styles.desc}>{item.desc}</p>
              </div>

              {/* Small dot on line */}
              <div className={styles.dot} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
