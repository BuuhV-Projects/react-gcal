import { 
  format,
  isSameDay,
  isToday,
} from 'date-fns';
import { CalendarEvent } from './types';
import { CalendarLabels, defaultLabels } from './labels';
import { cn } from '../lib/utils';
import { Clock, FileText, List } from 'lucide-react';
import { useState, DragEvent } from 'react';
import styles from './DayView.module.scss';
import { EventsListModal } from './EventsListModal';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDrop: (eventId: string, newDate: Date, newHour?: number) => void;
  labels?: CalendarLabels;
  maxVisibleEvents?: number;
}

const eventColorClassMap: Record<string, string> = {
  tomato: styles.tomato,
  tangerine: styles.tangerine,
  banana: styles.banana,
  basil: styles.basil,
  sage: styles.sage,
  peacock: styles.peacock,
  blueberry: styles.blueberry,
  lavender: styles.lavender,
  grape: styles.grape,
  graphite: styles.graphite,
};

const eventColorDotClassMap: Record<string, string> = {
  tomato: styles.tomato,
  tangerine: styles.tangerine,
  banana: styles.banana,
  basil: styles.basil,
  sage: styles.sage,
  peacock: styles.peacock,
  blueberry: styles.blueberry,
  lavender: styles.lavender,
  grape: styles.grape,
  graphite: styles.graphite,
};

export function DayView({ 
  currentDate, 
  events, 
  onTimeSlotClick, 
  onEventClick, 
  onEventDrop,
  labels = defaultLabels,
  maxVisibleEvents = 50,
}: DayViewProps) {
  const [dragOverHour, setDragOverHour] = useState<number | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const isCurrentDay = isToday(currentDate);

  const allDayEvents = events.filter(event => isSameDay(new Date(event.date), currentDate));
  const visibleEvents = allDayEvents.slice(0, maxVisibleEvents);
  const hasMoreEvents = allDayEvents.length > maxVisibleEvents;

  const parseTime = (timeStr: string): { hours: number; minutes: number } => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  const HOUR_ROW_PX = 64;

  const getEventPosition = (event: CalendarEvent) => {
    const start = parseTime(event.startTime);
    const end = parseTime(event.endTime);

    const startMinutes = start.hours * 60 + start.minutes;
    const endMinutes = end.hours * 60 + end.minutes;
    const durationMinutes = Math.max(endMinutes - startMinutes, 15);

    const topPx = (startMinutes / 60) * HOUR_ROW_PX;
    const heightPx = (durationMinutes / 60) * HOUR_ROW_PX;

    return { top: `${topPx}px`, height: `${heightPx}px` };
  };

  const getDurationText = (event: CalendarEvent) => {
    const start = parseTime(event.startTime);
    const end = parseTime(event.endTime);
    const durationMinutes = (end.hours * 60 + end.minutes) - (start.hours * 60 + start.minutes);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, event: CalendarEvent) => {
    e.dataTransfer.setData('eventId', event.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, hour: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverHour(hour);
  };

  const handleDragLeave = () => {
    setDragOverHour(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, hour: number) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('eventId');
    if (eventId) {
      onEventDrop(eventId, currentDate, hour);
    }
    setDragOverHour(null);
  };

  return (
    <div className={styles.container}>
      {/* Header with day info */}
      <div className={styles.header}>
        <div className={styles.timeColumnHeader} />
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <div
              className={cn(
                styles.dayNumberCircle,
                isCurrentDay ? styles.currentDay : styles.notCurrentDay
              )}
            >
              {format(currentDate, 'd')}
            </div>
            <div className={styles.dayInfo}>
              <div className={styles.dayName}>
                {format(currentDate, 'EEEE', { locale: labels.locale })}
              </div>
              <div className={styles.dayDate}>
                {format(currentDate, 'PPP', { locale: labels.locale })}
              </div>
            </div>
            <div className={styles.headerActions}>
              {allDayEvents.length > 0 && (
                <div className={styles.eventsCount}>
                  {allDayEvents.length} {labels.events}
                </div>
              )}
              {hasMoreEvents && (
                <button
                  type="button"
                  className={styles.viewAllButton}
                  onClick={() => setShowAllEvents(true)}
                >
                  <List className={styles.viewAllIcon} />
                  {labels.viewAllEvents.replace('{count}', allDayEvents.length.toString())}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Time grid */}
      <div className={styles.timeGrid}>
        {/* Time column */}
        <div className={styles.timeColumn}>
          {hours.map((hour) => (
            <div key={hour} className={styles.timeSlot}>
              <span className={styles.timeLabel}>
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* Day column with events */}
        <div className={styles.dayColumn}>
          {/* Hour slots */}
          {hours.map((hour) => {
            const isDragOver = dragOverHour === hour;
            
            return (
              <div
                key={hour}
                onClick={() => onTimeSlotClick(currentDate, hour)}
                onDragOver={(e) => handleDragOver(e, hour)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, hour)}
                className={cn(styles.hourSlot, isDragOver && styles.dragOver)}
              />
            );
          })}

          {/* Events overlay */}
          <div className={styles.eventsOverlay}>
            {visibleEvents.map((event) => {
              const position = getEventPosition(event);
              
              return (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, event)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className={cn(styles.event, eventColorClassMap[event.color])}
                  style={{
                    top: position.top,
                    height: position.height,
                    minHeight: '60px',
                  }}
                >
                  <div className={styles.eventContent}>
                    <div className={styles.eventHeader}>
                      <h3 className={styles.eventTitle}>
                        <div className={styles.eventTitleContent}>
                          {event.icon && (
                            <span className={styles.eventIcon}>
                              {event.icon}
                            </span>
                          )}
                          <span>{event.title}</span>
                        </div>
                      </h3>
                      <div className={cn(styles.eventColorDot, eventColorDotClassMap[event.color])} />
                    </div>
                    
                    <div className={styles.eventTime}>
                      <div className={styles.eventTimeItem}>
                        <Clock className={styles.eventTimeIcon} />
                        <span>{event.startTime} - {event.endTime}</span>
                        <span className={styles.eventDuration}>({getDurationText(event)})</span>
                      </div>
                    </div>
                    
                    {event.description && (
                      <div className={styles.eventDescription}>
                        <FileText className={styles.eventDescriptionIcon} />
                        <p className={styles.eventDescriptionText}>{event.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current time indicator */}
          {isCurrentDay && (
            <CurrentTimeIndicator hourRowPx={HOUR_ROW_PX} />
          )}
        </div>
      </div>

      {/* Modal para ver todos os eventos */}
      <EventsListModal
        isOpen={showAllEvents}
        onClose={() => setShowAllEvents(false)}
        date={currentDate}
        events={allDayEvents}
        onEventClick={onEventClick}
        labels={labels}
      />
    </div>
  );
}

function CurrentTimeIndicator({ hourRowPx }: { hourRowPx: number }) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const topPx = ((hours * 60 + minutes) / 60) * hourRowPx;

  return (
    <div
      className={styles.currentTimeIndicator}
      style={{ top: `${topPx}px` }}
    >
      <div className={styles.currentTimeDot} />
      <div className={styles.currentTimeLine} />
    </div>
  );
}