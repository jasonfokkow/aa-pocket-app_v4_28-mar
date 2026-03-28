import { MagnifyingGlass, X } from '@phosphor-icons/react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className={styles.wrapper}>
      <MagnifyingGlass weight="light" size={18} color="var(--color-text-secondary)" className={styles.iconLeft} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className={styles.clearBtn} onClick={() => onChange('')} aria-label="Clear search">
          <X weight="light" size={16} color="var(--color-text-secondary)" />
        </button>
      )}
    </div>
  );
}
