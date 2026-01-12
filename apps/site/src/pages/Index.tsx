import { useState } from 'react';
import { Book, Code, Palette, Zap, Menu, X, Github, Package, ChevronRight } from 'lucide-react';
import { Installation } from '../components/docs/Installation';
import { Usage } from '../components/docs/Usage';
import { ApiReference } from '../components/docs/ApiReference';
import { Styling } from '../components/docs/Styling';
import { cn } from '../lib/utils';

type Section = 'getting-started' | 'installation' | 'usage' | 'api' | 'styling';

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'getting-started', label: 'Getting Started', icon: <Book className="w-4 h-4" /> },
  { id: 'installation', label: 'Installation', icon: <Package className="w-4 h-4" /> },
  { id: 'usage', label: 'Usage', icon: <Code className="w-4 h-4" /> },
  { id: 'api', label: 'API Reference', icon: <Zap className="w-4 h-4" /> },
  { id: 'styling', label: 'Styling', icon: <Palette className="w-4 h-4" /> },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('getting-started');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return <GettingStarted onNavigate={setActiveSection} />;
      case 'installation':
        return <Installation />;
      case 'usage':
        return <Usage />;
      case 'api':
        return <ApiReference />;
      case 'styling':
        return <Styling />;
      default:
        return <GettingStarted onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
<<<<<<< HEAD
              <span className="text-primary-foreground font-bold text-sm">YGCAP</span>
            </div>
            <span className="font-semibold text-lg text-foreground">React GCal</span>
=======
              <span className="text-primary-foreground font-bold text-sm">📅</span>
            </div>
            <span className="font-semibold text-lg text-foreground">react-gcal</span>
>>>>>>> b4347a023fead91c052a604fed3c11fe10e3c0cd
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="/demo"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Live Demo
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://npmjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Package className="w-5 h-5" />
            </a>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 shrink-0 border-r border-border">
            <nav className="sticky top-20 py-8 pr-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-background md:hidden pt-16">
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-colors",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 py-8 md:pl-8 min-w-0">
            <div className="max-w-3xl">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

function GettingStarted({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">react-gcal</h1>
        <p className="text-xl text-muted-foreground">
          A beautiful Google Calendar-inspired component library for React and Next.js applications.
        </p>
      </div>


      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <FeatureCard 
          icon="📅" 
          title="Multiple Views" 
          description="Month, Week, and Day view modes" 
        />
        <FeatureCard 
          icon="🎯" 
          title="Drag & Drop" 
          description="Intuitive event management" 
        />
        <FeatureCard 
          icon="🔍" 
          title="Search & Filter" 
          description="Custom filters support" 
        />
        <FeatureCard 
          icon="🌈" 
          title="Color Coded" 
          description="10 beautiful event colors" 
        />
        <FeatureCard 
          icon="🌍" 
          title="i18n Ready" 
          description="Full translation support" 
        />
        <FeatureCard 
          icon="🌙" 
          title="Dark Mode" 
          description="Built-in theme support" 
        />
      </div>

      {/* Quick Start */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Quick Start</h2>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-foreground">npm install react-gcal</code>
        </div>
        <p className="text-muted-foreground">
          Then import the component and styles in your application:
        </p>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`import { Calendar } from 'react-gcal';
import 'react-gcal/styles';

function App() {
  return <Calendar />;
}`}</pre>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Documentation</h2>
        <div className="grid gap-3">
          <NavCard 
            title="Installation" 
            description="Install the package and set up your project"
            onClick={() => onNavigate('installation')}
          />
          <NavCard 
            title="Usage" 
            description="Learn how to use the Calendar component"
            onClick={() => onNavigate('usage')}
          />
          <NavCard 
            title="API Reference" 
            description="Complete list of props, types, and callbacks"
            onClick={() => onNavigate('api')}
          />
          <NavCard 
            title="Styling" 
            description="Customize colors and themes"
            onClick={() => onNavigate('styling')}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <span className="text-2xl mb-2 block">{icon}</span>
      <h3 className="font-medium text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function NavCard({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-left group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </button>
  );
}

export default Index;
