import React, { useState, useEffect } from 'react';
import { getAllDonors } from '../../services/donorService';
import { ShieldAlert, Search, Phone, MapPin, Calendar, Star, Users } from 'lucide-react';

export default function RareBloodRegistry() {
  const [rareDonors, setRareDonors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getAllDonors();
      setRareDonors(data.filter(d => d.rareGroupFlag || (d.bloodGroup && d.bloodGroup.includes('Bombay'))));
    }
    loadData();
  }, []);

  const filtered = rareDonors.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm font-sans">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-300">
            🔒 Staff & Admin Confidential Access Only
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mt-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            Rare Blood Group Phenotype Registry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Specialized registry for Bombay Phenotype (hh), Rh-null, O Negative, and rare antibody donors.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search rare donor or phenotype..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
          />
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((donor) => (
          <div key={donor.donorId} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-900/50 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{donor.donorId}</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{donor.name}</h4>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-slate-950">
                {donor.bloodGroup}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5 font-mono font-bold text-trustred-700">
                <Phone className="w-3.5 h-3.5" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{donor.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Donated: {donor.lastDonationDate}</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Initiated Emergency Alert Dispatch to ${donor.name} (${donor.phone})`)}
              className="w-full py-2 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold text-xs shadow transition"
            >
              Dispatch Emergency Request
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
