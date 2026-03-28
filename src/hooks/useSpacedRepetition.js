import { useLocalStorage } from './useLocalStorage';

const RATINGS = { GOT_IT: 'got_it', WASNT_SURE: 'wasnt_sure', DIDNT_KNOW: 'didnt_know' };

// Simplified SM-2: returns next interval in days
function getNextInterval(currentInterval, rating) {
  if (rating === RATINGS.DIDNT_KNOW) return 1;
  if (rating === RATINGS.WASNT_SURE) return Math.max(1, Math.ceil(currentInterval * 0.5));
  // GOT_IT
  if (currentInterval <= 1) return 3;
  if (currentInterval <= 3) return 7;
  return Math.min(30, Math.ceil(currentInterval * 1.5));
}

function getDueDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export function useSpacedRepetition() {
  const [cardData, setCardData] = useLocalStorage('sr_cards', {});

  function getCardState(cardId) {
    return cardData[cardId] || { interval: 0, dueDate: null, lastRating: null };
  }

  function rateCard(cardId, rating) {
    setCardData(prev => {
      const current = prev[cardId] || { interval: 0 };
      const newInterval = getNextInterval(current.interval || 1, rating);
      return {
        ...prev,
        [cardId]: {
          interval: newInterval,
          dueDate: getDueDate(newInterval),
          lastRating: rating,
        },
      };
    });
  }

  function isDue(cardId) {
    const state = getCardState(cardId);
    if (!state.dueDate) return true; // never reviewed
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return new Date(state.dueDate) <= now;
  }

  function getDueCards(allCardIds) {
    return allCardIds.filter(id => isDue(id));
  }

  function getWeakCards(allCardIds) {
    return allCardIds.filter(id => {
      const state = getCardState(id);
      return state.lastRating === RATINGS.DIDNT_KNOW || state.lastRating === RATINGS.WASNT_SURE;
    });
  }

  function getNextDueDate(allCardIds) {
    const dates = allCardIds
      .map(id => getCardState(id).dueDate)
      .filter(Boolean)
      .map(d => new Date(d))
      .sort((a, b) => a - b);
    return dates.length ? dates[0] : null;
  }

  return { rateCard, isDue, getDueCards, getWeakCards, getNextDueDate, cardData };
}
