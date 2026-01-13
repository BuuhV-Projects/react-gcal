import { useState } from 'react';
import { Calendar as CalendarIcon, Search, X, Plus } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { CustomFilter } from './types';
import { CalendarLabels, defaultLabels } from './labels';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  customFilters?: CustomFilter[];
  activeFilterIds: string[];
  onFilterChange: (filterIds: string[]) => void;
  onAddEvent?: () => void;
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
  onAddEvent,
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
    <aside className={styles.sidebar}>
      {onAddEvent && (
        <button onClick={onAddEvent} className={styles.createButton}>
          <Plus />
          {labels.create}
        </button>
      )}
      
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <CalendarIcon className={styles.icon} />
        </div>
        <span className={styles.title}>{labels.calendar}</span>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder={labels.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className={styles.clearButton}
            type="button"
            aria-label="Clear search"
          >
            <X />
          </button>
        )}
      </div>

      <div className={styles.miniCalendarWrapper}>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={(date) => date && onDateSelect(date)}
          month={miniCalendarMonth}
          onMonthChange={setMiniCalendarMonth}
          locale={labels.locale}
          className={styles.miniCalendar}
          classNames={{
            months: styles.miniCalendarMonths,
            month: styles.miniCalendarMonth,
            table: styles.miniCalendarTable,
            head_row: styles.miniCalendarHeadRow,
            head_cell: styles.miniCalendarHeadCell,
            row: styles.miniCalendarRow,
            cell: styles.miniCalendarCell,
            day: styles.miniCalendarDay,
            day_selected: styles.miniCalendarDaySelected,
            day_today: styles.miniCalendarDayToday,
            day_outside: styles.miniCalendarDayOutside,
            nav: styles.miniCalendarNav,
            nav_button: styles.miniCalendarNavButton,
            nav_button_previous: styles.miniCalendarNavButtonPrevious,
            nav_button_next: styles.miniCalendarNavButtonNext,
            caption: styles.miniCalendarCaption,
            caption_label: styles.miniCalendarCaptionLabel,
          }}
        />
      </div>

      {/* Custom Filters */}
      {customFilters.length > 0 && (
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h3 className={styles.filtersTitle}>{labels.filters}</h3>
            <button
              onClick={handleSelectAll}
              className={styles.selectAllButton}
            >
              {activeFilterIds.length === customFilters.length ? labels.clearAll : labels.selectAll}
            </button>
          </div>
          <div className={styles.filtersList}>
            {customFilters.map((filter) => (
              <label 
                key={filter.id} 
                className={styles.filterItem}
              >
                <Checkbox
                  checked={activeFilterIds.includes(filter.id)}
                  onCheckedChange={() => handleFilterToggle(filter.id)}
                  className="h-4 w-4 border-muted-foreground/50"
                />
                <span className={styles.filterLabel}>
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
