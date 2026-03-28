import { createContext, useContext, useState } from 'react';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null); // { type, cards, currentIndex, ratings, startTime }

  function startSession(type, cards) {
    setSession({
      type, // 'quick' | 'full'
      cards,
      currentIndex: 0,
      ratings: {},
      startTime: Date.now(),
    });
  }

  function rateCurrentCard(cardId, rating) {
    setSession(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [cardId]: rating },
    }));
  }

  function nextCard() {
    setSession(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
  }

  function endSession() {
    const ended = session;
    setSession(null);
    return ended;
  }

  function pauseSession() {
    // Session state is preserved in context — resuming just re-enters the screen
  }

  return (
    <SessionContext.Provider value={{ session, startSession, rateCurrentCard, nextCard, endSession, pauseSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
