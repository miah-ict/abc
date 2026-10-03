import React, { useState, useRef } from 'react';
import { FAQ_ITEMS, GALLERY_ITEMS, INITIAL_CENTERS, NEWS_ARTICLES } from '../data/mockData';
import { FAQItem, GalleryItem, NewsArticle } from '../types';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Same labels the Programs section passes to onOpenProgramEnroll
const HERO_PROGRAMS = [
  'Early Years (Ages 1 - 3)',
  'Preschool (Ages 3 - 4)',
  'Kindergarten (Ages 5 - 6)',
  'After School Care (Ages 6+)',
];

interface PublicWebsiteProps {
  onOpenAdmin: () => void;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onOpenJobApply: (jobTitle?: string) => void;
  onOpenStoryVideo: () => void;
  onOpenProgramEnroll: (programName: string) => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  onOpenAdmin,
  onOpenLogin,
  onOpenSignUp,
  onOpenJobApply,
  onOpenStoryVideo,
  onOpenProgramEnroll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header animation
    tl.fromTo(
      'header',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Hero Text animation
    tl.fromTo(
      '.hero-fade-up',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
      '-=0.5'
    );

    // Hero Image animation
    tl.fromTo(
      '.hero-img-anim',
      { scale: 0.95, opacity: 0, x: 20 },
      { scale: 1, opacity: 1, x: 0, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    );

    // Scroll Animations for sections
    const sections = ['#about', '#programs', '#gallery', '#news', '#contact'];
    
    sections.forEach((section) => {
      gsap.fromTo(
        `${section} .fade-up-scroll`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    });

    // Image scaling on scroll
    gsap.utils.toArray('.img-scale-scroll').forEach((img: any) => {
      gsap.fromTo(
        img,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
          },
        }
      );
    });
  }, { scope: containerRef });

  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Hero finder bar state
  const [heroCampus, setHeroCampus] = useState<string>(INITIAL_CENTERS[0]?.name ?? '');
  const [heroProgram, setHeroProgram] = useState<string>(HERO_PROGRAMS[0]);
  const [heroSchedule, setHeroSchedule] = useState<string>('Full Day');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(prev => (prev === id ? null : id));
  };

  const handleNextGallery = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrevGallery = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-700 antialiased selection:bg-indigo-100 selection:text-indigo-700">
      {/* BEGIN: Hero Shell (header + hero inside one rounded card, reference: lan.jpeg) */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pt-3 sm:pt-6 pb-10 sm:pb-14">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)]">
          {/* BEGIN: MainHeader */}
          <header className="relative z-30">
            <div className="px-6 sm:px-12 lg:px-20">
              <div className="flex items-center justify-between h-24">
                {/* Logo */}
                <a href="#home" id="nav-logo" className="text-2xl font-bold tracking-tight text-slate-950 font-display">
                  ABC Daycare
                </a>

                {/* Navigation + CTA */}
                <div className="flex items-center gap-10">
                  <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-slate-700">
                    {[
                      { label: 'About Us', href: '#about' },
                      { label: 'Programs', href: '#programs' },
                      { label: 'Gallery', href: '#gallery' },
                      { label: 'News', href: '#news' },
                      { label: 'Contact', href: '#contact' },
                    ].map((link) => (
                      <a
                        key={link.href}
                        id={`nav-${link.href.slice(1)}`}
                        href={link.href}
                        className="relative py-1 hover:text-slate-950 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-slate-950 after:transition-all hover:after:w-full"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="flex items-center gap-2">
                    <button
                      id="nav-signup"
                      onClick={onOpenSignUp}
                      className="hidden sm:inline-flex px-4 py-3 text-[15px] font-medium text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      Sign up
                    </button>
                    <button
                      id="nav-login"
                      onClick={onOpenLogin}
                      className="px-8 py-3.5 rounded-full bg-slate-950 text-white text-[15px] font-semibold hover:bg-slate-800 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* END: MainHeader */}

          {/* BEGIN: HeroSection */}
          <section id="home" className="relative flex flex-col lg:block lg:min-h-[720px]">
            {/* Cut-out building visual — bleeds off the right edge like the reference */}
            <div className="hero-img-anim pointer-events-none lg:absolute lg:right-0 lg:top-0 lg:bottom-24 lg:w-[56%] px-6 lg:px-0 order-2 lg:order-none mt-8 lg:mt-0">
              <img
                alt="Modern ABC school building with classrooms, playground and school bus"
                src="/images/hero-school.png"
                className="w-full h-[320px] sm:h-[420px] lg:h-full object-contain object-right-bottom mix-blend-multiply"
              />
            </div>

            {/* Copy */}
            <div className="relative z-10 order-1 lg:order-none px-6 sm:px-12 lg:px-20 pt-10 lg:pt-24 max-w-2xl hero-fade-up">
              <h1 className="font-display text-slate-950 tracking-tight leading-[1.05]">
                <span className="block text-5xl sm:text-6xl xl:text-7xl font-light">A Joyful Start to</span>
                <span className="block mt-2 text-5xl sm:text-6xl xl:text-7xl font-bold">Bright Futures</span>
              </h1>

              <p className="mt-8 max-w-md text-base sm:text-lg text-slate-500 leading-relaxed">
                Modern classrooms, caring teachers and a play-based curriculum that prepares every child for school
                and life.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                <button
                  id="hero-enroll-now"
                  onClick={onOpenSignUp}
                  className="px-10 py-4 rounded-full bg-slate-950 text-white text-[15px] font-semibold hover:bg-slate-800 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/20 cursor-pointer"
                >
                  Enroll Now
                </button>
                <button
                  id="hero-watch-story"
                  onClick={onOpenStoryVideo}
                  className="group inline-flex items-center gap-4 text-[15px] font-semibold text-slate-950 cursor-pointer"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-950 transition-all group-hover:bg-slate-950 group-hover:text-white">
                    <i className="fa-solid fa-play text-xs ml-0.5"></i>
                  </span>
                  Watch Our Story
                </button>
              </div>
            </div>

            {/* Floating finder bar */}
            <div className="relative z-20 order-3 lg:order-none px-4 sm:px-12 lg:px-20 mt-6 lg:mt-0 pb-8 lg:pb-0 lg:absolute lg:left-0 lg:right-[12%] lg:bottom-14 hero-fade-up hero-delay-2">
              <form
                id="hero-finder"
                onSubmit={(e) => {
                  e.preventDefault();
                  onOpenProgramEnroll(heroProgram);
                }}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 rounded-3xl bg-white p-3 md:p-4 md:pl-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5"
              >
                {[
                  {
                    id: 'hero-campus',
                    icon: 'fa-location-dot',
                    label: 'Campus',
                    value: heroCampus,
                    onChange: setHeroCampus,
                    options: INITIAL_CENTERS.map((c) => c.name),
                  },
                  {
                    id: 'hero-program',
                    icon: 'fa-shapes',
                    label: 'Program',
                    value: heroProgram,
                    onChange: setHeroProgram,
                    options: HERO_PROGRAMS,
                  },
                  {
                    id: 'hero-schedule',
                    icon: 'fa-clock',
                    label: 'Schedule',
                    value: heroSchedule,
                    onChange: setHeroSchedule,
                    options: ['Full Day', 'Half Day', 'After School'],
                  },
                ].map((field, i) => (
                  <label
                    key={field.id}
                    htmlFor={field.id}
                    className={`relative flex-1 cursor-pointer rounded-2xl px-4 py-3 md:py-1 md:px-6 hover:bg-slate-50 md:hover:bg-transparent transition-colors ${i > 0 ? 'md:border-l md:border-slate-200' : 'md:pl-0'
                      }`}
                  >
                    <span className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <i className={`fa-solid ${field.icon} text-[11px]`}></i>
                      {field.label}
                    </span>
                    <select
                      id={field.id}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="mt-1 w-full appearance-none bg-transparent pr-8 text-[15px] font-semibold text-slate-950 outline-none cursor-pointer truncate"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 md:right-6 bottom-4 md:bottom-2 text-xs text-slate-950"></i>
                  </label>
                ))}

                <button
                  id="hero-finder-submit"
                  type="submit"
                  aria-label="Find a program"
                  className="md:ml-4 flex h-14 md:w-14 shrink-0 items-center justify-center gap-2 rounded-2xl md:rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all hover:scale-105 cursor-pointer"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <span className="md:hidden font-semibold text-sm">Find a program</span>
                </button>
              </form>
            </div>
          </section>
          {/* END: HeroSection */}
        </div>
      </div>
      {/* END: Hero Shell */}

      {/* BEGIN: About & Why Us Combined */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pb-10 sm:pb-14">
        <section id="about" className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)] px-6 sm:px-12 lg:px-20 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 fade-up-scroll">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight font-display leading-[1.1]">
                A place where children feel{' '}
                <span className="relative whitespace-nowrap font-bold text-indigo-600">
                  loved and inspired
                  <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200" fill="none" preserveAspectRatio="none" viewBox="0 0 200 12">
                    <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md">
                We provide a safe, nurturing environment where children can learn, play, and develop with confidence.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 fade-up-scroll">
                {[
                  { icon: 'fa-shield-halved', label: 'Safe Environment' },
                  { icon: 'fa-graduation-cap', label: 'Quality Education' },
                  { icon: 'fa-heart', label: 'Caring Teachers' },
                  { icon: 'fa-shapes', label: 'Holistic Growth' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-indigo-600">
                      <i className={`fa-solid ${item.icon} text-lg`}></i>
                    </div>
                    <span className="font-semibold text-slate-900">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex items-center gap-8 fade-up-scroll">
                <button
                  onClick={() => onOpenStoryVideo()}
                  className="px-8 py-4 rounded-full bg-slate-950 text-white text-[15px] font-semibold hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Watch our story
                </button>
                <a href="#programs" className="text-[15px] font-semibold text-slate-950 hover:text-indigo-600 transition-colors">
                  View programs →
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7zxsnkINU_d-eCtlKlp2vgHEKOLp2t9YSK8y0juPrkL3Ss8L2fGZh4IqmxNWdbraBgdxy3-yghc4LgLS-w7Y1p97OBBdQbiOtBbqnGKS-TeCFsuj9hdDIWWhSwAPhOhF55UPmIAnhkEIR7POuJIMIw8MIxVygaHiYqlMkvqBRlLRgz62qmc79G9KBAjE3t5qSjT6MLxOGa-iK7anOXTyjWQbVj5Mned2nHetZg12iMBBBqGSKumk3"
                alt="School building"
                className="img-scale-scroll w-full h-64 lg:h-80 object-cover rounded-[2rem] mt-12"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnqwWiUkWvC5VMkJV5EM5mujX-Q2Vf1Equg1KUiDn3b_8mleC_TqIYnvCp30Ydp_cMUP0HJBX0R8KrbZmuIYR8vY4rKlW_PP2XtImKC23yw5nTiyk91ZR0Yrva1cF8DYpe8_9wHzfuNYJ8XLnjEB7Qx-GekJRMYVFQ7aL4_pLFkqVpBm3di9wS3qwX3y48SCwfkQaTzYPp0BlaxNN7l_N0bL4gdMT04gc_0sVdKG2AEux5-MhCx4y5"
                alt="Teacher with kids"
                className="img-scale-scroll w-full h-64 lg:h-80 object-cover rounded-[2rem]"
              />
            </div>
          </div>
        </section>
      </div>
      {/* END: About */}

      {/* BEGIN: Programs */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pb-10 sm:pb-14">
        <section id="programs" className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)] px-6 sm:px-12 lg:px-20 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto mb-20 fade-up-scroll">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight font-display leading-[1.1]">
              Learning through{' '}
              <span className="relative whitespace-nowrap font-bold text-indigo-600">
                play
                <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200" fill="none" preserveAspectRatio="none" viewBox="0 0 200 12">
                  <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                </svg>
              </span>
            </h2>
            <p className="mt-8 text-lg text-slate-500">
              Age-appropriate programs that build strong foundations for lifelong success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Early Years',
                age: 'Ages 1 - 3',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADBXj3xH9HFDGDp2JMk2eRi8JmR9eyDO9XZD-h9ShsRjt25Fa3NQfXBql2gcB7J_GYFZ9FlQdSV15kVrBccgL_ArO42Hd1TOAKbvpGFavywvOuQOXfLZKPyjGLYvde1ZnysXWStXOxTtvjZMaaWdwnmQ-VcinFYvWRWLb3iKOg0-097TcpfCPgnpAyZ8guaMbLzT69xOqG3U29ZqhjPE28pYeTwGdtOQ3rz6rgXeGb6f5Mkz-6nWaB',
                icon: 'fa-baby',
                desc: 'Gentle care and sensory learning.',
                val: 'Early Years (Ages 1 - 3)',
              },
              {
                title: 'Preschool',
                age: 'Ages 3 - 4',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqSWWz9K9ShD_cgr3JwHNUtziAK1VOWoIdyKfTbIb4isBe4OKXF2pCi8VptmXnZWPsfZE1ICrmzU4HCoCsFY6O7ySEC0eGgHoA7By4RumA7aVIf1UC4pQ99N_BmneVhlTAqROFYR5efMVMUilCEJpPZIFQKVRzOF3rVciw5jzS_09F6h8qnWxTthobHUhSjfGNASeWj_KveIYOXx6sPdnBphMU4j-jGRDHqi9gORowkNBMMW1Byzr-',
                icon: 'fa-cubes',
                desc: 'Building confidence and curiosity.',
                val: 'Preschool (Ages 3 - 4)',
              },
              {
                title: 'Kindergarten',
                age: 'Ages 5 - 6',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1SiqtmvugYPNu1WxNDNgKRiv2wXXaqaF4JiYjEVYOUvjrW_NlqD7qOR3PzARIVGRpEOpXTOQccL1JT4HIFE0u8IoRWrNBsv6hbDOvuixmL9RcFP17Ek7rOtR35nc7LmIYflFitPdVd4AYuxoCAzGDv4sXYkP0RBLggUimlYRAZnX2vQxGNRTkSrknddJnZh_16Py7chQm5BzRPhMBnWUPOO_RbdMiNvTOGeC7f_2MfFhCfb_t0ny-',
                icon: 'fa-pencil',
                desc: 'Preparing for school and life.',
                val: 'Kindergarten (Ages 5 - 6)',
              },
              {
                title: 'After School',
                age: 'Ages 6+',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC1-b5GF9CJwzOIpfM4YCQ7L3zpdUPZwTWHVe80fziQq3szf7tDrEZua_XTReWaNI6UW9NwNhLgJiYkKEDMNjUJZcqTR_rVcQO7UWUWvvA2Q9RKVYVHMh1qEPzCLaB8TreST5K6hdfo4dsdvy8G8pXEuKWAk7GPhewrkbh_OkOnDpRWPTvD2YHlTEF4lk9LH69qRuFVbwB80I-FbOMRIr2P96-wv7y0TiIZD8OsRAMbcqg9YSbGW76',
                icon: 'fa-futbol',
                desc: 'Fun, safe engaging activities.',
                val: 'After School Care (Ages 6+)',
              }
            ].map((prog) => (
              <div key={prog.title} className="group cursor-pointer fade-up-scroll" onClick={() => onOpenProgramEnroll(prog.val)}>
                <div className="relative h-64 overflow-hidden rounded-[2rem] mb-6 img-scale-scroll">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 h-12 w-12 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center text-slate-950">
                    <i className={`fa-solid ${prog.icon} text-xl`}></i>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-950 font-display">{prog.title}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">{prog.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{prog.age}</span>
                  <span className="text-sm font-semibold text-slate-950 group-hover:text-indigo-600 transition-colors">Enroll →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* END: Programs */}

      {/* BEGIN: Gallery */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pb-10 sm:pb-14">
        <section id="gallery" className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)] px-6 sm:px-12 lg:px-20 py-20 lg:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 fade-up-scroll">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight font-display leading-[1.1]">
                Moments that{' '}
                <span className="relative whitespace-nowrap font-bold text-indigo-600">
                  matter
                  <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200" fill="none" preserveAspectRatio="none" viewBox="0 0 200 12">
                    <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-500">
                A glimpse into our daily activities and happy memories.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button onClick={handlePrevGallery} className="w-12 h-12 rounded-full bg-slate-50 text-slate-950 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={handleNextGallery} className="w-12 h-12 rounded-full bg-slate-50 text-slate-950 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              <button className="px-8 py-3.5 rounded-full bg-slate-950 text-white text-[15px] font-semibold hover:bg-slate-800 transition-all cursor-pointer">
                View all
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group cursor-pointer fade-up-scroll"
              >
                <div className="h-64 overflow-hidden rounded-[2rem] relative mb-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="font-bold text-slate-950 font-display text-lg">{item.title}</h3>
                <span className="text-sm text-slate-500">{item.category}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* END: Gallery */}

      {/* BEGIN: News & FAQ Combined */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pb-10 sm:pb-14">
        <section id="news" className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)] px-6 sm:px-12 lg:px-20 py-20 lg:py-32">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            <div className="fade-up-scroll">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight font-display leading-[1.1]">
                Latest{' '}
                <span className="relative whitespace-nowrap font-bold text-indigo-600">
                  updates
                  <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200" fill="none" preserveAspectRatio="none" viewBox="0 0 200 12">
                    <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-500 mb-8">News and announcements from ABC Daycare.</p>

              <div className="space-y-8 fade-up-scroll">
                {NEWS_ARTICLES.slice(0, 2).map((article) => (
                  <div key={article.id} className="flex gap-6 group cursor-pointer" onClick={() => setSelectedNews(article)}>
                    <div className="w-32 h-32 shrink-0 rounded-[1.5rem] overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-600 mb-1 block">{article.date}</span>
                      <h3 className="text-xl font-bold text-slate-950 font-display mb-2 group-hover:text-indigo-600 transition-colors">{article.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{article.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-6">
                <button className="px-8 py-3.5 rounded-full bg-slate-950 text-white text-[15px] font-semibold hover:bg-slate-800 transition-all cursor-pointer">
                  All news
                </button>
                <a href="#careers" className="text-[15px] font-semibold text-slate-950 hover:text-indigo-600 transition-colors">
                  Join our team →
                </a>
              </div>
            </div>

            <div id="faq" className="fade-up-scroll">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight font-display leading-[1.1] mb-12">
                Common{' '}
                <span className="relative whitespace-nowrap font-bold text-indigo-600">
                  questions
                  <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200" fill="none" preserveAspectRatio="none" viewBox="0 0 200 12">
                    <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                </span>
              </h2>

              <div className="space-y-4">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div key={faq.id} className="border-b border-slate-100 pb-4">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left font-bold text-lg text-slate-950 py-2 cursor-pointer"
                      >
                        <span className="font-display pr-4">{faq.question}</span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                          <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} text-sm text-slate-950`}></i>
                        </div>
                      </button>
                      {isOpen && (
                        <div className="pt-2 text-slate-500 leading-relaxed text-base pr-8">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* END: News & FAQ */}

      {/* BEGIN: Contact */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pb-10 sm:pb-14">
        <section id="contact" className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.18)] px-6 sm:px-12 lg:px-20 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="fade-up-scroll">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight font-display leading-[1.1]">
                Let's get in{' '}
                <span className="relative whitespace-nowrap font-bold text-indigo-600">
                  touch
                  <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200" fill="none" preserveAspectRatio="none" viewBox="0 0 200 12">
                    <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-500 mb-12">
                We'd love to hear from you. Reach out to us anytime.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-950 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-950 font-display">+252 61 234 5678</h4>
                    <p className="text-sm text-slate-500">Call us</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-950 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-950 font-display">info@abcdaycare.so</h4>
                    <p className="text-sm text-slate-500">Email us</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-950 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-950 font-display">Mogadishu, Somalia</h4>
                    <p className="text-sm text-slate-500">8 Campuses</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 sm:p-12 rounded-[2rem] fade-up-scroll">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {messageSent ? (
                  <div className="p-6 bg-white rounded-[1.5rem] text-center border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fa-solid fa-check text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 font-display mb-2">Message Sent</h3>
                    <p className="text-slate-500 text-sm">Thank you! We will get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-950 font-display mb-6">Send a message</h3>
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-shadow"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-shadow"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="How can we help?"
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-shadow resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-slate-950 text-white text-[15px] font-semibold hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      Send Message
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* END: Contact */}

      {/* BEGIN: MainFooter */}
      <div className="bg-[#F4F5F7] px-3 sm:px-6 pb-10 sm:pb-14">
        <footer className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] bg-slate-950 text-white px-6 sm:px-12 lg:px-20 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
            <div className="lg:col-span-2 space-y-6">
              <a href="#home" className="text-3xl font-bold tracking-tight text-white font-display block">
                ABC Daycare
              </a>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Nurturing today's children for a brighter tomorrow. Providing high-quality care, foundational literacy, and inspired social play across Mogadishu.
              </p>
              <div className="flex items-center gap-4 pt-4">
                {['fa-facebook-f', 'fa-twitter', 'fa-instagram'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <i className={`fa-brands ${icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 font-display text-lg">Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">News</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 font-display text-lg">Account</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><button onClick={onOpenLogin} className="hover:text-white transition-colors cursor-pointer">Login</button></li>
                <li><button onClick={onOpenSignUp} className="hover:text-white transition-colors cursor-pointer">Sign Up</button></li>
                <li><button onClick={onOpenAdmin} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer">Super Admin Portal →</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 font-display text-lg">Contact</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>+252 61 234 5678</li>
                <li>info@abcdaycare.so</li>
                <li>Mogadishu, Somalia</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 ABC Daycare & Kindergarten. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
      {/* END: MainFooter */}

      {/* Gallery Lightbox Modal */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scaleUp">
            <div className="relative h-80 bg-slate-900">
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 font-display">{selectedGalleryItem.title}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                  {selectedGalleryItem.ageBracket}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedGalleryItem.summary}</p>
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">Category: {selectedGalleryItem.category}</span>
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="px-5 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Article Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-scaleUp">
            <div className="relative h-60 bg-slate-900">
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedNews.badgeColor}`}>
                  {selectedNews.badge}
                </span>
                <span className="text-xs text-slate-400">{selectedNews.date}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">{selectedNews.title}</h3>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{selectedNews.content}</p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-5 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Back to News
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
