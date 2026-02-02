
import React, { useEffect, useState } from 'react';
import { VENUES } from '../constants';
import { getVenues } from '../services/supabase';
import { Venue } from '../types';

const Locator: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        if (data && data.length > 0) {
          setVenues(data);
        } else {
          // If DB is empty, use VENUES but ideally we want to show empty state or just the sample venues if we inserted them
          // Since we ran schema.sql which has inserts, we should expect data.
          // If no data, falling back to FE constants is a safe dev-mode behavior
          setVenues(VENUES);
        }
      } catch (e) {
        console.error("Failed to load venues", e);
        setVenues(VENUES);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="text-primary flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <span className="material-symbols-outlined text-[28px]">account_circle</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Game Locator</h2>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Las Vegas, NV</p>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-colors hover:bg-primary/20">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
        <div className="flex gap-3 px-4 py-3 overflow-x-auto custom-scrollbar">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-4 text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-sm">filter_alt</span>
            <p className="text-sm font-semibold">Tournaments</p>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300">
            <p className="text-sm font-medium">Cash Games</p>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300">
            <p className="text-sm font-medium">Distance</p>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="relative w-full h-[320px] px-4 py-3">
          <div className="relative w-full h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover flex items-center justify-center relative"
              style={{ backgroundImage: `url('https://picsum.photos/seed/lasvegas/800/400')` }}
            >
              <div className="absolute inset-0 map-gradient-overlay"></div>
              {/* Pulsing Hotspot */}
              <div className="absolute top-1/4 left-1/3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute size-8 bg-accent-lime/30 rounded-full animate-ping"></div>
                  <div className="relative size-4 bg-accent-lime rounded-full border-2 border-background-dark shadow-xl"></div>
                </div>
              </div>
              {/* Venue Pins */}
              <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
                <div className="bg-primary px-3 py-1.5 rounded-full flex items-center gap-2 shadow-2xl border border-white/20 transform hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-xs">casino</span>
                  <span className="text-white text-[10px] font-bold">BELLAGIO</span>
                </div>
              </div>
              <button className="absolute bottom-6 right-6 size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-xl border border-white/10 active:scale-95 transition-transform">
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2 className="text-slate-900 dark:text-white text-xl font-extrabold leading-tight tracking-tight">Active Action</h2>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-accent-lime"></div>
            <span className="text-[10px] font-bold text-accent-lime uppercase tracking-widest">Live Now</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4 pb-10">
          {loading ? (
            <div className="flex flex-col gap-4 p-4 text-center text-slate-500">
              <span className="material-symbols-outlined animate-spin text-3xl">refresh</span>
              <p>Finding games...</p>
            </div>
          ) : (
            venues.map((venue) => (
              <div key={venue.id} className="group flex gap-4 bg-white dark:bg-card-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/50">
                <div className="relative">
                  <img src={venue.imageUrl} alt={venue.name} className="aspect-square object-cover rounded-xl size-[80px]" />
                  {venue.isTopChoice && (
                    <div className="absolute -top-1 -right-1 bg-accent-lime text-background-dark text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">Top Choice</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-none">{venue.name}</p>
                      {venue.isTopChoice && (
                        <span className="text-accent-lime text-[11px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">bolt</span> AI Choice
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 dark:text-[#9eb7b3] text-xs font-medium mt-1">{venue.distance} • {venue.action}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-tighter leading-none">Buy-in</span>
                      <p className="text-primary text-sm font-bold">{venue.buyIn}</p>
                    </div>
                    <div className="flex gap-1 items-center bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                      <span className="size-2 rounded-full bg-accent-lime"></span>
                      <span className="text-slate-900 dark:text-white text-[11px] font-bold leading-none">{venue.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            )))}
        </div>
      </main>
    </div>
  );
};

export default Locator;
