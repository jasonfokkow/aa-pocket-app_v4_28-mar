import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowCounterClockwise, CalendarBlank } from '@phosphor-icons/react';
import sopData from '../../data/sop.json';
import productsData from '../../data/products.json';
import styles from './SessionSummary.module.css';

function getCardTitle(cardId) {
  if (cardId.startsWith('sop-')) {
    const topic = sopData.find(t => `sop-${t.id}` === cardId);
    return topic?.title || cardId;
  }
  if (cardId.startsWith('product-')) {
    const product = productsData.find(p => `product-${p.id}` === cardId);
    return product?.name || cardId;
  }
  return cardId;
}

export default function SessionSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ended = state?.ended;

  if (!ended) {
    navigate('/');
    return null;
  }

  const { type, ratings } = ended;
  const sessionLabel = type === 'quick' ? 'Quick Review' : 'Full Review';

  const weakIds = Object.entries(ratings)
    .filter(([, r]) => r === 'didnt_know' || r === 'wasnt_sure')
    .map(([id]) => id);

  const today = new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <CheckCircle weight="light" size={28} color="var(--color-text-primary)" />
        <h1 className={styles.title}>{sessionLabel} Complete</h1>
        <p className={styles.date}>{today}</p>
      </div>

      <div className={styles.divider} />

      {weakIds.length > 0 ? (
        <div className={styles.section}>
          <h2 className={styles.sectionHeading}>
            <ArrowCounterClockwise weight="light" size={14} />
            Areas to revisit
          </h2>
          <div className={styles.weakList}>
            {weakIds.map(id => (
              <div key={id} className={styles.weakRow}>
                <span className={styles.weakTitle}>{getCardTitle(id)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.section}>
          <p className={styles.allGood}>Strong session — no weak areas.</p>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.nextDue}>
          <CalendarBlank weight="light" size={13} />
          Next cards due: tomorrow
        </p>
      </div>

      <div className={styles.divider} />

      <div className={styles.ctas}>
        {type === 'quick' && (
          <button className={styles.linkBtn} onClick={() => navigate('/')}>
            Continue to Full Review →
          </button>
        )}
        <button className={styles.doneBtn} onClick={() => navigate('/')}>
          Done
        </button>
      </div>
    </div>
  );
}
