import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X, Clock, Type, FileText, Palette } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { CalendarEvent, EventColor } from './types';
import { cn } from '../lib/utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  selectedDate: Date;
  defaultStartTime?: string;
  editingEvent?: CalendarEvent | null;
}

const colorOptions: { value: EventColor; label: string; class: string }[] = [
  { value: 'tomato', label: 'Tomate', class: 'bg-event-tomato' },
  { value: 'tangerine', label: 'Tangerina', class: 'bg-event-tangerine' },
  { value: 'banana', label: 'Banana', class: 'bg-event-banana' },
  { value: 'basil', label: 'Manjericão', class: 'bg-event-basil' },
  { value: 'sage', label: 'Sálvia', class: 'bg-event-sage' },
  { value: 'peacock', label: 'Pavão', class: 'bg-event-peacock' },
  { value: 'blueberry', label: 'Mirtilo', class: 'bg-event-blueberry' },
  { value: 'lavender', label: 'Lavanda', class: 'bg-event-lavender' },
  { value: 'grape', label: 'Uva', class: 'bg-event-grape' },
  { value: 'graphite', label: 'Grafite', class: 'bg-event-graphite' },
];

export function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  defaultStartTime = '09:00',
  editingEvent,
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(() => {
    const [hours] = defaultStartTime.split(':').map(Number);
    return `${(hours + 1).toString().padStart(2, '0')}:00`;
  });
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<EventColor>('blueberry');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setDescription(editingEvent.description || '');
      setColor(editingEvent.color);
    } else {
      setTitle('');
      setStartTime(defaultStartTime);
      const [hours] = defaultStartTime.split(':').map(Number);
      setEndTime(`${(hours + 1).toString().padStart(2, '0')}:00`);
      setDescription('');
      setColor('blueberry');
    }
  }, [editingEvent, isOpen, defaultStartTime]);

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title,
      date: selectedDate,
      startTime,
      endTime,
      description,
      color,
    });
    onClose();
  };

  const handleDelete = () => {
    if (editingEvent && onDelete) {
      onDelete(editingEvent.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editingEvent ? 'Editar evento' : 'Novo evento'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Type className="h-4 w-4" />
              <span className="text-sm">Título</span>
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Adicionar título"
              className="text-lg font-medium"
            />
          </div>

          <div className="text-sm text-muted-foreground capitalize">
            {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Horário</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground">até</span>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Descrição</span>
            </div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicionar descrição"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Palette className="h-4 w-4" />
              <span className="text-sm">Cor</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={cn(
                    "w-6 h-6 rounded-full transition-all",
                    option.class,
                    color === option.value && "ring-2 ring-offset-2 ring-primary"
                  )}
                  title={option.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          {editingEvent ? (
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
