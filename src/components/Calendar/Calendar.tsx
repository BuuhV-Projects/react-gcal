import { useState, useMemo } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { Sidebar } from './Sidebar';
import { EventModal } from './EventModal';
import { CalendarEvent, CalendarView, EventColor } from './types';

// Sample events for demonstration
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Reunião de equipe',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    color: 'blueberry',
    description: 'Reunião semanal de alinhamento',
  },
  {
    id: '2',
    title: 'Almoço com cliente',
    date: new Date(),
    startTime: '12:00',
    endTime: '14:00',
    color: 'basil',
  },
  {
    id: '3',
    title: 'Apresentação do projeto',
    date: new Date(Date.now() + 86400000 * 2),
    startTime: '15:00',
    endTime: '16:30',
    color: 'tangerine',
    description: 'Apresentação final do projeto para stakeholders',
  },
  {
    id: '4',
    title: 'Call com investidores',
    date: new Date(Date.now() + 86400000),
    startTime: '10:00',
    endTime: '11:30',
    color: 'grape',
  },
  {
    id: '5',
    title: 'Code review',
    date: new Date(),
    startTime: '16:00',
    endTime: '17:00',
    color: 'peacock',
  },
];

const allColors: EventColor[] = [
  'tomato', 'tangerine', 'banana', 'basil', 'sage',
  'peacock', 'blueberry', 'lavender', 'grape', 'graphite'
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<EventColor[]>(allColors);

  // Filter events based on search query and color filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilters.length === 0 || activeFilters.includes(event.color);
      
      return matchesSearch && matchesFilter;
    });
  }, [events, searchQuery, activeFilters]);
  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('09:00');
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setSelectedDate(date);
    setSelectedTime(`${hour.toString().padStart(2, '0')}:00`);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedDate(new Date(event.date));
    setSelectedTime(event.startTime);
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedDate(new Date());
    setSelectedTime('09:00');
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (editingEvent) {
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : e
      ));
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={setView}
        onAddEvent={handleAddEvent}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          currentDate={currentDate} 
          onDateSelect={handleDateSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {view === 'month' && (
            <CalendarGrid
              currentDate={currentDate}
              events={filteredEvents}
              onDayClick={handleDayClick}
              onEventClick={handleEventClick}
            />
          )}
          {view === 'week' && (
            <WeekView
              currentDate={currentDate}
              events={filteredEvents}
              onTimeSlotClick={handleTimeSlotClick}
              onEventClick={handleEventClick}
            />
          )}
          {view === 'day' && (
            <DayView
              currentDate={currentDate}
              events={filteredEvents}
              onTimeSlotClick={handleTimeSlotClick}
              onEventClick={handleEventClick}
            />
          )}
        </main>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        selectedDate={selectedDate}
        defaultStartTime={selectedTime}
        editingEvent={editingEvent}
      />
    </div>
  );
}
