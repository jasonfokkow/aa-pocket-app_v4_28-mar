import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import sopData from '../../data/sop.json';
import styles from './SOPList.module.css';

const CATEGORIES = ['all', 'operations', 'sales', 'products', 'logistics'];
const CATEGORY_LABELS = { all: 'All', operations: 'Operations', sales: 'Sales', products: 'Products', logistics: 'Logistics' };

export default function SOPList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = sopData.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    const matchesQuery = !query ||
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className={styles.screen}>
      <Header title="SOP" />

      <div className={styles.body}>
        <div className={styles.stickyBar}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search SOPs..." />
          <div className={styles.divider} />

          {/* Category tabs */}
          <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.divider} />
        </div>

        {/* Topic list */}
        <div className={styles.list}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>No results for "{query}"</p>
          ) : (
            filtered.map(topic => (
              <button
                key={topic.id}
                className={styles.row}
                onClick={() => navigate(`/sop/${topic.id}`)}
              >
                <div className={styles.rowContent}>
                  <span className={styles.rowTitle}>{topic.title}</span>
                  <span className={styles.rowDesc}>{topic.description}</span>
                </div>
                <CaretRight weight="light" size={16} color="var(--color-text-secondary)" className={styles.chevron} />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
