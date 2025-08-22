import { useState, useEffect } from 'react';

export const useSeenNotifiedIds = () => {
  const [seenNotifiedIds, setSeenNotifiedIds] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('events-notified-ids') || '[]'
      );
      if (Array.isArray(saved)) setSeenNotifiedIds(saved);
    } catch {
      /* ignore error for localStorage parse */
    }
  }, []);

  return seenNotifiedIds;
};
