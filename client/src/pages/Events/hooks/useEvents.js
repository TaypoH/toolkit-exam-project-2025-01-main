import { useCallback, useMemo } from 'react';
import { useEventsStorage } from './useEventsStorage';
import { useNow } from './useNow';
import { useSeenNotifiedIds } from './useSeenNotifiedIds';
import { useUpdateNotifiedIds } from './useUpdateNotifiedIds';

export const useEvents = () => {
  const [events, setEvents] = useEventsStorage();
  const now = useNow();
  const seenNotifiedIds = useSeenNotifiedIds();
  useUpdateNotifiedIds(events);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [events]
  );

  const addEvent = useCallback(
    event => setEvents(prev => [...prev, event]),
    [setEvents]
  );

  const updateEvent = useCallback(
    updated =>
      setEvents(prev => prev.map(e => (e.id === updated.id ? updated : e))),
    [setEvents]
  );

  const deleteEvent = useCallback(
    id => setEvents(prev => prev.filter(e => e.id !== id)),
    [setEvents]
  );

  const isNotifyTime = useCallback(
    event => {
      const remindAtMs = event.remindAt
        ? new Date(event.remindAt).getTime()
        : null;
      return (
        remindAtMs != null &&
        remindAtMs <= now &&
        !seenNotifiedIds.includes(event.id)
      );
    },
    [now, seenNotifiedIds]
  );

  return {
    events: sortedEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    isNotifyTime,
    now,
  };
};
