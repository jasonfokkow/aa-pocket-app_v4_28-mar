import styles from './Badge.module.css';

const variantMap = {
  'in-stock': { label: 'IN STOCK', className: 'inStock' },
  'preorder': { label: 'PREORDER', className: 'preorder' },
  'vintage': { label: 'VINTAGE', className: 'vintage' },
  'evergreen': { label: 'EVERGREEN', className: 'evergreen' },
  'aa-grade': { label: 'AA GRADE', className: 'aaGrade' },
  'fc': { label: 'FC', className: 'fc' },
};

export default function Badge({ variant }) {
  const config = variantMap[variant];
  if (!config) return null;
  return <span className={`${styles.badge} ${styles[config.className]}`}>{config.label}</span>;
}
