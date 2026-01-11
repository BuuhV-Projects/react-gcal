import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { EventColor } from './types';

interface SidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: EventColor[];
  onFilterChange: (colors: EventColor[]) => void;
}

const colorOptions: { color: EventColor; label: string }[] = [
  { color: 'tomato', label: 'Tomate' },
  { color: 'tangerine', label: 'Tangerina' },
  { color: 'banana', label: 'Banana' },
  { color: 'basil', label: 'Manjericão' },
  { color: 'sage', label: 'Sálvia' },
  { color: 'peacock', label: 'Pavão' },
  { color: 'blueberry', label: 'Mirtilo' },
  { color: 'lavender', label: 'Lavanda' },
  { color: 'grape', label: 'Uva' },
  { color: 'graphite', label: 'Grafite' },
];

export function Sidebar({ 
  currentDate, 
  onDateSelect, 
  searchQuery, 
  onSearchChange,
  activeFilters,
  onFilterChange 
}: SidebarProps) {
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(currentDate);

  const handleFilterToggle = (color: EventColor) => {
    if (activeFilters.includes(color)) {
      onFilterChange(activeFilters.filter(c => c !== color));
    } else {
      onFilterChange([...activeFilters, color]);
    }
  };

  const handleSelectAll = () => {
    if (activeFilters.length === colorOptions.length) {
      onFilterChange([]);
    } else {
      onFilterChange(colorOptions.map(c => c.color));
    }
  };

  return (
    <aside className="w-64 border-r border-border bg-card p-4 hidden lg:block overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xl font-semibold text-foreground">Agenda</span>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9 h-9 text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(date) => date && onDateSelect(date)}
        month={miniCalendarMonth}
        onMonthChange={setMiniCalendarMonth}
        className="rounded-lg border-0 p-0"
        classNames={{
          months: "w-full",
          month: "w-full",
          table: "w-full",
          head_row: "flex w-full",
          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem] flex-1 text-center",
          row: "flex w-full mt-1",
          cell: "text-center text-sm flex-1 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 mx-auto flex items-center justify-center rounded-full hover:bg-accent transition-colors text-xs",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground font-semibold",
          day_outside: "text-muted-foreground opacity-50",
          nav: "flex items-center justify-between mb-2",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-accent rounded-full",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium capitalize",
        }}
      />

      {/* Color Filters */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Filtrar por cor</h3>
          <button
            onClick={handleSelectAll}
            className="text-xs text-primary hover:underline"
          >
            {activeFilters.length === colorOptions.length ? 'Limpar' : 'Todos'}
          </button>
        </div>
        <div className="space-y-1.5">
          {colorOptions.map(({ color, label }) => (
            <label 
              key={color} 
              className="flex items-center gap-2 cursor-pointer group py-1 px-2 rounded-md hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                checked={activeFilters.includes(color)}
                onCheckedChange={() => handleFilterToggle(color)}
                className="h-4 w-4 border-muted-foreground/50"
              />
              <div className={`w-3 h-3 rounded-sm bg-event-${color}`} />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
