import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function GoogleMapEmbed({ bloodBanks, selectedBankId, onSelectBank }) {
  // Center map on selected bank or default coordinates (Mumbai)
  const defaultBank = bloodBanks.find(b => b.id === selectedBankId) || bloodBanks[0] || {};
  const mapSearchQuery = encodeURIComponent(`${defaultBank.name || 'Blood Bank'}, ${defaultBank.city || ''}`);
  const embedUrl = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Map iframe Container */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-[480px] relative">
        <iframe
          title="Blood Bank Directory Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={embedUrl}
          className="w-full h-full border-0 filter grayscale-[20%] contrast-[105%]"
        ></iframe>

        {/* Map Header Overlay Badge */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2">
          <MapPin className="w-4 h-4 text-trustred-500" />
          <span>Interactive Location View: {defaultBank.name || 'Partner Blood Banks'}</span>
        </div>
      </div>

      {/* Side Marker Details Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        <h3 className="text-sm uppercase font-extrabold tracking-wider text-slate-500">
          Partner Facilities ({bloodBanks.length}):
        </h3>

        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {bloodBanks.map((bank) => {
            const isSelected = bank.id === (selectedBankId || defaultBank.id);
            return (
              <div
                key={bank.id}
                onClick={() => onSelectBank(bank.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-trustred-50 dark:bg-slate-800 border-trustred-700 dark:border-rose-500 shadow'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{bank.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {bank.city}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {bank.address}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-600 dark:text-slate-300 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-trustred-700" />
                    <span>{bank.contact}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{bank.hours}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
