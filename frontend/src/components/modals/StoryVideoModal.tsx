import React from 'react';

interface StoryVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

export const StoryVideoModal: React.FC<StoryVideoModalProps> = ({
  isOpen,
  onClose,
  onBookTour,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-800 text-white relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-base">
              <i className="fa-solid fa-play"></i>
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-outfit">The ABC Story: A Day in Our Classrooms</h3>
              <p className="text-xs text-slate-400">Discover how playful exploration shapes curious young minds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Video Player Mockup with rich visuals */}
        <div className="relative mt-4 aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-inner">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZQz47rP8ZF2jb4lrIjx2n9DSSvSA90asVt9qLsP21IEsu08BLvWrKPyKUuUs4H1p2_h-XKsyQweICjjLqt8qXFsXrozK9Uk9CTfVjDs54Rtqerw4wdQlLDnJGF1FodjNa7Ihirk-LqfxKOmtsBCD0xHLZBovmj6amNxWBGgfpGo2c8jze7j3wK9dArGxPd4s9UNPC93wNjmQe1xT4sRwx8qPa8cYWHcpIgzWdEzfEXbXqCm9EyDUX"
            alt="Children in classroom video thumbnail"
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>

          {/* Central Play Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl shadow-xl shadow-amber-500/40 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-play ml-1"></i>
            </div>
            <div className="mt-4 max-w-md bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/60">
              <p className="text-xs font-semibold text-amber-300 mb-0.5">Virtual Documentary Experience</p>
              <p className="text-[11px] text-slate-300">
                "From first steps to kindergarten graduation — watch our nurturing methodology in action."
              </p>
            </div>
          </div>

          {/* Video Timeline Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-[11px] text-slate-300">
            <span>01:14</span>
            <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-400 h-1.5 rounded-full w-1/3"></div>
            </div>
            <span>03:45</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono">1080p HD</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            Like what you see? Visit us in person across any of our 8 campuses.
          </div>
          <button
            onClick={() => {
              onClose();
              onBookTour();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-calendar-check"></i>
            Book a Campus Tour
          </button>
        </div>
      </div>
    </div>
  );
};
