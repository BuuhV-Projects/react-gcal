// NÃO exporte tudo dinamicamente
// IMPORTA TUDO explicitamente para forçar flatten

import { Calendar } from './Calendar/Calendar';
import { CalendarGrid } from './Calendar/CalendarGrid';
import { CalendarHeader } from './Calendar/CalendarHeader';
import { WeekView } from './Calendar/WeekView';
import { DayView } from './Calendar/DayView';
import { Sidebar } from './Calendar/Sidebar';
import { EventModal } from './Calendar/EventModal';

import { CalendarService } from './Calendar/CalendarService';
import { useCalendarService } from './Calendar/useCalendarService';

import { Button, buttonVariants } from './ui/button';

// Re-export types
export type { CalendarEvent, CalendarView, EventColor, CustomFilter, CalendarLabels } from './Calendar/types';
export { defaultLabels, englishLabels, mergeLabels } from './Calendar/types';
export type { CalendarProps } from './Calendar/Calendar';

// 🔴 NÃO importar CSS aqui

export {
  Calendar,
  CalendarGrid,
  CalendarHeader,
  WeekView,
  DayView,
  Sidebar,
  EventModal,
  CalendarService,
  useCalendarService,
  Button,
  buttonVariants,
};
