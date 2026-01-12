// NÃO exporte tudo dinamicamente
// IMPORTA TUDO explicitamente para forçar flatten

import { Calendar } from './Calendar/Calendar';
import { CalendarGrid } from './Calendar/CalendarGrid';
import { CalendarHeader } from './Calendar/CalendarHeader';
import { WeekView } from './Calendar/WeekView';
import { DayView } from './Calendar/DayView';
import { Sidebar } from './Calendar/Sidebar';
import { EventModal } from './Calendar/EventModal';

import { CalendarService } from './Calendar/CalendarService';
import { useCalendarService } from './Calendar/useCalendarService';

import { Button, buttonVariants } from './ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './ui/tabs';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';

// 🔴 NÃO importar CSS aqui

export {
  Calendar,
  CalendarGrid,
  CalendarHeader,
  WeekView,
  DayView,
  Sidebar,
  EventModal,
  CalendarService,
  useCalendarService,
  Button,
  buttonVariants,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
