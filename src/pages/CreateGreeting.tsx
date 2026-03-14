import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Music, 
  Image, 
  Palette, 
  ArrowLeft, 
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

type ThemeOption = 'elegant-gold' | 'pastel-cute' | 'balloon-party' | 'dark-luxury' | 'minimal-modern' | 'karthika';

interface GreetingData {
  birthdayName: string;
  message: string;
  senderName: string;
  photos: string[];
  backgroundImage: string;
  music: string;
  theme: ThemeOption;
}

const themes: { id: ThemeOption; name: string; colors: string }[] = [
  { id: 'karthika', name: 'Karthika', colors: 'from-pink-400 via-indigo-500 to-violet-600' },
  { id: 'elegant-gold', name: 'Elegant Gold', colors: 'from-yellow-400 via-amber-500 to-yellow-600' },
  { id: 'pastel-cute', name: 'Pastel Cute', colors: 'from-pink-200 via-purple-200 to-blue-200' },
  { id: 'balloon-party', name: 'Balloon Party', colors: 'from-red-400 via-pink-500 to-purple-400' },
  { id: 'dark-luxury', name: 'Dark Luxury', colors: 'from-gray-900 via-gray-800 to-black' },
  { id: 'minimal-modern', name: 'Minimal Modern', colors: 'from-gray-100 via-white to-gray-200' },
];

const CreateGreeting: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'preview' | 'share'>('form');
  const [greetingData, setGreetingData] = useState<GreetingData>({
    birthdayName: '',
    message: '',
    senderName: '',
    photos: [],
    backgroundImage: '',
    music: '',
    theme: 'karthika',
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof GreetingData, value: string) => {
    setGreetingData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPhotos.push(e.target.result as string);
            if (newPhotos.length === files.length) {
              setGreetingData((prev) => ({
                ...prev,
                photos: [...prev.photos, ...newPhotos],
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setGreetingData((prev) => ({
            ...prev,
            backgroundImage: e.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateLink = () => {
    // Generate a unique ID for the greeting
    const greetingId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Store greeting data in localStorage
    localStorage.setItem(`greeting_${greetingId}`, JSON.stringify(greetingData));
    
    // Create a short URL with just the ID
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/wish?id=${greetingId}`;
    
    setGeneratedLink(shareableLink);
    setStep('share');
  };

  const showPreview = () => {
    setStep('preview');
  };

  const copyLink = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedLink);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = generatedLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Show alert as last resort
      alert('Link copied! Here\'s your link: ' + generatedLink);
    }
  };

  const shareToWhatsApp = () => {
    const text = `Check out this beautiful birthday wish for ${greetingData.birthdayName}! ${generatedLink}`;
    // Use WhatsApp Web format which works without phone number
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToEmail = () => {
    const subject = `Happy Birthday ${greetingData.birthdayName}!`;
    const body = `I created a special birthday wish for you! ${generatedLink}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-elegant-cream via-white to-pink-50">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-semibold text-elegant-dark">
            Create Birthday Wish
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {step === 'form' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Form Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-elegant-dark mb-4">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birthday Person's Name
                    </label>
                    <input
                      type="text"
                      value={greetingData.birthdayName}
                      onChange={(e) => handleInputChange('birthdayName', e.target.value)}
                      placeholder="Enter their name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-elegant-gold focus:ring-2 focus:ring-elegant-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={greetingData.senderName}
                      onChange={(e) => handleInputChange('senderName', e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-elegant-gold focus:ring-2 focus:ring-elegant-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birthday Message
                    </label>
                    <textarea
                      value={greetingData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Write your heartfelt message..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-elegant-gold focus:ring-2 focus:ring-elegant-gold/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-elegant-dark mb-4 flex items-center gap-2">
                  <Palette size={20} />
                  Choose Theme
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleInputChange('theme', theme.id)}
                      className={`p-3 rounded-xl bg-gradient-to-br ${theme.colors} transition-all ${
                        greetingData.theme === theme.id
                          ? 'ring-2 ring-offset-2 ring-elegant-gold scale-105'
                          : 'hover:scale-102'
                      }`}
                    >
                      <span className="text-white font-medium text-sm drop-shadow-md">
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-elegant-dark mb-4">
                  Media
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photos
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-elegant-gold hover:bg-elegant-gold/5 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Image className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload photos
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    {greetingData.photos.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        {greetingData.photos.length} photo(s) uploaded
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-elegant-gold hover:bg-elegant-gold/5 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-500">
                          Background image
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Music URL
                    </label>
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={greetingData.music}
                        onChange={(e) => handleInputChange('music', e.target.value)}
                        placeholder="Enter music URL (mp3)"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-elegant-gold focus:ring-2 focus:ring-elegant-gold/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Button
                size="lg"
                className="w-full"
                onClick={showPreview}
                disabled={!greetingData.birthdayName || !greetingData.message}
              >
                Preview Birthday Wish
              </Button>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-elegant-dark mb-4">
                  Preview
                </h2>
                <div
                  className={`aspect-[9/16] md:aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${
                    themes.find((t) => t.id === greetingData.theme)?.colors
                  } relative`}
                >
                  {greetingData.backgroundImage && (
                    <img
                      src={greetingData.backgroundImage}
                      alt="Background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Happy Birthday
                    </h3>
                    <p className="text-xl text-white/90 mb-4">
                      {greetingData.birthdayName || 'Name'}
                    </p>
                    {greetingData.photos.length > 0 && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src={greetingData.photos[0]}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  This is a preview of how your birthday wish will look
                </p>
              </Card>
            </div>
          </motion.div>
        )}

        {step === 'preview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-elegant-dark mb-4 text-center">
                🎉 Your Birthday Wish Preview
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Here's how your birthday wish will look! Click below to generate a shareable link.
              </p>
              
              {/* Preview Container - Shows a preview of the greeting page */}
              <div className="aspect-[9/16] md:aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 relative mx-auto max-w-md">
                {greetingData.backgroundImage && (
                  <img
                    src={greetingData.backgroundImage}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-6xl mb-4">🎂</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Happy Birthday
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    {greetingData.birthdayName || 'Name'}
                  </p>
                  {greetingData.photos.length > 0 && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={greetingData.photos[0]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep('form')}
                >
                  ← Edit Details
                </Button>
                <Button
                  size="lg"
                  onClick={generateLink}
                  className="flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Generate Shareable Link
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'share' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <Card className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-elegant-dark mb-2">
                Your Birthday Wish is Ready! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Share this link with {greetingData.birthdayName}
              </p>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2 mb-6">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  title="Generated greeting link"
                  aria-label="Generated greeting link"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
                <Button variant="primary" size="sm" onClick={copyLink}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={shareToWhatsApp}
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={shareToEmail}
                  className="flex items-center gap-2"
                >
                  <Mail size={18} />
                  Email
                </Button>
              </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => {
                    // Navigate with the data encoded in URL query param
                    const urlData = generatedLink.split('data=')[1];
                    navigate(`/wish?data=${urlData}`);
                  }}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Share2 size={18} />
                  View Greeting Page
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CreateGreeting;
