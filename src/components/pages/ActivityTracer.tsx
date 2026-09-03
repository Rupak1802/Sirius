import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Calendar,
  Droplets,
  Sprout,
  Bug,
  Sparkles,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';

interface Activity {
  id: number;
  type: string;
  crop: string;
  date: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

export const ActivityTracer: React.FC = () => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'sowing',
      crop: 'Rice',
      date: '2024-01-15',
      description: 'Sowed rice seeds in the main paddy field',
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'irrigation',
      crop: 'Rice',
      date: '2024-01-20',
      description: 'Irrigated rice field - water level 4 inches',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'fertilization',
      crop: 'Coconut',
      date: '2024-01-25',
      description: 'Applied organic fertilizer to coconut trees',
      icon: Sparkles,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 4,
      type: 'pest',
      crop: 'Pepper',
      date: '2024-02-01',
      description: 'Noticed leaf spot on pepper vines - treated with neem oil',
      icon: Bug,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 5,
      type: 'irrigation',
      crop: 'Pepper',
      date: '2024-02-05',
      description: 'Drip irrigation system maintenance and watering',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ]);

  const handleDeleteActivity = (id: number) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => prev.filter(activity => activity.id !== id));
    }
  };

  const handleDuplicateActivity = (activity: Activity) => {
    const newActivity = {
      ...activity,
      id: Math.max(...activities.map(a => a.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      description: `${activity.description} (Copy)`
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowEditModal(true);
  };

  const handleUpdateActivity = (updatedActivity: Activity) => {
    setActivities(prev => prev.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
    setShowEditModal(false);
    setEditingActivity(null);
  };

  const filteredActivities = activities.filter(activity =>
    activity.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-4">{t('activity.title')}</h1>
          
          {/* Search and Add */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder={`${t('common.search')} activities...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </Button>
          </div>

          {/* Add Activity Form */}
          {showForm && (
            <Card className="p-6 mb-4">
              <h3 className="text-lg mb-4">Log New Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Activity Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sowing">{t('activity.sowing')}</SelectItem>
                      <SelectItem value="irrigation">{t('activity.irrigation')}</SelectItem>
                      <SelectItem value="fertilization">{t('activity.fertilization')}</SelectItem>
                      <SelectItem value="pest">{t('activity.pest')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Crop</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="coconut">Coconut</SelectItem>
                      <SelectItem value="pepper">Pepper</SelectItem>
                      <SelectItem value="cardamom">Cardamom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Date</label>
                  <Input type="date" />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Area (acres)</label>
                  <Input type="number" placeholder="0.5" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Description</label>
                  <Textarea placeholder="Describe the activity..." />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowForm(false)}>
                  Save Activity
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card key={activity.id} className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${activity.color}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h3 className={`${activity.color} capitalize`}>
                          {t(`activity.${activity.type}`)} - {activity.crop}
                        </h3>
                        <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                      
                      {/* Activity Badge */}
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${activity.color} ${activity.bgColor} mt-2 md:mt-0`}>
                        {t(`activity.${activity.type}`)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700">{activity.description}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditActivity(activity)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateActivity(activity)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <Card className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No activities found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try a different search term' : 'Start by logging your first farming activity'}
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Activity
            </Button>
          </Card>
        )}

        {/* Statistics Card */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg mb-4">Activity Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sprout className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl text-green-600">3</p>
              <p className="text-sm text-gray-600">Sowing</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl text-blue-600">8</p>
              <p className="text-sm text-gray-600">Irrigation</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-2xl text-yellow-600">5</p>
              <p className="text-sm text-gray-600">Fertilization</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Bug className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-2xl text-red-600">2</p>
              <p className="text-sm text-gray-600">Pest Control</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Edit Activity Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>
              Modify the details of your farming activity.
            </DialogDescription>
          </DialogHeader>
          {editingActivity && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Activity Type</label>
                <Select 
                  value={editingActivity.type} 
                  onValueChange={(value) => setEditingActivity(prev => prev ? {...prev, type: value} : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sowing">Sowing</SelectItem>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                    <SelectItem value="fertilization">Fertilization</SelectItem>
                    <SelectItem value="pest">Pest Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Crop</label>
                <Input 
                  value={editingActivity.crop}
                  onChange={(e) => setEditingActivity(prev => prev ? {...prev, crop: e.target.value} : null)}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Date</label>
                <Input 
                  type="date"
                  value={editingActivity.date}
                  onChange={(e) => setEditingActivity(prev => prev ? {...prev, date: e.target.value} : null)}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Description</label>
                <Textarea 
                  value={editingActivity.description}
                  onChange={(e) => setEditingActivity(prev => prev ? {...prev, description: e.target.value} : null)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => editingActivity && handleUpdateActivity(editingActivity)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};