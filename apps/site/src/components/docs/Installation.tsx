import { CodeBlock } from './CodeBlock';

export function Installation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Installation</h1>
        <p className="text-muted-foreground">
          Get started with Your Daily Planner in your React or Next.js project.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Package Manager</h2>
        <p className="text-muted-foreground">
          Install the package using your preferred package manager:
        </p>
        
        <div className="space-y-3">
          <CodeBlock language="bash" title="npm">
            npm install react-gcal
          </CodeBlock>
          
          <CodeBlock language="bash" title="yarn">
            yarn add react-gcal
          </CodeBlock>
          
          <CodeBlock language="bash" title="pnpm">
            pnpm add react-gcal
          </CodeBlock>
          
          <CodeBlock language="bash" title="bun">
            bun add react-gcal
          </CodeBlock>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Peer Dependencies</h2>
        <p className="text-muted-foreground">
          The library requires the following peer dependencies:
        </p>
        
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><code className="text-sm bg-muted px-1.5 py-0.5 rounded">react</code> (^18.0.0)</li>
          <li><code className="text-sm bg-muted px-1.5 py-0.5 rounded">react-dom</code> (^18.0.0)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Importing Styles</h2>
        <p className="text-muted-foreground">
          Import the CSS styles in your application entry point:
        </p>
        
        <CodeBlock language="tsx" title="main.tsx or App.tsx">
{`import 'react-gcal/styles';`}
        </CodeBlock>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> The library uses Tailwind CSS. If you're already using Tailwind in your project, the styles will integrate seamlessly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">TypeScript</h2>
        <p className="text-muted-foreground">
          Your Daily Planner is written in TypeScript and includes type definitions out of the box. No additional <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@types</code> packages are needed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Next.js Setup</h2>
        <p className="text-muted-foreground">
          When using with Next.js App Router, make sure to use the <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> directive:
        </p>
        
        <CodeBlock language="tsx" title="app/calendar/page.tsx">
{`'use client';

import { Calendar } from 'react-gcal';
import 'react-gcal/styles';

export default function CalendarPage() {
  return <Calendar />;
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
