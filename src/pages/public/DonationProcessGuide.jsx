import React from 'react';
import { UserCheck, Stethoscope, Heart, Coffee, ShieldAlert } from 'lucide-react';

export default function DonationProcessGuide() {
  const steps = [
    {
      icon: UserCheck,
      title: "1. Donor Registration & Consent",
      desc: "Fill out a quick digital or paper donor questionnaire detailing basic health history, contact information, and consent."
    },
    {
      icon: Stethoscope,
      title: "2. Mini-Health Checkup",
      desc: "A medical practitioner tests your hemoglobin (drop of blood), checks blood pressure, pulse rate, body temperature, and weight."
    },
    {
      icon: Heart,
      title: "3. Blood Collection",
      desc: "Relax in a comfortable reclining chair while ~450ml of blood is collected using a sterile single-use needle. Takes only 8–10 minutes."
    },
    {
      icon: Coffee,
      title: "4. Refreshments & Rest",
      desc: "Rest for 10–15 minutes while enjoying juices, biscuits, and hydration snacks to quickly replenish body fluids before departure."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Step-by-Step <span className="text-blood-600">Donation Process</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          What to expect from arrival to departure. Safe, seamless, and comfortable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div key={idx} className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 space-y-4 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blood-100 dark:bg-blood-950/60 text-blood-600 flex items-center justify-center">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Pre & Post Donation Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 space-y-4">
          <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">Before Donating (Pre-Donation)</h2>
          <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
            <li>• Drink plenty of water or non-alcoholic fluids before arriving.</li>
            <li>• Eat a healthy, low-fat meal within 2–3 hours of donation.</li>
            <li>• Get a good night's sleep (7–8 hours).</li>
            <li>• Bring a valid government photo ID.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/40 p-8 rounded-3xl border border-blue-100 dark:border-blue-900 space-y-4">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200">After Donating (Post-Donation)</h2>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li>• Keep the needle bandage on for at least 4 hours.</li>
            <li>• Drink extra fluids throughout the remainder of the day.</li>
            <li>• Avoid heavy lifting or strenuous exercise for 24 hours.</li>
            <li>• If feeling lightheaded, sit down or lie down with legs elevated.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
