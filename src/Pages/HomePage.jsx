import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import image from "../assets/Family.jpeg";

function HomePage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/signin');
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div 
      className="relative h-screen w-full flex justify-center items-center text-center text-white overflow-hidden"
      style={{ 
        backgroundImage: `url(${image})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl px-8 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            FamilyConnect
          </motion.h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-3xl mb-10 font-light tracking-wide">
            Where families grow <span className="text-amber-300 font-medium">together</span>
          </p>
        </motion.div>

        {/* Countdown Box */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-sm mx-auto my-8 border border-white/20 shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <p className="text-lg mb-3 font-medium">Taking you to sign in...</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={countdown}
              className="text-6xl font-bold text-amber-400"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {countdown}
            </motion.div>
          </AnimatePresence>
          <div className="w-full bg-white/20 h-1.5 mt-4 rounded-full overflow-hidden">
            <motion.div 
              className="bg-amber-400 h-full"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* Skip Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            className={`relative overflow-hidden px-10 py-4 rounded-full font-medium text-lg shadow-xl ${
              isHovered ? 'bg-white text-gray-900' : 'bg-amber-500 text-white'
            }`}
            onClick={() => navigate('/signin')}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isHovered ? 'Get Started Now' : 'Skip Introduction'}
              <svg 
                className={`ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`} 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-16 text-sm text-white/70"
          variants={itemVariants}
        >
          <p>Building stronger family bonds every day</p>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}

export default HomePage;