import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gift, Heart, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Balloons from '../components/celebration/Balloons';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Gift,
      title: 'Personalized Wishes',
      description: 'Create unique birthday greetings with custom photos and messages',
    },
    {
      icon: Heart,
      title: 'Beautiful Themes',
      description: 'Choose from elegant gold, pastel cute, balloon party, and more',
    },
    {
      icon: Sparkles,
      title: 'Magical Animations',
      description: 'Delight with floating balloons, confetti, and fireworks',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-elegant-cream via-white to-pink-50 overflow-hidden">
      {/* Floating Balloons */}
      <Balloons count={12} />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🎂</span>
          <span className="text-xl font-semibold text-elegant-dark">
            Birthday Storybook
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="outline" size="sm" onClick={() => navigate('/create')}>
            Create Now
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-[80vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-block text-6xl mb-6"
          >
            🎈
          </motion.span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-elegant-dark mb-6 leading-tight">
            Create a Magical
            <br />
            <span className="text-gradient">Birthday Story</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transform heartfelt wishes into beautiful, shareable birthday experiences 
            with photos, animations, and music.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => navigate('/create')}>
              Create Your Wishes
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/wish/demo')}>
              View Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-elegant-dark mb-12"
        >
          Why Choose Birthday Storybook?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-8 text-center h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-elegant-gold/20 to-yellow-400/20 mb-4">
                  <feature.icon className="w-8 h-8 text-elegant-gold" />
                </div>
                <h3 className="text-xl font-semibold text-elegant-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Themes Preview */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-elegant-dark mb-4"
          >
            Beautiful Themes
          </motion.h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose from our curated collection of stunning themes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Elegant Gold', color: 'from-yellow-400 to-amber-600' },
              { name: 'Pastel Cute', color: 'from-pink-200 to-purple-200' },
              { name: 'Balloon Party', color: 'from-red-400 to-pink-400' },
              { name: 'Dark Luxury', color: 'from-gray-800 to-gray-900' },
              { name: 'Minimal Modern', color: 'from-gray-100 to-gray-200' },
            ].map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`h-32 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
              >
                <span className="text-white font-semibold drop-shadow-md">
                  {theme.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-elegant-dark mb-4">
              Ready to Create Something Special?
            </h2>
            <p className="text-gray-600 mb-8">
              Start creating your birthday storybook today and make someone's day unforgettable.
            </p>
            <Button size="lg" onClick={() => navigate('/create')}>
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎂</span>
            <span className="font-semibold text-elegant-dark">Birthday Storybook</span>
          </div>
          <p className="text-gray-500 text-sm">
            Made with ❤️ for special birthdays
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
