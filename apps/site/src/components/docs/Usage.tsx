import { CodeBlock } from './CodeBlock';

export function Usage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Usage</h1>
        <p className="text-muted-foreground">
          Learn how to use the Calendar component in your application.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Basic Example</h2>
        <p className="text-muted-foreground">
          The simplest way to use the Calendar component:
        </p>
        
        <CodeBlock language="tsx">
{`import { Calendar } from 'react-gcal';
import 'react-gcal/styles';

function App() {
  return <Calendar />;
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">With Events</h2>
        <p className="text-muted-foreground">
          Pass events to display on the calendar:
        </p>
        
        <CodeBlock language="tsx">
{`import { useState } from 'react';
import { Calendar, CalendarEvent } from 'react-gcal';
import 'react-gcal/styles';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      color: 'blueberry',
      description: 'Weekly sync with the team'
    },
    {
      id: '2',
      title: 'Lunch Break',
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      color: 'banana'
    }
  ]);

  return <Calendar events={events} />;
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Handling Events</h2>
        <p className="text-muted-foreground">
          The Calendar provides callbacks for all user interactions:
        </p>
        
        <CodeBlock language="tsx">
{`import { Calendar, CalendarEvent } from 'react-gcal';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Called when user clicks on an event
  const handleEventView = (event: CalendarEvent) => {
    console.log('Viewing event:', event);
  };

  // Called when user clicks to add a new event
  const handleEventAdd = (date: Date, time?: string) => {
    console.log('Adding event at:', date, time);
    // Open your event creation modal/form
  };

  // Called when user wants to edit an event
  const handleEventEdit = (event: CalendarEvent) => {
    console.log('Editing event:', event);
    // Open your event editing modal/form
  };

  // Called when user deletes an event
  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  return (
    <Calendar
      events={events}
      onEventView={handleEventView}
      onEventAdd={handleEventAdd}
      onEventEdit={handleEventEdit}
      onEventDelete={handleEventDelete}
    />
  );
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Initial View & Date</h2>
        <p className="text-muted-foreground">
          Control the initial state of the calendar:
        </p>
        
        <CodeBlock language="tsx">
{`import { Calendar } from 'react-gcal';

function App() {
  return (
    <Calendar
      initialDate={new Date('2024-06-15')}
      initialView="week"
    />
  );
}`}
        </CodeBlock>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Available Views</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><code className="bg-background px-1.5 py-0.5 rounded">month</code> - Monthly grid view</li>
            <li><code className="bg-background px-1.5 py-0.5 rounded">week</code> - Weekly view with hourly slots</li>
            <li><code className="bg-background px-1.5 py-0.5 rounded">day</code> - Single day view with hourly slots</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Drag and Drop</h2>
        <p className="text-muted-foreground">
          Events can be dragged to different times and days. The <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onEventEdit</code> callback is called with the updated event:
        </p>
        
        <CodeBlock language="tsx">
{`import { Calendar, CalendarEvent } from 'react-gcal';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([...]);

  const handleEventEdit = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  return (
    <Calendar
      events={events}
      onEventEdit={handleEventEdit}
    />
  );
}`}
        </CodeBlock>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>Tip:</strong> Drag and drop works in all views. In week and day views, events snap to 15-minute intervals.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Custom Styling</h2>
        <p className="text-muted-foreground">
          Add custom classes to the calendar container:
        </p>
        
        <CodeBlock language="tsx">
{`import { Calendar } from 'react-gcal';

function App() {
  return (
    <Calendar
      className="shadow-xl rounded-xl overflow-hidden"
    />
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
