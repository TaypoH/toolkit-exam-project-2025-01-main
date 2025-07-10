import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './EventTimer.module.sass';

function EventTimer({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = moment();
    const eventMoment = moment(eventDate);
    const diff = eventMoment.diff(now);
    if (diff <= 0) return null;
    const duration = moment.duration(diff);
    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  useEffect(() => {
    if (getTimeLeft() === null) {
      setTimeLeft(null);
      return;
    }
    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft();
      if (newTimeLeft === null) {
        clearInterval(interval);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  if (!timeLeft) return <span className={styles.error}>Time is up!</span>;

  return (
    <span className={styles.timer}>
      {timeLeft.days > 0 && `${timeLeft.days}d `}
      {timeLeft.hours.toString().padStart(2, '0')}:
      {timeLeft.minutes.toString().padStart(2, '0')}:
      {timeLeft.seconds.toString().padStart(2, '0')}
    </span>
  );
}

export default EventTimer; 