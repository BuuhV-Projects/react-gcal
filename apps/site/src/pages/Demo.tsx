import { useState, useMemo } from 'react';
import { ArrowLeft, Sun, Moon, Globe } from 'lucide-react';
import { Calendar, CalendarEvent, defaultLabels, englishLabels, CustomFilter } from 'react-gcal';
import 'react-gcal/styles';

type Language = 'pt' | 'en';

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    color: 'peacock',
    description: 'Weekly sync with the team',
  },
  {
    id: '2',
    title: 'Product Launch',
    date: new Date(),
    startTime: '14:00',
    endTime: '16:00',
    color: 'basil',
    description: 'New feature release',
  },
  {
    id: '3',
    title: 'Design Review',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: '11:00',
    endTime: '12:00',
    color: 'grape',
    description: 'Review new UI designs',
  },
  {
    id: '4',
    title: 'Client Call',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    startTime: '15:00',
    endTime: '16:00',
    color: 'tangerine',
    description: 'Quarterly review with client',
  },
  {
    id: '5',
    title: 'Workshop',
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    startTime: '10:00',
    endTime: '12:00',
    color: 'lavender',
    description: 'React best practices workshop',
  },
  {
    id: '6',
    title: 'Sprint Planning',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    startTime: '09:00',
    endTime: '11:00',
    color: 'blueberry',
    description: 'Plan next sprint tasks',
  },
];

const customFilters: CustomFilter[] = [
  {
    id: 'meetings',
    label: 'Meetings',
    predicate: (event) => event.title.toLowerCase().includes('meeting') || event.title.toLowerCase().includes('call'),
  },
  {
    id: 'reviews',
    label: 'Reviews',
    predicate: (event) => event.title.toLowerCase().includes('review'),
  },
  {
    id: 'planning',
    label: 'Planning',
    predicate: (event) => event.title.toLowerCase().includes('planning') || event.title.toLowerCase().includes('sprint'),
  },
];

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
