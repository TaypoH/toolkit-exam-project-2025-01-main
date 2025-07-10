import React from 'react';
import styles from './EventCard.module.sass';
import EventTimer from '../EventTimer/EventTimer';

const EventCard = ({ event, onDelete, highlight, formatDate }) => (
  <div
    className={highlight ? `${styles.card} ${styles['card--highlight']}` : styles.card}
  >
    <div className={styles.cardInner}>
      <div className={styles.cardInfo}>
        <div className={styles.name}>{event.name}</div>
        <div className={styles.dateRow}>
          <span className={styles.date}>{formatDate(event.date)}</span>
        </div>
        <div className={styles.notify}>Notify before: {event.notifyBefore} min</div>
      </div>
      <div className={styles.cardActions}>
        <EventTimer eventDate={event.date} />
        <button onClick={() => onDelete(event.id)} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
      {highlight && (
        <span className={styles.reminderBadge}>Reminder!</span>
      )}
    </div>
  </div>
);

export default EventCard; 