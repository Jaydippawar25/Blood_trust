import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { SiteContentProvider } from './context/SiteContentContext';

import MainLayout from './components/layout/MainLayout';
import PageLoader from './components/common/PageLoader';
import ScrollToTop from './components/common/ScrollToTop';
import { DonorRoute, AdminRoute } from './components/common/ProtectedRoutes';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import MissionVision from './pages/public/MissionVision';
import DonationAwareness from './pages/public/DonationAwareness';
import BloodAvailability from './pages/public/BloodAvailability';
import BloodBankDirectory from './pages/public/BloodBankDirectory';
import EligibilityCriteria from './pages/public/EligibilityCriteria';
import DonationProcessGuide from './pages/public/DonationProcessGuide';
import Benefits from './pages/public/Benefits';
import FAQ from './pages/public/FAQ';
import ContactUs from './pages/public/ContactUs';
import Gallery from './pages/public/Gallery';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Portals
import DonorDashboard from './pages/portals/DonorDashboard';
import AdminDashboard from './pages/portals/AdminDashboard';
import Unauthorized from './pages/portals/Unauthorized';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <SiteContentProvider>
            {isLoading && <PageLoader onFinish={() => setIsLoading(false)} />}
            
            <div className={`transition-all duration-700 ease-out ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-in fade-in duration-700'
            }`}>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  {/* Public Static & Dynamic Availability Pages */}
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="mission" element={<MissionVision />} />
                  <Route path="awareness" element={<DonationAwareness />} />
                  <Route path="blood-groups" element={<BloodAvailability />} />
                  <Route path="directory" element={<BloodBankDirectory />} />
                  <Route path="eligibility" element={<EligibilityCriteria />} />
                  <Route path="process" element={<DonationProcessGuide />} />
                  <Route path="benefits" element={<Benefits />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="contact" element={<ContactUs />} />
                  <Route path="gallery" element={<Gallery />} />

                  {/* Auth Routes */}
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="unauthorized" element={<Unauthorized />} />

                  {/* Protected Portal Routes by Role */}
                  <Route element={<DonorRoute />}>
                    <Route path="donor/dashboard" element={<DonorDashboard />} />
                  </Route>

                  <Route element={<AdminRoute />}>
                    <Route path="admin/dashboard" element={<AdminDashboard />} />
                    <Route path="super-admin/dashboard" element={<AdminDashboard />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
          </SiteContentProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
