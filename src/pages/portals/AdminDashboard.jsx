import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { 
  LayoutGrid, 
  Users, 
  Droplet, 
  Plus, 
  Search, 
  Bell, 
  History, 
  User, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Settings, 
  HelpCircle, 
  MoreVertical, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X,
  TrendingUp,
  Info,
  Menu,
  Heart,
  ShieldCheck,
  Building,
  Calendar,
  Award,
  BookOpen,
  Eye,
  Target,
  CheckCircle2,
  Edit,
  Save,
  RotateCcw,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  Phone
} from 'lucide-react';

// Initial Mock Donors Data
const initialDonors = [
  {
    id: 'D-99321',
    initials: 'ES',
    name: 'Eleanor Shellstrop',
    bloodType: 'O-',
    lastDonation: '2023-08-14',
    status: 'ELIGIBLE',
    contactEmail: 'e.shellstrop@example.com',
    contactPhone: '555-0192',
  },
  {
    id: 'D-88214',
    initials: 'CM',
    name: 'Chidi Anagonye',
    bloodType: 'A+',
    lastDonation: '2023-09-02',
    status: 'DEFERRED',
    contactEmail: 'c.anagonye@example.com',
    contactPhone: '555-0344',
  },
  {
    id: 'D-77451',
    initials: 'TA',
    name: 'Tahani Al-Jamil',
    bloodType: 'AB-',
    lastDonation: '2023-10-15',
    status: 'ELIGIBLE',
    contactEmail: 't.aljamil@example.com',
    contactPhone: '555-0988',
  },
  {
    id: 'D-66320',
    initials: 'JM',
    name: 'Jason Mendoza',
    bloodType: 'O-',
    lastDonation: 'Never',
    status: 'PENDING',
    contactEmail: 'j.mendoza@example.com',
    contactPhone: '555-0771',
  },
  {
    id: 'D-55109',
    initials: 'VK',
    name: 'Vikram Mehta',
    bloodType: 'O+',
    lastDonation: '2023-11-01',
    status: 'ELIGIBLE',
    contactEmail: 'v.mehta@example.com',
    contactPhone: '555-0882',
  }
];

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { content, updateSection, resetToDefault } = useSiteContent();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'donors' | 'site-cms' | 'what-we-do' | 'settings' | 'support'
  const [cmsSubTab, setCmsSubTab] = useState('hero'); // 'hero' | 'vision' | 'about' | 'stats' | 'gallery' | 'contact' | 'other'
  const [saveToast, setSaveToast] = useState('');

  // Local CMS Form state initialized from SiteContentContext
  const [heroForm, setHeroForm] = useState(content.slides || []);
  const [visionForm, setVisionForm] = useState(content.visionMission || {});
  const [aboutForm, setAboutForm] = useState(content.aboutUs || {});
  const [statsForm, setStatsForm] = useState(content.stats || {});
  const [galleryForm, setGalleryForm] = useState(content.galleryItems || []);
  const [contactForm, setContactForm] = useState(content.contactPage || {});
  const [campsForm, setCampsForm] = useState(content.campsPage || {});
  const [eligibilityForm, setEligibilityForm] = useState(content.eligibilityPage || {});
  const [aboutPageForm, setAboutPageForm] = useState(content.aboutPage || {});
  const [donatePageForm, setDonatePageForm] = useState(content.donatePage || {});
  const [galleryHeaderForm, setGalleryHeaderForm] = useState(content.galleryPageHeader || {});

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Donors state
  const [donors, setDonors] = useState(initialDonors);

  // New Donor Form
  const [newDonor, setNewDonor] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: 'O-',
    status: 'ELIGIBLE'
  });

  const handleRegisterDonor = (e) => {
    e.preventDefault();
    if (!newDonor.name || !newDonor.email) return;

    const names = newDonor.name.split(' ');
    const initials = names.length > 1 
      ? (names[0][0] + names[1][0]).toUpperCase() 
      : names[0].substring(0, 2).toUpperCase();

    const created = {
      id: `D-${Math.floor(10000 + Math.random() * 90000)}`,
      initials: initials,
      name: newDonor.name,
      bloodType: newDonor.bloodType,
      lastDonation: 'Never',
      status: newDonor.status,
      contactEmail: newDonor.email,
      contactPhone: newDonor.phone || '555-0100',
    };

    setDonors([created, ...donors]);
    setShowRegisterModal(false);
    setNewDonor({ name: '', email: '', phone: '', bloodType: 'O-', status: 'ELIGIBLE' });
  };

  const navItemClick = (tabKey) => {
    setActiveTab(tabKey);
    setIsMobileSidebarOpen(false);
    const mainElem = document.querySelector('main');
    if (mainElem) {
      mainElem.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Donors
  const filteredDonors = donors.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBlood = bloodTypeFilter === 'All' || d.bloodType === bloodTypeFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;

    return matchesSearch && matchesBlood && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f4f7fa] font-sans overflow-hidden text-slate-800">
      
      {/* MOBILE OVERLAY BACKDROP */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* 1. SIDEBAR NAVIGATION (Desktop Pinned / Mobile Drawer) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#1a2530] text-slate-300 flex flex-col justify-between shrink-0 shadow-2xl z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 space-y-8">
          
          {/* Logo Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c81e1e] text-white flex items-center justify-center shadow-lg shadow-red-950/50">
                <Droplet className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h1 className="font-extrabold text-white text-lg leading-tight tracking-tight">Blood Trust</h1>
                <p className="text-[11px] text-slate-400 font-semibold">{t('adminPortalTitle')}</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-sm font-semibold">
            <button
              onClick={() => navItemClick('overview')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-700/60 text-white font-bold shadow-inner border-l-4 border-[#c81e1e]'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>{t('overview')}</span>
            </button>

            <button
              onClick={() => navItemClick('donors')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'donors'
                  ? 'bg-slate-700/60 text-white font-bold shadow-inner border-l-4 border-[#c81e1e]'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>{t('donorManagement')}</span>
            </button>

            <button
              onClick={() => navItemClick('what-we-do')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'what-we-do'
                  ? 'bg-slate-700/60 text-white font-bold shadow-inner border-l-4 border-[#c81e1e]'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>{t('whatWeDo')}</span>
            </button>

            <button
              onClick={() => navItemClick('site-cms')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'site-cms'
                  ? 'bg-[#c81e1e] text-white font-bold shadow-md'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
              }`}
            >
              <Edit className="w-5 h-5" />
              <span>{t('pageCms')}</span>
            </button>
          </nav>

          {/* Action Button: Register New Donor */}
          <button
            onClick={() => {
              setShowRegisterModal(true);
              setIsMobileSidebarOpen(false);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-[#c81e1e] hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t('registerNewDonor')}</span>
          </button>
        </div>

        {/* Bottom Sidebar Footer Nav */}
        <div className="p-6 border-t border-slate-800/60 space-y-1.5 text-xs font-semibold">
          <button
            onClick={() => navItemClick('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
              activeTab === 'settings' ? 'text-white font-bold bg-slate-800/60' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t('settings')}</span>
          </button>

          <button
            onClick={() => navItemClick('support')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
              activeTab === 'support' ? 'text-white font-bold bg-slate-800/60' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t('support')}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20 gap-3">
          
          {/* Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              title="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="w-full max-w-[200px] sm:max-w-xs lg:w-96 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder={t('searchDonorsPlaceholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#c81e1e] focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-slate-500">
            <button className="p-2 rounded-xl hover:bg-slate-100 transition relative">
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-[#c81e1e] absolute top-2 right-2 ring-2 ring-white"></span>
            </button>

            <button className="p-2 rounded-xl hover:bg-slate-100 transition hidden sm:block">
              <History className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Sarah Connor"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Title Header */}
              <div>
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('adminOverviewTitle')}</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">{t('adminOverviewSub')}</p>
                  </div>
                  <div className="text-xs text-slate-400 font-semibold">
                    Last updated: <span className="text-slate-600 font-bold">Just now</span>
                  </div>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('totalDonors')}</div>
                      <div className="text-3xl font-black text-slate-900 mt-2">25,480</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+12% this month</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('eligibleDonors')}</div>
                      <div className="text-3xl font-black text-slate-900 mt-2">18,920</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified & Ready</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('campsOrganized')}</div>
                      <div className="text-3xl font-black text-[#c81e1e] mt-2">250+</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#c81e1e] flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    Voluntary Community Drives
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('connectedHospitals')}</div>
                      <div className="text-3xl font-black text-slate-900 mt-2">120+</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    Regional Partner Network
                  </div>
                </div>
              </div>

              {/* Recent Donors Registration Overview Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{t('recentRegistrations')}</h3>
                    <p className="text-xs text-slate-500">Newly registered voluntary blood donors.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('donors')}
                    className="text-xs font-bold text-[#c81e1e] hover:underline"
                  >
                    {t('viewAllDonors')} &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-4">{t('donorId')}</th>
                        <th className="py-3 px-4">{t('donorName')}</th>
                        <th className="py-3 px-4">{t('bloodGroup')}</th>
                        <th className="py-3 px-4">{t('status')}</th>
                        <th className="py-3 px-4">{t('contactInfo')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {donors.slice(0, 4).map(d => (
                        <tr key={d.id} className="hover:bg-slate-50 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{d.id}</td>
                          <td className="py-3.5 px-4">{d.name}</td>
                          <td className="py-3.5 px-4 font-black text-[#c81e1e]">{d.bloodType}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">
                              {d.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{d.contactEmail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* DONOR MANAGEMENT TAB */}
          {activeTab === 'donors' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('donorManagement')}</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">Search, filter, verify, and register voluntary blood donors.</p>
                </div>

                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#c81e1e] hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition hover:scale-105"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{t('registerNewDonor')}</span>
                </button>
              </div>

              {/* Donor Table Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="w-full sm:w-80 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder={t('searchDonorsPlaceholder')}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#c81e1e] transition"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <select
                      value={bloodTypeFilter}
                      onChange={e => setBloodTypeFilter(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#c81e1e]"
                    >
                      <option value="All">All Blood Groups</option>
                      <option value="O-">O- Negative</option>
                      <option value="O+">O+ Positive</option>
                      <option value="A+">A+ Positive</option>
                      <option value="A-">A- Negative</option>
                      <option value="B+">B+ Positive</option>
                      <option value="B-">B- Negative</option>
                      <option value="AB+">AB+ Positive</option>
                      <option value="AB-">AB- Negative</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-4">{t('donorId')}</th>
                        <th className="py-3 px-4">{t('donorName')}</th>
                        <th className="py-3 px-4">{t('bloodGroup')}</th>
                        <th className="py-3 px-4">{t('lastDonation')}</th>
                        <th className="py-3 px-4">{t('status')}</th>
                        <th className="py-3 px-4">{t('contactInfo')}</th>
                        <th className="py-3 px-4 text-right">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {filteredDonors.map(d => (
                        <tr key={d.id} className="hover:bg-slate-50 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{d.id}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{d.name}</td>
                          <td className="py-3.5 px-4 font-black text-[#c81e1e]">{d.bloodType}</td>
                          <td className="py-3.5 px-4 text-slate-500">{d.lastDonation}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">
                              {d.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{d.contactEmail}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="text-xs font-bold text-[#c81e1e] hover:underline">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* WHAT WE DO TAB (SHOWING VISION & MISSION) */}
          {activeTab === 'what-we-do' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header Title */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#c81e1e]">
                  {t('ourPurpose')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  {t('ourVisionMission')}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1 max-w-2xl">
                  {t('ourVisionMissionDesc')}
                </p>
              </div>

              {/* Vision and Mission Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                
                {/* OUR VISION CARD */}
                <div className="bg-gradient-to-br from-white to-red-50/50 p-6 sm:p-8 rounded-3xl border border-red-100 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#c81e1e] text-white flex items-center justify-center shadow-lg shadow-red-950/20">
                      <Eye className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-100/80 px-2.5 py-1 rounded-full">
                        {t('ourVision')}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        {t('visionTitle')}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                        {t('visionDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-red-100/80 space-y-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('visionPoint1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('visionPoint2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('visionPoint3')}</span>
                    </div>
                  </div>
                </div>

                {/* OUR MISSION CARD */}
                <div className="bg-gradient-to-br from-white to-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                      <Target className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-200/80 px-2.5 py-1 rounded-full">
                        {t('ourMission')}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        {t('missionTitle')}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                        {t('missionDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('missionPoint1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('missionPoint2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t('missionPoint3')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PAGE TEXT & IMAGE CMS TAB */}
          {activeTab === 'site-cms' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* CMS Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-red-50 text-[#c81e1e]">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t('cmsTitle')}</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {t('cmsDesc')}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      resetToDefault();
                      setHeroForm(content.slides);
                      setVisionForm(content.visionMission);
                      setAboutForm(content.aboutUs);
                      setStatsForm(content.stats);
                      setGalleryForm(content.galleryItems);
                      setContactForm(content.contactPage);
                      setCampsForm(content.campsPage);
                      setEligibilityForm(content.eligibilityPage);
                      setAboutPageForm(content.aboutPage);
                      setDonatePageForm(content.donatePage);
                      setGalleryHeaderForm(content.galleryPageHeader);
                      setSaveToast('Reset all website content to original defaults!');
                      setTimeout(() => setSaveToast(''), 3000);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t('resetDefaults')}</span>
                  </button>
                </div>
              </div>

              {/* Toast notification */}
              {saveToast && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{saveToast}</span>
                  </div>
                  <button onClick={() => setSaveToast('')} className="text-emerald-600 hover:text-emerald-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Sub-tab Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {[
                  { id: 'hero', label: t('subTabHero'), icon: ImageIcon },
                  { id: 'vision', label: t('subTabVision'), icon: Target },
                  { id: 'aboutPage', label: t('subTabAboutPage'), icon: Info },
                  { id: 'donatePage', label: t('subTabDonatePage'), icon: Heart },
                  { id: 'galleryPage', label: t('subTabGalleryPage'), icon: ImageIcon },
                  { id: 'stats', label: t('subTabStats'), icon: TrendingUp },
                  { id: 'contact', label: t('subTabContact'), icon: Phone },
                  { id: 'other', label: t('subTabOther'), icon: BookOpen },
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => setCmsSubTab(st.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      cmsSubTab === st.id
                        ? 'bg-[#c81e1e] text-white shadow-md shadow-red-950/20'
                        : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <st.icon className="w-4 h-4" />
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>

              {/* SUB-TAB 1: HERO SLIDER */}
              {cmsSubTab === 'hero' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{t('heroSlidesTitle')} ({heroForm?.length || 0})</h3>
                      <p className="text-xs text-slate-500 font-medium">{t('heroSlidesSub')}</p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          const newSlide = {
                            id: Date.now(),
                            titleLine1: 'Blood Trust Lifesaver',
                            titleLine2: 'Saving Lives ',
                            titleHighlight: 'Every Day',
                            subtitle: 'Empowering local communities with 100% voluntary blood donation drives and certified partner hospitals.',
                            bgImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80'
                          };
                          const updated = [...(heroForm || []), newSlide];
                          setHeroForm(updated);
                          updateSection('slides', updated);
                          setSaveToast('New Hero Slide added & saved!');
                          setTimeout(() => setSaveToast(''), 3000);
                        }}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t('addNewSlide')}</span>
                      </button>

                      <button
                        onClick={() => {
                          updateSection('slides', heroForm);
                          setSaveToast('Hero Slider slides saved successfully!');
                          setTimeout(() => setSaveToast(''), 3000);
                        }}
                        className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>{t('saveSlides')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(heroForm || []).map((slide, idx) => (
                      <div key={slide.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 relative group">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-xs font-black uppercase text-[#c81e1e]">Slide #{idx + 1}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400 font-semibold">ID: {slide.id}</span>
                            <button
                              onClick={() => {
                                const updated = heroForm.filter((_, i) => i !== idx);
                                setHeroForm(updated);
                                updateSection('slides', updated);
                                setSaveToast(`Slide #${idx + 1} deleted successfully!`);
                                setTimeout(() => setSaveToast(''), 3000);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Preview image */}
                        <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={slide.bgImage}
                            alt={slide.titleHighlight || 'Slide'}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80'; }}
                          />
                          <div className="absolute inset-0 bg-slate-900/40 p-3 flex flex-col justify-end text-white">
                            <p className="font-bold text-xs truncate">{slide.titleLine1} {slide.titleHighlight}</p>
                          </div>
                        </div>

                        <div className="space-y-3 text-xs font-semibold">
                          <div>
                            <label className="block text-slate-600 mb-1">{t('imageUrlLabel')}</label>
                            <input
                              type="text"
                              value={slide.bgImage || ''}
                              onChange={(e) => {
                                const updated = [...heroForm];
                                updated[idx] = { ...updated[idx], bgImage: e.target.value };
                                setHeroForm(updated);
                              }}
                              placeholder="/images/slider/slide1.jpg or https://..."
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-600 mb-1">{t('titlePrefixLabel')}</label>
                              <input
                                type="text"
                                value={slide.titleLine1 || ''}
                                onChange={(e) => {
                                  const updated = [...heroForm];
                                  updated[idx] = { ...updated[idx], titleLine1: e.target.value };
                                  setHeroForm(updated);
                                }}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 mb-1">{t('highlightWordLabel')}</label>
                              <input
                                type="text"
                                value={slide.titleHighlight || ''}
                                onChange={(e) => {
                                  const updated = [...heroForm];
                                  updated[idx] = { ...updated[idx], titleHighlight: e.target.value };
                                  setHeroForm(updated);
                                }}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-600 mb-1">{t('subtitleLabel')}</label>
                            <textarea
                              rows={2}
                              value={slide.subtitle || ''}
                              onChange={(e) => {
                                const updated = [...heroForm];
                                updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                setHeroForm(updated);
                              }}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: VISION & MISSION */}
              {cmsSubTab === 'vision' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{t('vmSectionTitle')}</h3>
                      <p className="text-xs text-slate-500">{t('vmSectionSub')}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateSection('visionMission', visionForm);
                        setSaveToast('Vision & Mission content saved successfully!');
                        setTimeout(() => setSaveToast(''), 3000);
                      }}
                      className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t('saveVm')}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold">
                    {/* Vision column */}
                    <div className="space-y-4 p-4 rounded-xl bg-red-50/40 border border-red-100">
                      <h4 className="font-black text-[#c81e1e] text-sm uppercase tracking-wider flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{t('ourVision')}</span>
                      </h4>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourVision')} {t('mainTitleLabel')}</label>
                        <input
                          type="text"
                          value={visionForm.visionTitle || ''}
                          onChange={e => setVisionForm({ ...visionForm, visionTitle: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourVision')} {t('mainDescLabel')}</label>
                        <textarea
                          rows={3}
                          value={visionForm.visionDesc || ''}
                          onChange={e => setVisionForm({ ...visionForm, visionDesc: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourVision')} Key Point 1</label>
                        <input
                          type="text"
                          value={visionForm.visionPoint1 || ''}
                          onChange={e => setVisionForm({ ...visionForm, visionPoint1: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourVision')} Key Point 2</label>
                        <input
                          type="text"
                          value={visionForm.visionPoint2 || ''}
                          onChange={e => setVisionForm({ ...visionForm, visionPoint2: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourVision')} Key Point 3</label>
                        <input
                          type="text"
                          value={visionForm.visionPoint3 || ''}
                          onChange={e => setVisionForm({ ...visionForm, visionPoint3: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>
                    </div>

                    {/* Mission column */}
                    <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>{t('ourMission')}</span>
                      </h4>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourMission')} {t('mainTitleLabel')}</label>
                        <input
                          type="text"
                          value={visionForm.missionTitle || ''}
                          onChange={e => setVisionForm({ ...visionForm, missionTitle: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourMission')} {t('mainDescLabel')}</label>
                        <textarea
                          rows={3}
                          value={visionForm.missionDesc || ''}
                          onChange={e => setVisionForm({ ...visionForm, missionDesc: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourMission')} Key Point 1</label>
                        <input
                          type="text"
                          value={visionForm.missionPoint1 || ''}
                          onChange={e => setVisionForm({ ...visionForm, missionPoint1: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourMission')} Key Point 2</label>
                        <input
                          type="text"
                          value={visionForm.missionPoint2 || ''}
                          onChange={e => setVisionForm({ ...visionForm, missionPoint2: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('ourMission')} Key Point 3</label>
                        <input
                          type="text"
                          value={visionForm.missionPoint3 || ''}
                          onChange={e => setVisionForm({ ...visionForm, missionPoint3: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: ABOUT US PAGE CMS */}
              {cmsSubTab === 'aboutPage' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg">{t('aboutPageCmsTitle')}</h3>
                        <p className="text-xs text-slate-500">{t('aboutPageCmsSub')}</p>
                      </div>
                      <button
                        onClick={() => {
                          updateSection('aboutPage', aboutPageForm);
                          setSaveToast('About Us Page content saved successfully!');
                          setTimeout(() => setSaveToast(''), 3000);
                        }}
                        className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>{t('saveAboutPage')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <label className="block text-slate-700 mb-1">{t('mainTitleLabel')}</label>
                        <input
                          type="text"
                          value={aboutPageForm.title || ''}
                          onChange={e => setAboutPageForm({ ...aboutPageForm, title: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('highlightWordLabel')}</label>
                        <input
                          type="text"
                          value={aboutPageForm.highlight || ''}
                          onChange={e => setAboutPageForm({ ...aboutPageForm, highlight: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-700 mb-1">{t('subtitleLabel')}</label>
                        <textarea
                          rows={2}
                          value={aboutPageForm.subtitle || ''}
                          onChange={e => setAboutPageForm({ ...aboutPageForm, subtitle: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
                        <h4 className="font-extrabold text-slate-900 text-sm mb-3">Our Purpose & Core Values Section</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-slate-700 mb-1">Purpose Section Header Title</label>
                            <input
                              type="text"
                              value={aboutPageForm.purposeTitle || ''}
                              onChange={e => setAboutPageForm({ ...aboutPageForm, purposeTitle: e.target.value })}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 mb-1">Purpose Paragraph 1 (Vision & Goal)</label>
                            <textarea
                              rows={3}
                              value={aboutPageForm.purposeDesc1 || ''}
                              onChange={e => setAboutPageForm({ ...aboutPageForm, purposeDesc1: e.target.value })}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 mb-1">Purpose Paragraph 2 (Community Action)</label>
                            <textarea
                              rows={3}
                              value={aboutPageForm.purposeDesc2 || ''}
                              onChange={e => setAboutPageForm({ ...aboutPageForm, purposeDesc2: e.target.value })}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STAT CARDS EDITOR */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">About Us Stat Cards ({aboutPageForm.aboutStatCards?.length || 0})</h4>
                        <p className="text-xs text-slate-500 font-medium">Add, edit labels/values, change icons, or remove stat cards.</p>
                      </div>

                      <button
                        onClick={() => {
                          const newCard = {
                            id: Date.now(),
                            val: '500+',
                            label: 'New Stat Metric',
                            icon: 'Heart',
                            color: 'blood'
                          };
                          const updatedCards = [...(aboutPageForm.aboutStatCards || []), newCard];
                          const updatedForm = { ...aboutPageForm, aboutStatCards: updatedCards };
                          setAboutPageForm(updatedForm);
                          updateSection('aboutPage', updatedForm);
                          setSaveToast('New Stat Card added & saved!');
                          setTimeout(() => setSaveToast(''), 3000);
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t('addNewStatCard')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {(aboutPageForm.aboutStatCards || []).map((card, idx) => (
                        <div key={card.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 relative">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="text-xs font-black uppercase text-[#c81e1e]">Card #{idx + 1}</span>
                            <button
                              onClick={() => {
                                const updatedCards = aboutPageForm.aboutStatCards.filter((_, i) => i !== idx);
                                const updatedForm = { ...aboutPageForm, aboutStatCards: updatedCards };
                                setAboutPageForm(updatedForm);
                                updateSection('aboutPage', updatedForm);
                                setSaveToast(`Stat card #${idx + 1} deleted!`);
                                setTimeout(() => setSaveToast(''), 3000);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-100 transition"
                              title="Delete Card"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-2 text-xs font-semibold">
                            <div>
                              <label className="block text-slate-600 mb-1">{t('statValueLabel')}</label>
                              <input
                                type="text"
                                value={card.val || ''}
                                onChange={e => {
                                  const updatedCards = [...aboutPageForm.aboutStatCards];
                                  updatedCards[idx] = { ...updatedCards[idx], val: e.target.value };
                                  setAboutPageForm({ ...aboutPageForm, aboutStatCards: updatedCards });
                                }}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-600 mb-1">{t('statLabelText')}</label>
                              <input
                                type="text"
                                value={card.label || ''}
                                onChange={e => {
                                  const updatedCards = [...aboutPageForm.aboutStatCards];
                                  updatedCards[idx] = { ...updatedCards[idx], label: e.target.value };
                                  setAboutPageForm({ ...aboutPageForm, aboutStatCards: updatedCards });
                                }}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-600 mb-1">Card Icon</label>
                              <select
                                value={card.icon || 'Users'}
                                onChange={e => {
                                  const updatedCards = [...aboutPageForm.aboutStatCards];
                                  updatedCards[idx] = { ...updatedCards[idx], icon: e.target.value };
                                  setAboutPageForm({ ...aboutPageForm, aboutStatCards: updatedCards });
                                }}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#c81e1e]"
                              >
                                <option value="Users">Users</option>
                                <option value="Building">Building</option>
                                <option value="Shield">Shield</option>
                                <option value="Award">Award</option>
                                <option value="Heart">Heart</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: DONATE BLOOD PAGE CMS */}
              {cmsSubTab === 'donatePage' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 max-w-2xl">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{t('donateCmsTitle')}</h3>
                      <p className="text-xs text-slate-500">{t('donateCmsSub')}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateSection('donatePage', donatePageForm);
                        setSaveToast('Donate Blood Page content saved successfully!');
                        setTimeout(() => setSaveToast(''), 3000);
                      }}
                      className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t('saveDonate')}</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-semibold">
                    <div>
                      <label className="block text-slate-700 mb-1">{t('mainTitleLabel')}</label>
                      <input
                        type="text"
                        value={donatePageForm.title || ''}
                        onChange={e => setDonatePageForm({ ...donatePageForm, title: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">{t('subtitleLabel')}</label>
                      <textarea
                        rows={3}
                        value={donatePageForm.subtitle || ''}
                        onChange={e => setDonatePageForm({ ...donatePageForm, subtitle: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: MEDIA GALLERY PAGE CMS */}
              {cmsSubTab === 'galleryPage' && (
                <div className="space-y-6">
                  {/* Top Header Banner Editor */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg">{t('galleryHeaderCmsTitle')}</h3>
                        <p className="text-xs text-slate-500">{t('galleryHeaderCmsSub')}</p>
                      </div>
                      <button
                        onClick={() => {
                          updateSection('galleryPageHeader', galleryHeaderForm);
                          updateSection('galleryItems', galleryForm);
                          setSaveToast('Gallery header and press items saved successfully!');
                          setTimeout(() => setSaveToast(''), 3000);
                        }}
                        className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>{t('saveGalleryItems')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <label className="block text-slate-700 mb-1">{t('badgeLabel')}</label>
                        <input
                          type="text"
                          value={galleryHeaderForm.badge || ''}
                          onChange={e => setGalleryHeaderForm({ ...galleryHeaderForm, badge: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('mainTitleLabel')}</label>
                        <input
                          type="text"
                          value={galleryHeaderForm.title || ''}
                          onChange={e => setGalleryHeaderForm({ ...galleryHeaderForm, title: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-slate-700 mb-1">{t('subtitleLabel')}</label>
                        <textarea
                          rows={2}
                          value={galleryHeaderForm.subtitle || ''}
                          onChange={e => setGalleryHeaderForm({ ...galleryHeaderForm, subtitle: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Newspaper Items Editor */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg">{t('galleryCmsTitle')} ({galleryForm?.length || 0})</h4>
                        <p className="text-xs text-slate-500 font-medium">{t('galleryCmsSub')}</p>
                      </div>

                      <button
                        onClick={() => {
                          const newItem = {
                            id: Date.now(),
                            title: 'नवीन स्वैच्छिक रक्तदान उपक्रम बातमी',
                            subtitle: 'विशेष बातमी पत्र: रक्तदान व सामाजिक सेवेतील उत्कृष्ट योगदानाबद्दल गौरव.',
                            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                            location: 'Mumbai / Sangli',
                            src: '/images/gallery/newspaper1.jpg',
                            tag: 'Blood Drives'
                          };
                          const updated = [...(galleryForm || []), newItem];
                          setGalleryForm(updated);
                          updateSection('galleryItems', updated);
                          setSaveToast('New Media Newspaper Item added & saved!');
                          setTimeout(() => setSaveToast(''), 3000);
                        }}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t('addNewNewspaperItem')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(galleryForm || []).map((item, idx) => (
                        <div key={item.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 relative group">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="text-xs font-black uppercase text-[#c81e1e]">Newspaper Item #{item.id}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">{item.tag}</span>
                              <button
                                onClick={() => {
                                  const updated = galleryForm.filter((_, i) => i !== idx);
                                  setGalleryForm(updated);
                                  updateSection('galleryItems', updated);
                                  setSaveToast(`Newspaper item #${item.id} deleted!`);
                                  setTimeout(() => setSaveToast(''), 3000);
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                                title="Delete Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Preview image */}
                          <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            <img
                              src={item.src}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = '/images/gallery/newspaper1.jpg'; }}
                            />
                          </div>

                          <div className="space-y-3 text-xs font-semibold">
                            <div>
                              <label className="block text-slate-600 mb-1">{t('imageUrlLabel')}</label>
                              <input
                                type="text"
                                value={item.src || ''}
                                onChange={(e) => {
                                  const updated = [...galleryForm];
                                  updated[idx] = { ...updated[idx], src: e.target.value };
                                  setGalleryForm(updated);
                                }}
                                placeholder="/images/gallery/newspaper1.jpg"
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-600 mb-1">{t('headlineTitleLabel')}</label>
                              <input
                                type="text"
                                value={item.title || ''}
                                onChange={(e) => {
                                  const updated = [...galleryForm];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setGalleryForm(updated);
                                }}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-600 mb-1">{t('subtextSummaryLabel')}</label>
                              <textarea
                                rows={2}
                                value={item.subtitle || ''}
                                onChange={(e) => {
                                  const updated = [...galleryForm];
                                  updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                  setGalleryForm(updated);
                                }}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-600 mb-1">{t('dateLabel')}</label>
                                <input
                                  type="text"
                                  value={item.date || ''}
                                  onChange={(e) => {
                                    const updated = [...galleryForm];
                                    updated[idx] = { ...updated[idx], date: e.target.value };
                                    setGalleryForm(updated);
                                  }}
                                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-600 mb-1">{t('locationSourceLabel')}</label>
                                <input
                                  type="text"
                                  value={item.location || ''}
                                  onChange={(e) => {
                                    const updated = [...galleryForm];
                                    updated[idx] = { ...updated[idx], location: e.target.value };
                                    setGalleryForm(updated);
                                  }}
                                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: CONTACT US INFO */}
              {cmsSubTab === 'contact' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 max-w-2xl">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{t('contactCmsTitle')}</h3>
                      <p className="text-xs text-slate-500">{t('contactCmsSub')}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateSection('contactPage', contactForm);
                        setSaveToast('Contact page details saved successfully!');
                        setTimeout(() => setSaveToast(''), 3000);
                      }}
                      className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t('saveContact')}</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-semibold">
                    <div>
                      <label className="block text-slate-700 mb-1">{t('emergencyLineLabel')}</label>
                      <input
                        type="text"
                        value={contactForm.emergencyLine || ''}
                        onChange={e => setContactForm({ ...contactForm, emergencyLine: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">{t('emailInquiryLabel')}</label>
                      <input
                        type="text"
                        value={contactForm.emailInquiry || ''}
                        onChange={e => setContactForm({ ...contactForm, emailInquiry: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">{t('headquartersLabel')}</label>
                      <input
                        type="text"
                        value={contactForm.headquarters || ''}
                        onChange={e => setContactForm({ ...contactForm, headquarters: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">{t('contactDescLabel')}</label>
                      <textarea
                        rows={3}
                        value={contactForm.description || ''}
                        onChange={e => setContactForm({ ...contactForm, description: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 7: ELIGIBILITY & CAMPS */}
              {cmsSubTab === 'other' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 max-w-2xl">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{t('otherCmsTitle')}</h3>
                      <p className="text-xs text-slate-500">{t('otherCmsSub')}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateSection('campsPage', campsForm);
                        updateSection('eligibilityPage', eligibilityForm);
                        setSaveToast('Camps & Eligibility page content saved!');
                        setTimeout(() => setSaveToast(''), 3000);
                      }}
                      className="px-5 py-2.5 bg-[#c81e1e] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t('saveOther')}</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-semibold">
                    <div>
                      <label className="block text-slate-700 mb-1">{t('campsSubtitleLabel')}</label>
                      <textarea
                        rows={2}
                        value={campsForm.subtitle || ''}
                        onChange={e => setCampsForm({ ...campsForm, subtitle: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">{t('eligSubtitleLabel')}</label>
                      <textarea
                        rows={2}
                        value={eligibilityForm.subtitle || ''}
                        onChange={e => setEligibilityForm({ ...eligibilityForm, subtitle: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 mb-1">{t('ageDescLabel')}</label>
                        <input
                          type="text"
                          value={eligibilityForm.ageDesc || ''}
                          onChange={e => setEligibilityForm({ ...eligibilityForm, ageDesc: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('weightDescLabel')}</label>
                        <input
                          type="text"
                          value={eligibilityForm.weightDesc || ''}
                          onChange={e => setEligibilityForm({ ...eligibilityForm, weightDesc: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('hemoDescLabel')}</label>
                        <input
                          type="text"
                          value={eligibilityForm.hemoDesc || ''}
                          onChange={e => setEligibilityForm({ ...eligibilityForm, hemoDesc: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 mb-1">{t('intervalDescLabel')}</label>
                        <input
                          type="text"
                          value={eligibilityForm.intervalDesc || ''}
                          onChange={e => setEligibilityForm({ ...eligibilityForm, intervalDesc: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS & SUPPORT */}
          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 max-w-xl">
              <h2 className="text-xl font-bold text-slate-900">{t('settings')}</h2>
              <p className="text-xs text-slate-500">Configure Blood Trust administrator preferences and notification alerts.</p>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 max-w-xl">
              <h2 className="text-xl font-bold text-slate-900">{t('support')}</h2>
              <p className="text-xs text-slate-500">Need help managing donors or network settings? Contact system support.</p>
            </div>
          )}

        </div>
      </main>

      {/* MODAL: REGISTER NEW DONOR */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">{t('registerNewDonor')}</h3>
                <p className="text-xs text-slate-500 font-medium">Add a voluntary donor to Blood Trust network.</p>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterDonor} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">{t('fullName')} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newDonor.name}
                  onChange={e => setNewDonor({ ...newDonor, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">{t('emailAddress')} *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={newDonor.email}
                  onChange={e => setNewDonor({ ...newDonor, email: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={newDonor.phone}
                  onChange={e => setNewDonor({ ...newDonor, phone: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">{t('bloodGroup')} *</label>
                  <select
                    value={newDonor.bloodType}
                    onChange={e => setNewDonor({ ...newDonor, bloodType: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                  >
                    <option value="O-">O- Negative</option>
                    <option value="O+">O+ Positive</option>
                    <option value="A+">A+ Positive</option>
                    <option value="A-">A- Negative</option>
                    <option value="B+">B+ Positive</option>
                    <option value="B-">B- Negative</option>
                    <option value="AB+">AB+ Positive</option>
                    <option value="AB-">AB- Negative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">{t('status')}</label>
                  <select
                    value={newDonor.status}
                    onChange={e => setNewDonor({ ...newDonor, status: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#c81e1e]"
                  >
                    <option value="ELIGIBLE">Eligible</option>
                    <option value="PENDING">Pending</option>
                    <option value="DEFERRED">Deferred</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c81e1e] hover:bg-red-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>{t('registerNewDonor')}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
