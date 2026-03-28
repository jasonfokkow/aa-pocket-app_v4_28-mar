import { useNavigate } from 'react-router-dom';
import { Cards, Timer, CheckCircle } from '@phosphor-icons/react';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';
import { useSession } from '../../context/SessionContext';
import sopData from '../../data/sop.json';
import productsData from '../../data/products.json';
import styles from './Home.module.css';
import aaPocketLogo from '../../assets/aa-pocket-logo.svg';

// Build flashcard deck from SOP topics + evergreen products
function buildAllCards() {
  const sopCards = sopData.map(topic => ({
    id: `sop-${topic.id}`,
    type: 'sop',
    topicId: topic.id,
    title: topic.title,
    question: `What are the key rules for: ${topic.title}?`,
    answer: topic.summary,
    category: topic.category,
  }));

  const productCards = productsData
    .filter(p => p.type === 'evergreen' && p.hasFlashcard && p.flashcardNotes)
    .map(p => ({
      id: `product-${p.id}`,
      type: 'product',
      productId: p.id,
      title: p.name,
      question: `What should you know about ${p.name} when talking to a customer?`,
      answer: p.flashcardNotes,
      category: 'products',
    }));

  return [...sopCards, ...productCards];
}

const ALL_CARDS = buildAllCards();
const ALL_CARD_IDS = ALL_CARDS.map(c => c.id);

const QUICK_COUNT = 8;
const FULL_COUNT = 18;

export default function Home() {
  const navigate = useNavigate();
  const { getDueCards, getNextDueDate } = useSpacedRepetition();
  const { startSession } = useSession();

  const dueIds = getDueCards(ALL_CARD_IDS);
  const dueCards = ALL_CARDS.filter(c => dueIds.includes(c.id));
  const hasDue = dueCards.length > 0;

  const nextDue = getNextDueDate(ALL_CARD_IDS.filter(id => !dueIds.includes(id)));

  function formatNextDue(date) {
    if (!date) return 'soon';
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.round((date - now) / (1000 * 60 * 60 * 24));
    if (diff <= 1) return 'tomorrow';
    if (diff <= 7) return `in ${diff} days`;
    return 'in a while';
  }

  function handleStart(type) {
    const count = type === 'quick' ? QUICK_COUNT : FULL_COUNT;
    // Prioritise due cards, fill from all if not enough
    const shuffled = [...dueCards].sort(() => Math.random() - 0.5);
    const extra = ALL_CARDS.filter(c => !dueIds.includes(c.id)).sort(() => Math.random() - 0.5);
    const cards = [...shuffled, ...extra].slice(0, count);
    startSession(type, cards);
    navigate('/review');
  }

  const quickCount = Math.min(dueCards.length, QUICK_COUNT);
  const fullCount = Math.min(Math.max(dueCards.length, FULL_COUNT), ALL_CARDS.length);
  const quickMin = Math.round(quickCount * 0.4);
  const fullMin = Math.round(fullCount * 0.4);

  return (
    <div className={styles.screen}>
      <div className={styles.topSection}>
        <div className={styles.greeting}>
          <img src={aaPocketLogo} alt="Aa Pocket" className={styles.logoImage} />
        </div>
        <div className={styles.divider} />
      </div>

      <div className={styles.content}>
        {hasDue ? (
          <>
            <p className={styles.dueLabel}>
              <Cards weight="light" size={14} color="var(--color-text-secondary)" />
              {dueCards.length} card{dueCards.length !== 1 ? 's' : ''} due today
            </p>

            {/* Quick Review */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Quick Review</h2>
                  <p className={styles.cardMeta}>
                    <Timer weight="light" size={13} />
                    ~{quickMin}–{quickMin + 2} min · {quickCount} cards
                  </p>
                </div>
              </div>
              <button className={styles.btn} onClick={() => handleStart('quick')}>
                Start
              </button>
            </div>

            <div className={styles.divider} />

            {/* Full Review */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle} style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>
                    Full Review
                  </h2>
                  <p className={styles.cardMeta}>
                    <Timer weight="light" size={13} />
                    ~{fullMin}–{fullMin + 3} min · {fullCount} cards
                  </p>
                </div>
              </div>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => handleStart('full')}>
                Start
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <CheckCircle weight="light" size={32} color="var(--color-text-secondary)" />
            <p className={styles.emptyTitle}>You're all caught up.</p>
            <p className={styles.emptyMeta}>Next review {formatNextDue(nextDue)}.</p>
          </div>
        )}

      </div>
    </div>
  );
}
