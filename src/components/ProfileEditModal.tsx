import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, MapPin, Phone, Calendar } from 'lucide-react';

interface ProfileData {
  name: string;
  phone: string;
  location: string;
  district: string;
  experience: string;
  landSize: string;
  soilType: string;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profileData,
  onSave
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProfileData>(profileData);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-green-600" />
            <span>{t('profile.edit')}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">{t('profile.name')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="രാജൻ നായർ"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">{t('profile.phone')}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">{t('profile.location')}</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Changanassery"
            />
          </div>

          {/* District */}
          <div>
            <Label htmlFor="district">District</Label>
            <Select 
              value={formData.district} 
              onValueChange={(value) => handleInputChange('district', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kottayam">Kottayam</SelectItem>
                <SelectItem value="alappuzha">Alappuzha</SelectItem>
                <SelectItem value="ernakulam">Ernakulam</SelectItem>
                <SelectItem value="thrissur">Thrissur</SelectItem>
                <SelectItem value="palakkad">Palakkad</SelectItem>
                <SelectItem value="malappuram">Malappuram</SelectItem>
                <SelectItem value="kozhikode">Kozhikode</SelectItem>
                <SelectItem value="wayanad">Wayanad</SelectItem>
                <SelectItem value="kannur">Kannur</SelectItem>
                <SelectItem value="kasaragod">Kasaragod</SelectItem>
                <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                <SelectItem value="kollam">Kollam</SelectItem>
                <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
                <SelectItem value="idukki">Idukki</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="experience">{t('profile.experience')}</Label>
            <Select 
              value={formData.experience} 
              onValueChange={(value) => handleInputChange('experience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-20">11-20 years</SelectItem>
                <SelectItem value="20+">20+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Land Size */}
          <div>
            <Label htmlFor="landSize">{t('common.landsize')}</Label>
            <Input
              id="landSize"
              value={formData.landSize}
              onChange={(e) => handleInputChange('landSize', e.target.value)}
              placeholder="2.5 acres"
            />
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
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            {t('profile.cancel')}
          </Button>
          <Button onClick={handleSave}>
            {t('profile.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};