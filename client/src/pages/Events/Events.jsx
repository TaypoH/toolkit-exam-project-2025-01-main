import React, { useState, useEffect } from 'react';
import EventForm from '../../components/Events/EventForm/EventForm';
import EventCard from '../../components/Events/EventCard/EventCard';
import styles from './Events.module.sass';

const LOCAL_STORAGE_KEY = 'events-list';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('ru-RU', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    localStorage.setItem('events-visited', '1');
  }, []);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    let allNotifiedIds = [];
    if (stored) {
      try {
        const events = JSON.parse(stored);
        allNotifiedIds = events
          .filter(event => {
            const eventDateMs = new Date(event.date).getTime();
            const notifyBeforeMs = (event.notifyBefore || 0) * 60 * 1000;
            return eventDateMs - notifyBeforeMs <= Date.now();
          })
          .map(event => event.id);
      } catch { /* ignore error for localStorage parse */ }
    }
    localStorage.setItem('events-notified-ids', JSON.stringify(allNotifiedIds));
  }, [events]);

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleDelete = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const isNotifyTime = (event) => {
    const eventDateMs = new Date(event.date).getTime();
    const notifyBeforeMs = (event.notifyBefore || 0) * 60 * 1000;
    return eventDateMs - notifyBeforeMs <= now && eventDateMs > now;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Events</h1>
      <EventForm onAdd={event => setEvents(prev => [...prev, event])} />
      <h2 className={styles.timersTitle}>Timers list</h2>
      <div className={styles.timersList}>
        {sortedEvents.length === 0 && <div className={styles.noEvents}>No events</div>}
        {sortedEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete}
            highlight={isNotifyTime(event)}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Events; 