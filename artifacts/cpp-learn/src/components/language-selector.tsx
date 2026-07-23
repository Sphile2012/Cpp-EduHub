/**
 * uPhumeh - Language Selection Component
 * 
 * A beautiful, interactive component for users to select their preferred
 * programming language when they first visit the platform.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Code, Sparkles, Zap, Globe, Check } from 'lucide-react';
import { getAllLanguages, type LanguageId } from '@/config/languages';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LanguageSelector() {
  const { setSelectedLanguage } = useLanguage();
  const [hoveredLanguage, setHoveredLanguage] = useState<LanguageId | null>(null);
  const languages = getAllLanguages();

  const handleSelect = (languageId: LanguageId) => {
    setSelectedLanguage(languageId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80 font-medium">Welcome to uPhumeh</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Master Programming with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              uPhumeh
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Learn, Practice, Build, and Become a Professional Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-base text-gray-400 mt-4"
          >
            Choose your programming language to begin your journey
          </motion.p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
              onMouseEnter={() => setHoveredLanguage(lang.id)}
              onMouseLeave={() => setHoveredLanguage(null)}
            >
              <Card
                onClick={() => handleSelect(lang.id)}
                className={`
                  cursor-pointer transition-all duration-300 border-2
                  ${hoveredLanguage === lang.id 
                    ? 'border-white/40 scale-105 shadow-2xl shadow-' + lang.color + '/20' 
                    : 'border-white/10 hover:border-white/30'
                  }
                  bg-white/5 backdrop-blur-sm overflow-hidden
                `}
              >
                <CardContent className="p-6">
                  {/* Icon & Name */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{lang.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{lang.displayName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${lang.gradient} text-white`}>
                            {lang.difficulty}
                          </span>
                          <span className="text-xs text-gray-400">
                            {lang.features[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${hoveredLanguage === lang.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-gray-400'
                      }
                    `}>
                      {hoveredLanguage === lang.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {lang.description}
                  </p>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {lang.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-md text-xs bg-white/5 text-gray-300 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Hello World Preview */}
                  <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/10">
                    <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                      <code>{lang.helloWorld.split('\n')[0]}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Can't decide? Start with{' '}
            <button
              onClick={() => handleSelect('python')}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2 font-medium"
            >
              Python
            </button>
            {' '}for beginners or{' '}
            <button
              onClick={() => handleSelect('javascript')}
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 font-medium"
            >
              JavaScript
            </button>
            {' '}for web development.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            You can always switch languages later. Your progress will be saved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}