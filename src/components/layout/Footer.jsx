import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Droplet, Heart, Phone, Mail, MapPin, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-trustred-700 text-white font-sans border-t border-trustred-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Logo, Intro & Social Icons */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white text-trustred-700 flex items-center justify-center font-bold shadow">
                <Droplet className="w-5 h-5 fill-current text-trustred-700" />
                <Heart className="w-2.5 h-2.5 fill-trustred-700 text-trustred-700 absolute inset-0 m-auto mt-3" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  BLOOD TRUST
                </span>
                <span className="block text-[10px] text-red-100 font-semibold">
                  {t('tagline')}
                </span>
              </div>
            </Link>

            <p className="text-xs text-red-100 leading-relaxed">
              {t('footerDesc')}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-xs text-red-100 font-semibold">
              <li><Link to="/" className="hover:text-white transition">{t('home')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition">{t('about')}</Link></li>
              <li><Link to="/register" className="hover:text-white transition">{t('donate')}</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition">{t('gallery')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">Support</h3>
            <ul className="space-y-2 text-xs text-red-100 font-semibold">
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/eligibility" className="hover:text-white transition">{t('checkEligibility')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t('contactInfo')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">{t('contactInfo')}</h3>
            <ul className="space-y-2.5 text-xs text-red-100 font-semibold">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>123 Blood Trust Avenue, Helping Hands City, 400001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span>info@bloodtrust.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white shrink-0" />
                <span>www.bloodtrust.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-red-100 gap-4">
          <p>© {new Date().getFullYear()} BLOOD TRUST. {t('allRightsReserved')}</p>
        </div>

      </div>

    </footer>
  );
}
