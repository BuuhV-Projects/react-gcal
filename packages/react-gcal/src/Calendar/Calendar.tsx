import { useMemo } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { Sidebar } from './Sidebar';
import { CalendarEvent, CalendarView, CalendarLabels, mergeLabels } from './types';
import { useCalendarService } from './useCalendarService';
import type { CalendarServiceDependencies } from './CalendarService';
import styles from './Calendar.module.css';
import { cn } from '../lib/utils';

export interface CalendarProps {
  events?: CalendarEvent[];
  initialDate?: Date;
  initialView?: CalendarView;
  className?: string;
  customFilters?: import('./types').CustomFilter[];
  labels?: Partial<CalendarLabels>;
  onEventView?: (event: CalendarEvent) => void;
  onEventAdd?: (date: Date, time?: string) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
}

export function Calendar({
  events,
  initialDate,
  initialView,
  className,
  customFilters,
  labels: customLabels,
  onEventView,
  onEventAdd,
  onEventEdit,
  onEventDelete,
  onEventUpdate,
}: CalendarProps) {
  const labels = useMemo(() => mergeLabels(customLabels), [customLabels]);

  const dependencies = useMemo<CalendarServiceDependencies>(() => ({
    events,
    initialDate,
    initialView,
    customFilters,
    onEventView,
    onEventAdd,
    onEventEdit,
    onEventDelete,
    onEventUpdate,
  }), [events, initialDate, initialView, customFilters, onEventView, onEventAdd, onEventEdit, onEventDelete, onEventUpdate]);

  const service = useCalendarService(dependencies);

  return (
    <div className={cn(styles.calendar, className)}>
      <CalendarHeader
        currentDate={service.currentDate}
        view={service.view}
        onPrevious={service.handlePrevious}
        onNext={service.handleNext}
        onToday={service.handleToday}
        onViewChange={service.setView}
        onAddEvent={service.handleAddEvent}
        labels={labels}
      />
      
      <div className={styles.content}>
        <Sidebar 
          currentDate={service.currentDate} 
          onDateSelect={service.handleDateSelect}
          searchQuery={service.searchQuery}
          onSearchChange={service.setSearchQuery}
          customFilters={service.customFilters}
          activeFilterIds={service.activeFilterIds}
          onFilterChange={service.setActiveFilterIds}
          labels={labels}
        />
        
        <main className={styles.main}>
          {service.view === 'month' && (
            <CalendarGrid
              currentDate={service.currentDate}
              events={service.filteredEvents}
              onDayClick={service.handleDayClick}
              onEventClick={service.handleEventClick}
              onEventDrop={service.handleEventDrop}
              labels={labels}
            />
          )}
          {service.view === 'week' && (
            <WeekView
              currentDate={service.currentDate}
              events={service.filteredEvents}
              onTimeSlotClick={service.handleTimeSlotClick}
              onEventClick={service.handleEventClick}
              onEventDrop={service.handleEventDrop}
              labels={labels}
            />
          )}
          {service.view === 'day' && (
            <DayView
              currentDate={service.currentDate}
              events={service.filteredEvents}
              onTimeSlotClick={service.handleTimeSlotClick}
              onEventClick={service.handleEventClick}
              onEventDrop={service.handleEventDrop}
              labels={labels}
            />
          )}
        </main>
      </div>
    </div>
  );
}
