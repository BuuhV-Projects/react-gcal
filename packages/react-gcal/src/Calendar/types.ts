export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  color: EventColor;
  description?: string;
  category?: string;
  [key: string]: unknown;
}

export type EventColor = 
  | 'tomato'
  | 'tangerine'
  | 'banana'
  | 'basil'
  | 'sage'
  | 'peacock'
  | 'blueberry'
  | 'lavender'
  | 'grape'
  | 'graphite';

export type CalendarView = 'month' | 'week' | 'day';

export interface CustomFilter {
  id: string;
  label: string;
  predicate: (event: CalendarEvent) => boolean;
}
