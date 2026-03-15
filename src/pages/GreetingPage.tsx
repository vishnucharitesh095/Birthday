import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowDown,
  Sparkles
} from 'lucide-react';
import Balloons from '../components/celebration/Balloons';
import Confetti from '../components/celebration/Confetti';
import Fireworks from '../components/celebration/Fireworks';
import PhotoGrid from '../components/gallery/PhotoGrid';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface GreetingData {
  birthdayName: string;
  message: string;
  senderName: string;
  photos: string[];
  backgroundImage: string;
  music: string;
  theme: string;
  timeline: TimelineEvent[];
}

// Demo data for when no data is stored
const demoData: GreetingData = {
  birthdayName: 'Karthika',
  message: 'Wishing you a day filled with love, laughter, and all your favorite things. May this new year of your life bring you endless happiness and beautiful memories. You are an amazing person who deserves all the best in the world!',
  senderName: 'With love',
  photos: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  ],
  backgroundImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200',
  music: '',
  theme: 'karthika',
  timeline: [
    { year: '2020', title: 'The Beginning', description: 'Where it all started' },
    { year: '2021', title: 'New Adventures', description: 'New journeys begin' },
    { year: '2022', title: 'Growing Stronger', description: 'Every day better than before' },
    { year: '2023', title: 'Making Memories', description: 'Cherishing every moment' },
    { year: '2024', title: 'New Horizons', description: 'Looking forward to tomorrow' },
    { year: '2025', title: 'New Beginnings', description: 'A fresh start awaits' },
    { year: '2026', title: 'Dreams Come True', description: 'Making wishes happen' },
  ],
};

const GreetingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Lazy initializer function to load greeting from URL params or localStorage
  const loadGreetingFromURL = (): GreetingData => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // First check for short ID in query params (new approach with localStorage)
    const idParam = urlParams.get('id');
    if (idParam) {
      const stored = localStorage.getItem(`greeting_${idParam}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...demoData, ...parsed };
        } catch {
          console.error('Failed to parse greeting data from localStorage');
        }
      }
    }
    
    // Check URL search params for data (old approach with base64 in URL)
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        const decoded = decodeURIComponent(atob(dataParam));
        const parsed = JSON.parse(decoded);
        return { ...demoData, ...parsed };
      } catch (e) {
        console.error('Failed to parse greeting data from URL:', e);
      }
    }
    
    // Fallback to localStorage for demo IDs
    if (id) {
      const stored = localStorage.getItem(`greeting_${id}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...demoData, ...parsed };
        } catch {
          console.error('Failed to parse greeting data');
        }
      }
    }
    return demoData;
  };

  const [greeting] = useState<GreetingData>(loadGreetingFromURL);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  useEffect(() => {
    // Auto-trigger confetti after a delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const blowCandles = () => {
    setCandlesBlown(true);
    setShowFireworks(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowFireworks(false);
      setShowConfetti(false);
    }, 5000);
  };

  const getThemeColors = () => {
    switch (greeting.theme) {
      case 'elegant-gold':
        return 'from-yellow-400 via-amber-500 to-yellow-600';
      case 'pastel-cute':
        return 'from-pink-200 via-purple-200 to-blue-200';
      case 'balloon-party':
        return 'from-red-400 via-pink-500 to-purple-400';
      case 'dark-luxury':
        return 'from-gray-900 via-gray-800 to-black';
      case 'karthika':
        return 'from-pink-400 via-indigo-500 to-violet-600';
      default:
        return 'from-gray-100 via-white to-gray-200';
    }
  };

  const getTextColor = () => {
    if (greeting.theme === 'dark-luxury' || greeting.theme === 'karthika') return 'text-white';
    return 'text-elegant-dark';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getThemeColors()}`}>
      {/* Audio element */}
      {greeting.music && (
        <audio ref={audioRef} src={greeting.music} loop />
      )}

      {/* Floating Balloons */}
      <Balloons count={20} />

      {/* Confetti */}
      <Confetti active={showConfetti} />

      {/* Fireworks */}
      <Fireworks active={showFireworks} />

      {/* Music Player */}
      {greeting.music && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 right-6 z-50 glass rounded-full px-4 py-2 flex items-center gap-3"
        >
          <button
            onClick={toggleMusic}
            className="w-10 h-10 rounded-full bg-elegant-gold text-white flex items-center justify-center hover:bg-yellow-500 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={toggleMute}
            className="text-gray-700 hover:text-gray-900"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </motion.div>
      )}

      {/* Section 1: Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {greeting.backgroundImage && (
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0"
          >
            <img
              src={greeting.backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring' }}
            className="text-8xl mb-6"
          >
            🎂
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Happy Birthday
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg"
          >
            {greeting.birthdayName}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ArrowDown className="text-white/80 w-8 h-8" />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Message */}
      <section className="py-24 px-6 bg-white/90">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light italic">
              "{greeting.message}"
            </p>
            <p className="mt-6 text-lg text-gray-500">
              — {greeting.senderName}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Photo Memories */}
      {greeting.photos.length > 0 && (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-pink-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-4xl font-bold text-center mb-12 ${getTextColor()}`}
            >
              📸 Photo Memories
            </motion.h2>
            <PhotoGrid photos={greeting.photos} layout="masonry" />
          </div>
        </section>
      )}

      {/* Section 4: Timeline */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${getTextColor()}`}
          >
            📅 Our Journey Together
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-elegant-gold to-pink-400 rounded-full" />
            
            {(greeting.timeline || []).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <span className="text-2xl font-bold text-elegant-gold">{event.year}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-elegant-gold rounded-full border-4 border-white shadow-lg" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Cake Celebration */}
      <section className="py-24 px-6 bg-gradient-to-b from-pink-50 to-purple-100">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-12 ${getTextColor()}`}
          >
            🎂 Birthday Cake
          </motion.h2>
          
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            {/* Cake SVG */}
            <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
              {/* Plate */}
              <ellipse cx="100" cy="180" rx="90" ry="15" fill="#e5e7eb" />
              {/* Cake bottom */}
              <rect x="40" y="120" width="120" height="60" rx="5" fill="#f5d0c5" />
              {/* Cake middle */}
              <rect x="50" y="80" width="100" height="40" rx="5" fill="#fce4ec" />
              {/* Cake top */}
              <rect x="60" y="50" width="80" height="30" rx="5" fill="#f8bbd9" />
              {/* Frosting */}
              <path d="M40 120 Q50 110 60 120 Q70 110 80 120 Q90 110 100 120 Q110 110 120 120 Q130 110 140 120 Q150 110 160 120" 
                    fill="none" stroke="#fff" strokeWidth="3" />
              {/* Candles */}
              {!candlesBlown && (
                <>
                  <rect x="70" y="20" width="6" height="35" fill="white" />
                  <rect x="90" y="15" width="6" height="40" fill="white" />
                  <rect x="110" y="20" width="6" height="35" fill="white" />
                  <rect x="130" y="25" width="6" height="30" fill="white" />
                  {/* Flames */}
                  <motion.circle 
                    cx="73" 
                    cy="15" 
                    r="5" 
                    fill="#ff6b6b"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />
                  <motion.circle 
                    cx="93" 
                    cy="10" 
                    r="5" 
                    fill="#ff6b6b"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                  />
                  <motion.circle 
                    cx="113" 
                    cy="15" 
                    r="5" 
                    fill="#ff6b6b"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                  />
                  <motion.circle 
                    cx="133" 
                    cy="20" 
                    r="5" 
                    fill="#ff6b6b"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                  />
                </>
              )}
              {/* Candles blown state */}
              {candlesBlown && (
                <text x="100" y="35" textAnchor="middle" fontSize="20">💨</text>
              )}
            </svg>
          </motion.div>

          {!candlesBlown ? (
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={blowCandles}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <Sparkles size={24} />
              Blow Out the Candles
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <p className="text-2xl font-bold text-gray-800">🎉 Happy Birthday! 🎉</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Section 6: Final Celebration */}
      <section className="py-24 px-6 bg-gradient-to-b from-purple-100 to-pink-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-8xl mb-8 block">🎊</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor()}`}>
              Have an Amazing Year Ahead!
            </h2>
            <p className="text-xl text-gray-700">
              Wishing you endless joy, love, and success in this new chapter of your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Created with 💖 using Birthday Storybook
          </p>
          <button
            onClick={() => navigate('/create')}
            className="mt-4 text-elegant-gold hover:text-yellow-600 text-sm font-medium"
          >
            Create your own birthday wish
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GreetingPage;
