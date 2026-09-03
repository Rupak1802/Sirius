import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Camera,
  Upload,
  Image,
  AlertTriangle,
  CheckCircle,
  Bug,
  Leaf,
  Zap,
  FileText,
  Download,
  Bell
} from 'lucide-react';

interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatments: string[];
  prevention: string[];
  type: 'disease' | 'pest' | 'nutrient' | 'healthy';
}

export const ImageAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: AnalysisResult[] = [
        {
          diagnosis: 'Leaf Blight Disease',
          confidence: 87,
          severity: 'medium',
          treatments: [
            'Apply fungicide containing Copper Oxychloride',
            'Remove and destroy affected leaves',
            'Improve drainage to reduce moisture',
            'Spray Mancozeb 0.25% solution every 10 days'
          ],
          prevention: [
            'Ensure proper spacing between plants',
            'Avoid overhead irrigation',
            'Apply organic matter to improve soil health',
            'Regular field monitoring'
          ],
          type: 'disease'
        },
        {
          diagnosis: 'Brown Planthopper Infestation',
          confidence: 92,
          severity: 'high',
          treatments: [
            'Spray Imidacloprid 17.8% SL @ 0.5ml/L',
            'Release natural predators like spiders',
            'Apply neem oil spray in early morning',
            'Drain water from field for 3-4 days'
          ],
          prevention: [
            'Use resistant rice varieties',
            'Maintain balanced fertilization',
            'Avoid excessive nitrogen application',
            'Monitor regularly with light traps'
          ],
          type: 'pest'
        },
        {
          diagnosis: 'Nitrogen Deficiency',
          confidence: 78,
          severity: 'medium',
          treatments: [
            'Apply Urea @ 50kg per acre',
            'Use organic fertilizers like compost',
            'Apply green manure',
            'Split application of nitrogen fertilizer'
          ],
          prevention: [
            'Regular soil testing',
            'Balanced fertilization schedule',
            'Use of biofertilizers',
            'Crop rotation with legumes'
          ],
          type: 'nutrient'
        },
        {
          diagnosis: 'Healthy Crop',
          confidence: 95,
          severity: 'low',
          treatments: [
            'Continue current care practices',
            'Monitor regularly for any changes',
            'Maintain optimal water levels',
            'Follow preventive spray schedule'
          ],
          prevention: [
            'Regular monitoring',
            'Balanced nutrition',
            'Proper water management',
            'Good field hygiene'
          ],
          type: 'healthy'
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'disease': return <Leaf className="w-5 h-5" />;
      case 'pest': return <Bug className="w-5 h-5" />;
      case 'nutrient': return <Zap className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">{t('nav.analysis')}</h1>
          <p className="text-gray-600">Upload crop images for AI-powered disease and pest detection</p>
        </div>

        {/* Upload Section */}
        <Card className="p-6 mb-6">
          <div className="text-center">
            {!selectedImage ? (
              <div className="space-y-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                
                <div>
                  <h3 className="text-lg mb-2">Upload Crop Image</h3>
                  <p className="text-gray-600 mb-4">
                    Take a clear photo of leaves, stems, or affected areas for accurate analysis
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      capture="environment"
                    />
                    <Button className="flex items-center space-x-2" asChild>
                      <span>
                        <Camera className="w-4 h-4" />
                        <span>Take Photo</span>
                      </span>
                    </Button>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button variant="outline" className="flex items-center space-x-2" asChild>
                      <span>
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                      </span>
                    </Button>
                  </label>
                </div>
                
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, WebP (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={selectedImage}
                    alt="Uploaded crop"
                    className="max-w-full max-h-64 rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Image className="w-4 h-4" />
                        <span>Analyze Image</span>
                      </>
                    )}
                  </Button>
                  
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button variant="outline" asChild>
                      <span>Change Image</span>
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="p-6 mb-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div>
                <h3 className="text-lg">AI Analysis in Progress</h3>
                <p className="text-gray-600">Analyzing your crop image for diseases, pests, and nutrient deficiencies...</p>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Processing steps:</div>
                <div className="flex justify-center space-x-4 text-xs">
                  <span className="text-green-600">✓ Image uploaded</span>
                  <span className="text-blue-600">⟳ AI analyzing</span>
                  <span className="text-gray-400">○ Generating report</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Diagnosis Card */}
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getSeverityColor(analysisResult.severity)}`}>
                  {getTypeIcon(analysisResult.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl">{analysisResult.diagnosis}</h3>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(analysisResult.severity)}`}>
                        {analysisResult.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {analysisResult.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisResult.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Treatment Recommendations */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-green-600" />
                <h3 className="text-lg">Treatment Recommendations</h3>
              </div>
              
              <div className="space-y-3">
                {analysisResult.treatments.map((treatment, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm text-green-800">{treatment}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Prevention Tips */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg">Prevention Tips</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisResult.prevention.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">Next Steps</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Save to Activity Log</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Set Treatment Reminder</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Tips Card */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg mb-4">Photography Tips for Better Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Take photos in good natural light</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Focus on affected areas clearly</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Include both healthy and affected parts</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Avoid blurry or dark images</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Take multiple angles if needed</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Capture leaves, stems, and fruits separately</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};