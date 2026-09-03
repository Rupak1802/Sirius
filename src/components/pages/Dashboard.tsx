import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  TrendingUp, 
  Mic, 
  MessageSquare,
  Plus,
  FileText,
  Building2,
  Bell,
  User,
  MapPin,
  Waves,
  Edit3,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Home,
  Sprout,
  Award,
  CreditCard,
  Shield,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DashboardProps {
  userData?: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ userData: loggedInUserData }) => {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const weatherData = [
    { day: 'Today', temp: '28°C', condition: 'Sunny', rainfall: '0mm', icon: '☀️' },
    { day: 'Tomorrow', temp: '26°C', condition: 'Light Rain', rainfall: '5mm', icon: '🌦️' },
    { day: 'Day 3', temp: '24°C', condition: 'Cloudy', rainfall: '0mm', icon: '☁️' },
    { day: 'Day 4', temp: '27°C', condition: 'Partly Cloudy', rainfall: '2mm', icon: '⛅' },
  ];

  const marketPrices = [
    { crop: 'Rice', price: '₹2,100/quintal', trend: '+5%', color: 'text-green-600' },
    { crop: 'Coconut', price: '₹25/piece', trend: '-2%', color: 'text-red-600' },
    { crop: 'Pepper', price: '₹450/kg', trend: '+8%', color: 'text-green-600' },
    { crop: 'Cardamom', price: '₹1,200/kg', trend: '+3%', color: 'text-green-600' },
  ];

  const myCarps = [
    { 
      name: 'Rice Paddy', 
      stage: 'Flowering', 
      health: 'Healthy', 
      daysToHarvest: 45,
      healthColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Coconut Trees', 
      stage: 'Mature', 
      health: 'Warning', 
      daysToHarvest: 90,
      healthColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      name: 'Pepper Vines', 
      stage: 'Growing', 
      health: 'Healthy', 
      daysToHarvest: 120,
      healthColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
  ];

  // Comprehensive farmer profile data
  const farmerProfile = {
    personal: {
      name: loggedInUserData?.name || 'Rajan Nair',
      age: 45,
      fatherName: 'Gopalan Nair',
      phone: loggedInUserData?.phone || '+91 9446XXXXXX',
      email: loggedInUserData?.email || 'rajan.nair@email.com',
      address: loggedInUserData?.location || 'Thazhathangady, Kottayam, Kerala - 686005',
      aadhaar: '4567 8901 2345',
      pan: 'ABCDE1234F',
      joinDate: loggedInUserData?.loginTime ? new Date(loggedInUserData.loginTime).toISOString().split('T')[0] : '2019-03-15'
    },
    farming: {
      totalLand: loggedInUserData?.farmSize || '2.5',
      landUnit: 'acres',
      soilType: 'Laterite',
      irrigationType: 'Well & Borewell',
      experience: '18',
      experienceUnit: 'years',
      farmingType: 'Mixed Cropping',
      organicCertified: true,
      primaryCrops: loggedInUserData?.primaryCrops 
        ? loggedInUserData.primaryCrops.split(',').map((crop: string) => crop.trim())
        : ['Rice', 'Coconut', 'Pepper', 'Banana'],
      livestock: 'Cows (2), Goats (8)'
    },
    government: {
      rationCard: 'APL - KL05**1234',
      farmerIdCard: 'KL05F0012345',
      pmKisan: {
        registered: true,
        accountNumber: 'XXXX****1234',
        lastBenefit: '₹2,000 (Dec 2024)'
      },
      cropInsurance: {
        enrolled: true,
        policyNumber: 'CI2024KL****5678',
        coverage: '₹50,000'
      },
      schemes: [
        {
          name: 'PM-KISAN',
          status: 'Active',
          amount: '₹6,000/year'
        },
        {
          name: 'Organic Farming',
          status: 'Applied',
          amount: '₹25,000'
        }
      ]
    },
    financial: {
      bankDetails: {
        accountNumber: 'XXXX****5678',
        ifsc: 'SBIN0001234',
        branch: 'SBI Kottayam'
      },
      kccDetails: {
        hasKCC: true,
        limit: '₹1,50,000',
        utilized: '₹45,000',
        validTill: '2025-12-31'
      },
      monthlyIncome: '₹18,000 - ₹25,000',
      annualIncome: '₹2,50,000'
    },
    achievements: [
      {
        title: 'Best Organic Farmer 2023',
        by: 'District Collector'
      },
      {
        title: 'High Yield Achievement',
        by: 'Agriculture Department'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section with Enhanced Profile */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-4 border-green-400">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625110110679-f0a5659e32b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGNyb3BzfGVufDF8fHx8MTc3NTc2NzI0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farmer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl mb-2">{t('common.hello')}, {farmerProfile.personal.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-green-100">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Kottayam, Kerala</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Waves className="w-4 h-4" />
                    <span className="text-sm">{farmerProfile.farming.totalLand} {farmerProfile.farming.landUnit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Sprout className="w-4 h-4" />
                    <span className="text-sm">{farmerProfile.farming.experience} {farmerProfile.farming.experienceUnit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Certified Organic</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFullProfile(!showFullProfile)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {showFullProfile 
                  ? 'Hide Details'
                  : 'View Profile'
                }
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Farmer Profile Section */}
      {showFullProfile && (
        <div className="bg-white border-b-2 border-green-100">
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {/* Personal Information */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg">Personal Information</h3>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Full Name:</span>
                    <span className="text-sm">{farmerProfile.personal.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Age:</span>
                    <span className="text-sm">{farmerProfile.personal.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Father's Name:</span>
                    <span className="text-sm">{farmerProfile.personal.fatherName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Phone:</span>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-green-600" />
                      <span className="text-sm">{farmerProfile.personal.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Email:</span>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-blue-600" />
                      <span className="text-sm text-blue-600">{farmerProfile.personal.email}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Address:</span>
                    <span className="text-sm text-right max-w-[60%]">{farmerProfile.personal.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Aadhaar:</span>
                    <span className="text-sm">{farmerProfile.personal.aadhaar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">PAN:</span>
                    <span className="text-sm">{farmerProfile.personal.pan}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-gray-600 text-sm">Member Since:</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-purple-600" />
                      <span className="text-sm">{new Date(farmerProfile.personal.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Farming Details */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sprout className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg">Farming Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Total Land:</span>
                    <span className="text-sm">{farmerProfile.farming.totalLand} {farmerProfile.farming.landUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Soil Type:</span>
                    <span className="text-sm">{farmerProfile.farming.soilType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Irrigation:</span>
                    <span className="text-sm">{farmerProfile.farming.irrigationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Experience:</span>
                    <span className="text-sm">{farmerProfile.farming.experience} {farmerProfile.farming.experienceUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Farming Type:</span>
                    <span className="text-sm">{farmerProfile.farming.farmingType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Organic Certified:</span>
                    <div className="flex items-center space-x-1">
                      {farmerProfile.farming.organicCertified ? (
                        <Shield className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      )}
                      <span className={`text-sm ${farmerProfile.farming.organicCertified ? 'text-green-600' : 'text-yellow-600'}`}>
                        {farmerProfile.farming.organicCertified 
                          ? 'Yes'
                          : 'Pending'
                        }
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm block mb-2">Primary Crops:</span>
                    <div className="flex flex-wrap gap-1">
                      {farmerProfile.farming.primaryCrops.map((crop, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Livestock:</span>
                    <span className="text-sm">{farmerProfile.farming.livestock}</span>
                  </div>
                </div>
              </Card>

              {/* Government & Financial Details */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg">Government & Finance</h3>
                </div>
                <div className="space-y-4">
                  {/* Government IDs */}
                  <div>
                    <h4 className="text-sm mb-2">Government IDs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ration Card:</span>
                        <span>{farmerProfile.government.rationCard}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Farmer ID:</span>
                        <span>{farmerProfile.government.farmerIdCard}</span>
                      </div>
                    </div>
                  </div>

                  {/* PM-KISAN Details */}
                  <div className="border-t pt-3">
                    <h4 className="text-sm mb-2 flex items-center space-x-1">
                      <Award className="w-3 h-3 text-orange-600" />
                      <span>PM-KISAN</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Benefit:</span>
                        <span>{farmerProfile.government.pmKisan.lastBenefit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="border-t pt-3">
                    <h4 className="text-sm mb-2 flex items-center space-x-1">
                      <CreditCard className="w-3 h-3 text-blue-600" />
                      <span>Bank Details</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account:</span>
                        <span>{farmerProfile.financial.bankDetails.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Branch:</span>
                        <span>{farmerProfile.financial.bankDetails.branch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IFSC:</span>
                        <span>{farmerProfile.financial.bankDetails.ifsc}</span>
                      </div>
                    </div>
                  </div>

                  {/* KCC Details */}
                  <div className="border-t pt-3">
                    <h4 className="text-sm mb-2">KCC Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Limit:</span>
                        <span className="text-green-600">{farmerProfile.financial.kccDetails.limit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utilized:</span>
                        <span>{farmerProfile.financial.kccDetails.utilized}</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Income */}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly Income:</span>
                      <span>{farmerProfile.financial.monthlyIncome}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Achievements & Schemes */}
              <Card className="p-6 lg:col-span-2 xl:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg">Achievements & Schemes</h3>
                </div>
                <div className="space-y-4">
                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm mb-3">Achievements</h4>
                    <div className="space-y-2">
                      {farmerProfile.achievements.map((achievement, index) => (
                        <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          <h5 className="text-sm text-yellow-700 mb-1">{achievement.title}</h5>
                          <p className="text-xs text-yellow-600">{achievement.by}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Schemes */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm mb-3">Active Schemes</h4>
                    <div className="space-y-2">
                      {farmerProfile.government.schemes.map((scheme, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-sm text-blue-700">{scheme.name}</h5>
                              <p className="text-xs text-blue-600">{scheme.amount}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              scheme.status === 'Active' || scheme.status === 'സജീവം'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {scheme.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Weather & Market */}
          <div className="space-y-6">
            {/* Weather Card */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Cloud className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg">{t('dashboard.weather')}</h3>
              </div>
              <div className="space-y-3">
                {weatherData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{day.icon}</span>
                      <div>
                        <p className="text-sm text-gray-600">{day.day}</p>
                        <p className="text-sm">{day.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600">{day.temp}</p>
                      <p className="text-xs text-gray-500">{day.rainfall}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Market Prices */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg">{t('dashboard.market')}</h3>
              </div>
              <div className="space-y-3">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm">{item.crop}</p>
                      <p className="text-xs text-gray-500">{item.price}</p>
                    </div>
                    <span className={`text-sm ${item.color}`}>{item.trend}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Center Content */}
          <div className="space-y-6">
            {/* My Crops */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">{t('dashboard.mycrops')}</h3>
              <div className="space-y-4">
                {myCarps.map((crop, index) => (
                  <div key={index} className={`p-4 rounded-lg ${crop.bgColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm">{crop.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${crop.healthColor} bg-white`}>
                        {t(`common.${crop.health.toLowerCase()}`)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{t('crops.stage')}: {crop.stage}</p>
                    <p className="text-xs text-gray-600">{crop.daysToHarvest} {t('common.days')} to harvest</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center space-x-2 h-12">
                  <Plus className="w-4 h-4" />
                  <span className="text-xs">{t('dashboard.addcrop')}</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 h-12">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs">{t('dashboard.logactivity')}</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 h-12">
                  <Building2 className="w-4 h-4" />
                  <span className="text-xs">{t('dashboard.checkscheme')}</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 h-12">
                  <Bell className="w-4 h-4" />
                  <span className="text-xs">{t('dashboard.setreminder')}</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel - AI Assistants */}
          <div className="space-y-6">
            {/* Voice Assistant */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Mic className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg">{t('dashboard.voiceassistant')}</h3>
              </div>
              <div className="text-center space-y-4">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isListening 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>
                {isListening && (
                  <div className="flex justify-center space-x-1">
                    <div className="w-1 h-4 bg-purple-400 rounded animate-pulse"></div>
                    <div className="w-1 h-6 bg-purple-500 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-8 bg-purple-600 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-6 bg-purple-500 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-1 h-4 bg-purple-400 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                )}
                <p className="text-xs text-gray-600">
                  {isListening ? t('voice.listening') : t('voice.tapmic')}
                </p>
              </div>
            </Card>

            {/* Chat Assistant */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg">{t('dashboard.chatassistant')}</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">{t('ai.rainalert')}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">{t('ai.fertilizer')}</p>
                </div>
                <Button size="sm" className="w-full">
                  Start Chat
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {/* Weather Card */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Cloud className="w-5 h-5 text-blue-600" />
              <h3>{t('dashboard.weather')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {weatherData.slice(0, 4).map((day, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{day.icon}</span>
                    <div>
                      <p className="text-xs text-gray-600">{day.day}</p>
                      <p className="text-sm text-blue-600">{day.temp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* My Crops Mobile */}
          <Card className="p-4">
            <h3 className="mb-3">{t('dashboard.mycrops')}</h3>
            <div className="space-y-3">
              {myCarps.map((crop, index) => (
                <div key={index} className={`p-3 rounded-lg ${crop.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm">{crop.name}</h4>
                      <p className="text-xs text-gray-600">{crop.stage}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${crop.healthColor} bg-white`}>
                      {t(`common.${crop.health.toLowerCase()}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions Mobile */}
          <Card className="p-4">
            <h3 className="mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span className="text-xs">{t('dashboard.addcrop')}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span className="text-xs">{t('dashboard.logactivity')}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs">{t('dashboard.checkscheme')}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Bell className="w-4 h-4" />
                <span className="text-xs">{t('dashboard.setreminder')}</span>
              </Button>
            </div>
          </Card>

          {/* Voice Assistant Mobile */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5 text-purple-600" />
                <span>{t('dashboard.voiceassistant')}</span>
              </div>
              <button
                onClick={() => setIsListening(!isListening)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};