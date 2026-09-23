import React from 'react';
import { Target, Eye, Heart, Compass, CheckCircle } from 'lucide-react';

export default function MissionVision() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Mission & <span className="text-blood-600">Vision</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Guided by strict medical ethics and human empathy, our goal is a world free from blood shortage crises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-blood-100 dark:border-navy-800 shadow-sm space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blood-600 text-white flex items-center justify-center shadow-lg shadow-blood-600/30">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            To build and sustain an integrated, transparent, and resilient blood banking ecosystem that empowers voluntary donors, streamlines blood bank operations, and delivers life-saving blood components to patients whenever and wherever needed.
          </p>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blood-600 shrink-0" />
              <span>Provide 100% free digital donor matching services.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blood-600 shrink-0" />
              <span>Eliminate replacement donation pressure on patient families.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blood-600 shrink-0" />
              <span>Ensure absolute data security and privacy compliance.</span>
            </li>
          </ul>
        </div>

        {/* Vision Card */}
        <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-blue-100 dark:border-navy-800 shadow-sm space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            To become the national gold standard for blood bank management and voluntary donor engagement—achieving zero preventable deaths caused by blood shortages or delayed transfusions.
          </p>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Expand real-time inventory tracking to 1,000+ rural & urban clinics.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Maintain a specialized Rare Blood Group Registry nationwide.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Foster a culture of regular, lifelong voluntary donation.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
