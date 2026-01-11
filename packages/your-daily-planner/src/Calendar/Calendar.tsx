import { useMemo } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { Sidebar } from './Sidebar';
import { CalendarEvent, CalendarView } from './types';
import { useCalendarService } from './useCalendarService';
import type { CalendarServiceDependencies } from './CalendarService';

export interface CalendarProps {
  events?: CalendarEvent[];
  initialDate?: Date;
  initialView?: CalendarView;
  className?: string;
  // Action callbacks - each action is optional and independent
  onEventView?: (event: CalendarEvent) => void;
  onEventAdd?: (date: Date, time?: string) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  // Legacy callbacks for backward compatibility (deprecated)
  onEventUpdate?: (event: CalendarEvent) => void;
}

export function Calendar({
  events,
  initialDate,
  initialView,
  className,
  onEventView,
  onEventAdd,
  onEventEdit,
  onEventDelete,
  onEventUpdate,
}: CalendarProps) {
  // Create service dependencies object
  const dependencies = useMemo<CalendarServiceDependencies>(() => ({
    events,
    initialDate,
    initialView,
    onEventView,
    onEventAdd,
    onEventEdit,
    onEventDelete,
    onEventUpdate,
  }), [events, initialDate, initialView, onEventView, onEventAdd, onEventEdit, onEventDelete, onEventUpdate]);

  // Get calendar service instance
  const service = useCalendarService(dependencies);

  return (
    <div className={`h-screen flex flex-col bg-background ${className || ''}`}>
      <CalendarHeader
        currentDate={service.currentDate}
        view={service.view}
        onPrevious={service.handlePrevious}
        onNext={service.handleNext}
        onToday={service.handleToday}
        onViewChange={service.setView}
        onAddEvent={service.handleAddEvent}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          currentDate={service.currentDate} 
          onDateSelect={service.handleDateSelect}
          searchQuery={service.searchQuery}
          onSearchChange={service.setSearchQuery}
          activeFilters={service.activeFilters}
          onFilterChange={service.setActiveFilters}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {service.view === 'month' && (
            <CalendarGrid
              currentDate={service.currentDate}
              events={service.filteredEvents}
              onDayClick={service.handleDayClick}
              onEventClick={service.handleEventClick}
              onEventDrop={service.handleEventDrop}
            />
          )}
          {service.view === 'week' && (
            <WeekView
              currentDate={service.currentDate}
              events={service.filteredEvents}
              onTimeSlotClick={service.handleTimeSlotClick}
              onEventClick={service.handleEventClick}
              onEventDrop={service.handleEventDrop}
            />
          )}
          {service.view === 'day' && (
            <DayView
              currentDate={service.currentDate}
              events={service.filteredEvents}
              onTimeSlotClick={service.handleTimeSlotClick}
              onEventClick={service.handleEventClick}
              onEventDrop={service.handleEventDrop}
            />
          )}
        </main>
      </div>
    </div>
  );
}
