export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  color: EventColor;
  description?: string;
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
