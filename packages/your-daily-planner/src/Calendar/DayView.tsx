import { 
  format,
  isSameDay,
  isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from './types';
import { cn } from '../lib/utils';
import { Clock, FileText } from 'lucide-react';
import { useState, DragEvent } from 'react';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDrop: (eventId: string, newDate: Date, newHour?: number) => void;
}

const eventColorClasses: Record<string, { bg: string; border: string; light: string }> = {
  tomato: { bg: 'bg-event-tomato', border: 'border-red-700', light: 'bg-red-50' },
  tangerine: { bg: 'bg-event-tangerine', border: 'border-orange-600', light: 'bg-orange-50' },
  banana: { bg: 'bg-event-banana', border: 'border-yellow-500', light: 'bg-yellow-50' },
  basil: { bg: 'bg-event-basil', border: 'border-green-700', light: 'bg-green-50' },
  sage: { bg: 'bg-event-sage', border: 'border-teal-600', light: 'bg-teal-50' },
  peacock: { bg: 'bg-event-peacock', border: 'border-cyan-700', light: 'bg-cyan-50' },
  blueberry: { bg: 'bg-event-blueberry', border: 'border-blue-700', light: 'bg-blue-50' },
  lavender: { bg: 'bg-event-lavender', border: 'border-purple-700', light: 'bg-purple-50' },
  grape: { bg: 'bg-event-grape', border: 'border-purple-800', light: 'bg-purple-50' },
  graphite: { bg: 'bg-event-graphite', border: 'border-gray-700', light: 'bg-gray-50' },
};

export function DayView({ currentDate, events, onTimeSlotClick, onEventClick, onEventDrop }: DayViewProps) {
  const [dragOverHour, setDragOverHour] = useState<number | null>(null);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const isCurrentDay = isToday(currentDate);

  const dayEvents = events.filter(event => isSameDay(new Date(event.date), currentDate));

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
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Header with day info */}
      <div className="flex border-b border-border sticky top-0 bg-background z-10">
        <div className="w-20 flex-shrink-0 border-r border-border" />
        <div className="flex-1 py-4 px-6">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 flex items-center justify-center text-2xl font-semibold rounded-full",
                isCurrentDay && "bg-primary text-primary-foreground",
                !isCurrentDay && "bg-muted text-foreground"
              )}
            >
              {format(currentDate, 'd')}
            </div>
            <div>
              <div className="text-lg font-medium capitalize">
                {format(currentDate, 'EEEE', { locale: ptBR })}
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
            </div>
            {dayEvents.length > 0 && (
              <div className="ml-auto text-sm text-muted-foreground">
                {dayEvents.length} evento{dayEvents.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 flex overflow-auto scrollbar-thin">
        {/* Time column */}
        <div className="w-20 flex-shrink-0 border-r border-border">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b border-border flex items-center justify-end pr-3"
            >
              <span className="text-xs text-muted-foreground font-medium">
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* Day column with events */}
        <div className="flex-1 relative">
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
                className={cn(
                  "h-16 border-b border-border hover:bg-accent/30 cursor-pointer transition-colors",
                  isDragOver && "bg-primary/20"
                )}
              />
            );
          })}

          {/* Events overlay */}
          <div className="absolute inset-0 pointer-events-none px-2">
            {dayEvents.map((event) => {
              const position = getEventPosition(event);
              const colors = eventColorClasses[event.color];
              
              return (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, event)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className={cn(
                    "absolute left-2 right-4 rounded-lg cursor-grab active:cursor-grabbing pointer-events-auto overflow-hidden transition-all hover:shadow-lg border-l-4",
                    colors.light,
                    colors.border
                  )}
                  style={{
                    top: position.top,
                    height: position.height,
                    minHeight: '60px',
                  }}
                >
                  <div className="p-3 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-base">
                        {event.title}
                      </h3>
                      <div className={cn("w-3 h-3 rounded-full flex-shrink-0 mt-1", colors.bg)} />
                    </div>
                    
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.startTime} - {event.endTime}</span>
                        <span className="text-xs">({getDurationText(event)})</span>
                      </div>
                    </div>
                    
                    {event.description && (
                      <div className="flex items-start gap-1 mt-2 text-sm text-muted-foreground flex-1">
                        <FileText className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <p className="line-clamp-2">{event.description}</p>
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
      className="absolute left-0 right-0 flex items-center pointer-events-none z-20"
      style={{ top: `${topPx}px` }}
    >
      <div className="w-3 h-3 rounded-full bg-destructive -ml-1.5" />
      <div className="flex-1 h-0.5 bg-destructive" />
    </div>
  );
}