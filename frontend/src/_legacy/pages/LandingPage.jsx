import React, { useState, useEffect } from 'react';
import '../styles/landing.css';

export default function LandingPage({ onOpenDashboard }) {
  const [darkMode, setDarkMode] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const programs = [
    {
      title: 'Early Years',
      age: 'Ages 1 - 3',
      desc: 'Gentle care and sensory-based learning for our youngest.',
      image: '/icons/cute_toddler_girl_playing_with_colorful_plastic_toy_stacking_blocks_and_sensory.png',
      icon: 'fa-baby',
      iconColor: 'text-amber-500'
    },
    {
      title: 'Preschool',
      age: 'Ages 3 - 4',
      desc: 'Building confidence, independence and curiosity.',
      image: '/icons/little_preschool_boy_smiling_happily_while_building_a_colorful_structure_using.png',
      icon: 'fa-cubes',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Kindergarten',
      age: 'Ages 5 - 6',
      desc: 'Preparing for a successful future in school and life.',
      image: '/icons/two_young_children_engrossed_in_reading_a_colorful_picture_book_together_at_a.png',
      icon: 'fa-pencil',
      iconColor: 'text-emerald-500'
    },
    {
      title: 'After School Care',
      age: 'Ages 6+',
      desc: 'Fun, safe and engaging activities after school hours.',
      image: '/icons/group_of_happy_kids_in_colorful_sports_t_shirts_outdoors_on_green_grass_with_a.png',
      icon: 'fa-futbol',
      iconColor: 'text-rose-500'
    },
  ];

  const galleryItems = [
    {
      title: 'Early Art & Craft',
      age: 'Ages 1 - 3',
      desc: 'We are excited to welcome all our children back to preschool crafts.',
      image: '/icons/two_adorable_preschool_children_painting_together_with_colorful_water_paints_at.png',
    },
    {
      title: 'Outdoor Play & Playground',
      age: 'Ages 3 - 4',
      desc: 'Join us for a fun-filled day of climbing, teamwork and excitement!',
      image: '/icons/vibrant_outdoor_playground_with_children_climbing_on_colorful_jungle_gym_slides.png',
    },
    {
      title: 'Annual Sports Day',
      age: 'Ages 5 - 6',
      desc: 'Active exercises that build discipline, teamwork and fitness.',
      image: '/icons/school_sports_day_with_a_line_of_enthusiastic_young_kids_in_athletic_team.png',
    },
    {
      title: 'Kindergarten Graduation',
      age: 'Ages 5 - 6',
      desc: 'Proud moments as our little graduates take their first big leap.',
      image: '/icons/celebratory_kindergarten_graduation_day_young_diverse_children_wearing_small.png',
    },
  ];

  const newsItems = [
    {
      category: 'Announcement',
      date: 'Aug 20, 2026',
      title: 'School Reopens for New Term',
      teaser: 'We are excited to welcome all our children back for a new and brighter term!',
      badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300',
      image: '/icons/back_to_school_moment_showing_a_row_of_young_children_seen_from_behind_with.png'
    },
    {
      category: 'Event',
      date: 'Aug 15, 2026',
      title: 'Annual Sports Day',
      teaser: 'Join us for a fun-filled day of sports, teamwork and excitement!',
      badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300',
      image: '/icons/group_of_happy_kids_in_colorful_sports_t_shirts_outdoors_on_green_grass_with_a.png'
    },
    {
      category: 'News',
      date: 'Aug 10, 2026',
      title: 'New Job Opportunities Available',
      teaser: 'We are looking for passionate individuals to join our amazing team.',
      badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300',
      image: '/icons/friendly_daycare_teacher_or_administrator_working_on_a_laptop_at_a_bright_tidy.png'
    }
  ];

  const faqs = [
    {
      q: 'How can I register my child?',
      a: 'Registering your child is simple! You can fill out our online enrollment inquiry form on our website or visit our campus in Mogadishu. Our admissions team will assist you with the registration process and scheduling a campus tour.'
    },
    {
      q: 'What programs do you offer?',
      a: 'We offer age-tailored programs including Early Years (Ages 1-3), Preschool (Ages 3-4), Kindergarten (Ages 5-6), and After School Care (Ages 6+). Each program focuses on age-appropriate learning, creativity, and social development.'
    },
    {
      q: 'How can I contact ABC Daycare?',
      a: 'You can reach us by phone at +252 61 234 5678, email us at info@abcdaycare.so, or visit our main campus in Mogadishu, Somalia. We are available Sunday through Thursday from 7:30 AM to 5:00 PM.'
    },
    {
      q: 'How can I apply for a job?',
      a: 'Visit our Careers section below and click "View Open Positions". You can submit your resume and cover letter directly through our website for positions like Teachers, Administrators, and Support Staff.'
    },
    {
      q: 'Do you offer part-time or after school care?',
      a: 'Yes! We offer flexible morning part-time schedules as well as dedicated After School Care programs with homework support, outdoor sports, and creative workshops.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFDFF] dark:bg-slate-900 text-slate-700 dark:text-slate-200 antialiased selection:bg-indigo-100 selection:text-indigo-600 transition-colors duration-300">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass-header border-b border-slate-100 dark:border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center space-x-1">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-4 h-4 rounded-full bg-rose-500 inline-block -mt-2"></span>
                <span className="w-4 h-4 rounded-full bg-indigo-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block -mt-1"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center leading-none">
                  <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">ABC</span>
                </div>
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase -mt-0.5">Daycare &amp; Kindergarten</span>
              </div>
            </a>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <a className="text-brand-primary relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-brand-primary after:rounded-full" href="#">Home</a>
              <a className="hover:text-brand-primary transition-colors py-2" href="#about">About</a>
              <a className="hover:text-brand-primary transition-colors py-2" href="#programs">Programs</a>
              <a className="hover:text-brand-primary transition-colors py-2" href="#gallery">Gallery</a>
              <a className="hover:text-brand-primary transition-colors py-2" href="#news">News</a>
              <a className="hover:text-brand-primary transition-colors py-2" href="#careers">Careers</a>
              <a className="hover:text-brand-primary transition-colors py-2" href="#contact">Contact</a>
            </nav>

            {/* Utility Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200/80 dark:border-slate-700">
                <button 
                  onClick={toggleTheme}
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs transition-colors ${!darkMode ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400'}`}
                  title="Light Mode"
                >
                  <i className="fa-solid fa-sun"></i>
                </button>
                <button 
                  onClick={toggleTheme}
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs transition-colors ${darkMode ? 'bg-slate-700 text-amber-400 shadow-sm' : 'text-slate-400'}`}
                  title="Dark Mode"
                >
                  <i className="fa-solid fa-moon"></i>
                </button>
              </div>

              {onOpenDashboard && (
                <button 
                  onClick={onOpenDashboard}
                  className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                >
                  <i className="fa-solid fa-server"></i> PERN Admin
                </button>
              )}

              <span className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700"></span>

              <a className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-primary rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all" href="#contact">
                Login
              </a>

              <a className="px-5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-indigo-600 rounded-full shadow-sm hover:shadow transition-all" href="#contact">
                Sign Up
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-20 overflow-hidden bg-gradient-to-b from-[#F5F8FF] via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold tracking-wide shadow-xs">
                <i className="fa-solid fa-sparkles text-amber-500"></i>
                <span>Welcome to ABC Daycare &amp; Kindergarten</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Growing Curious Minds,<br />
                Building <span className="text-indigo-600 dark:text-indigo-400">Bright Futures</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
                At ABC Daycare &amp; Kindergarten, we provide a safe, nurturing and inspiring environment where children learn, play and grow. Our goal is to help every child reach their full potential.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a className="btn-hover inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-primary text-white font-semibold text-sm shadow-md hover:bg-indigo-600" href="#programs">
                  <span>Explore ABC Daycare</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>

                <a className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-blue-200 dark:border-slate-700 text-brand-primary dark:text-blue-400 font-semibold text-sm hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors" href="#contact">
                  Contact Us
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[520px] lg:max-w-none">
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-amber-100 dark:bg-amber-900/30 rounded-full filter blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-60 pointer-events-none"></div>

                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                  <img 
                    alt="Teacher helping preschool children at ABC Daycare" 
                    className="w-full h-[400px] sm:h-[460px] object-cover" 
                    src="/icons/candid_photograph_of_a_friendly_smiling_preschool_teacher_sitting_with_three.png" 
                  />
                </div>

                <div className="floating-card absolute -top-4 -right-2 sm:-right-4 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-100 dark:border-slate-700 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-brand-primary dark:text-blue-400 flex items-center justify-center text-base shrink-0 shadow-xs">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-snug">Experienced</h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Teachers</p>
                  </div>
                </div>

                <div className="floating-card-delayed absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-6 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-100 dark:border-slate-700 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base shrink-0 shadow-xs">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-snug">Safe Learning</h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Environment</p>
                  </div>
                </div>

                <div className="floating-card-alt absolute -bottom-4 right-4 sm:right-6 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-100 dark:border-slate-700 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950 text-pink-500 dark:text-pink-400 flex items-center justify-center text-base shrink-0 shadow-xs">
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-snug">Child-Centered</h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Care</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Why ABC Daycare</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">A Better Start for a Brighter Tomorrow</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base">We provide the best foundation for your child's growth and development.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#F8FAFF] dark:bg-slate-800/60 border border-blue-100/70 dark:border-slate-700 rounded-2xl p-7 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <i className="fa-solid fa-graduation-cap text-2xl"></i>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Quality Education</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Our curriculum is designed to build strong academic and life skills.</p>
            </div>

            <div className="bg-[#F6FBF8] dark:bg-slate-800/60 border border-emerald-100/70 dark:border-slate-700 rounded-2xl p-7 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <i className="fa-solid fa-shield-halved text-2xl"></i>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Safe Environment</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Your child's safety and well-being is our top priority.</p>
            </div>

            <div className="bg-[#FCF7F8] dark:bg-slate-800/60 border border-rose-100/70 dark:border-slate-700 rounded-2xl p-7 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-400 text-white flex items-center justify-center shadow-md shadow-rose-400/20">
                <i className="fa-solid fa-heart text-2xl"></i>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Caring Teachers</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Our team is passionate, experienced and dedicated to every child.</p>
            </div>

            <div className="bg-[#FAF7FD] dark:bg-slate-800/60 border border-purple-100/70 dark:border-slate-700 rounded-2xl p-7 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                <i className="fa-solid fa-sparkles text-2xl"></i>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Holistic Development</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">We support social, emotional, physical and creative skills.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 md:py-20 bg-[#FBFDFF] dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-800 aspect-[4/3] sm:aspect-[16/10]">
                <img 
                  alt="ABC Daycare &amp; Kindergarten Campus Exterior" 
                  className="w-full h-full object-cover" 
                  src="/icons/exterior_view_of_a_modern_colorful_abc_daycare_and_kindergarten_school_building.png" 
                />

                <div className="absolute bottom-5 left-5 z-20">
                  <button className="flex items-center gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white dark:border-slate-700 hover:bg-white transition-all group">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                      <i className="fa-solid fa-play ml-0.5"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white pr-1">Our Story</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-brand-primary dark:text-blue-300 text-xs font-bold">
                About Us
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                A Place Where Children Feel Loved and Inspired
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                ABC Daycare &amp; Kindergarten is more than just a school — it's a family. We are committed to providing high-quality education and a nurturing environment where children can learn, play and develop with confidence.
              </p>

              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-brand-primary border border-blue-100 dark:border-blue-900 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span>Safe and supportive environment</span>
                </li>

                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-brand-primary border border-blue-100 dark:border-blue-900 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span>Experienced and caring staff</span>
                </li>

                <li className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-brand-primary border border-blue-100 dark:border-blue-900 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span>Modern facilities and learning resources</span>
                </li>
              </ul>

              <div className="pt-4">
                <a className="btn-hover inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-sm font-semibold shadow-md" href="#programs">
                  <span>Learn More</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 relative" id="programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Learning Through Play</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base">We offer age-appropriate programs that build strong foundations for lifelong learning and success.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="h-44 overflow-hidden relative">
                  <img alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={p.image} />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-2 rounded-xl shadow-xs">
                    <i className={`fa-solid ${p.icon} ${p.iconColor} text-sm`}></i>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{p.title}</h3>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 px-2 py-0.5 rounded-md">{p.age}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{p.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <a className="inline-flex items-center text-xs font-bold text-brand-primary dark:text-blue-400 hover:text-indigo-700 gap-1.5" href="#contact">
                      <span>Learn More</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-16 md:py-24 bg-[#F8FAFF] dark:bg-slate-900/60 relative border-t border-slate-100 dark:border-slate-800" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Our Gallery</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Moments That Matter</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">A glimpse into our daily activities, events and happy moments.</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-primary dark:text-blue-400 text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs" href="#gallery">
                <span>View Gallery</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((g, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <img alt={g.title} className="w-full h-48 object-cover" src={g.image} />
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 dark:text-white">{g.title}</span>
                    <span className="text-slate-400">{g.age}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{g.desc}</p>
                  <a className="mt-4 inline-flex items-center text-xs font-semibold text-brand-primary dark:text-blue-400 gap-1" href="#gallery">
                    <span>Read More</span>
                    <i className="fa-solid fa-arrow-right text-[9px]"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900" id="news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Latest News &amp; Events</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Stay Updated With ABC</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Read the latest news, announcements and upcoming events from ABC Daycare.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-primary dark:text-blue-400 text-xs font-bold hover:bg-blue-50 transition-colors" href="#news">
                <span>View All News</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((n, idx) => (
              <article key={idx} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-52 overflow-hidden">
                  <img alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={n.image} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={`px-2.5 py-1 rounded-full ${n.badgeColor} font-semibold text-[11px]`}>{n.category}</span>
                    <span className="text-slate-400">{n.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {n.teaser}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <a className="inline-flex items-center text-xs font-bold text-brand-primary dark:text-blue-400 gap-1" href="#news">
                      <span>Read More</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS BANNER */}
      <section className="py-12 bg-white dark:bg-slate-900" id="careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-purple-50/70 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100/80 dark:border-slate-700 p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Careers</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Join the ABC Daycare Team
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                  Be part of a team that makes a difference. Explore our current job opportunities and apply directly through our website.
                </p>
                <div className="pt-2">
                  <a className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold shadow-md hover:bg-indigo-600 transition-all" href="#contact">
                    <span>View Open Positions</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-center">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg bg-slate-200">
                  <img 
                    alt="Teacher interacting with children" 
                    className="w-full h-full object-cover" 
                    src="/icons/two_caring_female_childcare_teachers_collaborating_and_engaging_playfully_with.png" 
                  />
                </div>
              </div>

              <div className="lg:col-span-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs p-5 rounded-2xl border border-white dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-extrabold uppercase text-slate-900 dark:text-white tracking-wider">Available Positions</h4>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-chalkboard-user text-indigo-500 text-sm w-4 text-center"></i>
                    <span>Teacher</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-user-tie text-indigo-500 text-sm w-4 text-center"></i>
                    <span>Administrator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-hand-holding-heart text-indigo-500 text-sm w-4 text-center"></i>
                    <span>Support Staff</span>
                  </li>
                  <li className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <i className="fa-solid fa-circle-plus text-xs w-4 text-center"></i>
                    <span>And More...</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION WITH CUTE BOY ILLUSTRATION */}
      <section className="py-16 md:py-20 bg-[#FBFDFF] dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Frequently Asked Questions</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Have Questions? We're Here to Help.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Find answers to the most common questions about our school, programs and services.
              </p>

              {/* Cute 3D Boy Illustration Asset */}
              <div className="pt-4 flex items-center justify-center lg:justify-start">
                <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-lg border-2 border-indigo-100 dark:border-slate-700">
                  <img 
                    src="/icons/cute_3d_illustration_style_of_an_inquisitive_young_boy_wearing_glasses_looking.png" 
                    alt="Inquisitive young boy illustration"
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200/80 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 p-4 sm:p-5 shadow-xs transition-all">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-800 dark:text-white focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <i className={`fa-solid ${openFaq === idx ? 'fa-minus text-indigo-600' : 'fa-plus text-slate-400'} text-xs transition-transform`}></i>
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT & MAP SECTION */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Get In Touch</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Have Questions? Contact Us</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-8">We'd love to hear from you. Reach out to us anytime.</p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-100/70 dark:border-blue-900 text-brand-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                      <i className="fa-solid fa-phone text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">+252 61 234 5678</h4>
                      <p className="text-[11px] text-slate-400">Call us</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-100/70 dark:border-indigo-900 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <i className="fa-solid fa-envelope text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">info@abcdaycare.so</h4>
                      <p className="text-[11px] text-slate-400">Email us</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 border border-purple-100/70 dark:border-purple-900 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <i className="fa-solid fa-location-dot text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">Mogadishu, Somalia</h4>
                      <p className="text-[11px] text-slate-400">Our Location</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a className="btn-hover inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-primary text-white text-xs font-bold shadow-md" href="mailto:info@abcdaycare.so">
                  <span>Send Message</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900 relative min-h-[300px] lg:min-h-[420px] flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-700">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 text-center mb-2">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-white">ABC Daycare &amp; Kindergarten</h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Mogadishu, Somalia</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg ring-4 ring-blue-100 dark:ring-blue-900 animate-bounce">
                  <i className="fa-solid fa-location-dot text-base"></i>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            
            <div className="lg:col-span-2 space-y-4">
              <a className="flex items-center gap-3" href="#">
                <div className="flex items-center space-x-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-4 h-4 rounded-full bg-rose-500 inline-block -mt-1.5"></span>
                  <span className="w-4 h-4 rounded-full bg-indigo-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block -mt-1"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-white leading-none">ABC</span>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Daycare &amp; Kindergarten</span>
                </div>
              </a>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Nurturing today's children for a brighter tomorrow.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-primary flex items-center justify-center text-xs text-slate-300 hover:text-white transition-all" href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a aria-label="Twitter" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-primary flex items-center justify-center text-xs text-slate-300 hover:text-white transition-all" href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-primary flex items-center justify-center text-xs text-slate-300 hover:text-white transition-all" href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-primary flex items-center justify-center text-xs text-slate-300 hover:text-white transition-all" href="#">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-primary flex items-center justify-center text-xs text-slate-300 hover:text-white transition-all" href="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Home</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#about">About</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#programs">Programs</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#gallery">Gallery</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Account</h4>
              <ul className="space-y-2 text-xs">
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#contact">Login</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#contact">Sign Up</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#news">News</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#careers">Careers</a></li>
                <li><a className="text-slate-400 hover:text-white transition-colors" href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact Us</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-phone text-indigo-400 text-[11px]"></i>
                  <span>+252 61 234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-indigo-400 text-[11px]"></i>
                  <span>info@abcdaycare.so</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-indigo-400 text-[11px]"></i>
                  <span>Mogadishu, Somalia</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2026 ABC Daycare &amp; Kindergarten. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a className="hover:text-slate-300 transition-colors" href="#">Privacy Policy</a>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <a className="hover:text-slate-300 transition-colors" href="#">Terms &amp; Conditions</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
