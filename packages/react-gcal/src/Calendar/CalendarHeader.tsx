import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarView } from './types';
import styles from './CalendarHeader.module.scss';
import { cn } from '../lib/utils';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  onAddEvent: () => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  onAddEvent,
}: CalendarHeaderProps) {
  const getTitle = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy', { locale: ptBR });
    }
    if (view === 'week') {
      return format(currentDate, "'Semana de' dd 'de' MMMM", { locale: ptBR });
    }
    return format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Button variant="create" size="lg" onClick={onAddEvent} className="gap-2">
          <Plus className="h-5 w-5" />
          Criar
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
          Hoje
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
            className="capitalize"
          >
            {v === 'month' ? 'Mês' : v === 'week' ? 'Semana' : 'Dia'}
          </Button>
        ))}
      </div>
    </header>
  );
}
