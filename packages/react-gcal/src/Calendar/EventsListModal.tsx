import { useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarEvent, CalendarLabels } from './types';
import { defaultLabels } from './labels';
import { Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { cn } from '../lib/utils';
import styles from './EventsListModal.module.scss';

interface EventsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  labels?: CalendarLabels;
}

const eventColorClassMap: Record<string, string> = {
  tomato: styles.eventTomato,
  tangerine: styles.eventTangerine,
  banana: styles.eventBanana,
  basil: styles.eventBasil,
  sage: styles.eventSage,
  peacock: styles.eventPeacock,
  blueberry: styles.eventBlueberry,
  lavender: styles.eventLavender,
  grape: styles.eventGrape,
  graphite: styles.eventGraphite,
};

export function EventsListModal({
  isOpen,
  onClose,
  date,
  events,
  onEventClick,
  labels = defaultLabels,
}: EventsListModalProps) {
  // Agrupar eventos por hora
  const eventsByHour = useMemo(() => {
    const grouped: Record<number, CalendarEvent[]> = {};
    
    events.forEach((event) => {
      const [hours] = event.startTime.split(':').map(Number);
      if (!grouped[hours]) {
        grouped[hours] = [];
      }
      grouped[hours].push(event);
    });

    // Ordenar eventos dentro de cada hora
    Object.keys(grouped).forEach((hour) => {
      grouped[Number(hour)].sort((a, b) => {
        const [aHours, aMinutes] = a.startTime.split(':').map(Number);
        const [bHours, bMinutes] = b.startTime.split(':').map(Number);
        return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
      });
    });

    return grouped;
  }, [events]);

  const sortedHours = Object.keys(eventsByHour)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className={styles.container} closeLabel={labels.close}>
        <DialogHeader className={styles.header}>
          <DialogTitle>
            {format(date, labels.locale === defaultLabels.locale ? "EEEE, dd 'de' MMMM" : "EEEE, MMMM dd", { locale: labels.locale })} - {events.length} {labels.events}
          </DialogTitle>
        </DialogHeader>

        <div className={styles.content}>
          {sortedHours.length === 0 ? (
            <div className={styles.empty}>
              {labels.noEvents}
            </div>
          ) : (
            sortedHours.map((hour) => (
              <div key={hour} className={styles.hourGroup}>
                <div className={styles.hourHeader}>
                  <h3 className={styles.hourTitle}>
                    {hour.toString().padStart(2, '0')}:00
                  </h3>
                </div>
                <div className={styles.eventsList}>
                  {eventsByHour[hour].map((event) => (
                    <div
                      key={event.id}
                      onClick={() => {
                        onEventClick(event);
                        onClose();
                      }}
                      className={cn(
                        styles.eventItem,
                        eventColorClassMap[event.color] || styles.eventDefault
                      )}
                    >
                      <div className={styles.eventContent}>
                        {event.icon && (
                          <div className={styles.eventIcon}>
                            {event.icon}
                          </div>
                        )}
                        <div className={styles.eventDetails}>
                          <div className={styles.eventTitle}>
                            {event.title}
                          </div>
                          <div className={styles.eventTime}>
                            <Clock />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          {event.description && (
                            <div className={styles.eventDescription}>
                              {event.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
