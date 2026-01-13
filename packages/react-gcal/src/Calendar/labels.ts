import { Locale } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

export interface CalendarLabels {
  // Header
  create: string;
  today: string;
  month: string;
  week: string;
  day: string;
  weekOf: string; // "Week of {date}"
  
  // Sidebar
  calendar: string;
  searchPlaceholder: string;
  filters: string;
  selectAll: string;
  clearAll: string;
  
  // Grid
  weekDays: [string, string, string, string, string, string, string];
  moreEvents: string; // "+{count} more"
  
  // Day view
  events: string; // "{count} event(s)"
  viewAllEvents: string; // "View all {count} events"
  noEvents: string; // "No events on this day"
  close: string; // "Close"
  
  // Date-fns locale for date formatting
  locale: Locale;
}

export const defaultLabels: CalendarLabels = {
  // Header
  create: 'Criar',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  weekOf: 'Semana de',
  
  // Sidebar
  calendar: 'Agenda',
  searchPlaceholder: 'Buscar eventos...',
  filters: 'Filtros',
  selectAll: 'Todos',
  clearAll: 'Limpar',
  
  // Grid
  weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  moreEvents: 'mais',
  
  // Day view
  events: 'evento(s)',
  viewAllEvents: 'Ver todos os {count} eventos',
  noEvents: 'Nenhum evento neste dia',
  close: 'Fechar',
  
  // Date-fns locale
  locale: ptBR,
};

export const englishLabels: CalendarLabels = {
  // Header
  create: 'Create',
  today: 'Today',
  month: 'Month',
  week: 'Week',
  day: 'Day',
  weekOf: 'Week of',
  
  // Sidebar
  calendar: 'Calendar',
  searchPlaceholder: 'Search events...',
  filters: 'Filters',
  selectAll: 'All',
  clearAll: 'Clear',
  
  // Grid
  weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  moreEvents: 'more',
  
  // Day view
  events: 'event(s)',
  viewAllEvents: 'View all {count} events',
  noEvents: 'No events on this day',
  close: 'Close',
  
  // Date-fns locale
  locale: enUS,
};

export function mergeLabels(customLabels?: Partial<CalendarLabels>): CalendarLabels {
  if (!customLabels) return defaultLabels;
  return { ...defaultLabels, ...customLabels };
}
