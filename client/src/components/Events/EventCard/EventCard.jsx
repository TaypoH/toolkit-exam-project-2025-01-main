import React, { useRef, useState } from 'react';
import styles from './EventCard.module.sass';
import EventTimer from '../EventTimer/EventTimer';

const EventCard = ({
  event,
  onDelete,
  onUpdate,
  highlight,
  formatDate,
  nowMs,
}) => {
  const totalMs = new Date(event.date).getTime() - (nowMs || Date.now());
  const timeUntil = Math.max(0, totalMs);
  const initialRemainingRef = useRef(Math.max(1, timeUntil));
  const progress = 1 - Math.min(1, timeUntil / initialRemainingRef.current);
  const isPast = (nowMs || Date.now()) >= new Date(event.date).getTime();

  const previousDateRef = useRef(event.date);
  if (previousDateRef.current !== event.date) {
    const remaining = Math.max(
      0,
      new Date(event.date).getTime() - (nowMs || Date.now())
    );
    initialRemainingRef.current = Math.max(1, remaining);
    previousDateRef.current = event.date;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState(event.date || '');
  const [editRemindAt, setEditRemindAt] = useState(event.remindAt || '');
  const [editError, setEditError] = useState('');

  const saveEdit = () => {
    if (
      !editDate ||
      !editRemindAt ||
      new Date(editRemindAt) >= new Date(editDate)
    ) {
      setEditError('Reminder time must be earlier than the event time.');
      return;
    }
    onUpdate({ ...event, date: editDate, remindAt: editRemindAt });
    setIsEditing(false);
    setEditError('');
  };

  return (
    <div
      className={
        highlight ? `${styles.card} ${styles['card--highlight']}` : styles.card
      }
    >
      <div
        className={styles.progressStripe}
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
      <div className={styles.cardInner}>
        <div className={styles.cardInfo}>
          <div className={styles.name}>{event.name}</div>
          <div className={styles.dateRow}>
            <span className={styles.date}>{formatDate(event.date)}</span>
          </div>
          {event.remindAt && (
            <div className={styles.notify}>
              Reminder at: {formatDate(event.remindAt)}
            </div>
          )}
        </div>
        <div className={styles.cardActions}>
          <EventTimer eventDate={event.date} nowMs={nowMs} />
          {isEditing ? (
            <div className={styles.editWrap}>
              <label className={styles.editField}>
                <span className={styles.editLabel}>Event date and time</span>
                <input
                  type='datetime-local'
                  className={styles.input}
                  value={editDate}
                  onChange={e => {
                    const v = e.target.value;
                    setEditDate(v);
                    if (editRemindAt && new Date(editRemindAt) >= new Date(v))
                      setEditRemindAt('');
                  }}
                />
              </label>
              <label className={styles.editField}>
                <span className={styles.editLabel}>Reminder date and time</span>
                <input
                  type='datetime-local'
                  className={styles.input}
                  value={editRemindAt}
                  max={editDate || undefined}
                  onChange={e => setEditRemindAt(e.target.value)}
                />
              </label>
              <div className={styles.editButtons}>
                <button className={styles.saveBtn} onClick={saveEdit}>
                  Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
              {editError && <div className={styles.error}>{editError}</div>}
            </div>
          ) : (
            <div className={styles.actionsRow}>
              {!isPast && (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editBtn}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(event.id)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {highlight && <span className={styles.reminderBadge}>Reminder!</span>}
      </div>
    </div>
  );
};

export default EventCard;
