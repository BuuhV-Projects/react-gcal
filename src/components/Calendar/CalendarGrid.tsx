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
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from './types';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const eventColorClasses: Record<string, string> = {
  tomato: 'bg-event-tomato text-white',
  tangerine: 'bg-event-tangerine text-white',
  banana: 'bg-event-banana text-gray-800',
  basil: 'bg-event-basil text-white',
  sage: 'bg-event-sage text-white',
  peacock: 'bg-event-peacock text-white',
  blueberry: 'bg-event-blueberry text-white',
  lavender: 'bg-event-lavender text-white',
  grape: 'bg-event-grape text-white',
  graphite: 'bg-event-graphite text-white',
};

export function CalendarGrid({ currentDate, events, onDayClick, onEventClick }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Week days header */}
      <div className="grid grid-cols-7 border-b border-border">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-[repeat(6,1fr)]">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={index}
              onClick={() => onDayClick(day)}
              className={cn(
                "min-h-[100px] border-b border-r border-border p-1 cursor-pointer transition-colors hover:bg-accent/50",
                !isCurrentMonth && "bg-muted/30"
              )}
            >
              <div className="flex justify-center mb-1">
                <span
                  className={cn(
                    "w-7 h-7 flex items-center justify-center text-sm rounded-full transition-colors",
                    isCurrentDay && "bg-primary text-primary-foreground font-semibold",
                    !isCurrentDay && isCurrentMonth && "text-foreground hover:bg-accent",
                    !isCurrentMonth && "text-muted-foreground"
                  )}
                >
                  {format(day, 'd')}
                </span>
              </div>

              <div className="space-y-1 overflow-hidden">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity",
                      eventColorClasses[event.color]
                    )}
                  >
                    {event.startTime} {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground px-2">
                    +{dayEvents.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
