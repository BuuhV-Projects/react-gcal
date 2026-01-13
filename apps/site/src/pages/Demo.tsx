import { ArrowLeft, Globe, Moon, Sun } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Calendar, CalendarEvent, CustomFilter, defaultLabels, englishLabels } from 'react-gcal';
import 'react-gcal/styles';

type Language = 'pt' | 'en';

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
  
  const eventTypes = [
    { title: "Musica Popular Brasileira", type: "pop" },
    { title: "Musica Popular Americana", type: "rock" },
    { title: "Musica Popular Europia", type: "jazz" },
    { title: "Musica Popular Africania", type: "hip-hop" },
    { title: "Musica Popular Asiática", type: "classical" },
    { title: "Musica Popular Australiana", type: "electronic" },
    { title: "Musica Popular Chilena", type: "acoustic" },
    { title: "Musica Popular Espanhola", type: "latin" },
    { title: "Musica Popular Francesa", type: "r&b" },
    { title: "Musica Popular Germanica", type: "pop" },
    { title: "Musica Popular Italiana", type: "rock" },
    { title: "Musica Popular Japonesa", type: "jazz" },
  ];

  // Start from 3 months ago, generate events until 1 month in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 3);
  startDate.setHours(0, 0, 0, 0); // Reset to midnight
  
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setHours(0, 0, 0, 0);
  
  // Calculate total days to generate (from 3 months ago to 1 month in the future = ~120 days)
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  let eventId = 0;

  // Generate ~175 events per day for stress testing
  for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + dayOffset);
    currentDate.setHours(0, 0, 0, 0); // Reset to midnight to avoid timezone issues

    // 175 events per day for stress testing
    const eventsPerDay = 175;

    for (let i = 0; i < eventsPerDay; i++) {
      const startHour = 3 + Math.floor(Math.random() * 18);
      const duration = 1 + Math.floor(Math.random() * 8);
      const endHour = Math.min(startHour + duration, 23);
      const eventData = eventTypes[Math.floor(Math.random() * eventTypes.length)];

      events.push({
        id: `event-${eventId++}`,
        title: eventData.title,
        type: eventData.type,
        date: new Date(currentDate), // Date at midnight
        startTime: `${startHour.toString().padStart(2, "0")}:00`,
        endTime: `${endHour.toString().padStart(2, "0")}:59`,
        color: colors[Math.floor(Math.random() * colors.length)],
        description: `Schedule ID: ${1000000 + eventId}`,
      });
    }
  }

  return events;
};

const customFilters: CustomFilter[] = [
  {
    id: 'pop',
    label: 'Pop',
    predicate: (event) => event.type === 'pop',
  },
  {
    id: 'rock',
    label: 'Rock',
    predicate: (event) => event.type === 'rock',
  },
  {
    id: 'jazz',
    label: 'Jazz',
    predicate: (event) => event.type === 'jazz',
  },
  {
    id: 'electronic',
    label: 'Electronic',
    predicate: (event) => event.type === 'electronic',
  },
  {
    id: 'r&b',
    label: 'R&B',
    predicate: (event) => event.type === 'r&b',
  },
  {
    id: 'latin',
    label: 'Latin',
    predicate: (event) => event.type === 'latin',
  },
  {
    id: 'hip-hop',
    label: 'Hip Hop',
    predicate: (event) => event.type === 'hip-hop',
  },
  {
    id: 'acoustic',
    label: 'Acoustic',
    predicate: (event) => event.type === 'acoustic',
  },
  {
    id: 'classical',
    label: 'Classical',
    predicate: (event) => event.type === 'classical',
  },
];

const sampleEvents = generateMassiveEvents();

const Demo = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const labels = useMemo(() => {
    return language === 'pt' ? defaultLabels : englishLabels;
  }, [language]);

  const handleEventAdd = (date: Date, time?: string) => {
    const startHour = time ? parseInt(time.split(':')[0]) : 9;
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: 'New Event',
      date,
      startTime: time || '09:00',
      endTime: `${(startHour + 1).toString().padStart(2, '0')}:00`,
      color: 'blueberry',
    };
    setEvents([...events, newEvent]);
  };

  const handleEventEdit = (event: CalendarEvent) => {
    console.log('Edit event:', event);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background transition-colors">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <a 
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Docs</span>
            </a>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">📅</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Interactive Demo</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Demo Info */}
        <div className="container mx-auto px-4 py-4">
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <h2 className="font-medium text-foreground mb-2">
              {language === 'pt' ? '🎮 Teste o Calendário' : '🎮 Try the Calendar'}
            </h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {language === 'pt' ? 'Clique em um dia ou horário para adicionar eventos' : 'Click on a day or time slot to add events'}</li>
              <li>• {language === 'pt' ? 'Arraste eventos para movê-los' : 'Drag events to move them'}</li>
              <li>• {language === 'pt' ? 'Use os filtros no sidebar para filtrar eventos' : 'Use sidebar filters to filter events'}</li>
              <li>• {language === 'pt' ? 'Alterne entre visualizações: Mês, Semana, Dia' : 'Switch between views: Month, Week, Day'}</li>
            </ul>
          </div>
        </div>

        {/* Calendar */}
        <div className="container mx-auto px-4 pb-8">
          <div className="rounded-xl border border-border overflow-hidden shadow-lg bg-card">
            <Calendar
              events={events}
              labels={labels}
              customFilters={customFilters}
              onEventAdd={handleEventAdd}
              onEventEdit={handleEventEdit}
              onEventDelete={handleEventDelete}
              onEventUpdate={handleEventUpdate}
              maxVisibleEvents={6}
            />
          </div>
        </div>

        {/* Code Example */}
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">
              {language === 'pt' ? 'Código usado nesta demo:' : 'Code used in this demo:'}
            </h3>
            <pre className="text-xs sm:text-sm overflow-x-auto text-foreground">
              <code>{`import { Calendar, CalendarEvent, englishLabels } from 'react-gcal';
import 'react-gcal/styles';

const customFilters = [
  {
    id: 'meetings',
    label: 'Meetings',
    color: 'blue',
    filterFn: (event) => event.title.includes('meeting'),
  },
];

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  return (
    <Calendar
      events={events}
      labels={englishLabels}
      customFilters={customFilters}
      onEventAdd={(date, hour) => { /* add event */ }}
      onEventEdit={(event) => { /* edit event */ }}
      onEventDelete={(id) => { /* delete event */ }}
      onEventUpdate={(event) => { /* update event */ }}
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
