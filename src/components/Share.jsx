import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiLink, FiCheck } from 'react-icons/fi';
import styles from './Share.module.css';

export default function Share({ settings }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const bride = settings?.brideName || 'Diksha';
  const groom = settings?.groomName || 'Rahul';
  const msg = `You're invited to ${bride} & ${groom}'s wedding! ${url}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareButtons = [
    { label: 'WhatsApp', icon: <FaWhatsapp />, href: `https://wa.me/?text=${encodeURIComponent(msg)}` },
    { label: 'Facebook', icon: <FaFacebookF />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'Instagram', icon: <FaInstagram />, href: 'https://www.instagram.com' },
  ];

  return (
    <section className={styles.section} id="share">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Share The Joy
      </motion.p>
      <motion.h2 className={`section-title ${styles.title}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Invite Loved Ones
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>
      
      <div className="parchment-card" style={{ maxWidth: '360px', width: '92%', margin: '0 auto', textAlign: 'center', padding: '25px 15px' }}>
        <p className={styles.description}>Share this invitation card with your family and friends</p>

        <div className={styles.btns}>
          {shareButtons.map((b) => (
            <motion.a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className={styles.shareCircle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              title={b.label}
            >
              {b.icon}
            </motion.a>
          ))}
          
          <motion.button
            className={`${styles.shareCircle} ${copied ? styles.copied : ''}`}
            onClick={copyLink}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            title={copied ? 'Link Copied!' : 'Copy Link'}
          >
            {copied ? <FiCheck /> : <FiLink />}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
