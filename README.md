# React GCal - Monorepo

This is a monorepo containing the React GCal (Google Calendar-inspired) component library and an example application.

## Structure

```
.
├── packages/
│   └── your-daily-planner/    # The main library package (react-gcal)
└── apps/
    └── site/                   # Lovable app source code (uses the library)
```

## Getting Started

### Install Dependencies

From the root directory:

```bash
npm install
```

### Build the Library

```bash
npm run build:lib
```

### Run the Site App

```bash
npm run dev
```

This will start the site application at `http://localhost:8080` (or the port configured in Vite).

### Build Everything

```bash
npm run build
```

## Packages

### `react-gcal` (packages/your-daily-planner)

The main calendar component library. See [packages/your-daily-planner/README.md](packages/your-daily-planner/README.md) for more details.

### `site` (apps/site)

The Lovable app that uses the library. Located in `apps/site/`. The app imports the library using the alias `react-gcal` configured in `vite.config.ts`.

## Development

The project uses npm workspaces for managing packages and apps. The site app in `apps/site/` imports the library locally using Vite aliases, allowing you to develop both simultaneously.

To use the library in your app, import it like this:

```tsx
import { Calendar, CalendarEvent } from 'react-gcal';
```

The alias is configured in `apps/site/vite.config.ts` to point to the local library source.

## Publishing

To publish the library to npm:

```bash
cd packages/your-daily-planner
npm publish
```

Make sure to update the version in `packages/your-daily-planner/package.json` before publishing. The package will be published as `react-gcal` on npm.
