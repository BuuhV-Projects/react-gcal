import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarView } from './types';
import { CalendarLabels, defaultLabels } from './labels';
import styles from './CalendarHeader.module.scss';
import { cn } from '../lib/utils';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  labels?: CalendarLabels;
}

export function CalendarHeader({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
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
        <div className={styles.navigationButtons}>
          <button onClick={onPrevious} className={styles.navButton} type="button" aria-label="Previous">
            <ChevronLeft />
          </button>
          <button onClick={onNext} className={styles.navButton} type="button" aria-label="Next">
            <ChevronRight />
          </button>
        </div>
        
        <button onClick={onToday} className={styles.todayButton} type="button">
          {labels.today}
        </button>
        
        <h1 className={styles.title}>
          {getTitle()}
        </h1>
      </div>

      <div className={styles.viewSwitcher}>
        {(['month', 'week', 'day'] as CalendarView[]).map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            className={cn(styles.viewButton, view === v && styles.viewButtonActive)}
            type="button"
          >
            {viewLabels[v]}
          </button>
        ))}
      </div>
    </header>
  );
}
