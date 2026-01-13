import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
} from 'date-fns';
import { CalendarEvent } from './types';
import { CalendarLabels, defaultLabels } from './labels';
import { cn } from '../lib/utils';
import { useState, DragEvent } from 'react';
import styles from './WeekView.module.scss';
import { EventsListModal } from './EventsListModal';
import { Button } from '../ui/button';
import { List } from 'lucide-react';

interface WeekViewProps {
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

export function WeekView({ 
  currentDate, 
  events, 
  onTimeSlotClick, 
  onEventClick, 
  onEventDrop,
  labels = defaultLabels,
  maxVisibleEvents = 50,
}: WeekViewProps) {
  const [dragOverSlot, setDragOverSlot] = useState<{ day: Date; hour: number } | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  const handleViewAllEvents = (day: Date) => {
    setSelectedDay(day);
    setShowAllEvents(true);
  };

  const parseTime = (timeStr: string): { hours: number; minutes: number } => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  const HOUR_ROW_PX = 56;

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

  const handleDragStart = (e: DragEvent<HTMLDivElement>, event: CalendarEvent) => {
    e.dataTransfer.setData('eventId', event.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, day: Date, hour: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot({ day, hour });
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, day: Date, hour: number) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('eventId');
    if (eventId) {
      onEventDrop(eventId, day, hour);
    }
    setDragOverSlot(null);
  };

  return (
    <div className={styles.container}>
      {/* Header with days */}
      <div className={styles.header}>
        <div className={styles.timeColumnHeader} />
        {days.map((day, index) => {
          const isCurrentDay = isToday(day);
          return (
            <div key={day.toISOString()} className={styles.dayHeader}>
              <div className={styles.weekDayLabel}>
                {labels.weekDays[index]}
              </div>
              <div className={cn(styles.dayNumber, isCurrentDay && styles.currentDay)}>
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
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

        {/* Days columns */}
        <div className={styles.daysContainer}>
          {days.map((day) => {
            const allDayEvents = getEventsForDay(day);
            const visibleEvents = allDayEvents.slice(0, maxVisibleEvents);
            const hasMoreEvents = allDayEvents.length > maxVisibleEvents;
            
            return (
              <div key={day.toISOString()} className={styles.dayColumn}>
                {/* Hour slots */}
                {hours.map((hour) => {
                  const isDragOver = dragOverSlot && 
                    isSameDay(dragOverSlot.day, day) && 
                    dragOverSlot.hour === hour;
                  
                  return (
                    <div
                      key={hour}
                      onClick={() => onTimeSlotClick(day, hour)}
                      onDragOver={(e) => handleDragOver(e, day, hour)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, day, hour)}
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
                          minHeight: '28px',
                        }}
                      >
                        <div className={styles.eventTitle}>
                          <div className="flex items-center gap-1.5">
                            {event.icon && (
                              <span className="flex-shrink-0" style={{ fontSize: '0.875rem' }}>
                                {event.icon}
                              </span>
                            )}
                            <span>{event.title}</span>
                          </div>
                        </div>
                        <div className={styles.eventTime}>
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Indicador de mais eventos */}
                  {hasMoreEvents && (
                    <div
                      className={cn(
                        styles.event,
                        'bg-muted/50 border-2 border-dashed border-muted-foreground/30 cursor-pointer hover:bg-muted'
                      )}
                      style={{
                        top: '0px',
                        height: '32px',
                        minHeight: '32px',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewAllEvents(day);
                      }}
                    >
                      <div className="flex items-center justify-center h-full text-xs text-muted-foreground font-medium">
                        <List className="h-3 w-3 mr-1" />
                        +{allDayEvents.length - maxVisibleEvents} {labels.moreEvents}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para ver todos os eventos */}
      {selectedDay && (
        <EventsListModal
          isOpen={showAllEvents}
          onClose={() => {
            setShowAllEvents(false);
            setSelectedDay(null);
          }}
          date={selectedDay}
          events={selectedDay ? getEventsForDay(selectedDay) : []}
          onEventClick={onEventClick}
          labels={labels}
        />
      )}
    </div>
  );
}