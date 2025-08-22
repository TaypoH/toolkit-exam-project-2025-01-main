import React from 'react';
import moment from 'moment';
import styles from './EventTimer.module.sass';

const EventTimer = ({ eventDate, nowMs }) => {
  const eventMoment = moment(eventDate);
  const diff = Math.max(0, eventMoment.valueOf() - (nowMs || Date.now()));
  if (diff <= 0) return <span className={styles.error}>Time is up!</span>;

  const duration = moment.duration(diff);
  const days = duration.days();
  const hours = duration.hours().toString().padStart(2, '0');
  const minutes = duration.minutes().toString().padStart(2, '0');
  const seconds = duration.seconds().toString().padStart(2, '0');

  return (
    <span className={styles.timer}>
      {days > 0 && `${days}d `}
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export default EventTimer;
