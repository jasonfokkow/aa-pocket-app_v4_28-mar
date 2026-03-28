import { NavLink } from 'react-router-dom';
import { House, BookOpenText, SquaresFour } from '@phosphor-icons/react';
import styles from './TabBar.module.css';

const tabs = [
  { to: '/', label: 'Home', IconInactive: props => <House weight="light" {...props} />, IconActive: props => <House weight="fill" {...props} /> },
  { to: '/sop', label: 'SOP', IconInactive: props => <BookOpenText weight="light" {...props} />, IconActive: props => <BookOpenText weight="fill" {...props} /> },
  { to: '/catalogue', label: 'Catalogue', IconInactive: props => <SquaresFour weight="light" {...props} />, IconActive: props => <SquaresFour weight="fill" {...props} /> },
];

export default function TabBar() {
  return (
    <nav className={styles.tabBar}>
      {tabs.map(({ to, label, IconInactive, IconActive }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className={styles.icon}>
                {isActive
                  ? <IconActive size={24} color="var(--color-accent)" />
                  : <IconInactive size={24} color="var(--color-text-secondary)" />}
              </span>
              <span className={styles.label}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
