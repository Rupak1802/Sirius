import React, { useState, useContext } from 'react';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useLanguage } from '../LanguageContext';
import { CalendarDays, Clock, Sprout, TrendingUp, CheckCircle, AlertTriangle, Star, Plus, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  date: Date;
  title: string;
  type: 'plan' | 'completed' | 'special' | 'prediction';
  category: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

interface HarvestRecord {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  date: Date;
  quality: 'excellent' | 'good' | 'average';
  price: number;
  location: string;
}

export const Reminders: React.FC = () => {
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    type: 'plan' as CalendarEvent['type'],
    category: '',
    priority: 'medium' as CalendarEvent['priority'],
    description: ''
  });

  const translations = {
    en: {
      title: 'Calendar & Timeline',
      calendar: 'Farming Calendar',
      timeline: 'Harvest Timeline',
      plans: 'Upcoming Plans',
      completed: 'Completed Tasks',
      special: 'Special Days',
      predictions: 'Crop Predictions',
      noEvents: 'No events for this date',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      harvestHistory: 'Harvest History',
      crop: 'Crop',
      quantity: 'Quantity',
      quality: 'Quality',
      price: 'Price',
      location: 'Location',
      date: 'Date',
      totalHarvest: 'Total Harvest',
      avgPrice: 'Avg Price',
      bestCrop: 'Best Performing Crop',
      viewDetails: 'View Details',
      addEvent: 'Add Event',
      editEvent: 'Edit Event',
      deleteEvent: 'Delete Event',
      eventTitle: 'Event Title',
      eventDate: 'Event Date',
      eventType: 'Event Type',
      eventCategory: 'Category',
      eventPriority: 'Priority',
      eventDescription: 'Description',
      save: 'Save',
      cancel: 'Cancel',
      deleteConfirm: 'Are you sure you want to delete this event?',
      eventAdded: 'Event added successfully!',
      eventUpdated: 'Event updated successfully!',
      eventDeleted: 'Event deleted successfully!'
    }
  };

  const t = translations[language];

  // Initialize with sample events, but allow adding/editing
  const initialEvents: CalendarEvent[] = [
    {
      date: new Date(2024, 1, 15),
      title: 'Apply fertilizer to rice field',
      type: 'plan',
      category: 'Fertilization',
      priority: 'high'
    },
    {
      date: new Date(2024, 1, 16),
      title: 'Pest inspection for coconut trees',
      type: 'completed',
      category: 'Pest Control'
    },
    {
      date: new Date(2024, 1, 18),
      title: 'Makar Sankranti - Auspicious day for farming',
      type: 'special',
      category: 'Festival'
    },
    {
      date: new Date(2024, 1, 20),
      title: 'Expected pepper harvest to begin',
      type: 'prediction',
      category: 'Harvest'
    },
    {
      date: new Date(2024, 1, 22),
      title: 'Government scheme application deadline',
      type: 'plan',
      category: 'Government Scheme',
      priority: 'critical'
    }
  ];

  // Sample harvest records
  const harvestRecords: HarvestRecord[] = [
    {
      id: '1',
      crop: 'Rice',
      quantity: 150,
      unit: 'kg',
      date: new Date(2024, 1, 10),
      quality: 'excellent',
      price: 2500,
      location: 'Field A'
    },
    {
      id: '2',
      crop: 'Coconut',
      quantity: 200,
      unit: 'pieces',
      date: new Date(2024, 1, 8),
      quality: 'good',
      price: 600,
      location: 'Grove B'
    },
    {
      id: '3',
      crop: 'Pepper',
      quantity: 25,
      unit: 'kg',
      date: new Date(2024, 1, 5),
      quality: 'excellent',
      price: 8750,
      location: 'Vine Garden'
    },
    {
      id: '4',
      crop: 'Banana',
      quantity: 80,
      unit: 'bunches',
      date: new Date(2024, 0, 28),
      quality: 'good',
      price: 2400,
      location: 'Plantation C'
    }
  ];

  // Combine initial events with user-added events
  const allEvents = [...initialEvents, ...events];

  const getEventsForDate = (date: Date) => {
    return allEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleAddEvent = () => {
    const eventToAdd: CalendarEvent = {
      ...newEvent,
      date: new Date(newEvent.date)
    };
    setEvents(prev => [...prev, eventToAdd]);
    setShowAddEventModal(false);
    // Reset form
    setNewEvent({
      title: '',
      date: new Date(),
      type: 'plan',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  const handleDeleteEvent = (eventIndex: number) => {
    if (window.confirm(t.deleteConfirm)) {
      setEvents(prev => prev.filter((_, index) => index !== eventIndex));
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'plan': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'special': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'prediction': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'average': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filterRecordsByTimeframe = (records: HarvestRecord[]) => {
    const now = new Date();
    const filtered = records.filter(record => {
      const daysDiff = Math.floor((now.getTime() - record.date.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (selectedTimeframe) {
        case 'daily': return daysDiff <= 7;
        case 'weekly': return daysDiff <= 30;
        case 'monthly': return daysDiff <= 365;
        case 'yearly': return daysDiff <= 365 * 3;
        default: return true;
      }
    });
    
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const calculateStats = (records: HarvestRecord[]) => {
    const totalQuantity = records.reduce((sum, record) => sum + record.quantity, 0);
    const totalValue = records.reduce((sum, record) => sum + record.price, 0);
    const avgPrice = records.length > 0 ? totalValue / records.length : 0;
    
    const cropPerformance = records.reduce((acc, record) => {
      const crop = record.crop;
      if (!acc[crop]) {
        acc[crop] = { total: 0, value: 0 };
      }
      acc[crop].total += record.quantity;
      acc[crop].value += record.price;
      return acc;
    }, {} as Record<string, { total: number; value: number }>);

    const bestCrop = Object.entries(cropPerformance).reduce((best, [crop, data]) => {
      return data.value > best.value ? { crop, value: data.value } : best;
    }, { crop: '', value: 0 });

    return { totalQuantity, avgPrice, bestCrop: bestCrop.crop };
  };

  const filteredRecords = filterRecordsByTimeframe(harvestRecords);
  const stats = calculateStats(filteredRecords);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <CalendarDays className="w-8 h-8 text-green-600" />
          <h1 className="text-green-700">{t.title}</h1>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {t.calendar}
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t.timeline}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-green-600" />
                    {t.calendar}
                  </CardTitle>
                  <CardDescription>
                    Select a date to view farming activities and plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvents: (date) => getEventsForDate(date).length > 0
                    }}
                    modifiersStyles={{
                      hasEvents: { backgroundColor: '#dcfce7', fontWeight: 'bold' }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Events for selected date */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {selectedDate ? selectedDate.toLocaleDateString() : t.noEvents}
                    </CardTitle>
                    <Dialog open={showAddEventModal} onOpenChange={setShowAddEventModal}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4 mr-1" />
                          {t.addEvent}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{t.addEvent}</DialogTitle>
                          <DialogDescription>
                            Create a new farming event or reminder
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title">{t.eventTitle}</Label>
                            <Input
                              id="title"
                              value={newEvent.title}
                              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Enter event title"
                            />
                          </div>
                          <div>
                            <Label htmlFor="date">{t.eventDate}</Label>
                            <Input
                              id="date"
                              type="date"
                              value={newEvent.date.toISOString().split('T')[0]}
                              onChange={(e) => setNewEvent(prev => ({ ...prev, date: new Date(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="type">{t.eventType}</Label>
                            <Select value={newEvent.type} onValueChange={(value: CalendarEvent['type']) => setNewEvent(prev => ({ ...prev, type: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="plan">Plan</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="special">Special</SelectItem>
                                <SelectItem value="prediction">Prediction</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="category">{t.eventCategory}</Label>
                            <Input
                              id="category"
                              value={newEvent.category}
                              onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value }))}
                              placeholder="Enter category"
                            />
                          </div>
                          <div>
                            <Label htmlFor="priority">{t.eventPriority}</Label>
                            <Select value={newEvent.priority} onValueChange={(value: CalendarEvent['priority']) => setNewEvent(prev => ({ ...prev, priority: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAddEvent} className="flex-1 bg-green-600 hover:bg-green-700">
                              {t.save}
                            </Button>
                            <Button variant="outline" onClick={() => setShowAddEventModal(false)} className="flex-1">
                              {t.cancel}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate).length > 0 ? (
                        getEventsForDate(selectedDate).map((event, index) => {
                          const isUserEvent = events.some(e => e.title === event.title && e.date.getTime() === event.date.getTime());
                          const userEventIndex = events.findIndex(e => e.title === event.title && e.date.getTime() === event.date.getTime());
                          
                          return (
                            <div key={index} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm mb-1">
                                    {event.title}
                                  </h4>
                                  <p className="text-xs opacity-75">
                                    {event.category}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {event.priority && (
                                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                                  )}
                                  {isUserEvent && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => handleDeleteEvent(userEventIndex)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                {event.type === 'plan' && <Clock className="w-3 h-3" />}
                                {event.type === 'completed' && <CheckCircle className="w-3 h-3" />}
                                {event.type === 'special' && <Star className="w-3 h-3" />}
                                {event.type === 'prediction' && <TrendingUp className="w-3 h-3" />}
                                <span className="text-xs capitalize">{event.type}</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 text-center py-4">{t.noEvents}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">{t.noEvents}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Event Type Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'plan', label: t.plans, icon: Clock },
                { type: 'completed', label: t.completed, icon: CheckCircle },
                { type: 'special', label: t.special, icon: Star },
                { type: 'prediction', label: t.predictions, icon: TrendingUp }
              ].map((item) => (
                <Card key={item.type} className={getEventTypeColor(item.type)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            {/* Timeline Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-green-600" />
                  {t.harvestHistory}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { key: 'daily', label: t.daily },
                    { key: 'weekly', label: t.weekly },
                    { key: 'monthly', label: t.monthly },
                    { key: 'yearly', label: t.yearly }
                  ].map((timeframe) => (
                    <Button
                      key={timeframe.key}
                      variant={selectedTimeframe === timeframe.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeframe(timeframe.key as any)}
                    >
                      {timeframe.label}
                    </Button>
                  ))}
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="text-green-700 mb-1">{t.totalHarvest}</h4>
                    <p className="text-2xl text-green-600">{stats.totalQuantity}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="text-blue-700 mb-1">{t.avgPrice}</h4>
                    <p className="text-2xl text-blue-600">₹{stats.avgPrice.toFixed(0)}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="text-yellow-700 mb-1">{t.bestCrop}</h4>
                    <p className="text-xl text-yellow-600">{stats.bestCrop}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Harvest Records */}
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg text-green-700 mb-1">
                          {record.crop}
                        </h3>
                        <p className="text-gray-600">
                          {record.quantity} {record.unit}
                        </p>
                      </div>
                      <Badge className={getQualityColor(record.quality)}>
                        {record.quality}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-500">{t.date}</span>
                        <p className="text-sm">{record.date.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">{t.price}</span>
                        <p className="text-sm">₹{record.price}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">{t.location}</span>
                        <p className="text-sm">
                          {record.location}
                        </p>
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" size="sm">
                          {t.viewDetails}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Sprout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No harvest records found for the selected timeframe
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};