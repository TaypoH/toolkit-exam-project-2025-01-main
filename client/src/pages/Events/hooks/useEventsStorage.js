import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'events-list';

export const useEventsStorage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  return [events, setEvents];
};
