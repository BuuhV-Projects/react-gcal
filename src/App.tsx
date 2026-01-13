import React, { useState } from 'react';
import { Calendar } from '../packages/react-gcal/src/Calendar/Calendar';
import { CalendarEvent } from '../packages/react-gcal/src/Calendar/types';

const generateMassiveEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const colors: CalendarEvent["color"][] = [
    "tomato",
    "peacock",
    "blueberry",
    "sage",
    "banana",
    "lavender",
    "basil",
    "tangerine",
    "grape",
    "graphite",
  ];
  const titles = [
    "Pop Chic / Inter (MA)",
    "Pop Família / Inter (M)",
    "R&B / Inter (M)",
    "Jazz Lounge / Relaxed",
    "Rock Classics / Energy",
    "Electronic Vibes / Dance",
    "Acoustic Session / Chill",
    "Latin Beats / Tropical",
    "Hip Hop Mix / Urban",
    "Classical Hour / Elegant",
  ];

  // Start from 3 months ago
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  let eventId = 0;

  // Generate ~175 events per day for stress testing
  for (let dayOffset = 0; dayOffset < 60; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + dayOffset);

    // 175 events per day for stress testing
    const eventsPerDay = 175;

    for (let i = 0; i < eventsPerDay; i++) {
      const startHour = 3 + Math.floor(Math.random() * 18);
      const duration = 1 + Math.floor(Math.random() * 8);
      const endHour = Math.min(startHour + duration, 23);

      events.push({
        id: `event-${eventId++}`,
        title: titles[Math.floor(Math.random() * titles.length)],
        date: new Date(currentDate),
        startTime: `${startHour.toString().padStart(2, "0")}:00`,
        endTime: `${endHour.toString().padStart(2, "0")}:59`,
        color: colors[Math.floor(Math.random() * colors.length)],
        description: `Schedule ID: ${1000000 + eventId}`,
      });
    }
  }

  return events;
};

const App = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(generateMassiveEvents());
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
