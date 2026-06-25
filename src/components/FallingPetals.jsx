import { useEffect, useState } from 'react';
import styles from './FallingPetals.module.css';

const PETAL_COLORS = [
  '#A82C2C', // Deep Rose Maroon
  '#C0392B', // Vivid Red
  '#D4AF37', // Champagne Gold
  '#E67E22', // Marigold Orange
];

// 3 Elegant organic petal silhouettes
const PETAL_PATHS = [
  "M15,2 C22,2 26,6 26,12 C26,18 20,22 15,22 C10,22 4,18 4,12 C4,6 8,2 15,2 Z",
  "M12,2 C17,2 20,7 18,13 C16,19 12,22 9,20 C6,18 5,12 7,7 C9,2 10,2 12,2 Z",
  "M12,4 C19,4 21,8 19,14 C17,20 11,20 8,16 C5,12 7,6 12,4 Z"
];

export default function FallingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 32 randomized petals that loop infinitely via CSS animations
    const generated = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 12 + 8, // Slower, more graceful fall
      size: Math.random() * 12 + 10, // sizes between 10px and 22px
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      path: PETAL_PATHS[Math.floor(Math.random() * PETAL_PATHS.length)],
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.35 + 0.55, // elegant semi-transparency
    }));
    setPetals(generated);
  }, []);

  return (
    <div className={styles.container}>
      {petals.map((p) => (
        <svg
          key={p.id}
          className={styles.petal}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            color: p.color,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
          viewBox="0 0 30 30"
          fill="currentColor"
        >
          <path d={p.path} />
        </svg>
      ))}
    </div>
  );
}
