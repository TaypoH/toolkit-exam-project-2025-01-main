import { useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'events-list';

export const useUpdateNotifiedIds = events => {
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    let allNotifiedIds = [];
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        allNotifiedIds = parsed
          .filter(
            event =>
              event.remindAt && new Date(event.remindAt).getTime() <= Date.now()
          )
          .map(event => event.id);
      } catch {
        /* ignore error for localStorage parse */
      }
    }
    let prev = [];
    try {
      prev = JSON.parse(localStorage.getItem('events-notified-ids') || '[]');
    } catch {
      prev = [];
    }
    const merged = Array.from(
      new Set([...(Array.isArray(prev) ? prev : []), ...allNotifiedIds])
    );
    localStorage.setItem('events-notified-ids', JSON.stringify(merged));
  }, [events]);
};
