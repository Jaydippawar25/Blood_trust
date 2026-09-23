import React, { createContext, useContext, useState } from 'react';

const SiteContentContext = createContext();

const defaultContent = {
  // Hero Slider Data
  slides: [
    {
      id: 0,
      titleLine1: 'Bombay Blood Group Org',
      titleLine2: 'National ',
      titleHighlight: 'Award Function',
      subtitle: 'Recognizing excellence in voluntary blood donation and lifesaving social services.',
      bgImage: '/images/slider/slide1.jpg'
    },
    {
      id: 1,
      titleLine1: 'Felicitation by Governor',
      titleLine2: 'Honored for ',
      titleHighlight: 'Selfless Service',
      subtitle: 'Honored by Hon\'ble Governor of Maharashtra Bhagat Singh Koshyari for outstanding social work.',
      bgImage: '/images/slider/slide2.jpg'
    },
    {
      id: 2,
      titleLine1: 'National Award 2018',
      titleLine2: 'Saving Lives ',
      titleHighlight: 'Together',
      subtitle: 'Celebrating voluntary blood donors and organizers recognized at the National Award function.',
      bgImage: '/images/slider/slide3.jpg'
    },
    {
      id: 3,
      titleLine1: 'Every Drop Counts',
      titleLine2: 'Our Dedicated ',
      titleHighlight: 'Donor Network',
      subtitle: 'Empowering communities with 100% safe, certified, and voluntary blood donation camps.',
      bgImage: '/images/slider/slide4.jpg'
    }
  ],

  // About Us Section
  aboutUs: {
    badge: 'ABOUT US',
    title: 'We Are Here to Save Lives',
    desc: 'Blood Trust is a non-profit organization working tirelessly to bridge the gap between blood donors and those in need. Together, we can build a healthier and stronger community.'
  },

  // Vision & Mission Section
  visionMission: {
    purposeBadge: 'OUR PURPOSE & CORE VALUES',
    mainTitle: 'Our Vision & Mission',
    mainDesc: 'Guided by compassion and dedication to build a safer, self-sufficient voluntary blood donor community.',
    visionTitle: 'Zero Lives Lost Due to Blood Shortage',
    visionDesc: 'To build a 100% voluntary, digitally synchronized blood donor network across the nation where no emergency patient ever suffers due to non-availability of safe, compatible blood.',
    visionPoint1: '100% Voluntary Blood Donor Community',
    visionPoint2: 'Seamless Regional Hospital Connectivity',
    visionPoint3: 'Transparent & Safe Health Protocols',
    missionTitle: 'Mobilizing Donors & Empowering Communities',
    missionDesc: 'To empower citizens with accessible donor tools, organize regular blood donation drives, educate youth, and rapidly connect willing donors with partner healthcare institutions in critical moments.',
    missionPoint1: 'Verified Digital Lifesaver Registry',
    missionPoint2: 'Community & Corporate Blood Camps',
    missionPoint3: '24/7 Rapid Lifesaver Matching'
  },

  // Key Statistics
  stats: {
    happyDonors: '25,000+',
    unitsDonated: '18,500+',
    partnerHospitals: '120+',
    campsCount: '250+'
  },

  // Media Gallery Items
  galleryItems: [
    {
      id: 1,
      title: 'आप्पासाहेब घोरपडे पुरस्काराने सन्मानित',
      subtitle: 'अकोले तालुक्यात सामाजिक कार्यात उत्कृष्ट योगदानाबद्दल आदरांजली व विशेष गौरव पुरस्कार.',
      date: 'Dec 08, 2021',
      location: 'Pusegaon, Satara',
      src: '/images/gallery/newspaper1.jpg',
      tag: 'State & National Awards'
    },
    {
      id: 2,
      title: 'बॉम्बे ब्लड ग्रुप : सिंधुदुर्गात ६६ वे रक्तदान; सपत्नीक सत्कार',
      subtitle: 'मालवण तालुक्यातील आचरा येथील रहीवासी विक्रम यादव यांनी ६६ वे दुर्मिळ रक्तदान केले.',
      date: 'June 14, 2022',
      location: 'Sakal News, Mumbai / Sangli',
      src: '/images/gallery/newspaper2.jpg',
      tag: 'Awareness Drive'
    },
    {
      id: 3,
      title: 'राज्यपाल भगतसिंह कोश्यारी यांच्याहस्ते विशेष सन्मान',
      subtitle: 'राजभवन मुंबई येथे आयोजित भव्य सोहळ्यात सामाजिक सेवेबद्दल राज्यपालांच्या हस्ते सन्मानित.',
      date: 'Dec 19, 2020',
      location: 'Raj Bhavan, Mumbai',
      src: '/images/gallery/newspaper3.jpg',
      tag: 'State & National Awards'
    },
    {
      id: 4,
      title: 'विष्णुदास भावे नाट्यगृहात कर्तव्यदक्ष पुरस्कार वितरण',
      subtitle: 'सांगली येथील नाट्यगृहात सामाजिक व आरोग्य क्षेत्रातील अतुलनीय कामगिरीचा गौरव.',
      date: 'Dec 30, 2019',
      location: 'Vishnudas Bhave Natyagruha, Sangli',
      src: '/images/gallery/newspaper4.jpg',
      tag: 'State & National Awards'
    },
    {
      id: 5,
      title: 'सिंधुदुर्ग जिल्हा रुग्णालयात दुर्मिळ बॉम्बे ग्रुप रक्तदान',
      subtitle: 'आणीबाणीच्या प्रसंगी तातडीने धावून जात रुग्णाचे प्राण वाचवणारे ऐतिहासिक रक्तदान शिबीर.',
      date: 'Oct 03, 2021',
      location: 'Sindhudurg District Hospital',
      src: '/images/gallery/newspaper5.jpg',
      tag: 'Blood Drives'
    },
    {
      id: 6,
      title: 'भारतातील १७९ दुर्मिळ बॉम्बे रक्तदात्यांपैकी एक मानाचा तुरा',
      subtitle: 'सकाळ वृत्तसेवा: मुंबई व सांगली येथील विशेष वार्तांकन व प्रेरणादायी सामाजिक प्रवास.',
      date: 'June 14, 2022',
      location: 'Sakal News, Mumbai',
      src: '/images/gallery/newspaper6.jpg',
      tag: 'Awareness Drive'
    }
  ],

  // Contact Us Page Content
  contactPage: {
    emergencyLine: '1800-BLOOD-HELP (1800-256-634)',
    emailInquiry: 'support@bloodtrust.org',
    headquarters: 'Blood Trust Medical Plaza, Suite 400, Healthcare District',
    description: 'Our 24/7 national blood emergency hotline is monitored continuously by medical dispatchers.'
  },

  // Blood Camps Page Subtitle
  campsPage: {
    subtitle: 'Locate mobile blood donation camps, register for donation slots, or partner with us to organize a blood camp at your corporate office, college, or community center.'
  },

  // Eligibility Page Subtitle & Descriptions
  eligibilityPage: {
    subtitle: 'Donating blood is a simple, safe and life-saving act. Check your health eligibility questionnaire down below.',
    ageDesc: 'Between 18 and 65 years old (17 with parental consent in select regions).',
    weightDesc: 'At least 50 kg (110 lbs) for standard 450ml donation.',
    hemoDesc: 'Minimum 12.5 g/dL tested on-site prior to donation.',
    intervalDesc: '90 days (3 months) for men; 120 days (4 months) for women.'
  },

  // About Us Page CMS (Title, Subtitle, Purpose & Core Values, & 4 Stat Cards)
  aboutPage: {
    title: 'About Us',
    highlight: 'Blood Trust',
    subtitle: 'Blood Trust is a non-profit voluntary blood donor network connecting willing donors with certified partner hospitals.',
    purposeTitle: 'OUR PURPOSE & CORE VALUES',
    purposeDesc1: 'To build a 100% voluntary, digitally synchronized blood donor network across the nation where no emergency patient ever suffers due to non-availability of safe, compatible blood.',
    purposeDesc2: 'To empower citizens with accessible donor tools, organize regular blood donation drives, educate youth, and rapidly connect willing donors with partner healthcare institutions in critical moments.',
    aboutStatCards: [
      { id: 1, val: '100%', label: 'Total Registered Donors', icon: 'Users', color: 'blood' },
      { id: 2, val: '200+', label: 'Partner Hospitals', icon: 'Building', color: 'blue' },
      { id: 3, val: 'Zero', label: 'Commercial Fees', icon: 'Shield', color: 'purple' },
      { id: 4, val: 'ISO', label: 'Certified Protocol', icon: 'Award', color: 'emerald' }
    ]
  },

  // Donate Blood Page CMS
  donatePage: {
    title: 'Donor Registration',
    subtitle: 'Join the life-saving network. It takes less than 2 minutes.'
  },

  // Gallery Page Header CMS
  galleryPageHeader: {
    badge: 'BLOOD TRUST PRESS ARCHIVES',
    title: 'Our Media & Press Gallery',
    subtitle: 'Authentic press clippings, Governor felicitations, and national recognition awards celebrating our voluntary blood donation drives and rare Bombay blood group lifesaver initiatives.'
  }
};

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('site_custom_content');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch (e) {
      return defaultContent;
    }
  });

  const updateSection = (sectionKey, newSectionData) => {
    setContent(prev => {
      const updated = { ...prev, [sectionKey]: newSectionData };
      localStorage.setItem('site_custom_content', JSON.stringify(updated));
      return updated;
    });
  };

  const updateGalleryItem = (itemId, updatedFields) => {
    setContent(prev => {
      const updatedGallery = prev.galleryItems.map(item =>
        item.id === itemId ? { ...item, ...updatedFields } : item
      );
      const updated = { ...prev, galleryItems: updatedGallery };
      localStorage.setItem('site_custom_content', JSON.stringify(updated));
      return updated;
    });
  };

  const updateSlideItem = (slideId, updatedFields) => {
    setContent(prev => {
      const updatedSlides = prev.slides.map(s =>
        s.id === slideId ? { ...s, ...updatedFields } : s
      );
      const updated = { ...prev, slides: updatedSlides };
      localStorage.setItem('site_custom_content', JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefault = () => {
    localStorage.removeItem('site_custom_content');
    setContent(defaultContent);
  };

  return (
    <SiteContentContext.Provider value={{
      content,
      updateSection,
      updateGalleryItem,
      updateSlideItem,
      resetToDefault
    }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
