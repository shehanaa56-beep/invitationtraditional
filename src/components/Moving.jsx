import React from 'react';
import styles from './Moving.module.css';

const images = [
  '/images/bg1.jpeg',
  '/images/bg2.jpeg',
  '/images/bg3.jpeg',
  '/images/bg4.jpeg',
  '/images/bg5.jpeg',
  '/images/bg6.jpeg',
  '/images/bg7.jpeg',
  '/images/bg8.jpeg',
  '/images/bg9.jpeg',
  '/images/bg10.jpeg',
  '/images/bg11.jpeg',
  '/images/bg12.jpeg',
];

export default function Moving() {
  return (
    <div className={styles.movingSlider}>
      <div className={styles.movingTrack}>
        {images.concat(images).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Moving ${index + 1}`}
            className={styles.movingImage}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
