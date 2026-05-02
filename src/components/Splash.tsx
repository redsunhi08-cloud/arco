import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants';

interface SplashProps {
  isVisible: boolean;
  onClose: () => void;
}

const Splash: React.FC<SplashProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when splash is visible
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleEnter = () => {
    onClose();
    navigate('/');
  };

  return (
    <motion.div
      id="splash-screen"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5 }}
        className="absolute inset-0"
      >
        <img 
          src={ASSETS.INTRO_GIF} 
          alt="Intro" 
          className="w-full h-full object-cover brightness-90"
          referrerPolicy="no-referrer"
        />
        {/* Overlay Gradient: Left-side subtle shadow to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-12 md:px-24 flex items-center">
        <div className="max-w-2xl">
          <div className="opacity-100">
            <h1 className="text-white text-3xl md:text-5xl font-display font-light leading-tight mb-4 tracking-tight">
              공간에 가치를 더하다,
            </h1>
            <h2 className="text-white text-[50px] font-display font-medium mb-12 tracking-tight">
              아르코 인테리어
            </h2>

            <button
              onClick={handleEnter}
              className="group flex items-center gap-4 text-white border border-white/20 px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md"
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em]">사이트 보러가기</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative side text */}
      <div className="absolute bottom-12 right-12 hidden md:block opacity-30">
        <p className="text-white text-[10px] font-bold uppercase tracking-[0.5em] vertical-rl">
          Architecture of Living • Arco Interior
        </p>
      </div>
    </motion.div>
  );
};

export default Splash;
