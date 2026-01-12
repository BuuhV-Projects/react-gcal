import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { CalendarView } from './types';
import { CalendarLabels, defaultLabels } from './labels';
import styles from './CalendarHeader.module.css';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  onAddEvent: () => void;
  labels?: CalendarLabels;
}

export function CalendarHeader({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  onAddEvent,
  labels = defaultLabels,
}: CalendarHeaderProps) {
  const getTitle = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy', { locale: labels.locale });
    }
    if (view === 'week') {
      return `${labels.weekOf} ${format(currentDate, 'dd', { locale: labels.locale })} ${format(currentDate, 'MMMM', { locale: labels.locale })}`;
    }
    return format(currentDate, 'PPP', { locale: labels.locale });
  };

  const viewLabels: Record<CalendarView, string> = {
    month: labels.month,
    week: labels.week,
    day: labels.day,
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Button variant="create" size="lg" onClick={onAddEvent} className="gap-2">
          <Plus className="h-5 w-5" />
          {labels.create}
        </Button>
        
        <div className={styles.navigationButtons}>
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" onClick={onToday}>
          {labels.today}
        </Button>
        
        <h1 className={styles.title}>
          {getTitle()}
        </h1>
      </div>

      <div className={styles.viewSwitcher}>
        {(['month', 'week', 'day'] as CalendarView[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(v)}
          >
            {viewLabels[v]}
          </Button>
        ))}
      </div>
    </header>
  );
}
