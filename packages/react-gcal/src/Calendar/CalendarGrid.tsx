import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns';
import { CalendarEvent } from './types';
import { CalendarLabels, defaultLabels } from './labels';
import { cn } from '../lib/utils';
import { useState, DragEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './CalendarGrid.module.scss';
import { EventsListModal } from './EventsListModal';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDrop: (eventId: string, newDate: Date, newHour?: number) => void;
  labels?: CalendarLabels;
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

export function CalendarGrid({ 
  currentDate, 
  events, 
  onDayClick, 
  onEventClick, 
  onEventDrop,
  labels = defaultLabels,
}: CalendarGridProps) {
  const [dragOverDate, setDragOverDate] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, event: CalendarEvent) => {
    e.dataTransfer.setData('eventId', event.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, day: Date) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverDate(day);
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, day: Date) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('eventId');
    if (eventId) {
      onEventDrop(eventId, day);
    }
    setDragOverDate(null);
  };

  return (
    <div className={styles.container}>
      {/* Week days header */}
      <div className={styles.weekDaysHeader}>
        {labels.weekDays.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={styles.grid}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          const isDragOver = dragOverDate && isSameDay(dragOverDate, day);

          return (
            <div
              key={index}
              onClick={() => onDayClick(day)}
              onDragOver={(e) => handleDragOver(e, day)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, day)}
              className={cn(
                styles.dayCell,
                !isCurrentMonth && styles.notCurrentMonth,
                isDragOver && styles.dragOver
              )}
            >
              <div className={styles.dayNumberContainer}>
                <span
                  className={cn(
                    styles.dayNumber,
                    isCurrentDay && styles.currentDay,
                    !isCurrentDay && isCurrentMonth && styles.currentMonth,
                    !isCurrentMonth && styles.notCurrentMonth
                  )}
                >
                  {format(day, 'd')}
                </span>
              </div>

              <div className={styles.eventsContainer}>
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={cn(styles.event, eventColorClassMap[event.color])}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {event.icon && (
                        <span className="flex-shrink-0" style={{ fontSize: '0.875rem' }}>
                          {event.icon}
                        </span>
                      )}
                      <span className="truncate">
                        {event.startTime} {event.title}
                      </span>
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <button
                    type="button"
                    className={styles.moreEventsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDay(day);
                      setShowAllEvents(true);
                    }}
                    aria-label={`Ver mais ${dayEvents.length - 3} ${labels.moreEvents}`}
                  >
                    <span className={styles.moreEventsText}>
                      +{dayEvents.length - 3} {labels.moreEvents}
                    </span>
                    <ChevronDown className={styles.moreEventsIcon} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
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