import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Sprout, Calendar, MapPin } from 'lucide-react';

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

interface AddCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CropData) => void;
}

export const AddCropModal: React.FC<AddCropModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CropData>({
    name: '',
    variety: '',
    area: '',
    plantingDate: '',
    stage: '',
    notes: '',
    soilType: '',
    irrigationType: ''
  });

  const handleInputChange = (field: keyof CropData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (formData.name && formData.variety && formData.area) {
      onSave(formData);
      setFormData({
        name: '',
        variety: '',
        area: '',
        plantingDate: '',
        stage: '',
        notes: '',
        soilType: '',
        irrigationType: ''
      });
      onClose();
    }
  };

  const cropOptions = [
    { value: 'rice', label: 'Rice (നെൽ)', varieties: ['Jyothi', 'Aiswarya', 'Uma', 'Ponni'] },
    { value: 'coconut', label: 'Coconut (തെങ്ങ്)', varieties: ['Chandra Laksha', 'Kera Ganga', 'Kera Sree', 'WCT'] },
    { value: 'pepper', label: 'Pepper (കുരുമുളക്)', varieties: ['Panniyur-1', 'Panniyur-2', 'Karimunda', 'Balankotta'] },
    { value: 'cardamom', label: 'Cardamom (ഏലം)', varieties: ['Malabar', 'Mysore', 'Vazhukka'] },
    { value: 'banana', label: 'Banana (വാഴ)', varieties: ['Nendran', 'Robusta', 'Red Banana', 'Poovan'] },
    { value: 'rubber', label: 'Rubber (റബ്ബർ)', varieties: ['RRII 105', 'RRII 118', 'GT 1'] },
    { value: 'coffee', label: 'Coffee (കാപ്പി)', varieties: ['Arabica', 'Robusta'] },
    { value: 'tea', label: 'Tea (ചായ)', varieties: ['Assam', 'China', 'Hybrid'] }
  ];

  const selectedCrop = cropOptions.find(crop => crop.value === formData.name);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-green-600" />
            <span>{t('addcrop.title')}</span>
          </DialogTitle>
          <DialogDescription>
            {t('addcrop.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Crop Name */}
          <div>
            <Label htmlFor="cropName">{t('addcrop.name')}</Label>
            <Select 
              value={formData.name} 
              onValueChange={(value) => {
                handleInputChange('name', value);
                handleInputChange('variety', ''); // Reset variety when crop changes
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                {cropOptions.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Variety */}
          {selectedCrop && (
            <div>
              <Label htmlFor="variety">{t('addcrop.variety')}</Label>
              <Select 
                value={formData.variety} 
                onValueChange={(value) => handleInputChange('variety', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Variety" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCrop.varieties.map((variety) => (
                    <SelectItem key={variety} value={variety}>
                      {variety}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Area */}
          <div>
            <Label htmlFor="area">{t('addcrop.area')} ({t('common.acres')})</Label>
            <Input
              id="area"
              type="number"
              step="0.1"
              value={formData.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              placeholder="1.5"
            />
          </div>

          {/* Planting Date */}
          <div>
            <Label htmlFor="plantingDate">{t('addcrop.plantingdate')}</Label>
            <Input
              id="plantingDate"
              type="date"
              value={formData.plantingDate}
              onChange={(e) => handleInputChange('plantingDate', e.target.value)}
            />
          </div>

          {/* Growth Stage */}
          <div>
            <Label htmlFor="stage">{t('addcrop.stage')}</Label>
            <Select 
              value={formData.stage} 
              onValueChange={(value) => handleInputChange('stage', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Growth Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seedling">Seedling (തൈ)</SelectItem>
                <SelectItem value="vegetative">Vegetative (വളർച്ച)</SelectItem>
                <SelectItem value="flowering">Flowering (പുഷ്പിക്കൽ)</SelectItem>
                <SelectItem value="fruiting">Fruiting (കായ്ക്കൽ)</SelectItem>
                <SelectItem value="maturity">Maturity (പാകൽ)</SelectItem>
                <SelectItem value="harvest">Harvest Ready (വിളവെടുപ്പ്)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Soil Type */}
          <div>
            <Label htmlFor="soilType">{t('common.soiltype')}</Label>
            <Select 
              value={formData.soilType} 
              onValueChange={(value) => handleInputChange('soilType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Soil Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay (കളിമണ്ണ്)</SelectItem>
                <SelectItem value="loam">Loam (കളിമൺ മിശ്രിതം)</SelectItem>
                <SelectItem value="sandy">Sandy (മണൽ)</SelectItem>
                <SelectItem value="red">Red Soil (ചുവന്ന മണ്ണ്)</SelectItem>
                <SelectItem value="black">Black Soil (കറുത്ത മണ്ണ്)</SelectItem>
                <SelectItem value="laterite">Laterite (ലാറ്ററൈറ്റ്)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Irrigation Type */}
          <div>
            <Label htmlFor="irrigationType">Irrigation Method</Label>
            <Select 
              value={formData.irrigationType} 
              onValueChange={(value) => handleInputChange('irrigationType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Irrigation Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drip">Drip Irrigation (ഡ്രിപ്പ്)</SelectItem>
                <SelectItem value="sprinkler">Sprinkler (സ്പ്രിങ്കിളർ)</SelectItem>
                <SelectItem value="flood">Flood Irrigation (വെള്ളപ്പൊക്കം)</SelectItem>
                <SelectItem value="rainfed">Rain-fed (മഴയെ ആശ്രയിച്ച്)</SelectItem>
                <SelectItem value="manual">Manual Watering (കൈകൊണ്ട്)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any specific notes about this crop..."
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            {t('profile.cancel')}
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.name || !formData.variety || !formData.area}
          >
            {t('addcrop.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};