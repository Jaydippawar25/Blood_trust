import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { 
  Camera, 
  Video, 
  Play, 
  X, 
  Calendar, 
  MapPin, 
  Filter, 
  Maximize2, 
  Heart, 
  Award, 
  Sparkles,
  Search,
  Newspaper
} from 'lucide-react';

export default function Gallery() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photo' | 'video' | 'camp' | 'awareness' | 'award'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Authentic Press & Newspaper Clippings Data (Replacing demo photos)
  const mediaItems = [
    {
      id: 1,
      type: 'photo',
      category: 'award',
      title: t('gItem1Title'),
      subtitle: t('gItem1Sub'),
      date: 'Dec 08, 2021',
      location: 'Pusegaon, Satara',
      src: '/images/gallery/newspaper1.jpg',
      tag: t('awards')
    },
    {
      id: 2,
      type: 'photo',
      category: 'awareness',
      title: t('gItem2Title'),
      subtitle: t('gItem2Sub'),
      date: 'June 14, 2022',
      location: 'Sakal News, Mumbai / Sangli',
      src: '/images/gallery/newspaper2.jpg',
      tag: t('awareness')
    },
    {
      id: 3,
      type: 'photo',
      category: 'award',
      title: t('gItem3Title'),
      subtitle: t('gItem3Sub'),
      date: 'Dec 19, 2020',
      location: 'Raj Bhavan, Mumbai',
      src: '/images/gallery/newspaper3.jpg',
      tag: t('awards')
    },
    {
      id: 4,
      type: 'photo',
      category: 'award',
      title: t('gItem4Title'),
      subtitle: t('gItem4Sub'),
      date: 'Dec 30, 2019',
      location: 'Vishnudas Bhave Natyagruha, Sangli',
      src: '/images/gallery/newspaper4.jpg',
      tag: t('awards')
    },
    {
      id: 5,
      type: 'photo',
      category: 'camp',
      title: t('gItem5Title'),
      subtitle: t('gItem5Sub'),
      date: 'Oct 03, 2021',
      location: 'Sindhudurg District Hospital',
      src: '/images/gallery/newspaper5.jpg',
      tag: t('camps')
    },
    {
      id: 6,
      type: 'photo',
      category: 'awareness',
      title: t('gItem6Title'),
      subtitle: t('gItem6Sub'),
      date: 'June 14, 2022',
      location: 'Sakal News, Mumbai',
      src: '/images/gallery/newspaper6.jpg',
      tag: t('awareness')
    },
    {
      id: 7,
      type: 'photo',
      category: 'awareness',
      title: t('gItem7Title'),
      subtitle: t('gItem7Sub'),
      date: 'June 14, 2022',
      location: 'Tarun Bharat, Mumbai',
      src: '/images/gallery/newspaper7.jpg',
      tag: t('awareness')
    },
    {
      id: 8,
      type: 'photo',
      category: 'award',
      title: t('gItem8Title'),
      subtitle: t('gItem8Sub'),
      date: 'Dec 17, 2021',
      location: 'Manjande, Tasgaon',
      src: '/images/gallery/newspaper8.jpg',
      tag: t('awards')
    },
    {
      id: 9,
      type: 'photo',
      category: 'camp',
      title: t('gItem9Title'),
      subtitle: t('gItem9Sub'),
      date: 'June 21, 2023',
      location: 'Sangli District',
      src: '/images/gallery/newspaper9.jpg',
      tag: t('camps')
    },
    {
      id: 10,
      type: 'photo',
      category: 'awareness',
      title: t('gItem10Title'),
      subtitle: t('gItem10Sub'),
      date: 'Jan 15, 2020',
      location: 'Mid-day Press Feature, Pune',
      src: '/images/gallery/newspaper10.jpg',
      tag: t('awareness')
    },
    {
      id: 11,
      type: 'photo',
      category: 'camp',
      title: t('gItem11Title'),
      subtitle: t('gItem11Sub'),
      date: 'Feb 09, 2025',
      location: 'Bijapur, Karnataka / Sangli',
      src: '/images/gallery/newspaper11.jpg',
      tag: t('camps')
    },
    {
      id: 12,
      type: 'photo',
      category: 'camp',
      title: t('gItem12Title'),
      subtitle: t('gItem12Sub'),
      date: 'March 10, 2025',
      location: 'Babaleshwar, Karnataka',
      src: '/images/gallery/newspaper12.jpg',
      tag: t('camps')
    },
    {
      id: 13,
      type: 'photo',
      category: 'awareness',
      title: t('gItem13Title'),
      subtitle: t('gItem13Sub'),
      date: 'April 05, 2024',
      location: 'Tasgaon, Sangli',
      src: '/images/gallery/newspaper13.jpg',
      tag: t('awareness')
    },
    {
      id: 14,
      type: 'photo',
      category: 'camp',
      title: t('gItem14Title'),
      subtitle: t('gItem14Sub'),
      date: 'June 23, 2025',
      location: 'Apollo Hospital, Hyderabad',
      src: '/images/gallery/newspaper14.jpg',
      tag: t('camps')
    },
    {
      id: 15,
      type: 'photo',
      category: 'camp',
      title: t('gItem15Title'),
      subtitle: t('gItem15Sub'),
      date: 'Sept 03, 2025',
      location: 'Kavathepiran, Miraj',
      src: '/images/gallery/newspaper15.jpg',
      tag: t('camps')
    },
    {
      id: 16,
      type: 'photo',
      category: 'award',
      title: t('gItem16Title'),
      subtitle: t('gItem16Sub'),
      date: 'July 25, 2025',
      location: 'Dhanbad, Jharkhand',
      src: '/images/gallery/newspaper16.jpg',
      tag: t('awards')
    },
    {
      id: 17,
      type: 'photo',
      category: 'camp',
      title: t('gItem17Title'),
      subtitle: t('gItem17Sub'),
      date: 'May 12, 2024',
      location: 'Bijapur Hospital, Karnataka',
      src: '/images/gallery/newspaper17.jpg',
      tag: t('camps')
    },
    {
      id: 18,
      type: 'photo',
      category: 'awareness',
      title: t('gItem18Title'),
      subtitle: t('gItem18Sub'),
      date: 'August 18, 2024',
      location: 'Bharati Hospital Miraj, Sangli',
      src: '/images/gallery/newspaper18.jpg',
      tag: t('awareness')
    },
    {
      id: 19,
      type: 'photo',
      category: 'awareness',
      title: t('gItem19Title'),
      subtitle: t('gItem19Sub'),
      date: 'June 14, 2026',
      location: 'Delhi, Raipur, Solapur, Pune, Mumbai',
      src: '/images/gallery/newspaper19.jpg',
      tag: t('awareness')
    },
    {
      id: 20,
      type: 'photo',
      category: 'award',
      title: t('gItem20Title'),
      subtitle: t('gItem20Sub'),
      date: 'June 30, 2026',
      location: 'Malad, Mumbai',
    }
  ];

  const isEn = language === 'en';
  const galleryHeader = content?.galleryPageHeader || {};
  const defaultBadge = 'BLOOD TRUST PRESS ARCHIVES';
  const defaultTitle = 'Our Media & Press Gallery';
  const defaultSub = 'Authentic press clippings, Governor felicitations, and national recognition awards celebrating our voluntary blood donation drives and rare Bombay blood group lifesaver initiatives.';

  const displayBadge = (!isEn || !galleryHeader.badge || galleryHeader.badge === defaultBadge)
    ? t('mediaRecognition')
    : galleryHeader.badge;

  const displayTitle = (!isEn || !galleryHeader.title || galleryHeader.title === defaultTitle)
    ? t('ourGallery')
    : galleryHeader.title;

  const displaySubtitle = (!isEn || !galleryHeader.subtitle || galleryHeader.subtitle === defaultSub)
    ? t('gallerySubtitle') || t('gallerySub')
    : galleryHeader.subtitle;

  // Merge CMS edits and additions from context
  const cmsItems = content?.galleryItems || [];
  const cmsMap = new Map(cmsItems.map(i => [i.id, i]));
  const existingIds = new Set(mediaItems.map(i => i.id));
  const newCmsItems = cmsItems.filter(i => !existingIds.has(i.id)).map(i => ({
    id: i.id,
    type: i.type || 'photo',
    category: i.category || 'camp',
    title: i.title,
    subtitle: i.subtitle,
    date: i.date || 'Today',
    location: i.location || 'Mumbai / Sangli',
    src: i.src,
    tag: i.tag || 'Blood Drives'
  }));

  const dynamicMediaItems = [
    ...mediaItems.map(item => {
      const cms = cmsMap.get(item.id);

      // When language is not English, use localized translation keys t(...) for item titles and subtitles
      if (!isEn) {
        const itemTitleKey = `gItem${item.id}Title`;
        const itemSubKey = `gItem${item.id}Sub`;
        const translatedTitle = t(itemTitleKey);
        const translatedSub = t(itemSubKey);

        return {
          ...item,
          title: (translatedTitle !== itemTitleKey) ? translatedTitle : (cms?.title || item.title),
          subtitle: (translatedSub !== itemSubKey) ? translatedSub : (cms?.subtitle || item.subtitle),
          date: cms?.date || item.date,
          location: cms?.location || item.location,
          src: cms?.src || item.src,
          tag: item.tag || cms?.tag
        };
      }

      if (!cms) return item;
      return {
        ...item,
        title: cms.title || item.title,
        subtitle: cms.subtitle || item.subtitle,
        date: cms.date || item.date,
        location: cms.location || item.location,
        src: cms.src || item.src,
        tag: cms.tag || item.tag,
      };
    }),
    ...newCmsItems
  ];

  // Filtering Logic
  const filteredItems = dynamicMediaItems.filter(item => {
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'photo' && item.type === 'photo') ||
      (activeTab === 'video' && item.type === 'video') ||
      (activeTab === item.category);

    const matchesSearch = 
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-[#800000] to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-xl relative overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-red-600/10 blur-3xl -top-20 -left-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-300 text-xs font-extrabold uppercase tracking-widest">
            <Newspaper className="w-4 h-4 text-rose-400" />
            <span>{displayBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {displayTitle}
          </h1>

          <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
            {displaySubtitle}
          </p>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: t('allMedia'), icon: Sparkles },
              { id: 'photo', label: t('photos'), icon: Newspaper },
              { id: 'camp', label: t('camps'), icon: Heart },
              { id: 'awareness', label: t('awareness'), icon: Sparkles },
              { id: 'award', label: t('awards'), icon: Award }
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === tab.id
                      ? 'bg-[#800000] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t('searchGallery')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#800000] focus:bg-white transition"
            />
          </div>

        </div>

        {/* 3. MEDIA GALLERY GRID */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800">No newspaper clippings found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search query or filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Thumbnail Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 flex items-center justify-center p-2">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                  />

                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-extrabold shadow border border-white/10">
                    <Newspaper className="w-3 h-3 text-amber-400" />
                    <span>{t('mediaPhotoBadge')}</span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#800000]/90 text-white text-[10px] font-extrabold shadow">
                    {item.tag}
                  </div>

                  {/* Overlay Zoom Button */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                      <Maximize2 className="w-6 h-6 text-[#800000]" />
                    </div>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-[#800000] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="truncate max-w-[160px]">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. INTERACTIVE LIGHTBOX & HIGH-RES PHOTO MODAL */}
      {selectedMedia && (
        <div 
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col md:grid md:grid-cols-12"
          >
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-red-600 transition shadow-xl border border-white/10"
              title="Close Preview"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* High Res Full Media Display (No inner scrolling, 100% image visibility) */}
            <div className="md:col-span-7 lg:col-span-8 bg-slate-950 p-3 sm:p-5 flex items-center justify-center min-h-[260px] h-[45vh] md:h-[75vh] relative shrink-0">
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="w-full h-full max-h-full max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Details Section */}
            <div className="md:col-span-5 lg:col-span-4 p-5 sm:p-6 md:p-7 space-y-4 bg-slate-900 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[75vh]">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 pr-8">
                  <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[11px] font-extrabold uppercase tracking-wider">
                    {selectedMedia.tag}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedMedia.date}
                  </span>
                </div>

                <h2 className="text-base sm:text-xl font-black text-white leading-tight">
                  {selectedMedia.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedMedia.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-rose-400 font-bold">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">{selectedMedia.location}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
