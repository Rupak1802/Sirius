import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { AddCropModal } from '../AddCropModal';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, Calendar, MapPin, Sprout, MoreVertical, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

interface Crop {
  id: string;
  name: string;
  variety: string;
  area: string;
  plantingDate: string;
  stage: string;
  notes: string;
  soilType: string;
  irrigationType: string;
  health: 'Healthy' | 'Warning' | 'Critical';
  expectedHarvest?: string;
  displayName?: string;
}

interface CropData {
  name: string;
  variety: string;
  area: string;
  plantingDate: string;
  stage: string;
  notes: string;
  soilType: string;
  irrigationType: string;
}

export const MyCrops: React.FC = () => {
  const { t } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Sample crop data with some existing crops
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: '1',
      name: 'rice',
      displayName: 'Rice Paddy Field 1',
      variety: 'Jyothi',
      stage: 'flowering',
      plantingDate: '2023-12-01',
      expectedHarvest: '2024-03-15',
      health: 'Healthy',
      area: '1.2',
      notes: 'Main paddy field with good drainage',
      soilType: 'clay',
      irrigationType: 'flood'
    },
    {
      id: '2',
      name: 'coconut',
      displayName: 'Coconut Grove',
      variety: 'Chandra Laksha',
      stage: 'maturity',
      plantingDate: '2018-06-01',
      expectedHarvest: 'Continuous',
      health: 'Healthy',
      area: '0.8',
      notes: 'Mature coconut trees producing well',
      soilType: 'laterite',
      irrigationType: 'rainfed'
    },
    {
      id: '3',
      name: 'pepper',
      displayName: 'Pepper Vines',
      variety: 'Panniyur-1',
      stage: 'vegetative',
      plantingDate: '2023-10-15',
      expectedHarvest: '2024-06-01',
      health: 'Warning',
      area: '0.5',
      notes: 'Need to check for pest issues',
      soilType: 'red',
      irrigationType: 'drip'
    }
  ]);

  const cropLabels: { [key: string]: string } = {
    'rice': 'Rice (നെൽ)',
    'coconut': 'Coconut (തെങ്ങ്)',
    'pepper': 'Pepper (കുരുമുളക്)',
    'cardamom': 'Cardamom (ഏലം)',
    'banana': 'Banana (വാഴ)',
    'rubber': 'Rubber (റബ്ബർ)',
    'coffee': 'Coffee (കാപ്പി)',
    'tea': 'Tea (ചായ)'
  };

  const stageLabels: { [key: string]: string } = {
    'seedling': 'Seedling (തൈ)',
    'vegetative': 'Vegetative (വളർച്ച)',
    'flowering': 'Flowering (പുഷ്പിക്കൽ)',
    'fruiting': 'Fruiting (കായ്ക്കൽ)',
    'maturity': 'Maturity (പാകൽ)',
    'harvest': 'Harvest Ready (വിളവെടുപ്പ്)'
  };

  const handleAddCrop = (cropData: CropData) => {
    const newCrop: Crop = {
      id: Date.now().toString(),
      ...cropData,
      displayName: `${cropLabels[cropData.name]} - ${cropData.variety}`,
      health: 'Healthy',
      expectedHarvest: calculateExpectedHarvest(cropData.name, cropData.plantingDate)
    };
    
    setCrops(prev => [...prev, newCrop]);
  };

  const calculateExpectedHarvest = (cropType: string, plantingDate: string): string => {
    if (!plantingDate) return 'TBD';
    
    const planting = new Date(plantingDate);
    const harvestPeriods: { [key: string]: number } = {
      'rice': 120, // days
      'pepper': 240,
      'cardamom': 730,
      'banana': 365,
      'coffee': 1095,
      'tea': 1095
    };
    
    if (cropType === 'coconut' || cropType === 'rubber') return 'Continuous';
    
    const daysToAdd = harvestPeriods[cropType] || 120;
    const harvestDate = new Date(planting.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    
    return harvestDate.toLocaleDateString();
  };

  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case 'Healthy': return 'default';
      case 'Warning': return 'secondary';
      case 'Critical': return 'destructive';
      default: return 'default';
    }
  };

  const getHealthBadgeClass = (health: string) => {
    switch (health) {
      case 'Healthy': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Warning': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Critical': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-green-100 text-green-700 hover:bg-green-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-green-800 mb-2">My Crops Management</h1>
            <p className="text-gray-600">Track and manage your crops efficiently</p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Crop</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Crops</p>
                  <p className="text-xl text-green-700">{crops.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Area</p>
                  <p className="text-xl text-blue-700">
                    {crops.reduce((sum, crop) => sum + parseFloat(crop.area || '0'), 0).toFixed(1)} acres
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm text-gray-600">Healthy Crops</p>
                  <p className="text-xl text-green-700">
                    {crops.filter(crop => crop.health === 'Healthy').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Ready to Harvest</p>
                  <p className="text-xl text-purple-700">
                    {crops.filter(crop => crop.stage === 'harvest' || crop.stage === 'maturity').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <Card key={crop.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-green-700 mb-1">
                      {crop.displayName || cropLabels[crop.name]}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{crop.variety}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setSelectedCrop(crop);
                        setShowDetailsModal(true);
                      }}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Edit Crop
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove Crop
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Stage:</span>
                    <Badge variant="outline" className="text-xs">
                      {stageLabels[crop.stage] || crop.stage}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Area:</span>
                    <span className="text-sm">{crop.area} acres</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Planted:</span>
                    <span className="text-sm">
                      {crop.plantingDate ? new Date(crop.plantingDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expected Harvest:</span>
                    <span className="text-sm">{crop.expectedHarvest}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Health:</span>
                    <Badge className={getHealthBadgeClass(crop.health)}>
                      {crop.health}
                    </Badge>
                  </div>
                  
                  {crop.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600">{crop.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {crops.length === 0 && (
          <div className="text-center py-12">
            <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No crops added yet</h3>
            <p className="text-gray-500 mb-4">Start tracking your crops by adding your first crop</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Crop
            </Button>
          </div>
        )}
      </div>

      {/* Add Crop Modal */}
      <AddCropModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCrop}
      />

      {/* Crop Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCrop?.displayName || selectedCrop?.name} Details
            </DialogTitle>
            <DialogDescription>
              Complete information about your crop
            </DialogDescription>
          </DialogHeader>
          {selectedCrop && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Crop Type</h4>
                    <p className="text-sm">{cropLabels[selectedCrop.name] || selectedCrop.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Variety</h4>
                    <p className="text-sm">{selectedCrop.variety}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Current Stage</h4>
                    <Badge variant="outline" className="text-xs">
                      {stageLabels[selectedCrop.stage] || selectedCrop.stage}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Health Status</h4>
                    <Badge className={getHealthBadgeClass(selectedCrop.health)}>
                      {selectedCrop.health}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Area</h4>
                    <p className="text-sm">{selectedCrop.area} acres</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Planting Date</h4>
                    <p className="text-sm">
                      {selectedCrop.plantingDate ? new Date(selectedCrop.plantingDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Expected Harvest</h4>
                    <p className="text-sm">{selectedCrop.expectedHarvest}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Soil Type</h4>
                    <p className="text-sm">{selectedCrop.soilType}</p>
                  </div>
                </div>
              </div>

              {/* Irrigation & Notes */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Irrigation Type</h4>
                  <p className="text-sm">{selectedCrop.irrigationType}</p>
                </div>
                
                {selectedCrop.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedCrop.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  onClick={() => setShowDetailsModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    // Handle edit functionality
                    console.log('Edit crop:', selectedCrop);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Edit Crop
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};