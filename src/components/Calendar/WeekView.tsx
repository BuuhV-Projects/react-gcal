import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  eachHourOfInterval,
  format,
  isSameDay,
  isToday,
  setHours,
  startOfDay,
  endOfDay,
  parseISO,
  differenceInMinutes,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from './types';
import { cn } from '@/lib/utils';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const eventColorClasses: Record<string, string> = {
  tomato: 'bg-event-tomato text-white border-l-4 border-red-700',
  tangerine: 'bg-event-tangerine text-white border-l-4 border-orange-600',
  banana: 'bg-event-banana text-gray-800 border-l-4 border-yellow-500',
  basil: 'bg-event-basil text-white border-l-4 border-green-700',
  sage: 'bg-event-sage text-white border-l-4 border-teal-600',
  peacock: 'bg-event-peacock text-white border-l-4 border-cyan-700',
  blueberry: 'bg-event-blueberry text-white border-l-4 border-blue-700',
  lavender: 'bg-event-lavender text-white border-l-4 border-purple-700',
  grape: 'bg-event-grape text-white border-l-4 border-purple-800',
  graphite: 'bg-event-graphite text-white border-l-4 border-gray-700',
};

export function WeekView({ currentDate, events, onTimeSlotClick, onEventClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  const parseTime = (timeStr: string): { hours: number; minutes: number } => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  const getEventPosition = (event: CalendarEvent) => {
    const start = parseTime(event.startTime);
    const end = parseTime(event.endTime);
    
    const topPercent = (start.hours + start.minutes / 60) * (100 / 24);
    const durationHours = (end.hours + end.minutes / 60) - (start.hours + start.minutes / 60);
    const heightPercent = Math.max(durationHours * (100 / 24), 2);
    
    return { top: `${topPercent}%`, height: `${heightPercent}%` };
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Header with days */}
      <div className="flex border-b border-border sticky top-0 bg-background z-10">
        <div className="w-16 flex-shrink-0 border-r border-border" />
        {days.map((day) => {
          const isCurrentDay = isToday(day);
          return (
            <div
              key={day.toISOString()}
              className="flex-1 py-2 text-center border-r border-border last:border-r-0"
            >
              <div className="text-xs text-muted-foreground uppercase">
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div
                className={cn(
                  "w-10 h-10 mx-auto flex items-center justify-center text-xl font-medium rounded-full mt-1",
                  isCurrentDay && "bg-primary text-primary-foreground",
                  !isCurrentDay && "text-foreground"
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 flex overflow-auto scrollbar-thin">
        {/* Time column */}
        <div className="w-16 flex-shrink-0 border-r border-border">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-14 border-b border-border flex items-start justify-end pr-2 -mt-2"
            >
              <span className="text-xs text-muted-foreground">
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="flex-1 flex">
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            
            return (
              <div
                key={day.toISOString()}
                className="flex-1 relative border-r border-border last:border-r-0"
              >
                {/* Hour slots */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    onClick={() => onTimeSlotClick(day, hour)}
                    className="h-14 border-b border-border hover:bg-accent/30 cursor-pointer transition-colors"
                  />
                ))}

                {/* Events overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {dayEvents.map((event) => {
                    const position = getEventPosition(event);
                    return (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className={cn(
                          "absolute left-1 right-1 rounded-md px-2 py-1 cursor-pointer pointer-events-auto overflow-hidden transition-opacity hover:opacity-90",
                          eventColorClasses[event.color]
                        )}
                        style={{
                          top: position.top,
                          height: position.height,
                          minHeight: '28px',
                        }}
                      >
                        <div className="text-xs font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-xs opacity-90 truncate">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
