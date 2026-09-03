import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Check, 
  Trash2,
  CheckCircle,
  Award
} from 'lucide-react';

interface AnimalListing {
  id: string;
  category: 'cow' | 'goat' | 'hen' | 'chicken' | 'rooster' | 'other';
  breed: string;
  age: string;
  weight: string;
  quantity: number;
  price: number;
  location: string;
  description: string;
  imageUrl: string;
  sellerName: string;
  sellerPhone: string;
  isVaccinated: boolean;
  status: 'active' | 'sold';
  isOwnListing?: boolean;
  tags?: string[];
  milkYield?: string;
}

const scrollbarHideStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const PoultrySales: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'browse' | 'my-listings'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyVaccinated, setOnlyVaccinated] = useState<boolean>(false);
  
  // Image error state tracker
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalListing | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Toast notification simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Sample listings in English
  const [listings, setListings] = useState<AnimalListing[]>([
    {
      id: '1',
      category: 'cow',
      breed: 'Gir Cow (Pure Breed)',
      age: '3 years',
      weight: '380 kg',
      quantity: 1,
      price: 65000,
      location: 'Kottayam, Kerala',
      description: 'Excellent milking cow. Giving 14 liters of milk per day. Very gentle behavior, completely vaccinated, regular checkups done. Calf is 2 months old.',
      imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      sellerName: 'Rajan Nair',
      sellerPhone: '+91 9446123456',
      isVaccinated: true,
      status: 'active',
      isOwnListing: true,
      tags: ['High Yield', 'Vaccinated', 'Includes Calf'],
      milkYield: '14 L/day'
    },
    {
      id: '2',
      category: 'goat',
      breed: 'Malabari Goat (Female)',
      age: '1.5 years',
      weight: '32 kg',
      quantity: 1,
      price: 12500,
      location: 'Alappuzha, Kerala',
      description: 'Healthy female Malabari goat. Suitable for breeding. Giving high milk yield for kids. Fed on organic green fodder.',
      imageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80',
      sellerName: 'Sunny Mathew',
      sellerPhone: '+91 9845231456',
      isVaccinated: true,
      status: 'active',
      tags: ['Breeding Ready', 'Organic Feed']
    },
    {
      id: '3',
      category: 'rooster',
      breed: 'Kadaknath Rooster',
      age: '8 months',
      weight: '2.4 kg',
      quantity: 2,
      price: 1200,
      location: 'Kottayam, Kerala',
      description: 'Pure black Kadaknath roosters. Highly energetic, excellent health condition, fed organic grains, high medicinal value.',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      sellerName: 'Rajan Nair',
      sellerPhone: '+91 9446123456',
      isVaccinated: true,
      status: 'active',
      isOwnListing: true,
      tags: ['Medicinal Value', 'Pure Breed']
    },
    {
      id: '4',
      category: 'hen',
      breed: 'Gramapriya Egg-laying Hens',
      age: '6 months',
      weight: '1.6 kg',
      quantity: 10,
      price: 380,
      location: 'Pathanamthitta, Kerala',
      description: 'High egg-laying capacity hens (Gramapriya breed). Laying 4-5 eggs per week. Sold individually or in batches. Fully vaccinated.',
      imageUrl: 'https://images.unsplash.com/photo-1569254994521-ddb5a790f488?auto=format&fit=crop&w=600&q=80',
      sellerName: 'Mini Joseph',
      sellerPhone: '+91 9447891234',
      isVaccinated: true,
      status: 'active',
      tags: ['High Laying', 'Free Range']
    },
    {
      id: '5',
      category: 'chicken',
      breed: 'Broiler Chicks (2 Weeks Old)',
      age: '14 days',
      weight: '180 g each',
      quantity: 100,
      price: 85,
      location: 'Kozhikode, Kerala',
      description: 'Healthy commercial broiler chicks. First stage vaccination completed. Ready for grower feed. Available in bulk quantity.',
      imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=600&q=80',
      sellerName: 'Binu Thomas',
      sellerPhone: '+91 9544123987',
      isVaccinated: true,
      status: 'active',
      tags: ['Bulk Available', 'First Vaccine Done']
    },
    {
      id: '6',
      category: 'cow',
      breed: 'HF Cross Dairy Cow',
      age: '4 years',
      weight: '430 kg',
      quantity: 1,
      price: 78000,
      location: 'Ernakulam, Kerala',
      description: 'Holstein Friesian (HF) cross breed. Second lactation, currently giving 20 liters of milk daily. Machine milking trained.',
      imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
      sellerName: 'Devadas K.',
      sellerPhone: '+91 9446543210',
      isVaccinated: true,
      status: 'active',
      tags: ['20L/Day', 'Machine Milked']
    },
    {
      id: '7',
      category: 'goat',
      breed: 'Jamunapari Buck (Male Goat)',
      age: '2 years',
      weight: '62 kg',
      quantity: 1,
      price: 24000,
      location: 'Thrissur, Kerala',
      description: 'Pure Jamunapari male goat for breeding. Very tall height and long ears. Clean records, healthy and vaccinated.',
      imageUrl: 'https://images.unsplash.com/photo-1532911557891-d13f6ee7f358?auto=format&fit=crop&w=600&q=80',
      sellerName: 'Prasad V.R.',
      sellerPhone: '+91 9744112233',
      isVaccinated: true,
      status: 'active',
      tags: ['Breeder Buck', 'Heavy Weight']
    }
  ]);

  // Form state for adding animal
  const [newAnimal, setNewAnimal] = useState({
    category: 'cow' as 'cow' | 'goat' | 'hen' | 'chicken' | 'rooster' | 'other',
    breed: '',
    age: '',
    weight: '',
    quantity: '1',
    price: '',
    location: 'Kottayam, Kerala',
    description: '',
    imageUrl: '',
    isVaccinated: true,
    tagsInput: '',
    milkYield: ''
  });

  const categories = [
    { id: 'all', label: 'All Animals', icon: '🐾' },
    { id: 'cow', label: 'Cows', icon: '🐄' },
    { id: 'goat', label: 'Goats', icon: '🐐' },
    { id: 'hen', label: 'Hens', icon: '🐔' },
    { id: 'chicken', label: 'Chicks', icon: '🐥' },
    { id: 'rooster', label: 'Roosters', icon: '🐓' },
    { id: 'other', label: 'Others', icon: '📦' }
  ];

  const categoryFallbackGradients: Record<string, { gradient: string, emoji: string }> = {
    cow: { gradient: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', emoji: '🐄' },
    goat: { gradient: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', emoji: '🐐' },
    rooster: { gradient: 'linear-gradient(135deg, #ffebee, #ffcdd2)', emoji: '🐓' },
    hen: { gradient: 'linear-gradient(135deg, #fffde7, #fff9c4)', emoji: '🐔' },
    chicken: { gradient: 'linear-gradient(135deg, #fef08a, #fde047)', emoji: '🐥' },
    other: { gradient: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)', emoji: '🐾' }
  };

  const handleAddAnimalChange = (field: string, value: any) => {
    setNewAnimal(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveListing = () => {
    if (!newAnimal.breed || !newAnimal.price || !newAnimal.age) {
      showToast('Please fill in required fields: Breed, Age, and Price.');
      return;
    }

    const priceNum = parseFloat(newAnimal.price);
    const qtyNum = parseInt(newAnimal.quantity) || 1;

    const tagsArray = newAnimal.tagsInput 
      ? newAnimal.tagsInput.split(',').map(t => t.trim()) 
      : [];

    if (newAnimal.isVaccinated) {
      tagsArray.push('Vaccinated');
    }

    const listing: AnimalListing = {
      id: Date.now().toString(),
      category: newAnimal.category,
      breed: newAnimal.breed,
      age: newAnimal.age,
      weight: newAnimal.weight || 'N/A',
      quantity: qtyNum,
      price: priceNum,
      location: newAnimal.location,
      description: newAnimal.description || `Healthy ${newAnimal.category} for sale. Contact for more details.`,
      imageUrl: newAnimal.imageUrl,
      sellerName: 'Rajan Nair',
      sellerPhone: '+91 9446123456',
      isVaccinated: newAnimal.isVaccinated,
      status: 'active',
      isOwnListing: true,
      tags: tagsArray,
      milkYield: newAnimal.category === 'cow' && newAnimal.milkYield ? newAnimal.milkYield : undefined
    };

    setListings(prev => [listing, ...prev]);
    setIsAddModalOpen(false);
    showToast('Animal listed for sale successfully!');
    
    // Reset form
    setNewAnimal({
      category: 'cow',
      breed: '',
      age: '',
      weight: '',
      quantity: '1',
      price: '',
      location: 'Kottayam, Kerala',
      description: '',
      imageUrl: '',
      isVaccinated: true,
      tagsInput: '',
      milkYield: ''
    });
  };

  const handleMarkAsSold = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'sold' ? 'active' : 'sold' as const };
      }
      return item;
    }));
    showToast('Listing status updated successfully.');
  };

  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    showToast('Listing deleted.');
  };

  const simulateCall = (seller: string, phone: string) => {
    showToast(`Calling ${seller} at ${phone}...`);
  };

  const simulateWhatsApp = (seller: string, breed: string) => {
    showToast(`Opening WhatsApp chat with ${seller}...`);
  };

  // Filter listings
  const filteredListings = listings.filter(item => {
    if (activeTab === 'my-listings' && !item.isOwnListing) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (onlyVaccinated && !item.isVaccinated) return false;

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchBreed = item.breed.toLowerCase().includes(query);
      const matchLocation = item.location.toLowerCase().includes(query);
      const matchCategory = item.category.toLowerCase().includes(query);
      return matchBreed || matchLocation || matchCategory;
    }

    return true;
  });

  // Calculate statistics
  const totalListed = listings.filter(l => l.status === 'active').length;
  const totalPoultry = listings.filter(l => l.status === 'active' && ['hen', 'chicken', 'rooster'].includes(l.category)).reduce((sum, item) => sum + item.quantity, 0);
  const totalCattle = listings.filter(l => l.status === 'active' && ['cow', 'goat'].includes(l.category)).reduce((sum, item) => sum + item.quantity, 0);
  const totalSold = listings.filter(l => l.status === 'sold').length;

  const renderImageFallback = (item: AnimalListing, extraClass: string = '') => {
    const fallback = categoryFallbackGradients[item.category] || categoryFallbackGradients.other;
    const isErr = imageErrors[item.id] || !item.imageUrl;

    if (isErr) {
      return (
        <div 
          className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${extraClass}`}
          style={{ background: fallback.gradient }}
        >
          <span className="text-6xl filter drop-shadow-sm">{fallback.emoji}</span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2 bg-white/70 px-2 py-0.5 rounded-full">
            {item.category}
          </span>
        </div>
      );
    }

    return (
      <img
        src={item.imageUrl}
        alt={item.breed}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${extraClass}`}
        onError={() => handleImageError(item.id)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      
      {/* Toast Alert Simulation */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-green-300" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="text-white p-8 rounded-b-3xl shadow-md"
        style={{ background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <ShoppingBag className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-200 text-sm font-bold uppercase tracking-wider">Krishi Sakhi Marketplace</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Poultry & Livestock Sales</h1>
            <p className="text-green-100 mt-2 max-w-xl text-sm md:text-base">
              Buy and sell cows, goats, chickens, hens, roosters, and other livestock directly with nearby farmers. No middlemen, zero commission.
            </p>
          </div>
          <div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center space-x-2 border-0"
              style={{ backgroundColor: '#d97706' }}
            >
              <Plus className="w-5 h-5" />
              <span>List Animal for Sale</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-md border-0 bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] transition-transform">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Active Listings</p>
                <p className="text-2xl font-bold text-green-700 mt-1">{totalListed}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] transition-transform">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Poultry (Birds)</p>
                <p className="text-2xl font-bold text-amber-700 mt-1">{totalPoultry}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <span className="text-lg">🐓</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] transition-transform">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Dairy & Livestock</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">{totalCattle}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-lg">🐄</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] transition-transform">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Sold Items</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">{totalSold}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Navigation Tabs and Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => { setActiveTab('browse'); setSelectedCategory('all'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'browse' 
                  ? 'bg-white text-green-800 shadow-sm' 
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Browse Animals
            </button>
            <button
              onClick={() => { setActiveTab('my-listings'); setSelectedCategory('all'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'my-listings' 
                  ? 'bg-white text-green-800 shadow-sm' 
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              My Listings
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-xl md:justify-end items-center">
            {/* Search Bar */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <Input
                type="text"
                placeholder="Search breed, location, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-xl"
              />
            </div>
            
            {/* Vaccinated Only Toggle */}
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer select-none border border-gray-200 rounded-xl px-3 h-10 bg-gray-50/50 hover:bg-gray-50 shrink-0 w-full sm:w-auto justify-center">
              <input
                type="checkbox"
                checked={onlyVaccinated}
                onChange={() => setOnlyVaccinated(!onlyVaccinated)}
                className="w-4 h-4 accent-green-600 rounded cursor-pointer"
              />
              <span>Vaccinated Only</span>
            </label>
          </div>
        </div>

        {/* Category Carousel / Buttons */}
        {activeTab === 'browse' && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-sm border ${
                  selectedCategory === cat.id
                    ? 'bg-green-700 border-green-700 text-white'
                    : 'bg-white hover:bg-green-50 border-gray-200 text-gray-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <Card 
              key={item.id} 
              className={`overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col group relative ${
                item.status === 'sold' ? 'opacity-75' : ''
              }`}
            >
              {/* Sold Overlay Ribbon */}
              {item.status === 'sold' && (
                <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  Sold Out
                </div>
              )}

              {/* Animal Image / Fallback */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {renderImageFallback(item)}
                
                {/* Animal category badge on image bottom-left */}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-black/60 text-white font-medium backdrop-blur-sm border-0 capitalize">
                    {item.category}
                  </Badge>
                </div>

                {/* Price tag */}
                <div className="absolute top-3 left-3 bg-green-600 text-white font-bold text-sm px-3 py-1 rounded-lg shadow-sm">
                  ₹{item.price.toLocaleString()}
                  {['hen', 'chicken', 'rooster'].includes(item.category) && item.quantity > 1 && (
                    <span className="text-[10px] font-normal"> /unit</span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <CardContent className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-700 transition-colors">
                      {item.breed}
                    </h3>
                  </div>

                  {/* Spec Info Tags */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400">Age:</span>
                      <span className="font-medium text-gray-800">{item.age}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400">Weight:</span>
                      <span className="font-medium text-gray-800">{item.weight}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400">Qty:</span>
                      <span className="font-medium text-gray-800">{item.quantity} units</span>
                    </div>
                    {item.milkYield && (
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-400">Milk:</span>
                        <span className="font-semibold text-green-700">{item.milkYield}</span>
                      </div>
                    )}
                  </div>

                  {/* Location & Seller */}
                  <div className="flex items-center text-xs text-gray-500 mb-3 space-x-1 bg-gray-50 p-2 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>

                  {/* Mini Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags?.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-[10px] py-0 px-2 bg-green-50 text-green-800 border-0 hover:bg-green-50">
                        {tag}
                      </Badge>
                    ))}
                    {item.isVaccinated && (
                      <Badge className="text-[10px] py-0 px-2 bg-blue-50 text-blue-800 border-0 hover:bg-blue-50 flex items-center space-x-0.5">
                        <Check className="w-2.5 h-2.5" />
                        <span>Vaccinated</span>
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {item.isOwnListing ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleMarkAsSold(item.id)}
                        variant="outline"
                        size="sm"
                        className={`flex-1 text-xs rounded-xl ${
                          item.status === 'sold' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {item.status === 'sold' ? 'Mark Active' : 'Mark Sold'}
                      </Button>
                      <Button
                        onClick={() => handleDeleteListing(item.id)}
                        variant="outline"
                        size="sm"
                        className="rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedAnimal(item);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs h-9 border-0"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => simulateCall(item.sellerName, item.sellerPhone)}
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9 hover:bg-green-50 hover:border-green-300"
                        disabled={item.status === 'sold'}
                      >
                        <Phone className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty States */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm mt-6">
            <div className="w-20 h-20 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No matching animal listings found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
              Try adjusting your search query, selecting another category, or list a new animal for sale.
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
              List an Animal for Sale
            </Button>
          </div>
        )}
      </div>

      {/* Add Listing Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
              <ShoppingBag className="w-6 h-6 text-green-600" />
              <span>List Animal for Sale</span>
            </DialogTitle>
            <DialogDescription>
              Submit details of your poultry or livestock to list it on the local Krishi Sakhi marketplace.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-3">
            {/* Category */}
            <div>
              <Label htmlFor="animalCategory" className="font-semibold text-gray-700">Animal Category *</Label>
              <Select 
                value={newAnimal.category} 
                onValueChange={(val) => handleAddAnimalChange('category', val)}
              >
                <SelectTrigger className="rounded-xl mt-1.5">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cow">Cow</SelectItem>
                  <SelectItem value="goat">Goat</SelectItem>
                  <SelectItem value="hen">Hen</SelectItem>
                  <SelectItem value="chicken">Chicks</SelectItem>
                  <SelectItem value="rooster">Rooster</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Breed / Name */}
            <div>
              <Label htmlFor="breed" className="font-semibold text-gray-700">Breed / Title *</Label>
              <Input
                id="breed"
                placeholder="e.g., Jamunapari Goat, Gir Cow, Kadaknath Hen"
                value={newAnimal.breed}
                onChange={(e) => handleAddAnimalChange('breed', e.target.value)}
                className="rounded-xl mt-1.5"
              />
            </div>

            {/* Age & Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="font-semibold text-gray-700">Age *</Label>
                <Input
                  id="age"
                  placeholder="e.g., 2 years, 6 months"
                  value={newAnimal.age}
                  onChange={(e) => handleAddAnimalChange('age', e.target.value)}
                  className="rounded-xl mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="weight" className="font-semibold text-gray-700">Weight</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 45 kg, 2 kg"
                  value={newAnimal.weight}
                  onChange={(e) => handleAddAnimalChange('weight', e.target.value)}
                  className="rounded-xl mt-1.5"
                />
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity" className="font-semibold text-gray-700">Quantity (Units)</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newAnimal.quantity}
                  onChange={(e) => handleAddAnimalChange('quantity', e.target.value)}
                  className="rounded-xl mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="price" className="font-semibold text-gray-700">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 15000"
                  value={newAnimal.price}
                  onChange={(e) => handleAddAnimalChange('price', e.target.value)}
                  className="rounded-xl mt-1.5"
                />
              </div>
            </div>

            {/* Optional Milk Yield for Cows */}
            {newAnimal.category === 'cow' && (
              <div>
                <Label htmlFor="milkYield" className="font-semibold text-gray-700">Daily Milk Yield (Optional)</Label>
                <Input
                  id="milkYield"
                  placeholder="e.g., 12 liters/day"
                  value={newAnimal.milkYield}
                  onChange={(e) => handleAddAnimalChange('milkYield', e.target.value)}
                  className="rounded-xl mt-1.5"
                />
              </div>
            )}

            {/* Location */}
            <div>
              <Label htmlFor="location" className="font-semibold text-gray-700">Location (Village / Town) *</Label>
              <Input
                id="location"
                placeholder="e.g., Kottayam, Kerala"
                value={newAnimal.location}
                onChange={(e) => handleAddAnimalChange('location', e.target.value)}
                className="rounded-xl mt-1.5"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="font-semibold text-gray-700">Health / Breeding Notes</Label>
              <Textarea
                id="description"
                placeholder="Describe animal health, vaccination record, feed habits, milk yields, etc..."
                value={newAnimal.description}
                onChange={(e) => handleAddAnimalChange('description', e.target.value)}
                className="rounded-xl mt-1.5"
                rows={3}
              />
            </div>

            {/* Custom tags */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <div>
                <Label htmlFor="tagsInput" className="font-semibold text-gray-700">Tags (comma separated)</Label>
                <Input
                  id="tagsInput"
                  placeholder="e.g., High Yield, Breeding Ready, Organic Feed"
                  value={newAnimal.tagsInput}
                  onChange={(e) => handleAddAnimalChange('tagsInput', e.target.value)}
                  className="rounded-xl mt-1.5"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="isVaccinated"
                  checked={newAnimal.isVaccinated}
                  onChange={(e) => handleAddAnimalChange('isVaccinated', e.target.checked)}
                  className="w-4 h-4 accent-green-600 rounded"
                />
                <Label htmlFor="isVaccinated" className="text-sm text-gray-700 font-medium cursor-pointer">Animal is Fully Vaccinated</Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-100 mt-6">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant="outline"
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveListing}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl border-0"
            >
              Save Listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Animal Details Dialog */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-0 overflow-hidden">
          {selectedAnimal && (
            <div>
              {/* Header Image overlay */}
              <div className="relative h-64 bg-gray-100">
                {renderImageFallback(selectedAnimal)}
                {selectedAnimal.status === 'sold' && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-red-600 text-white text-sm font-bold uppercase tracking-wider px-6 py-2 rounded-xl shadow-lg">
                      Sold Out
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-green-600 text-white font-extrabold text-base px-4 py-1.5 rounded-xl shadow-md">
                  ₹{selectedAnimal.price.toLocaleString()}
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/60 text-white font-semibold backdrop-blur-sm border-0 uppercase tracking-wider text-xs">
                    {selectedAnimal.category}
                  </Badge>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedAnimal.breed}</h2>
                  
                  {/* Location & Seller badge */}
                  <div className="flex items-center text-sm text-gray-500 mt-2 space-x-1.5">
                    <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="font-medium text-gray-700">{selectedAnimal.location}</span>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-green-50/50 rounded-2xl border border-green-50 mb-6">
                  <div className="text-center md:border-r border-green-100/50">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Age</span>
                    <span className="font-semibold text-gray-800 text-sm">{selectedAnimal.age}</span>
                  </div>
                  <div className="text-center md:border-r border-green-100/50">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Weight</span>
                    <span className="font-semibold text-gray-800 text-sm">{selectedAnimal.weight}</span>
                  </div>
                  <div className="text-center md:border-r border-green-100/50">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Quantity</span>
                    <span className="font-semibold text-gray-800 text-sm">{selectedAnimal.quantity} units</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Vaccinated</span>
                    <span className="font-semibold text-gray-800 text-sm flex items-center justify-center space-x-1">
                      {selectedAnimal.isVaccinated ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700">Yes</span>
                        </>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Tags block */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedAnimal.tags?.map((tag, idx) => (
                    <Badge key={idx} className="bg-green-50 text-green-800 border-0 font-medium py-1 px-3 rounded-lg hover:bg-green-50">
                      {tag}
                    </Badge>
                  ))}
                  {selectedAnimal.milkYield && (
                    <Badge className="bg-amber-50 text-amber-800 border-0 font-semibold py-1 px-3 rounded-lg hover:bg-amber-50 flex items-center space-x-1">
                      <span>🥛</span>
                      <span>Daily Milk: {selectedAnimal.milkYield}</span>
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 text-sm uppercase mb-2 tracking-wider">Health & Feed Description</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {selectedAnimal.description}
                  </p>
                </div>

                {/* Seller Profile Card */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50/50 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                      {selectedAnimal.sellerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Seller / Owner</p>
                      <p className="text-sm font-bold text-gray-800">{selectedAnimal.sellerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-semibold uppercase font-mono">Verified Member</p>
                    <span className="text-green-700 font-semibold text-xs flex items-center justify-end space-x-0.5 mt-0.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Local Farmer</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Contacts */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Button
                    onClick={() => setShowDetailsModal(false)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    Close
                  </Button>
                  
                  {selectedAnimal.status !== 'sold' && (
                    <>
                      <Button
                        onClick={() => simulateWhatsApp(selectedAnimal.sellerName, selectedAnimal.breed)}
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 rounded-xl flex items-center justify-center space-x-2 border-0"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </Button>
                      
                      <Button
                        onClick={() => simulateCall(selectedAnimal.sellerName, selectedAnimal.sellerPhone)}
                        className="hover:bg-amber-600 text-white flex-1 rounded-xl flex items-center justify-center space-x-2 border-0"
                        style={{ backgroundColor: '#d97706' }}
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Seller</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
