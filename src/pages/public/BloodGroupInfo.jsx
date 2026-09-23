import React, { useState } from 'react';
import { Droplet, ArrowRightLeft, Star, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BloodGroupInfo() {
  const [selectedGroup, setSelectedGroup] = useState('O-');

  const compatibilityMatrix = {
    'A+': { giveTo: ['A+', 'AB+'], receiveFrom: ['A+', 'A-', 'O+', 'O-'], rbcType: 'A Antigen', plasmaType: 'Anti-B Antibodies' },
    'O+': { giveTo: ['O+', 'A+', 'B+', 'AB+'], receiveFrom: ['O+', 'O-'], rbcType: 'No A/B Antigens', plasmaType: 'Anti-A & Anti-B' },
    'B+': { giveTo: ['B+', 'AB+'], receiveFrom: ['B+', 'B-', 'O+', 'O-'], rbcType: 'B Antigen', plasmaType: 'Anti-A Antibodies' },
    'AB+': { giveTo: ['AB+'], receiveFrom: ['Everyone (Universal Recipient)'], rbcType: 'A & B Antigens', plasmaType: 'No Antibodies' },
    'A-': { giveTo: ['A+', 'A-', 'AB+', 'AB-'], receiveFrom: ['A-', 'O-'], rbcType: 'A Antigen (Rh-)', plasmaType: 'Anti-B Antibodies' },
    'O-': { giveTo: ['Everyone (Universal Red Cell Donor)'], receiveFrom: ['O-'], rbcType: 'No Antigens (Rh-)', plasmaType: 'Universal Plasma Recipient' },
    'B-': { giveTo: ['B+', 'B-', 'AB+', 'AB-'], receiveFrom: ['B-', 'O-'], rbcType: 'B Antigen (Rh-)', plasmaType: 'Anti-A Antibodies' },
    'AB-': { giveTo: ['AB+', 'AB-'], receiveFrom: ['AB-', 'A-', 'B-', 'O-'], rbcType: 'A & B Antigens (Rh-)', plasmaType: 'Universal Plasma Donor' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-extrabold text-xs uppercase tracking-wider">
          <Droplet className="w-4 h-4 fill-current" />
          Transfusion Compatibility Matrix
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Blood Group & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blood-600 to-rose-500">Phenotype Matrix</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Select any blood group to inspect red blood cell & plasma compatibility rules in real time.
        </p>
      </div>

      {/* Interactive Blood Group Selector Wheel */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl p-8 border border-slate-200/80 dark:border-navy-800 shadow-glass space-y-8">
        <div>
          <h2 className="text-sm uppercase font-bold text-slate-500 tracking-wider mb-4 text-center">
            Tap a Blood Group to View Live Transfusion Compatibility:
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {Object.keys(compatibilityMatrix).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`py-4 rounded-2xl font-black text-xl transition-all duration-200 ${
                  selectedGroup === group
                    ? 'bg-gradient-to-br from-blood-600 to-rose-600 text-white shadow-glow-red scale-105 border-2 border-white'
                    : 'bg-slate-50 dark:bg-navy-800 text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-navy-700 border border-slate-200/60 dark:border-navy-700'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Result Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-navy-800">
          
          <div className="bg-emerald-500/10 dark:bg-emerald-950/30 p-8 rounded-3xl border border-emerald-500/20 space-y-3">
            <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Can Donate Red Blood Cells To:
            </div>
            <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
              {Array.isArray(compatibilityMatrix[selectedGroup].giveTo) 
                ? compatibilityMatrix[selectedGroup].giveTo.join(' • ')
                : compatibilityMatrix[selectedGroup].giveTo}
            </div>
            <div className="text-xs text-emerald-700/80 dark:text-emerald-300/80 pt-2 border-t border-emerald-500/20">
              Antigen Characteristics: {compatibilityMatrix[selectedGroup].rbcType}
            </div>
          </div>

          <div className="bg-blue-500/10 dark:bg-blue-950/30 p-8 rounded-3xl border border-blue-500/20 space-y-3">
            <div className="text-xs uppercase font-extrabold tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5" />
              Can Receive Red Blood Cells From:
            </div>
            <div className="text-2xl font-black text-blue-900 dark:text-blue-100">
              {Array.isArray(compatibilityMatrix[selectedGroup].receiveFrom) 
                ? compatibilityMatrix[selectedGroup].receiveFrom.join(' • ')
                : compatibilityMatrix[selectedGroup].receiveFrom}
            </div>
            <div className="text-xs text-blue-700/80 dark:text-blue-300/80 pt-2 border-t border-blue-500/20">
              Plasma Antibody Profile: {compatibilityMatrix[selectedGroup].plasmaType}
            </div>
          </div>

        </div>
      </div>

      {/* Rare Phenotypes Showcase */}
      <div className="bg-gradient-to-r from-slate-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-amber-400 fill-current" />
          <h2 className="text-3xl font-black">Specialized Rare Blood Registry</h2>
        </div>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Blood Trust maintains a confidential, staff-moderated Rare Phenotype Registry for ultra-rare blood types, ensuring emergency dispatch within hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <h3 className="font-extrabold text-amber-300 text-lg">O Negative (O-)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Universal red cell donor. Representing ~7% of donors. Essential for emergency trauma when blood typing is pending.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <h3 className="font-extrabold text-amber-300 text-lg">Bombay Phenotype (hh)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Extremely rare (1 in 10,000). Completely lacks the H antigen. Can only safely receive blood from another Bombay donor.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <h3 className="font-extrabold text-amber-300 text-lg">Rh-null ("Golden Blood")</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fewer than 50 documented individuals globally. Completely lacks all Rh antigens; highly sought for rare blood research.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
