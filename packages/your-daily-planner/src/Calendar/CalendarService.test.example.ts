/**
 * Example test file for CalendarService
 * 
 * This demonstrates how to test the CalendarService class directly
 * without needing React Testing Library or component rendering.
 */

import { CalendarService } from './CalendarService';
import { CalendarEvent } from './types';

describe('CalendarService', () => {
  const mockEvent: CalendarEvent = {
    id: '1',
    title: 'Test Event',
    date: new Date('2024-01-15'),
    startTime: '10:00',
    endTime: '11:00',
    color: 'blueberry',
  };

  it('should initialize with default values', () => {
    const service = new CalendarService({});
    
    expect(service.currentDate).toBeInstanceOf(Date);
    expect(service.view).toBe('month');
    expect(service.events).toEqual([]);
    expect(service.filteredEvents).toEqual([]);
  });

  it('should initialize with provided dependencies', () => {
    const initialDate = new Date('2024-01-15');
    const events = [mockEvent];
    
    const service = new CalendarService({
      initialDate,
      initialView: 'week',
      events,
    });
    
    expect(service.currentDate).toEqual(initialDate);
    expect(service.view).toBe('week');
    expect(service.events).toEqual(events);
  });

  it('should filter events by search query', () => {
    const events: CalendarEvent[] = [
      { ...mockEvent, title: 'Meeting' },
      { ...mockEvent, id: '2', title: 'Lunch' },
    ];
    
    const service = new CalendarService({ events });
    service.setSearchQuery('Meeting');
    
    expect(service.filteredEvents).toHaveLength(1);
    expect(service.filteredEvents[0].title).toBe('Meeting');
  });

  it('should filter events by color', () => {
    const events: CalendarEvent[] = [
      { ...mockEvent, color: 'blueberry' },
      { ...mockEvent, id: '2', color: 'tomato' },
    ];
    
    const service = new CalendarService({ events });
    service.setActiveFilters(['blueberry']);
    
    expect(service.filteredEvents).toHaveLength(1);
    expect(service.filteredEvents[0].color).toBe('blueberry');
  });

  it('should navigate to previous month', () => {
    const initialDate = new Date('2024-01-15');
    const service = new CalendarService({ initialDate, initialView: 'month' });
    
    service.handlePrevious();
    
    expect(service.currentDate.getMonth()).toBe(11); // December (0-indexed)
  });

  it('should call onEventAdd when day is clicked', () => {
    const onEventAdd = jest.fn();
    const service = new CalendarService({ onEventAdd });
    const date = new Date('2024-01-15');
    
    service.handleDayClick(date);
    
    expect(onEventAdd).toHaveBeenCalledWith(date, '09:00');
  });

  it('should call onEventEdit when event is clicked and onEventEdit is provided', () => {
    const onEventEdit = jest.fn();
    const service = new CalendarService({ onEventEdit });
    
    service.handleEventClick(mockEvent);
    
    expect(onEventEdit).toHaveBeenCalledWith(mockEvent);
  });

  it('should call onEventView when event is clicked and onEventEdit is not provided', () => {
    const onEventView = jest.fn();
    const service = new CalendarService({ onEventView });
    
    service.handleEventClick(mockEvent);
    
    expect(onEventView).toHaveBeenCalledWith(mockEvent);
  });

  it('should update event on drop', () => {
    const onEventEdit = jest.fn();
    const events = [mockEvent];
    const service = new CalendarService({ events, onEventEdit });
    const newDate = new Date('2024-01-20');
    
    service.handleEventDrop('1', newDate, 14);
    
    expect(onEventEdit).toHaveBeenCalled();
    const updatedEvent = onEventEdit.mock.calls[0][0];
    expect(updatedEvent.date).toEqual(newDate);
    expect(updatedEvent.startTime).toBe('14:00');
  });
});

