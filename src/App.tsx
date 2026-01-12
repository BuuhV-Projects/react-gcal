import React, { useState } from 'react';
import { Calendar } from '../packages/react-gcal/src/Calendar/Calendar';
import { CalendarEvent } from '../packages/react-gcal/src/Calendar/types';

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

const Index = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('09:00');

  // View event - just show details (read-only)
  const handleEventView = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    // You can implement your own modal/dialog here
    console.log('View event:', event);
  };

  // Add event - open your custom add form
  const handleEventAdd = (date: Date, time?: string) => {
    setSelectedDate(date);
    setSelectedTime(time || '09:00');
    setSelectedEvent(null);
    setIsModalOpen(true);
    // You can implement your own add form here
    console.log('Add event at:', date, time);
  };

  // Edit event - open your custom edit form
  const handleEventEdit = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setSelectedTime(event.startTime);
    setIsModalOpen(true);
    // You can implement your own edit form here
    console.log('Edit event:', event);
  };

  // Delete event
  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  return (
    <>
      <Calendar
        events={events}
        onEventView={handleEventView}
        onEventAdd={handleEventAdd}
        onEventEdit={handleEventEdit}
        onEventDelete={handleEventDelete}
      />
      {/* Your custom modal/form implementation here */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {selectedEvent ? 'View/Edit Event' : 'Add Event'}
            </h2>
            <p className="mb-4">
              {selectedEvent 
                ? `Event: ${selectedEvent.title}` 
                : `Date: ${selectedDate?.toLocaleDateString()} at ${selectedTime}`}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
