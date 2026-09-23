import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { CheckSquare, AlertTriangle, ShieldCheck, Calendar, Scale, Activity } from 'lucide-react';

export default function EligibilityCriteria() {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const [answers, setAnswers] = useState({
    age: true,
    weight: true,
    hemoglobin: true,
    donationGap: true,
    tattoo: false,
    surgery: false,
    infection: false
  });

  const eligData = content.eligibilityPage || {};
  const isEligible = answers.age && answers.weight && answers.hemoglobin && answers.donationGap && !answers.tattoo && !answers.surgery && !answers.infection;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Donor <span className="text-blood-600">{t('checkEligibility')}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {eligData.subtitle || t('whoCanDonateDesc')}
        </p>
      </div>

      {/* Basic Criteria Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 text-center space-y-3">
          <Calendar className="w-8 h-8 text-blood-600 mx-auto" />
          <h3 className="font-bold text-gray-900 dark:text-white">{t('ageLimit')}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">{eligData.ageDesc || t('ageLimitDesc')}</p>
        </div>

        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 text-center space-y-3">
          <Scale className="w-8 h-8 text-blood-600 mx-auto" />
          <h3 className="font-bold text-gray-900 dark:text-white">{t('minWeight')}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">{eligData.weightDesc || t('minWeightDesc')}</p>
        </div>

        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 text-center space-y-3">
          <Activity className="w-8 h-8 text-blood-600 mx-auto" />
          <h3 className="font-bold text-gray-900 dark:text-white">{t('hemoglobinLevel')}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">{eligData.hemoDesc || t('hemoglobinLevelDesc')}</p>
        </div>

        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 text-center space-y-3">
          <ShieldCheck className="w-8 h-8 text-blood-600 mx-auto" />
          <h3 className="font-bold text-gray-900 dark:text-white">{t('donationInterval')}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">{eligData.intervalDesc || t('donationIntervalDesc')}</p>
        </div>
      </div>

      {/* Interactive Self-Screening Tool */}
      <div className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-gray-100 dark:border-navy-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-blood-600" />
          {t('whoCanDonate')}
        </h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-950 rounded-xl cursor-pointer">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('qAge')}</span>
            <input type="checkbox" checked={answers.age} onChange={e => setAnswers({ ...answers, age: e.target.checked })} className="w-5 h-5 accent-blood-600 rounded" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-950 rounded-xl cursor-pointer">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('qWeight')}</span>
            <input type="checkbox" checked={answers.weight} onChange={e => setAnswers({ ...answers, weight: e.target.checked })} className="w-5 h-5 accent-blood-600 rounded" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-950 rounded-xl cursor-pointer">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('qGap')}</span>
            <input type="checkbox" checked={answers.donationGap} onChange={e => setAnswers({ ...answers, donationGap: e.target.checked })} className="w-5 h-5 accent-blood-600 rounded" />
          </label>
        </div>

        <div className={`p-6 rounded-2xl flex items-center gap-4 ${isEligible ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {isEligible ? <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-8 h-8 text-red-600 shrink-0" />}
          <div>
            <h4 className="font-extrabold text-base">{isEligible ? t('eligibleSuccessTitle') : t('ineligibleTitle')}</h4>
            <p className="text-xs mt-1">{isEligible ? t('eligibleSuccessDesc') : t('ineligibleDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
