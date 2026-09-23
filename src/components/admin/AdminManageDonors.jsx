import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle, 
  XCircle, 
  UserCheck, 
  UserX, 
  Trash2, 
  Droplet, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldAlert,
  X
} from 'lucide-react';

const initialDonors = [
  {
    id: 'DON-1001',
    name: 'Jane Doe',
    email: 'donor@bloodtrust.org',
    phone: '+1 555-019-2834',
    bloodGroup: 'O+',
    city: 'Mumbai',
    gender: 'Female',
    age: 28,
    totalDonations: 4,
    status: 'Active',
    verified: true,
    rareFlag: false,
    lastDonation: '2026-03-15'
  },
  {
    id: 'DON-1002',
    name: 'Vikram Mehta',
    email: 'vikram.m@gmail.com',
    phone: '+91 98200 11223',
    bloodGroup: 'Bombay Phenotype (hh)',
    city: 'Mumbai',
    gender: 'Male',
    age: 34,
    totalDonations: 7,
    status: 'Active',
    verified: true,
    rareFlag: true,
    lastDonation: '2025-12-01'
  },
  {
    id: 'DON-1003',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@yahoo.com',
    phone: '+91 98110 22334',
    bloodGroup: 'A+',
    city: 'Mumbai',
    gender: 'Male',
    age: 30,
    totalDonations: 2,
    status: 'Active',
    verified: true,
    rareFlag: false,
    lastDonation: '2026-01-10'
  },
  {
    id: 'DON-1004',
    name: 'Ananya Roy',
    email: 'ananya.roy@outlook.com',
    phone: '+91 98310 44556',
    bloodGroup: 'Rh-null (Golden Blood)',
    city: 'Kolkata',
    gender: 'Female',
    age: 29,
    totalDonations: 5,
    status: 'Active',
    verified: true,
    rareFlag: true,
    lastDonation: '2026-01-20'
  },
  {
    id: 'DON-1005',
    name: 'Marcus Vance',
    email: 'marcus.v@healthnet.org',
    phone: '+1 555-019-9944',
    bloodGroup: 'O-',
    city: 'Pune',
    gender: 'Male',
    age: 36,
    totalDonations: 9,
    status: 'Suspended',
    verified: false,
    rareFlag: false,
    lastDonation: '2025-08-12'
  },
  {
    id: 'DON-1006',
    name: 'Priya Patel',
    email: 'priya.p@gmail.com',
    phone: '+91 97230 88776',
    bloodGroup: 'B+',
    city: 'Ahmedabad',
    gender: 'Female',
    age: 25,
    totalDonations: 1,
    status: 'Active',
    verified: true,
    rareFlag: false,
    lastDonation: '2026-02-28'
  }
];

