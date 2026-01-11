// Main exports
export { Calendar } from './Calendar/Calendar';
export { CalendarGrid } from './Calendar/CalendarGrid';
export { CalendarHeader } from './Calendar/CalendarHeader';
export { WeekView } from './Calendar/WeekView';
export { DayView } from './Calendar/DayView';
export { Sidebar } from './Calendar/Sidebar';
export { EventModal } from './Calendar/EventModal';

// Service exports
export { CalendarService } from './Calendar/CalendarService';
export { useCalendarService } from './Calendar/useCalendarService';
export type { 
  CalendarServiceDependencies,
  CalendarServiceState,
  CalendarServiceActions
} from './Calendar/CalendarService';
export type { CalendarServiceHook } from './Calendar/useCalendarService';

// Types
export type { CalendarEvent, CalendarView, EventColor } from './Calendar/types';

// Utils
export { cn } from './lib/utils';

// UI Components (re-export commonly used ones)
export { Button, buttonVariants } from './ui/button';
export type { ButtonProps } from './ui/button';

// Styles - consumers should import this
import './styles.css';

