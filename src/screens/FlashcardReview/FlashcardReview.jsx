import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, Pause } from '@phosphor-icons/react';
import { useSession } from '../../context/SessionContext';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';
import styles from './FlashcardReview.module.css';

export default function FlashcardReview() {
  const navigate = useNavigate();
  const { session, rateCurrentCard, nextCard, endSession } = useSession();
  const { rateCard } = useSpacedRepetition();
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(null);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!session) { navigate('/'); return; }
  }, [session]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setElapsed(Date.now() - startTime), 1000);
    return () => clearInterval(interval);
  }, [paused, startTime]);

  if (!session) return null;

  const { type, cards, currentIndex } = session;
  const totalCards = cards.length;
  const card = cards[currentIndex];
  const isLast = currentIndex >= totalCards - 1;

  const elapsedMin = Math.floor(elapsed / 60000);
  const totalEstMin = Math.ceil(totalCards * 0.4);
  const remainMin = Math.max(0, totalEstMin - elapsedMin);

  function handleReveal() {
    if (!revealed) setRevealed(true);
  }

  function handleRate(rating) {
    if (selected) return;
    setSelected(rating);
    rateCard(card.id, rating);
    rateCurrentCard(card.id, rating);
    setTimeout(() => {
      setSelected(null);
      setRevealed(false);
      if (isLast) {
        const ended = endSession();
        navigate('/summary', { state: { ended } });
      } else {
        nextCard();
      }
    }, 400);
  }

  const sessionLabel = type === 'quick' ? 'Quick Review' : 'Full Review';

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.headerBtn} onClick={() => navigate('/')} aria-label="Exit">
          <CaretLeft weight="light" size={24} color="var(--color-text-primary)" />
        </button>
        <span className={styles.sessionLabel}>{sessionLabel}</span>
        {!paused && (
          <button
            className={styles.headerBtn}
            onClick={() => setPaused(true)}
            aria-label="Pause"
          >
            <Pause weight="light" size={24} color="var(--color-text-primary)" />
          </button>
        )}
        {paused && <div className={styles.headerBtn} />}
      </div>
      <div className={styles.divider} />

      {/* Progress */}
      <div className={styles.progress}>
        <span>Card {currentIndex + 1} of {totalCards}</span>
        <span>·</span>
        <span>{remainMin} min left</span>
      </div>
      <div className={styles.divider} />

      {paused ? (
        <div className={styles.pausedOverlay}>
          <p className={styles.pausedText}>Paused</p>
          <button className={styles.resumeBtn} onClick={() => setPaused(false)}>Resume</button>
        </div>
      ) : (
        <div className={styles.cardArea}>
          {/* Flashcard */}
          <div className={styles.flashcard} onClick={handleReveal}>
            <span className={styles.cardCategory}>{card.category?.toUpperCase()}</span>
            <h2 className={styles.cardQuestion}>{card.question}</h2>

            {revealed ? (
              <>
                <div className={styles.cardDivider} />
                <p className={styles.cardAnswer}>{card.answer}</p>
              </>
            ) : (
              <p className={styles.tapHint}>Tap to reveal</p>
            )}
          </div>

          {/* Confidence buttons */}
          {revealed && (
            <div className={styles.ratingRow}>
              {[
                { key: 'got_it', label: "Got it", activeStyle: styles.ratingGot },
                { key: 'wasnt_sure', label: "Wasn't sure", activeStyle: styles.ratingUnsure },
                { key: 'didnt_know', label: "Didn't know", activeStyle: styles.ratingDidnt },
              ].map(({ key, label, activeStyle }) => (
                <button
                  key={key}
                  className={`${styles.ratingBtn} ${selected === key ? activeStyle : ''}`}
                  onClick={() => handleRate(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
