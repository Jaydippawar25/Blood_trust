import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteContent } from "../../context/SiteContentContext";
import ScrollReveal from "../../components/common/ScrollReveal";
import {
  Droplet,
  Search,
  Heart,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  Activity,
  Users,
  Building,
  Calendar,
  Syringe,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Star,
  Camera,
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
  Newspaper,
  X
} from "lucide-react";

export default function Home() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Dynamic slides & gallery items from SiteContentContext (editable by Admin CMS)
  const slides = content.slides || [];
  const galleryPreviewPhotos = content.galleryItems || [];

  // Helper functions to get translated text for slides
  const getSlideTitle1 = (slide) => {
    if (!slide) return '';
    const key = `slide${slide.id + 1}Title1`;
    if (language !== 'en' && t(key) !== key) return t(key);
    return slide.titleLine1 || t(key);
  };
  const getSlideTitle2 = (slide) => {
    if (!slide) return '';
    const key = `slide${slide.id + 1}Title2`;
    if (language !== 'en' && t(key) !== key) return t(key);
    return slide.titleLine2 || t(key);
  };
  const getSlideHighlight = (slide) => {
    if (!slide) return '';
    const key = `slide${slide.id + 1}Highlight`;
    if (language !== 'en' && t(key) !== key) return t(key);
    return slide.titleHighlight || t(key);
  };
  const getSlideSubtitle = (slide) => {
    if (!slide) return '';
    const key = `slide${slide.id + 1}Sub`;
    if (language !== 'en' && t(key) !== key) return t(key);
    return slide.subtitle || t(key);
  };

  // Automatic slide progression every 5 seconds
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    if (!slides.length) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    if (!slides.length) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      review: t('testimonial1'),
    },
    {
      id: 2,
      name: "Priya Patel",
      review: t('testimonial2'),
    },
    {
      id: 3,
      name: "Amit Verma",
      review: t('testimonial3'),
    },
  ];

  const quickServices = [
    {
      id: 1,
      icon: Droplet,
      isFill: true,
      title: t('becomeDonor'),
      desc: t('becomeDonorDesc'),
      link: '/register',
      linkText: t('registerNow')
    },
    {
      id: 2,
      icon: ShieldCheck,
      isFill: false,
      title: t('checkEligibility'),
      desc: t('checkEligibilityCardDesc'),
      link: '/eligibility',
      linkText: t('checkNow')
    },
    {
      id: 3,
      icon: Headphones,
      isFill: false,
      title: t('contactUs'),
      desc: t('contactUsCardDesc'),
      link: '/contact',
      linkText: t('contactNow')
    },
    {
      id: 4,
      icon: Camera,
      isFill: false,
      title: t('gallery'),
      desc: t('viewGallery'),
      link: '/gallery',
      linkText: t('viewGallery')
    }
  ];

  const stats = [
    { id: 1, icon: Users, val: content.stats?.happyDonors || '25,000+', label: t('happyDonors') },
    { id: 2, icon: Droplet, isFill: true, val: content.stats?.unitsDonated || '18,500+', label: t('unitsDonated') },
    { id: 3, icon: Building, val: content.stats?.partnerHospitals || '120+', label: t('partnerHospitals') },
    { id: 4, icon: Heart, isFill: true, val: content.stats?.campsCount || '250+', label: t('campsCount') }
  ];

  const activeSlide = slides[currentSlide];

  return (
    <div className="space-y-12 pb-16 bg-slate-50 text-slate-900 font-sans">
      {/* 1. Compact Responsive Background Hero Slider */}
      <section className="relative h-[300px] sm:h-[420px] lg:h-[500px] xl:h-[560px] flex items-end justify-start pb-6 sm:pb-10 overflow-hidden bg-slate-950">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.titleHighlight}
              className="w-full h-full object-cover object-top sm:object-[center_30%] lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 sm:via-slate-950/35 to-transparent"></div>
          </div>
        ))}

        {/* Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-trustred-700 text-white items-center justify-center shadow-xl border border-white/20 transition duration-200"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-trustred-700 text-white items-center justify-center shadow-xl border border-white/20 transition duration-200"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-4 sm:pl-16 lg:pl-20 w-full relative z-20">
          <ScrollReveal animation="fade-down" duration={800}>
            <div className="max-w-xl space-y-2 sm:space-y-3 text-left text-white">
              
              <h1 className="space-y-0.5 sm:space-y-1">
                <div className="text-white text-xs sm:text-lg font-bold tracking-normal opacity-90">
                  {getSlideTitle1(activeSlide)}
                </div>
                <div className="text-white text-sm sm:text-xl lg:text-2xl font-black tracking-tight leading-tight drop-shadow-lg">
                  <span>{getSlideTitle2(activeSlide)}</span>
                  <span className="text-red-500 font-black ml-1.5 drop-shadow-[0_2px_10px_rgba(239,68,68,0.7)]">
                    {getSlideHighlight(activeSlide)}
                  </span>
                </div>
              </h1>

              <p className="hidden sm:block text-xs lg:text-sm text-slate-200 font-medium leading-normal drop-shadow max-w-lg">
                {getSlideSubtitle(activeSlide)}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-1">
                <Link
                  to="/register"
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold text-[10px] sm:text-xs shadow-lg flex items-center gap-1 transition hover:scale-105"
                >
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-white" />
                  <span>{t('donateNow')}</span>
                </Link>

                <Link
                  to="/eligibility"
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white font-semibold border border-white/30 text-[10px] sm:text-xs shadow-md transition flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  <span>{t('checkEligibility')}</span>
                </Link>
              </div>

              <div className="flex items-center gap-1.5 pt-1 sm:pt-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-5 h-1.5 sm:h-2 rounded-full bg-trustred-700"
                        : "w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/60 hover:bg-white"
                    }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. 4 Quick Service Cards Row with Staggered Scale-Up Animation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {quickServices.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <ScrollReveal
                key={srv.id}
                animation="scale-up"
                delay={idx * 120}
                duration={650}
              >
                <Link
                  to={srv.link}
                  className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-red-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-2 sm:space-y-3 flex flex-col justify-between h-full group cursor-pointer block"
                >
                  <div className="space-y-2">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-full bg-red-50 text-trustred-700 flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition duration-300">
                      <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${srv.isFill ? 'fill-current' : ''}`} />
                    </div>
                    <h3 className="font-extrabold text-xs sm:text-base text-slate-900 leading-tight group-hover:text-[#800000] transition">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                      {srv.desc}
                    </p>
                  </div>
                  <span className="inline-block text-[11px] sm:text-xs font-bold text-trustred-700 group-hover:underline pt-0.5">
                    {srv.linkText} &rarr;
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 3. Full-Width Red Background Statistics Banner with Flip-Up Staggered Animation */}
      <section className="bg-trustred-700 py-6 sm:py-10 shadow-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {stats.map((st, idx) => {
              const IconComp = st.icon;
              return (
                <ScrollReveal
                  key={st.id}
                  animation="flip-up"
                  delay={idx * 140}
                  duration={700}
                >
                  <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition duration-300 flex items-center gap-2.5 sm:gap-4 hover:scale-105">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-red-50 text-trustred-700 flex items-center justify-center shrink-0">
                      <IconComp className={`w-4 h-4 sm:w-6 sm:h-6 ${st.isFill ? 'fill-current' : ''}`} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-2xl font-extrabold text-slate-900 leading-tight">
                        {st.val}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-bold leading-tight">
                        {st.label}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "About Us - We Are Here to Save Lives" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4">
            <ScrollReveal animation="slide-left" duration={800}>
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-trustred-700">
                  {language !== 'en' ? t('aboutUsBadge') : (content.aboutUs?.badge || t('aboutUsBadge'))}
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  {language !== 'en' ? t('aboutUsTitle') : (content.aboutUs?.title || t('aboutUsTitle'))}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {language !== 'en' ? t('aboutUsDesc') : (content.aboutUs?.desc || t('aboutUsDesc'))}
                </p>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold text-xs shadow transition hover:scale-105"
                  >
                    <span>{t('knowMoreAboutUs')}</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <ScrollReveal animation="scale-up" duration={800}>
              <div className="w-48 h-48 rounded-full bg-red-50 flex items-center justify-center relative animate-soft-pulse">
                <div className="w-36 h-36 rounded-full bg-trustred-700 text-white flex items-center justify-center shadow-xl">
                  <Droplet className="w-20 h-20 fill-white text-white" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {[
              { id: 1, icon: ShieldCheck, title: t('safeSecure'), desc: t('safeSecureDesc') },
              { id: 2, icon: Users, title: t('trustedNetwork'), desc: t('trustedNetworkDesc') },
              { id: 3, icon: Headphones, title: t('support247'), desc: t('support247Desc') }
            ].map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <ScrollReveal
                  key={feat.id}
                  animation="slide-right"
                  delay={idx * 150}
                  duration={700}
                >
                  <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-trustred-700 flex items-center justify-center shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. "Our Media & Press Gallery" Section - 6-Box Responsive Grid */}
      <section className="bg-[#f8f1f2] py-10 sm:py-16 border-y border-red-100/80 my-6 sm:my-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <ScrollReveal animation="slide-left" duration={700}>
              <div className="space-y-2 max-w-2xl text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#800000] text-xs font-bold uppercase tracking-wider">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>{t('mediaRecognition')}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {t('ourGallery')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {t('gallerySubtitle')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" duration={700}>
              <div>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs sm:text-sm shadow-md transition hover:scale-105"
                >
                  <span>{t('viewGallery')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* 6-Box Responsive Grid (4 on mobile, 6 on desktop/tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {galleryPreviewPhotos.map((photo, idx) => {
              const photoTitle = language !== 'en' && t(`gItem${photo.id}Title`) !== `gItem${photo.id}Title` ? t(`gItem${photo.id}Title`) : photo.title;
              const photoSub = language !== 'en' && t(`gItem${photo.id}Sub`) !== `gItem${photo.id}Sub` ? t(`gItem${photo.id}Sub`) : photo.subtitle;
              return (
                <ScrollReveal
                  key={photo.id}
                  animation="fade-up"
                  delay={idx * 100}
                  duration={650}
                  className={idx >= 4 ? "hidden sm:block" : ""}
                >
                  <div
                    onClick={() => setSelectedMedia({ ...photo, title: photoTitle, subtitle: photoSub })}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-red-100/90 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1.5 cursor-pointer"
                  >
                    {/* Image Header Box */}
                    <div className="h-48 sm:h-52 overflow-hidden relative bg-slate-950 p-2 flex items-center justify-center shrink-0">
                      <img
                        src={photo.src}
                        alt={photoTitle}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="bg-[#800000]/95 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-md backdrop-blur-sm">
                          {t('pressClipping')}
                        </span>
                        <span className="bg-slate-900/85 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                          {photo.tag}
                        </span>
                      </div>

                      {/* Overlay Zoom Hint */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <div className="px-3.5 py-2 rounded-xl bg-white/90 text-slate-900 text-xs font-bold shadow-lg transform group-hover:scale-105 transition flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-[#800000]" />
                          <span>{t('viewFullDetails')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-[#800000] transition">
                          {photoTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-normal line-clamp-2">
                          {photoSub}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-500 font-semibold">
                        <div className="flex items-center gap-1 truncate text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[#800000] group-hover:text-red-700 font-bold shrink-0 group-hover:underline">
                          <span>{t('details')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* Lightbox Modal for Full Image & Complete Details */}
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

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-rose-400 font-bold">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="truncate">{selectedMedia.location}</span>
                  </div>

                  <Link
                    to="/gallery"
                    onClick={() => setSelectedMedia(null)}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-700/80 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>View All 20 Clippings in Gallery</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* 6. "Our Vision & Mission" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#800000]">
              {language !== 'en' ? t('ourPurpose') : (content.visionMission?.purposeBadge || t('ourPurpose'))}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language !== 'en' ? t('ourVisionMission') : (content.visionMission?.mainTitle || t('ourVisionMission'))}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
              {language !== 'en' ? t('ourVisionMissionDesc') : (content.visionMission?.mainDesc || t('ourVisionMissionDesc'))}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* OUR VISION CARD */}
          <ScrollReveal animation="slide-left" duration={800}>
            <div className="bg-gradient-to-br from-white to-red-50/50 p-6 sm:p-8 rounded-3xl border border-red-100 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#800000] text-white flex items-center justify-center shadow-lg shadow-red-950/20">
                  <Eye className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-100/80 px-2.5 py-1 rounded-full">
                    {t('ourVision')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {language !== 'en' ? t('visionTitle') : (content.visionMission?.visionTitle || t('visionTitle'))}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                    {language !== 'en' ? t('visionDesc') : (content.visionMission?.visionDesc || t('visionDesc'))}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-red-100/80 space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language !== 'en' ? t('visionPoint1') : (content.visionMission?.visionPoint1 || t('visionPoint1'))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language !== 'en' ? t('visionPoint2') : (content.visionMission?.visionPoint2 || t('visionPoint2'))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language !== 'en' ? t('visionPoint3') : (content.visionMission?.visionPoint3 || t('visionPoint3'))}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* OUR MISSION CARD */}
          <ScrollReveal animation="slide-right" duration={800}>
            <div className="bg-gradient-to-br from-white to-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-200/80 px-2.5 py-1 rounded-full">
                    {t('ourMission')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {language !== 'en' ? t('missionTitle') : (content.visionMission?.missionTitle || t('missionTitle'))}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                    {language !== 'en' ? t('missionDesc') : (content.visionMission?.missionDesc || t('missionDesc'))}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language !== 'en' ? t('missionPoint1') : (content.visionMission?.missionPoint1 || t('missionPoint1'))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language !== 'en' ? t('missionPoint2') : (content.visionMission?.missionPoint2 || t('missionPoint2'))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language !== 'en' ? t('missionPoint3') : (content.visionMission?.missionPoint3 || t('missionPoint3'))}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 7. "Who Can Donate Blood?" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal animation="scale-up" duration={750}>
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-red-100 shadow-sm hover:shadow-md transition space-y-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-trustred-800 tracking-tight">
                {t('whoCanDonate')}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                {t('whoCanDonateDesc')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/eligibility"
                className="px-6 py-3 rounded-xl bg-trustred-800 hover:bg-trustred-900 text-white font-extrabold text-xs shadow-md transition hover:scale-105"
              >
                {t('checkEligibility')}
              </Link>

              <Link
                to="/gallery"
                className="px-6 py-3 rounded-xl bg-white text-trustred-800 border-2 border-trustred-800 hover:bg-red-50 font-extrabold text-xs shadow-sm transition hover:scale-105"
              >
                {t('viewGallery')}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. "What Donors Say" Section with Staggered Fade Up */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="text-center">
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">
              {t('whatDonorsSay')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
          {testimonials.map((tItem, idx) => (
            <ScrollReveal
              key={tItem.id}
              animation="fade-up"
              delay={idx * 150}
              duration={700}
            >
              <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 space-y-2.5 sm:space-y-3 flex flex-col justify-between h-full hover:-translate-y-1">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-1 text-trustred-700">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{tItem.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2.5 sm:pt-3 border-t border-slate-50">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                    {tItem.name}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