export default function AdminManageDonors() {
  const [donors, setDonors] = useState(initialDonors);
  const [search, setSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Donor Form State
  const [newDonor, setNewDonor] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: 'O+',
    city: 'Mumbai',
    gender: 'Male',
    age: 25,
  });

  const handleToggleStatus = (id) => {
    setDonors(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === 'Active' ? 'Suspended' : 'Active';
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const handleToggleVerified = (id) => {
    setDonors(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, verified: !d.verified };
      }
      return d;
    }));
  };

  const handleDeleteDonor = (id) => {
    if (window.confirm('Are you sure you want to remove this donor from the system?')) {
      setDonors(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleAddDonor = (e) => {
    e.preventDefault();
    if (!newDonor.name || !newDonor.email) return;

    const created = {
      id: `DON-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newDonor.name,
      email: newDonor.email,
      phone: newDonor.phone || '+91 90000 00000',
      bloodGroup: newDonor.bloodGroup,
      city: newDonor.city,
      gender: newDonor.gender,
      age: Number(newDonor.age),
      totalDonations: 0,
      status: 'Active',
      verified: true,
      rareFlag: newDonor.bloodGroup.includes('Bombay') || newDonor.bloodGroup.includes('Rh-null'),
      lastDonation: 'Never'
    };

    setDonors(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewDonor({ name: '', email: '', phone: '', bloodGroup: 'O+', city: 'Mumbai', gender: 'Male', age: 25 });
  };

  const filteredDonors = donors.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());

    const matchesBlood = bloodFilter === 'All' || d.bloodGroup === bloodFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;

    return matchesSearch && matchesBlood && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-trustred-700" />
            Donor Registry & Account Governance
          </h2>
          <p className="text-xs text-slate-500 mt-1">Manage registered donors, verify eligibility, and maintain donor status</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Donor</span>
        </button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-2xl font-black text-slate-900">{donors.length}</div>
          <div className="text-[10px] font-extrabold uppercase text-slate-500 mt-0.5">Total Registered</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-2xl font-black text-emerald-600">
            {donors.filter(d => d.status === 'Active').length}
          </div>
          <div className="text-[10px] font-extrabold uppercase text-slate-500 mt-0.5">Active & Eligible</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-2xl font-black text-purple-600">
            {donors.filter(d => d.rareFlag).length}
          </div>
          <div className="text-[10px] font-extrabold uppercase text-slate-500 mt-0.5">Rare Phenotypes</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-2xl font-black text-amber-500">
            {donors.filter(d => !d.verified).length}
          </div>
          <div className="text-[10px] font-extrabold uppercase text-slate-500 mt-0.5">Unverified Profiles</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, phone, email, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-trustred-700"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>Blood:</span>
          </div>
          <select
            value={bloodFilter}
            onChange={e => setBloodFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="All">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="Bombay Phenotype (hh)">Bombay Phenotype</option>
            <option value="Rh-null (Golden Blood)">Rh-null</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Suspended">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
              <tr>
                <th className="p-4">Donor ID & Name</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Contact & Location</th>
                <th className="p-4 text-center">Donations</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-semibold">
                    No donors match the search query or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50 font-medium transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-slate-700 text-xs shrink-0">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span>{donor.name}</span>
                            {donor.verified && (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 inline" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{donor.id} • {donor.gender}, {donor.age}y</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg font-black text-xs inline-flex items-center gap-1 ${
                        donor.rareFlag 
                          ? "bg-purple-100 text-purple-900 border border-purple-300"
                          : "bg-red-50 text-trustred-700 border border-red-200"
                      }`}>
                        <Droplet className="w-3 h-3 fill-current" />
                        {donor.bloodGroup}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{donor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{donor.city}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span className="font-extrabold text-slate-900">{donor.totalDonations}</span>
                      <div className="text-[10px] text-slate-400">Last: {donor.lastDonation}</div>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        donor.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {donor.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleVerified(donor.id)}
                          title={donor.verified ? "Mark Unverified" : "Mark Verified"}
                          className={`p-1.5 rounded-lg border transition ${
                            donor.verified 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                              : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(donor.id)}
                          title={donor.status === 'Active' ? "Suspend Donor" : "Activate Donor"}
                          className={`p-1.5 rounded-lg border transition ${
                            donor.status === 'Active'
                              ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          {donor.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleDeleteDonor(donor.id)}
                          title="Remove Donor"
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Donor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-trustred-700" />
                Register New Donor Account
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDonor} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newDonor.name}
                  onChange={e => setNewDonor({ ...newDonor, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newDonor.email}
                    onChange={e => setNewDonor({ ...newDonor, email: e.target.value })}
                    placeholder="rajesh@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newDonor.phone}
                    onChange={e => setNewDonor({ ...newDonor, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={newDonor.bloodGroup}
                    onChange={e => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-white text-trustred-700"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="Bombay Phenotype (hh)">Bombay (hh)</option>
                    <option value="Rh-null (Golden Blood)">Rh-null</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newDonor.city}
                    onChange={e => setNewDonor({ ...newDonor, city: e.target.value })}
                    placeholder="Mumbai"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="65"
                    value={newDonor.age}
                    onChange={e => setNewDonor({ ...newDonor, age: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold shadow-md transition"
                >
                  Create Donor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
