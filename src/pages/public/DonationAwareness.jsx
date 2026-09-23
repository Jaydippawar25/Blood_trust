import React from 'react';
import { Lightbulb, AlertCircle, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function DonationAwareness() {
  const mythsVsFacts = [
    {
      myth: "Donating blood causes severe physical weakness and illness.",
      fact: "The human body replenishes lost plasma within 24–48 hours, and red blood cells are fully restored within 4 to 8 weeks. Donating is safe and leaves no long-term weakness."
    },
    {
      myth: "You can contract diseases like HIV or Hepatitis by donating blood.",
      fact: "Strict single-use, sterile, disposable needles are opened right in front of you and discarded immediately after. It is 100% impossible to catch infections while donating."
    },
    {
      myth: "People with high blood pressure or diabetes can never donate.",
      fact: "As long as your blood pressure and diabetes are well-controlled by routine medication, you can safely donate blood after a quick health checkup."
    },
    {
      myth: "Blood donation is extremely painful and takes hours.",
      fact: "The actual blood collection takes only 8–10 minutes with just a slight initial pinch. The total process including registration and refreshments takes under 30 minutes."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Blood Donation <span className="text-blood-600">Awareness & Education</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Knowledge saves lives. Learn how your single donation can save up to 3 individual patients.
        </p>
      </div>

      {/* 1 Unit = 3 Lives */}
      <div className="bg-gradient-to-r from-blood-800 to-blood-600 rounded-3xl p-8 text-white grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2 p-4 border border-white/10 rounded-2xl bg-white/5">
          <div className="text-3xl font-extrabold text-red-200">Red Blood Cells (RBC)</div>
          <p className="text-xs text-blood-100">Used for trauma, surgeries, anemia, and acute blood loss emergencies.</p>
        </div>
        <div className="space-y-2 p-4 border border-white/10 rounded-2xl bg-white/5">
          <div className="text-3xl font-extrabold text-amber-200">Platelets</div>
          <p className="text-xs text-blood-100">Critical for cancer chemotherapy, dengue fever, and clotting disorders.</p>
        </div>
        <div className="space-y-2 p-4 border border-white/10 rounded-2xl bg-white/5">
          <div className="text-3xl font-extrabold text-blue-200">Plasma</div>
          <p className="text-xs text-blood-100">Essential for severe burn victims, shock, and liver failure patients.</p>
        </div>
      </div>

      {/* Myths vs Facts Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Debunking Common Donation Myths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mythsVsFacts.map((item, index) => (
            <div key={index} className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-sm space-y-4">
              <div className="flex items-start gap-3 text-red-600 dark:text-red-400">
                <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider font-bold block mb-1">Myth #{index + 1}</strong>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.myth}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-emerald-600 dark:text-emerald-400 pt-3 border-t border-gray-100 dark:border-navy-800">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider font-bold block mb-1">Medical Fact</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.fact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
