import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

interface SidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Sidebar({ currentDate, onDateSelect }: SidebarProps) {
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(currentDate);

  return (
    <aside className="w-64 border-r border-border bg-card p-4 hidden lg:block">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xl font-semibold text-foreground">Agenda</span>
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

      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Meus calendários</h3>
        <div className="space-y-2">
          {[
            { name: 'Pessoal', color: 'bg-event-blueberry' },
            { name: 'Trabalho', color: 'bg-event-basil' },
            { name: 'Família', color: 'bg-event-tangerine' },
          ].map((cal) => (
            <label key={cal.name} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-3 h-3 rounded-sm ${cal.color}`} />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {cal.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
