import { useMemo, useState, useCallback } from 'react';
import { CalendarService, CalendarServiceDependencies, CalendarServiceState, CalendarServiceActions } from './CalendarService';

export interface CalendarServiceHook extends CalendarServiceState, CalendarServiceActions {}

export function useCalendarService(
  dependencies: CalendarServiceDependencies
): CalendarServiceHook {
  // Create service instance
  const service = useMemo(() => {
    return new CalendarService(dependencies);
  }, [
    dependencies.events,
    dependencies.initialDate,
    dependencies.initialView,
    dependencies.onEventView,
    dependencies.onEventAdd,
    dependencies.onEventEdit,
    dependencies.onEventDelete,
    dependencies.onEventUpdate,
  ]);

  // Update service when dependencies change
  useMemo(() => {
    service.updateEvents(dependencies.events);
  }, [service, dependencies.events]);

  // State for React re-renders - sync with service state
  const [state, setState] = useState<CalendarServiceState>(() => ({
    currentDate: service.currentDate,
    view: service.view,
    events: service.events,
    filteredEvents: service.filteredEvents,
    searchQuery: service.searchQuery,
    activeFilters: service.activeFilters,
  }));

  // Helper to update state from service
  const syncState = useCallback(() => {
    setState({
      currentDate: service.currentDate,
      view: service.view,
      events: service.events,
      filteredEvents: service.filteredEvents,
      searchQuery: service.searchQuery,
      activeFilters: service.activeFilters,
    });
  }, [service]);

  // Wrap service methods to trigger re-renders
  const wrappedActions: CalendarServiceActions = useMemo(() => ({
    setCurrentDate: (date: Date) => {
      service.setCurrentDate(date);
      syncState();
    },
    setView: (view) => {
      service.setView(view);
      syncState();
    },
    setSearchQuery: (query: string) => {
      service.setSearchQuery(query);
      syncState();
    },
    setActiveFilters: (filters) => {
      service.setActiveFilters(filters);
      syncState();
    },
    handlePrevious: () => {
      service.handlePrevious();
      syncState();
    },
    handleNext: () => {
      service.handleNext();
      syncState();
    },
    handleToday: () => {
      service.handleToday();
      syncState();
    },
    handleDateSelect: (date: Date) => {
      service.handleDateSelect(date);
      syncState();
    },
    handleDayClick: (date: Date) => {
      service.handleDayClick(date);
    },
    handleTimeSlotClick: (date: Date, hour: number) => {
      service.handleTimeSlotClick(date, hour);
    },
    handleEventClick: (event) => {
      service.handleEventClick(event);
    },
    handleAddEvent: () => {
      service.handleAddEvent();
    },
    handleEventDrop: (eventId: string, newDate: Date, newHour?: number) => {
      service.handleEventDrop(eventId, newDate, newHour);
      syncState();
    },
  }), [service, syncState]);

  return {
    ...state,
    ...wrappedActions,
  };
}
