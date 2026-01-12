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

const App = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('09:00');

  const handleEventView = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEventAdd = (date: Date, time?: string) => {
    setSelectedDate(date);
    setSelectedTime(time || '09:00');
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventEdit = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setSelectedTime(event.startTime);
    setIsModalOpen(true);
  };

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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {selectedEvent ? 'Detalhes do Evento' : 'Novo Evento'}
            </h2>
            {selectedEvent ? (
              <div className="space-y-2 text-gray-700">
                <p><strong>Título:</strong> {selectedEvent.title}</p>
                <p><strong>Horário:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
                {selectedEvent.description && (
                  <p><strong>Descrição:</strong> {selectedEvent.description}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-700">
                Data: {selectedDate?.toLocaleDateString('pt-BR')} às {selectedTime}
              </p>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
