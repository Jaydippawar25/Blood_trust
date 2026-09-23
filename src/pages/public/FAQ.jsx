import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How often can I donate whole blood?",
      a: "Healthy male donors can donate whole blood once every 90 days (3 months). Female donors can donate once every 120 days (4 months) to allow adequate time for iron store recovery."
    },
    {
      q: "What is the difference between donating whole blood and platelets?",
      a: "Whole blood donation collects all components (RBC, plasma, platelets) in 8–10 minutes. Plateletpheresis selectively collects platelets while returning red blood cells to your body, taking ~60–90 minutes. Platelet donors can donate more frequently (every 14 days)."
    },
    {
      q: "How does Blood Trust ensure my privacy and medical data security?",
      a: "Blood Trust enforces strict Role-Based Access Control (RBAC) via Firebase Authentication and Firestore Security Rules. Only authorized medical staff can view health screening logs, and medical documents are stored securely with encrypted storage buckets."
    },
    {
      q: "Can I donate if I am taking prescription medication?",
      a: "Most common medications (such as birth control, blood pressure control, or allergy pills) do NOT disqualify you. However, antibiotics, blood thinners, or acne treatments like Accutane require temporary deferrals."
    },
    {
      q: "How do I receive my Blood Donation Certificate and Donor Card?",
      a: "After a completed and verified donation at any partner blood bank, your digital Donor Card with a unique QR code is immediately available in your Donor Portal. A personalized PDF Donation Certificate is generated for download."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Frequently Asked <span className="text-blood-600">Questions</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Got questions? We've got clear, evidence-based answers.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-800 overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 dark:text-white hover:text-blood-600 dark:hover:text-blood-400 transition"
              >
                <span className="flex items-center gap-3 text-base sm:text-lg">
                  <HelpCircle className="w-5 h-5 text-blood-600 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blood-600' : 'text-gray-400'}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-navy-800">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
