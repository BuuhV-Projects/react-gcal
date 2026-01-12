# React GCal

A beautiful Google Calendar-inspired component library for React and Next.js applications.

## Features

- 📅 Multiple view modes (Month, Week, Day)
- 🎨 Beautiful Google Calendar-inspired design
- 🎯 Drag and drop events
- 🔍 Search and filter events
- 🌈 Color-coded events
- 📱 Responsive design
- 🌙 Dark mode support
- ⚡ Built with React and TypeScript

## Installation

```bash
npm install react-gcal
# or
yarn add react-gcal
# or
pnpm add react-gcal
```

## Usage

### Basic Example

```tsx
import { Calendar } from 'react-gcal';
import 'react-gcal/styles';

function App() {
  const [events, setEvents] = useState([]);

  return (
    <Calendar
      events={events}
      onEventAdd={(event) => {
        // Handle event creation
      }}
      onEventUpdate={(event) => {
        // Handle event update
      }}
      onEventDelete={(eventId) => {
        // Handle event deletion
      }}
    />
  );
}
```

### With Next.js

```tsx
'use client';

import { Calendar } from 'react-gcal';
import 'react-gcal/styles';

export default function CalendarPage() {
  // Your component logic
  return <Calendar {...props} />;
}
```

## API

### Calendar Component

The main `Calendar` component accepts the following props:

- `events`: Array of calendar events
- `currentDate`: Initial date to display (defaults to today)
- `view`: Initial view mode - 'month' | 'week' | 'day' (defaults to 'month')
- `onEventAdd`: Callback when a new event is created
- `onEventUpdate`: Callback when an event is updated
- `onEventDelete`: Callback when an event is deleted

### Types

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
  color: EventColor;
  description?: string;
}

type EventColor = 
  | 'tomato'
  | 'tangerine'
  | 'banana'
  | 'basil'
  | 'sage'
  | 'peacock'
  | 'blueberry'
  | 'lavender'
  | 'grape'
  | 'graphite';

type CalendarView = 'month' | 'week' | 'day';
```

## Styling

The library uses Tailwind CSS. Make sure to include the styles:

```tsx
import 'react-gcal/styles';
```

You'll also need to configure Tailwind CSS in your project. The library expects certain CSS variables to be defined (see the styles.css file for the complete list).

## License

MIT

