import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import EventForm from '../../components/Events/EventForm/EventForm';
import EventCard from '../../components/Events/EventCard/EventCard';
import styles from './Events.module.sass';
import CONSTANTS from '../../constants';
import { useEvents } from './hooks/useEvents';

function formatDate (dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const Events = () => {
  const { events, addEvent, updateEvent, deleteEvent, isNotifyTime, now } =
    useEvents();
  const role = useSelector(state => state.userStore.data?.role);

  useEffect(() => {
    localStorage.setItem('events-visited', '1');
  }, []);

  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
  if (!token || (role && role !== CONSTANTS.CUSTOMER))
    return <Navigate to='/' replace />;
  if (!role) return null;

  return (
    <div className={styles.container}>
      {role === CONSTANTS.CUSTOMER && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>Create new event</div>
          <div className={styles.panelBody}>
            <EventForm onAdd={addEvent} />
          </div>
        </div>
      )}
      <div className={styles.listHeader}>
        <span className={styles.listTitle}>Live upcoming checks</span>
        <span className={styles.listRightTitle}>Remaining time</span>
      </div>
      <div className={styles.timersList}>
        {events.length === 0 && (
          <div className={styles.noEvents}>No events</div>
        )}
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={deleteEvent}
            onUpdate={updateEvent}
            highlight={isNotifyTime(event)}
            formatDate={formatDate}
            nowMs={now}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
