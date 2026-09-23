import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import GoogleMapEmbed from '../../components/common/GoogleMapEmbed';
import { 
  Building, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Map, 
  List, 
  ExternalLink,
  Users,
  ShieldCheck
} from 'lucide-react';

export default function BloodBankDirectory() {
  const { t } = useLanguage();
  const [bloodBanks, setBloodBanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [selectedBankId, setSelectedBankId] = useState(null);

  useEffect(() => {
    setBloodBanks([]);
  }, []);

  const filteredBanks = bloodBanks.filter((bank) => {
    const query = searchQuery.toLowerCase();
    return (
      bank.name.toLowerCase().includes(query) ||
      bank.city.toLowerCase().includes(query) ||
      bank.address.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-trustred-500">
              Verified Partner Facilities
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
              {t('directoryPageTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t('directoryPageDesc')}
            </p>
          </div>

          {/* List vs Map View Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-2xl border border-slate-700">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                viewMode === 'list'
                  ? 'bg-trustred-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                viewMode === 'map'
                  ? 'bg-trustred-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search blood bank by facility name, city, or address..."
          className="w-full bg-transparent text-slate-900 dark:text-white text-sm font-medium focus:outline-none"
        />
      </div>

      {/* Main Content Area */}
      {viewMode === 'map' ? (
        <GoogleMapEmbed
          bloodBanks={filteredBanks}
          selectedBankId={selectedBankId}
          onSelectBank={(id) => setSelectedBankId(id)}
        />
      ) : (
        /* List View Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBanks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-50 text-trustred-700 dark:bg-red-950 dark:text-rose-300 border border-red-200 dark:border-red-900">
                    {bank.city}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{bank.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-50 text-trustred-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  <Building className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-trustred-700 shrink-0 mt-0.5" />
                  <span>{bank.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-trustred-700 shrink-0" />
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{bank.contact}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Operating Hours: <strong>{bank.hours}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Licensed Medical Staff: {bank.staffCount}</span>
                <button
                  onClick={() => {
                    setSelectedBankId(bank.id);
                    setViewMode('map');
                  }}
                  className="px-4 py-2 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>View on Map</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
