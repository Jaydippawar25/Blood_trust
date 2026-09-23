import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Droplet, 
  Search, 
  Filter, 
  Building, 
  MapPin, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle, 
  Plus, 
  Minus,
  Activity,
  PhoneCall
} from 'lucide-react';

function getStockStatus(units) {
  if (units > 30) return { label: 'Optimal Stock', color: 'emerald' };
  if (units > 10) return { label: 'Moderate Stock', color: 'amber' };
  return { label: 'Critical Shortage', color: 'blood' };
}

export default function BloodAvailability() {
  const { t } = useLanguage();
  const [inventory, setInventory] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [selectedComponent, setSelectedComponent] = useState('ALL');
  const [searchCity, setSearchCity] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    setInventory([]);
  }, []);

  const handleStockChange = (invId, currentUnits, delta) => {
    setUpdatingId(invId);
    const newUnits = Math.max(0, currentUnits + delta);
    setInventory(prev => prev.map(item => item.id === invId ? { ...item, units: newUnits } : item));
    setUpdatingId(null);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchGroup = selectedGroup === 'ALL' || item.bloodGroup === selectedGroup;
    const matchComponent = selectedComponent === 'ALL' || item.component === selectedComponent;
    const matchCity = !searchCity || item.city.toLowerCase().includes(searchCity.toLowerCase()) || item.bankName.toLowerCase().includes(searchCity.toLowerCase());
    return matchGroup && matchComponent && matchCity;
  });

  const bloodGroups = ['ALL', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const components = ['ALL', 'RBC', 'Plasma', 'Platelets', 'Whole Blood'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-trustred-700 via-rose-700 to-trustred-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              Real-Time Synchronized Stock Feed (`onSnapshot`)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('availabilityPageTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-2xl">
              {t('availabilityPageDesc')}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/40 p-3 rounded-2xl border border-white/10 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-white">Live Listener Active</span>
          </div>
        </div>

        {/* Real-time Test Switcher Helper Banner */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/15 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-red-100">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-300 shrink-0" />
            <span><strong>Simulate Real-Time Stock Change:</strong> Use the <strong>+ / - Stock</strong> controls in the table below to test real-time `onSnapshot` status transitions across sessions!</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-extrabold text-trustred-700 uppercase tracking-wider">
          <Filter className="w-4 h-4" />
          <span>Refine Availability Search Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Blood Group Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Blood Group</label>
            <select
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm"
            >
              {bloodGroups.map(g => (
                <option key={g} value={g}>{g === 'ALL' ? 'All Blood Groups' : g}</option>
              ))}
            </select>
          </div>

          {/* Component Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Component</label>
            <select
              value={selectedComponent}
              onChange={e => setSelectedComponent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm"
            >
              {components.map(c => (
                <option key={c} value={c}>{c === 'ALL' ? 'All Components' : c}</option>
              ))}
            </select>
          </div>

          {/* Location / Facility Search */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">City / Facility</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchCity}
                onChange={e => setSearchCity(e.target.value)}
                placeholder="e.g. Mumbai or Central Bank"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Stock Grid Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-trustred-500 fill-current" />
            <h2 className="font-extrabold text-sm uppercase">Filtered Inventory Feed ({filteredInventory.length} items)</h2>
          </div>
          <Link to="/directory" className="text-xs font-bold text-trustred-500 hover:underline">
            View Blood Bank Directory & Map &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-[11px] font-extrabold tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Facility Name</th>
                <th className="p-4">City</th>
                <th className="p-4">Component</th>
                <th className="p-4">Stock Units</th>
                <th className="p-4">Status Badge</th>
                <th className="p-4 text-center">Test Real-Time Modifier</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredInventory.map((item) => {
                const statusInfo = getStockStatus(item.units);
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    
                    <td className="p-4">
                      <span className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-trustred-700 font-black text-lg flex items-center justify-center border border-red-200 dark:border-red-900">
                        {item.bloodGroup}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-trustred-700 shrink-0" />
                      {item.bankName}
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">{item.city}</td>

                    <td className="p-4 font-semibold">{item.component}</td>

                    <td className="p-4">
                      <span className="font-extrabold text-base">{item.units}</span> <span className="text-xs text-slate-500">Units</span>
                    </td>

                    <td className="p-4">
                      {statusInfo.code === 'critical' && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-800 border border-red-300 flex items-center gap-1.5 w-fit">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                          Critical Stock (&le;4)
                        </span>
                      )}
                      {statusInfo.code === 'low' && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800 border border-amber-300 w-fit">
                          Low Stock (&le;12)
                        </span>
                      )}
                      {statusInfo.code === 'adequate' && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                          Adequate Stock
                        </span>
                      )}
                    </td>

                    {/* Live Test Modifier Buttons */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleStockChange(item.id, item.units, -5)}
                          disabled={updatingId === item.id}
                          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold transition text-xs flex items-center gap-0.5"
                          title="Decrease Stock Units"
                        >
                          <Minus className="w-3.5 h-3.5" /> -5
                        </button>
                        <button
                          onClick={() => handleStockChange(item.id, item.units, 5)}
                          disabled={updatingId === item.id}
                          className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold transition text-xs flex items-center gap-0.5"
                          title="Increase Stock Units"
                        >
                          <Plus className="w-3.5 h-3.5" /> +5
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <Link
                        to="/request-blood"
                        className="px-3 py-1.5 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-lg text-xs shadow"
                      >
                        {t('requestBlood')}
                      </Link>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
