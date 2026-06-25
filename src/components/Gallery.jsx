import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import styles from './Gallery.module.css';

const galleryImages = [
  { src: '/images/bg1.jpeg', alt: 'Wedding Moment 1' },
  { src: '/images/bg2.jpeg', alt: 'Wedding Moment 2' },
  { src: '/images/bg3.jpeg', alt: 'Wedding Moment 3' },
  { src: '/images/bg4.jpeg', alt: 'Wedding Moment 4' },
  { src: '/images/bg5.jpeg', alt: 'Wedding Moment 5' },
  { src: '/images/bg6.jpeg', alt: 'Wedding Moment 7' },
  { src: '/images/bg7.jpeg', alt: 'Wedding Moment 8' },
  { src: '/images/bg8.jpeg', alt: 'Wedding Moment 9' },
  { src: '/images/bg9.jpeg', alt: 'Wedding Moment 10' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className={styles.section} id="gallery">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Moments
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Our Gallery
      </motion.h2>

      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>

      <div className={styles.masonry}>
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            className={styles.item}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            onClick={() => setLightbox(i)}
            whileHover={{ scale: 1.03 }}
          >
            <img src={img.src} alt={img.alt} className={styles.img} loading="lazy" />
            <div className={styles.overlay}><span className={styles.zoomIcon}>+</span></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
          >
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            <Swiper
              modules={[Navigation, Zoom]}
              navigation
              zoom
              initialSlide={lightbox}
              className={styles.swiper}
            >
              {galleryImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-zoom-container">
                    <img src={img.src} alt={img.alt} className={styles.lightboxImg} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
