import { CodeBlock } from './CodeBlock';

export function ApiReference() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">API Reference</h1>
        <p className="text-muted-foreground">
          Complete reference for the Calendar component props and types.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Calendar Props</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium text-foreground">Prop</th>
                <th className="text-left py-3 pr-4 font-medium text-foreground">Type</th>
                <th className="text-left py-3 pr-4 font-medium text-foreground">Default</th>
                <th className="text-left py-3 font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <PropRow 
                name="events" 
                type="CalendarEvent[]" 
                defaultValue="[]" 
                description="Array of events to display" 
              />
              <PropRow 
                name="initialDate" 
                type="Date" 
                defaultValue="new Date()" 
                description="Initial date to focus on" 
              />
              <PropRow 
                name="initialView" 
                type="CalendarView" 
                defaultValue="'month'" 
                description="Initial view mode" 
              />
              <PropRow 
                name="className" 
                type="string" 
                defaultValue="-" 
                description="Additional CSS classes" 
              />
              <PropRow 
                name="onEventView" 
                type="(event) => void" 
                defaultValue="-" 
                description="Called when clicking an event" 
              />
              <PropRow 
                name="onEventAdd" 
                type="(date, time?) => void" 
                defaultValue="-" 
                description="Called when adding an event" 
              />
              <PropRow 
                name="onEventEdit" 
                type="(event) => void" 
                defaultValue="-" 
                description="Called when editing an event" 
              />
              <PropRow 
                name="onEventDelete" 
                type="(eventId) => void" 
                defaultValue="-" 
                description="Called when deleting an event" 
              />
              <PropRow 
                name="customFilters" 
                type="CustomFilter[]" 
                defaultValue="[]" 
                description="Custom filter options for the sidebar" 
              />
              <PropRow 
                name="labels" 
                type="Partial<CalendarLabels>" 
                defaultValue="defaultLabels (PT-BR)" 
                description="Custom text labels and locale" 
              />
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">CalendarEvent Type</h2>
        
        <CodeBlock language="typescript">
{`interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;  // Format: "HH:mm" (e.g., "09:00")
  endTime: string;    // Format: "HH:mm" (e.g., "10:30")
  color: EventColor;
  description?: string;
}`}
        </CodeBlock>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium text-foreground">Property</th>
                <th className="text-left py-3 pr-4 font-medium text-foreground">Type</th>
                <th className="text-left py-3 pr-4 font-medium text-foreground">Required</th>
                <th className="text-left py-3 font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <PropRow name="id" type="string" defaultValue="Yes" description="Unique identifier" />
              <PropRow name="title" type="string" defaultValue="Yes" description="Event title" />
              <PropRow name="date" type="Date" defaultValue="Yes" description="Event date" />
              <PropRow name="startTime" type="string" defaultValue="Yes" description="Start time (HH:mm)" />
              <PropRow name="endTime" type="string" defaultValue="Yes" description="End time (HH:mm)" />
              <PropRow name="color" type="EventColor" defaultValue="Yes" description="Event color" />
              <PropRow name="description" type="string" defaultValue="No" description="Optional description" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">EventColor Type</h2>
        
        <CodeBlock language="typescript">
{`type EventColor = 
  | 'tomato'     // Red
  | 'tangerine'  // Orange
  | 'banana'     // Yellow
  | 'basil'      // Green
  | 'sage'       // Light green
  | 'peacock'    // Cyan
  | 'blueberry'  // Blue
  | 'lavender'   // Purple
  | 'grape'      // Magenta
  | 'graphite';  // Gray`}
        </CodeBlock>

        <div className="flex flex-wrap gap-2">
          <ColorChip color="tomato" label="tomato" />
          <ColorChip color="tangerine" label="tangerine" />
          <ColorChip color="banana" label="banana" />
          <ColorChip color="basil" label="basil" />
          <ColorChip color="sage" label="sage" />
          <ColorChip color="peacock" label="peacock" />
          <ColorChip color="blueberry" label="blueberry" />
          <ColorChip color="lavender" label="lavender" />
          <ColorChip color="grape" label="grape" />
          <ColorChip color="graphite" label="graphite" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">CalendarView Type</h2>
        
        <CodeBlock language="typescript">
{`type CalendarView = 'month' | 'week' | 'day';`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">CustomFilter Type</h2>
        
        <CodeBlock language="typescript">
{`interface CustomFilter {
  id: string;           // Unique identifier
  label: string;        // Display label in sidebar
  predicate: (event: CalendarEvent) => boolean;  // Filter function
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">CalendarLabels Type</h2>
        
        <CodeBlock language="typescript">
{`interface CalendarLabels {
  // Header
  create: string;
  today: string;
  month: string;
  week: string;
  day: string;
  weekOf: string;
  
  // Sidebar
  calendar: string;
  searchPlaceholder: string;
  filters: string;
  selectAll: string;
  clearAll: string;
  
  // Grid
  weekDays: [string, string, string, string, string, string, string];
  moreEvents: string;
  
  // Day view
  events: string;
  
  // Date-fns locale for date formatting
  locale: Locale;
}`}
        </CodeBlock>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Built-in Label Sets</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><code className="bg-background px-1.5 py-0.5 rounded">defaultLabels</code> - Portuguese (Brazil)</li>
            <li><code className="bg-background px-1.5 py-0.5 rounded">englishLabels</code> - English</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Callback Details</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-foreground mb-2">onEventView</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Called when the user clicks on an existing event. Use this to show event details.
            </p>
            <CodeBlock language="typescript">
{`onEventView?: (event: CalendarEvent) => void`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">onEventAdd</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Called when the user clicks on an empty slot or uses the add button. The time parameter is provided in week/day views.
            </p>
            <CodeBlock language="typescript">
{`onEventAdd?: (date: Date, time?: string) => void`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">onEventEdit</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Called when an event is modified (e.g., via drag and drop). The event object contains the updated values.
            </p>
            <CodeBlock language="typescript">
{`onEventEdit?: (event: CalendarEvent) => void`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">onEventDelete</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Called when the user deletes an event. Receives only the event ID.
            </p>
            <CodeBlock language="typescript">
{`onEventDelete?: (eventId: string) => void`}
            </CodeBlock>
          </div>
        </div>
      </section>
    </div>
  );
}

function PropRow({ name, type, defaultValue, description }: { 
  name: string; 
  type: string; 
  defaultValue: string; 
  description: string 
}) {
  return (
    <tr>
      <td className="py-3 pr-4">
        <code className="text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">{name}</code>
      </td>
      <td className="py-3 pr-4">
        <code className="text-sm text-muted-foreground">{type}</code>
      </td>
      <td className="py-3 pr-4 text-muted-foreground">{defaultValue}</td>
      <td className="py-3 text-muted-foreground">{description}</td>
    </tr>
  );
}

function ColorChip({ color, label }: { color: string; label: string }) {
  const colorMap: Record<string, string> = {
    tomato: 'hsl(4, 90%, 58%)',
    tangerine: 'hsl(36, 100%, 50%)',
    banana: 'hsl(48, 100%, 67%)',
    basil: 'hsl(142, 71%, 45%)',
    sage: 'hsl(150, 30%, 60%)',
    peacock: 'hsl(186, 100%, 42%)',
    blueberry: 'hsl(214, 100%, 50%)',
    lavender: 'hsl(262, 52%, 47%)',
    grape: 'hsl(280, 68%, 50%)',
    graphite: 'hsl(220, 9%, 46%)'
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: colorMap[color] }}
      />
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );
}
