import { CodeBlock } from './CodeBlock';

export function Styling() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Styling</h1>
        <p className="text-muted-foreground">
          Customize the appearance of the Calendar component.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">CSS Variables</h2>
        <p className="text-muted-foreground">
          The Calendar uses CSS variables for theming. Override these in your CSS to customize colors:
        </p>
        
        <CodeBlock language="css" title="Your global CSS">
{`:root {
  /* Core colors */
  --background: 0 0% 100%;
  --foreground: 220 9% 20%;
  
  /* Primary (used for buttons, highlights) */
  --primary: 214 100% 50%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary (used for backgrounds) */
  --secondary: 220 14% 96%;
  --secondary-foreground: 220 9% 20%;
  
  /* Muted (used for subtle backgrounds) */
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  
  /* Borders and inputs */
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 214 100% 50%;
  
  /* Sidebar */
  --sidebar-background: 220 14% 98%;
  --sidebar-foreground: 220 9% 30%;
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Dark Mode</h2>
        <p className="text-muted-foreground">
          The Calendar supports dark mode out of the box. Add a <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> class to enable it:
        </p>
        
        <CodeBlock language="css" title="Dark mode variables">
{`.dark {
  --background: 224 71% 4%;
  --foreground: 220 14% 96%;
  
  --primary: 214 100% 60%;
  --primary-foreground: 224 71% 4%;
  
  --secondary: 224 71% 12%;
  --secondary-foreground: 220 14% 96%;
  
  --muted: 224 71% 12%;
  --muted-foreground: 220 9% 60%;
  
  --border: 224 71% 15%;
  --input: 224 71% 15%;
  
  --sidebar-background: 224 71% 6%;
  --sidebar-foreground: 220 14% 90%;
}`}
        </CodeBlock>

        <CodeBlock language="tsx" title="Toggle dark mode">
{`// Add 'dark' class to the html or body element
document.documentElement.classList.toggle('dark');`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Event Colors</h2>
        <p className="text-muted-foreground">
          Customize the 10 event colors by overriding these variables:
        </p>
        
        <CodeBlock language="css">
{`:root {
  --event-tomato: 4 90% 58%;
  --event-tangerine: 36 100% 50%;
  --event-banana: 48 100% 67%;
  --event-basil: 142 71% 45%;
  --event-sage: 150 30% 60%;
  --event-peacock: 186 100% 42%;
  --event-blueberry: 214 100% 50%;
  --event-lavender: 262 52% 47%;
  --event-grape: 280 68% 50%;
  --event-graphite: 220 9% 46%;
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Container Styling</h2>
        <p className="text-muted-foreground">
          Use the <code className="text-sm bg-muted px-1.5 py-0.5 rounded">className</code> prop to style the calendar container:
        </p>
        
        <CodeBlock language="tsx">
{`<Calendar 
  className="h-[600px] rounded-xl shadow-lg border border-border"
/>`}
        </CodeBlock>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> The Calendar fills its container by default (<code className="text-xs bg-muted px-1 py-0.5 rounded">h-screen</code>). Set a fixed height on the container or use the className prop to control the height.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Typography</h2>
        <p className="text-muted-foreground">
          The Calendar uses these font families by default:
        </p>
        
        <CodeBlock language="css">
{`body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Google Sans', 'Roboto', sans-serif;
}`}
        </CodeBlock>

        <p className="text-muted-foreground">
          Import Google Fonts in your HTML:
        </p>

        <CodeBlock language="html">
{`<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Tailwind Configuration</h2>
        <p className="text-muted-foreground">
          If you're using Tailwind CSS, extend your config to include the calendar's color tokens:
        </p>
        
        <CodeBlock language="javascript" title="tailwind.config.js">
{`module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... add other tokens as needed
      },
    },
  },
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
