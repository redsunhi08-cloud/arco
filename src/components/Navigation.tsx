import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ASSETS, NAVIGATION } from "../constants";
import { useInquiry } from "../contexts/InquiryContext";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useInquiry();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHome ? "bg-white/95 backdrop-blur-sm py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={ASSETS.LOGO} 
              alt="ARCO" 
              className={`w-[150px] h-[50px] transition-all object-contain ${
                isScrolled || !isHome ? "brightness-0" : "brightness-100 invert"
              }`} 
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {NAVIGATION.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`text-sm font-bold tracking-[0.2em] uppercase transition-all hover:text-secondary hover:scale-105 ${
                  isScrolled || !isHome ? "text-primary" : "text-white"
                } ${location.pathname === item.href ? "text-secondary!" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={openModal}
              className={`hidden sm:block px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-all ${
                isScrolled || !isHome
                  ? "bg-primary text-white hover:bg-secondary" 
                  : "bg-primary text-white hover:bg-secondary"
              }`}
            >
              상담하기
            </button>
            <button 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled || !isHome ? "text-primary" : "text-white"} size={24} />
              ) : (
                <Menu className={isScrolled || !isHome ? "text-primary" : "text-white"} size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8 lg:hidden"
          >
            {NAVIGATION.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className="text-2xl font-display font-medium text-primary hover:text-secondary tracking-[0.2em] uppercase"
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={openModal}
              className="mt-8 px-12 py-4 bg-primary text-white uppercase tracking-widest text-sm font-bold"
            >
              문의하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
