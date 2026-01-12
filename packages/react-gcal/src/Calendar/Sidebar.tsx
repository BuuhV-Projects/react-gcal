import { useState } from 'react';
import { Calendar as CalendarIcon, Search, X } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { CustomFilter } from './types';
import { CalendarLabels, defaultLabels } from './labels';

interface SidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  customFilters?: CustomFilter[];
  activeFilterIds: string[];
  onFilterChange: (filterIds: string[]) => void;
  labels?: CalendarLabels;
}

export function Sidebar({ 
  currentDate, 
  onDateSelect, 
  searchQuery, 
  onSearchChange,
  customFilters = [],
  activeFilterIds,
  onFilterChange,
  labels = defaultLabels,
}: SidebarProps) {
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(currentDate);

  const handleFilterToggle = (filterId: string) => {
    if (activeFilterIds.includes(filterId)) {
      onFilterChange(activeFilterIds.filter(id => id !== filterId));
    } else {
      onFilterChange([...activeFilterIds, filterId]);
    }
  };

  const handleSelectAll = () => {
    if (activeFilterIds.length === customFilters.length) {
      onFilterChange([]);
    } else {
      onFilterChange(customFilters.map(f => f.id));
    }
  };

  return (
    <aside className="w-64 border-r border-border bg-card p-4 hidden lg:block overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xl font-semibold text-foreground">{labels.calendar}</span>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={labels.searchPlaceholder}
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

      {/* Custom Filters */}
      {customFilters.length > 0 && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">{labels.filters}</h3>
            <button
              onClick={handleSelectAll}
              className="text-xs text-primary hover:underline"
            >
              {activeFilterIds.length === customFilters.length ? labels.clearAll : labels.selectAll}
            </button>
          </div>
          <div className="space-y-1.5">
            {customFilters.map((filter) => (
              <label 
                key={filter.id} 
                className="flex items-center gap-2 cursor-pointer group py-1 px-2 rounded-md hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  checked={activeFilterIds.includes(filter.id)}
                  onCheckedChange={() => handleFilterToggle(filter.id)}
                  className="h-4 w-4 border-muted-foreground/50"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {filter.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
