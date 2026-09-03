import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from './LanguageContext';
import { Eye, EyeOff, User, Phone, MapPin, Briefcase } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    farmSize: '',
    primaryCrops: ''
  });

  const texts = {
    en: {
      login: 'Login',
      signup: 'Sign Up',
      welcome: 'Welcome Back',
      createAccount: 'Create Account',
      loginDesc: 'Sign in to your Krishi Sakhi account',
      signupDesc: 'Join thousands of farmers using Krishi Sakhi',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      location: 'Location (Village/District)',
      farmSize: 'Farm Size (Acres)',
      primaryCrops: 'Primary Crops',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      forgotPassword: 'Forgot Password?',
      alreadyAccount: 'Already have an account?',
      noAccount: 'Don\'t have an account?',
      switchToLogin: 'Sign in here',
      switchToSignup: 'Sign up here',
      namePlaceholder: 'Enter your full name',
      phonePlaceholder: '+91 XXXXX XXXXX',
      emailPlaceholder: 'your.email@example.com',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordPlaceholder: 'Confirm your password',
      locationPlaceholder: 'e.g., Kottayam, Kerala',
      farmSizePlaceholder: 'e.g., 2.5',
      primaryCropsPlaceholder: 'e.g., Rice, Coconut, Spices'
    },
    ml: {
      login: 'ലോഗിൻ',
      signup: 'സൈൻ അപ്പ്',
      welcome: 'തിരിച്ചു വരവ്',
      createAccount: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      loginDesc: 'നിങ്ങളുടെ കൃഷി സഖി അക്കൗണ്ടിലേക്ക് സൈൻ ഇൻ ചെയ്യുക',
      signupDesc: 'കൃഷി സഖി ഉപയോഗിക്കുന്ന ആയിരക്കണക്കിന് കർഷകരിൽ ചേരുക',
      name: 'പൂർണ്ണ നാമം',
      phone: 'ഫോൺ നമ്പർ',
      email: 'ഇമെയിൽ വിലാസം',
      password: 'പാസ്സ്‌വേഡ്',
      confirmPassword: 'പാസ്സ്‌വേഡ് സ്ഥിരീകരിക്കുക',
      location: 'സ്ഥലം (ഗ്രാമം/ജില്ല)',
      farmSize: 'കൃഷിയിടത്തിന്റെ വലുപ്പം (ഏക്കർ)',
      primaryCrops: 'പ്രധാന വിളകൾ',
      loginButton: 'സൈൻ ഇൻ',
      signupButton: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
      forgotPassword: 'പാസ്സ്‌വേഡ് മറന്നോ?',
      alreadyAccount: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
      noAccount: 'അക്കൗണ്ട് ഇല്ലേ?',
      switchToLogin: 'ഇവിടെ സൈൻ ഇൻ ചെയ്യുക',
      switchToSignup: 'ഇവിടെ സൈൻ അപ്പ് ചെയ്യുക',
      namePlaceholder: 'നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക',
      phonePlaceholder: '+91 XXXXX XXXXX',
      emailPlaceholder: 'your.email@example.com',
      passwordPlaceholder: 'നിങ്ങളുടെ പാസ്സ്‌വേഡ് നൽകുക',
      confirmPasswordPlaceholder: 'നിങ്ങളുടെ പാസ്സ്‌വേഡ് സ്ഥിരീകരിക്കുക',
      locationPlaceholder: 'ഉദാ: കോട്ടയം, കേരളം',
      farmSizePlaceholder: 'ഉദാ: 2.5',
      primaryCropsPlaceholder: 'ഉദാ: നെല്ല്, തെങ്ങ്, സുഗന്ധവ്യഞ്ജനങ്ങൾ'
    }
  };

  const t = texts[language] || texts.en;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (type: 'login' | 'signup') => {
    // Simulate successful login/signup
    const userData = {
      name: formData.name || 'Ramu Kumar',
      phone: formData.phone || '+91 9876543210',
      email: formData.email || 'ramu.kumar@example.com',
      location: formData.location || 'Kottayam, Kerala',
      farmSize: formData.farmSize || '3.5',
      primaryCrops: formData.primaryCrops || 'Rice, Coconut, Spices',
      loginTime: new Date().toISOString()
    };
    
    onLogin(userData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-green-700">
            🌾 Krishi Sakhi
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {t.loginDesc}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t.login}</TabsTrigger>
            <TabsTrigger value="signup">{t.signup}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t.welcome}</CardTitle>
                <CardDescription className="text-center">{t.loginDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-phone">{t.phone}</Label>
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">{t.password}</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.passwordPlaceholder}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSubmit('login')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t.loginButton}
                </Button>
                
                <div className="text-center">
                  <button className="text-sm text-blue-600 hover:underline">
                    {t.forgotPassword}
                  </button>
                </div>
                
                <div className="text-center text-sm">
                  {t.noAccount}{' '}
                  <button 
                    onClick={() => setActiveTab('signup')}
                    className="text-blue-600 hover:underline"
                  >
                    {t.switchToSignup}
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t.createAccount}</CardTitle>
                <CardDescription className="text-center">{t.signupDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t.name}</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">{t.phone}</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t.email}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-location">{t.location}</Label>
                  <Input
                    id="signup-location"
                    type="text"
                    placeholder={t.locationPlaceholder}
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-farmsize">{t.farmSize}</Label>
                  <Input
                    id="signup-farmsize"
                    type="number"
                    step="0.1"
                    placeholder={t.farmSizePlaceholder}
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-crops">{t.primaryCrops}</Label>
                  <Input
                    id="signup-crops"
                    type="text"
                    placeholder={t.primaryCropsPlaceholder}
                    value={formData.primaryCrops}
                    onChange={(e) => handleInputChange('primaryCrops', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t.password}</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.passwordPlaceholder}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSubmit('signup')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t.signupButton}
                </Button>
                
                <div className="text-center text-sm">
                  {t.alreadyAccount}{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:underline"
                  >
                    {t.switchToLogin}
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}