import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Splash from "./components/Splash";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import Inquiry from "./pages/Inquiry";
import Location from "./pages/Location";
import Admin from "./pages/Admin";

import { InquiryProvider, useInquiry } from "./contexts/InquiryContext";
import { InquiryModal } from "./components/InquiryModal";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const { isModalOpen, closeModal } = useInquiry();

  return (
    <>
      <Splash isVisible={isSplashVisible} onClose={() => setIsSplashVisible(false)} />
      <ScrollToTop />
      <div className="relative min-h-screen bg-white">
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Home isSplashVisible={isSplashVisible} />} />
            <Route path="/company" element={<Company />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/location" element={<Location />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
        <InquiryModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <InquiryProvider>
        <AppContent />
      </InquiryProvider>
    </Router>
  );
}
