import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Droplet, Heart, Shield, Users, Award, Building } from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();

  const aboutData = content.aboutPage || {};
  const isEn = language === 'en';

  const defaultTitle = 'About Us';
  const defaultHighlight = 'Blood Trust';
  const defaultSubtitle = 'Blood Trust is a non-profit voluntary blood donor network connecting willing donors with certified partner hospitals.';
  const defaultPurposeTitle = 'OUR PURPOSE & CORE VALUES';
  const defaultPurposeDesc1 = 'To build a 100% voluntary, digitally synchronized blood donor network across the nation where no emergency patient ever suffers due to non-availability of safe, compatible blood.';
  const defaultPurposeDesc2 = 'To empower citizens with accessible donor tools, organize regular blood donation drives, educate youth, and rapidly connect willing donors with partner healthcare institutions in critical moments.';

  const displayTitle = (!isEn || !aboutData.title || aboutData.title === defaultTitle) 
    ? t('aboutPageTitle') 
    : aboutData.title;

  const displayHighlight = (!isEn || !aboutData.highlight || aboutData.highlight === defaultHighlight) 
    ? 'Blood Trust' 
    : aboutData.highlight;

  const displaySubtitle = (!isEn || !aboutData.subtitle || aboutData.subtitle === defaultSubtitle) 
    ? t('aboutPageSubtitle') 
    : aboutData.subtitle;

  const displayPurposeTitle = (!isEn || !aboutData.purposeTitle || aboutData.purposeTitle === defaultPurposeTitle) 
    ? t('aboutPagePurposeTitle') 
    : aboutData.purposeTitle;

  const displayPurposeDesc1 = (!isEn || !aboutData.purposeDesc1 || aboutData.purposeDesc1 === defaultPurposeDesc1) 
    ? t('aboutPagePurposeDesc1') 
    : aboutData.purposeDesc1;

  const displayPurposeDesc2 = (!isEn || !aboutData.purposeDesc2 || aboutData.purposeDesc2 === defaultPurposeDesc2) 
    ? t('aboutPagePurposeDesc2') 
    : aboutData.purposeDesc2;

  const rawCards = aboutData.aboutStatCards || [
    { id: 1, val: '100%', label: 'Total Registered Donors', icon: 'Users', color: 'blood' },
    { id: 2, val: '200+', label: 'Partner Hospitals', icon: 'Building', color: 'blue' },
    { id: 3, val: 'Zero', label: 'Commercial Fees', icon: 'Shield', color: 'purple' },
    { id: 4, val: 'ISO', label: 'Certified Protocol', icon: 'Award', color: 'emerald' },
  ];

  const cards = rawCards.map(card => {
    let label = card.label;
    if (!isEn) {
      if (card.id === 1 || card.label === 'Total Registered Donors') label = t('totalDonors');
      else if (card.id === 2 || card.label === 'Partner Hospitals') label = t('partnerHospitals');
      else if (card.id === 3 || card.label === 'Commercial Fees') label = t('zeroFees');
      else if (card.id === 4 || card.label === 'Certified Protocol') label = t('isoCertified');
    }
    return { ...card, label };
  });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Building': return <Building className="w-8 h-8 text-blue-600 mx-auto" />;
      case 'Shield': return <Shield className="w-8 h-8 text-purple-600 mx-auto" />;
      case 'Award': return <Award className="w-8 h-8 text-emerald-600 mx-auto" />;
      case 'Heart': return <Heart className="w-8 h-8 text-rose-600 mx-auto" />;
      default: return <Users className="w-8 h-8 text-blood-600 mx-auto" />;
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900', text: 'text-blue-600 dark:text-blue-400' };
      case 'purple': return { bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900', text: 'text-purple-600 dark:text-purple-400' };
      case 'emerald': return { bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900', text: 'text-emerald-600 dark:text-emerald-400' };
      default: return { bg: 'bg-blood-50 dark:bg-blood-950/40 border-blood-100 dark:border-blood-900', text: 'text-blood-600 dark:text-blood-400' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {displayTitle} <span className="text-blood-600">{displayHighlight}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {displaySubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-gray-100 dark:border-navy-800 space-y-4 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{displayPurposeTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {displayPurposeDesc1}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {displayPurposeDesc2}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {cards.map(card => {
            const cls = getColorClasses(card.color);
            return (
              <div key={card.id} className={`${cls.bg} p-6 rounded-2xl border text-center space-y-2`}>
                {getIcon(card.icon)}
                <div className={`text-2xl font-extrabold ${cls.text}`}>{card.val}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">{card.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
