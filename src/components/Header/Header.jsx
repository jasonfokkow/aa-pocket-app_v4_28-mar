import { useNavigate } from 'react-router-dom';
import { CaretLeft } from '@phosphor-icons/react';
import styles from './Header.module.css';

export default function Header({ title, showBack = false, rightSlot }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack && (
          <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
            <CaretLeft weight="light" size={24} color="var(--color-text-primary)" />
          </button>
        )}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>
        {rightSlot || null}
      </div>
    </header>
  );
}
