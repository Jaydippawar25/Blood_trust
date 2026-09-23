import React from 'react';
import { Heart, Activity, Smile, ShieldCheck, Zap } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Heart,
      title: "Cardiovascular Health",
      desc: "Regular blood donation helps reduce iron overload in the blood, which can lower the risk of heart attacks and arterial blockages."
    },
    {
      icon: Activity,
      title: "Free Mini-Health Screening",
      desc: "Prior to every donation, staff test your pulse, blood pressure, body temperature, and hemoglobin level—acting as a free routine checkup."
    },
    {
      icon: Zap,
      title: "Stimulates Blood Cell Production",
      desc: "After donating red blood cells, your bone marrow is stimulated to synthesize fresh, vibrant new blood cells."
    },
    {
      icon: Smile,
      title: "Psychological Wellbeing",
      desc: "Knowing your donation directly saved up to three lives releases endorphins, reducing stress and improving mental wellbeing."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Health & Psychological <span className="text-blood-600">Benefits</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Donating blood isn't just a gift to patients—it benefits the donor's body and mind too.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-gray-100 dark:border-navy-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blood-100 dark:bg-blood-950/60 text-blood-600 flex items-center justify-center">
                <IconComp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
