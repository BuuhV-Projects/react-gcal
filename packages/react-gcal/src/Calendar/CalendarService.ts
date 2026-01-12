import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { CalendarEvent, CalendarView, EventColor } from './types';

const allColors: EventColor[] = [
  'tomato', 'tangerine', 'banana', 'basil', 'sage',
  'peacock', 'blueberry', 'lavender', 'grape', 'graphite'
];

export interface CalendarServiceDependencies {
  events?: CalendarEvent[];
  initialDate?: Date;
  initialView?: CalendarView;
  onEventView?: (event: CalendarEvent) => void;
  onEventAdd?: (date: Date, time?: string) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
}

export interface CalendarServiceState {
  currentDate: Date;
  view: CalendarView;
  events: CalendarEvent[];
  filteredEvents: CalendarEvent[];
  searchQuery: string;
  activeFilters: EventColor[];
}

export interface CalendarServiceActions {
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilters: (filters: EventColor[]) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleToday: () => void;
  handleDateSelect: (date: Date) => void;
  handleDayClick: (date: Date) => void;
  handleTimeSlotClick: (date: Date, hour: number) => void;
  handleEventClick: (event: CalendarEvent) => void;
  handleAddEvent: () => void;
  handleEventDrop: (eventId: string, newDate: Date, newHour?: number) => void;
}

export class CalendarService implements CalendarServiceState, CalendarServiceActions {
  // State
  public currentDate: Date;
  public view: CalendarView;
  public events: CalendarEvent[];
  public filteredEvents: CalendarEvent[];
  public searchQuery: string;
  public activeFilters: EventColor[];

  // Internal state
  private internalEvents: CalendarEvent[] = [];
  private dependencies: CalendarServiceDependencies;

  constructor(dependencies: CalendarServiceDependencies) {
    this.dependencies = dependencies;
    this.currentDate = dependencies.initialDate ?? new Date();
    this.view = dependencies.initialView ?? 'month';
    this.searchQuery = '';
    this.activeFilters = [...allColors];
    
    // Initialize events
    this.events = dependencies.events ?? this.internalEvents;
    this.filteredEvents = this.filterEvents();
  }

  // State setters
  setCurrentDate(date: Date): void {
    this.currentDate = date;
    this.updateFilteredEvents();
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.updateFilteredEvents();
  }

  setActiveFilters(filters: EventColor[]): void {
    this.activeFilters = filters;
    this.updateFilteredEvents();
  }

  // Update events (called when dependencies change)
  updateEvents(events?: CalendarEvent[]): void {
    if (events !== undefined) {
      this.events = events;
    } else {
      this.events = this.internalEvents;
    }
    this.updateFilteredEvents();
  }

  // Navigation
  handlePrevious(): void {
    if (this.view === 'month') {
      this.currentDate = subMonths(this.currentDate, 1);
    } else if (this.view === 'week') {
      this.currentDate = subWeeks(this.currentDate, 1);
    } else {
      this.currentDate = subDays(this.currentDate, 1);
    }
  }

  handleNext(): void {
    if (this.view === 'month') {
      this.currentDate = addMonths(this.currentDate, 1);
    } else if (this.view === 'week') {
      this.currentDate = addWeeks(this.currentDate, 1);
    } else {
      this.currentDate = addDays(this.currentDate, 1);
    }
  }

  handleToday(): void {
    this.currentDate = new Date();
  }

  handleDateSelect(date: Date): void {
    this.setCurrentDate(date);
  }

  // Event actions
  handleDayClick(date: Date): void {
    if (this.dependencies.onEventAdd) {
      this.dependencies.onEventAdd(date, '09:00');
    }
  }

  handleTimeSlotClick(date: Date, hour: number): void {
    if (this.dependencies.onEventAdd) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      this.dependencies.onEventAdd(date, time);
    }
  }

  handleEventClick(event: CalendarEvent): void {
    // If onEventEdit is provided, treat click as edit action
    // Otherwise, use onEventView if provided
    if (this.dependencies.onEventEdit) {
      this.dependencies.onEventEdit(event);
    } else if (this.dependencies.onEventView) {
      this.dependencies.onEventView(event);
    }
  }

  handleAddEvent(): void {
    if (this.dependencies.onEventAdd) {
      this.dependencies.onEventAdd(new Date(), '09:00');
    }
  }

  handleEventDrop(eventId: string, newDate: Date, newHour?: number): void {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    // Parse existing times
    const [startH, startM] = event.startTime.split(':').map(Number);
    const [endH, endM] = event.endTime.split(':').map(Number);
    const duration = (endH * 60 + endM) - (startH * 60 + startM);
    
    // Calculate new times
    const newStartHour = newHour !== undefined ? newHour : startH;
    const newStartMinute = newHour !== undefined ? 0 : startM;
    const newEndMinutes = newStartHour * 60 + newStartMinute + duration;
    const newEndHour = Math.floor(newEndMinutes / 60);
    const newEndMinute = newEndMinutes % 60;
    
    const updatedEvent: CalendarEvent = {
      ...event,
      date: newDate,
      startTime: `${newStartHour.toString().padStart(2, '0')}:${newStartMinute.toString().padStart(2, '0')}`,
      endTime: `${Math.min(newEndHour, 23).toString().padStart(2, '0')}:${Math.min(newEndMinute, 59).toString().padStart(2, '0')}`,
    };

    // Use onEventEdit if provided, otherwise fall back to onEventUpdate (legacy)
    if (this.dependencies.onEventEdit) {
      this.dependencies.onEventEdit(updatedEvent);
    } else if (this.dependencies.onEventUpdate) {
      this.dependencies.onEventUpdate(updatedEvent);
    } else if (!this.dependencies.events) {
      // Update internal events if not controlled
      this.internalEvents = this.events.map(e => 
        e.id === eventId ? updatedEvent : e
      );
      this.updateEvents();
    }
  }

  // Private methods
  private filterEvents(): CalendarEvent[] {
    return this.events.filter(event => {
      const matchesSearch = this.searchQuery === '' || 
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesFilter = this.activeFilters.length === 0 || this.activeFilters.includes(event.color);
      
      return matchesSearch && matchesFilter;
    });
  }

  private updateFilteredEvents(): void {
    this.filteredEvents = this.filterEvents();
  }
}

