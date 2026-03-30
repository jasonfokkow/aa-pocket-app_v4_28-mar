import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, MagnifyingGlass } from '@phosphor-icons/react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import Badge from '../../components/Badge/Badge';
import productsData from '../../data/products.json';
import styles from './Catalogue.module.css';

const FILTERS = ['all', 'evergreen', 'aa-grade', 'vintage'];
const FILTER_LABELS = { all: 'All', evergreen: 'Evergreen', 'aa-grade': 'Aa Grade', vintage: 'Vintage' };

export default function Catalogue() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = productsData.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.type === activeFilter;
    const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className={styles.screen}>
      <Header title="Catalogue" />

      <div className={styles.body}>
        <div className={styles.stickyBar}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search products..." />
          <div className={styles.divider} />

          <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`${styles.tab} ${activeFilter === f ? styles.tabActive : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.divider} />
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No results for "{query}"</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(product => (
              <button
                key={product.id}
                className={styles.card}
                onClick={() => navigate(`/catalogue/${product.id}`)}
              >
                <div className={styles.imageArea}>
                  {product.image
                    ? <img src={product.image} alt={product.name} className={styles.productImage} />
                    : <ImageIcon weight="light" size={32} color="var(--color-text-secondary)" />}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardBadges}>
                    <Badge variant={product.type} />
                    {product.hasFlashcard && <Badge variant="fc" />}
                  </div>
                  <span className={styles.cardName}>{product.name}</span>
                  <span className={styles.cardPrice}>{product.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
