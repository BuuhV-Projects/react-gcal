import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarView } from './types';

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
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-4">
        <Button variant="create" size="lg" onClick={onAddEvent} className="gap-2">
          <Plus className="h-5 w-5" />
          Criar
        </Button>
        
        <div className="flex items-center gap-1">
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
        
        <h1 className="text-xl font-medium text-foreground capitalize">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center bg-muted rounded-lg p-1">
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
