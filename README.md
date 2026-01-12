# React GCal

A beautiful Google Calendar-inspired component library for React and Next.js applications.

## Features

- 📅 **Multiple Views**: Month, Week, and Day view modes
- 🎯 **Drag & Drop**: Intuitive event management
- 🔍 **Search & Filter**: Find events quickly
- 🌈 **Color Coded**: 10 beautiful event colors
- 📱 **Responsive**: Works on any device
- 🌙 **Dark Mode**: Built-in theme support
- 🎨 **Customizable**: Flexible event handling via props
- ⚡ **TypeScript**: Fully typed components
- 🧪 **Testable**: Separated business logic (CalendarService)

## Installation

```bash
npm install react-gcal date-fns lucide-react
```

Also install Tailwind CSS and its peer dependencies if you haven't already:

```bash
npm install -D tailwindcss autoprefixer postcss
```

### Add CSS

Import the library's CSS in your main entry file:

```tsx
import 'react-gcal/styles';
```

### Configure Tailwind CSS

Add the library's source files to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... your existing content paths
    './node_modules/react-gcal/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}
```

## Quick Start

```tsx
import { Calendar, CalendarEvent } from 'react-gcal';
import 'react-gcal/styles';

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    description: 'Team meeting',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    color: 'blueberry',
  },
];

function App() {
  return <Calendar events={initialEvents} />;
}
```

## Monorepo Structure

This repository is a monorepo containing:

```
.
├── packages/
│   └── react-gcal/    # The main library package
└── apps/
    └── site/          # Documentation site
```

### Packages

- **`react-gcal`** (`packages/react-gcal`): The main calendar component library
- **`site`** (`apps/site`): Documentation site showcasing the library

## Development

### Install Dependencies

From the root directory:

```bash
npm install
```

### Build the Library

```bash
npm run build:lib
```

### Run the Documentation Site

```bash
npm run dev
```

This will start the site application at `http://localhost:8080` (or the port configured in Vite).

### Build Everything

```bash
npm run build
```

### Watch Mode for Library Development

```bash
npm run dev:lib
```

## Publishing

The library supports two versions:

### Version Padrão (Next.js 12+)
```bash
cd packages/react-gcal
npm run build
npm publish --access public
```

### Version LEGACY (Next.js 7-12)
```bash
cd packages/react-gcal
npm run publish:legacy
```

**Pré-requisitos**: Configure npm authentication (in the root directory):

```bash
npm config set _authToken=YOUR_NPM_TOKEN
npm config fix
```

Make sure to update the version in `packages/react-gcal/package.json` (or `package.legacy.json` for LEGACY) before publishing.

> **Note**: npm requires Two-Factor Authentication (2FA) or a granular access token with bypass 2FA enabled to publish packages. See [packages/react-gcal/PUBLISH.md](packages/react-gcal/PUBLISH.md) for detailed instructions.

## Documentation

The documentation site is available in `apps/site/` and includes:

- Getting Started guide
- Installation instructions
- Usage examples
- API Reference
- Styling guide

Run `npm run dev` to view the documentation locally.

## License

MIT

## Links

- [npm package](https://www.npmjs.com/package/react-gcal)
- [GitHub repository](https://github.com/your-repo/react-gcal)
