import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LOADING_PHRASES } from '../constants';

export const LoadingScreen: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="relative w-32 h-32 mb-12">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-purple-500/30 border-t-purple-400 border-r-transparent"
        />
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-indigo-500/30 border-b-indigo-400 border-l-transparent"
        />
        {/* Inner Core */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 blur-xl opacity-50"
        />
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">✨</span>
         </div>
      </div>

      <motion.div
        key={phraseIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="h-8"
      >
        <p className="text-xl font-light text-purple-200 tracking-wide animate-pulse">
          {LOADING_PHRASES[phraseIndex]}
        </p>
      </motion.div>
    </div>
  );
};
