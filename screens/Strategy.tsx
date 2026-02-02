
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { BANKROLL } from '../constants';
import { Session } from '../types';

interface StrategyProps {
  sessions: Session[];
  onAddSession: () => void;
}

const Strategy: React.FC<StrategyProps> = ({ sessions, onAddSession }) => {
  const currentTotal = BANKROLL.total + sessions.reduce((acc, s) => acc + s.profit, 0);

  // Calculate total duration in hours
  const totalHours = sessions.reduce((acc, s) => {
    // Try to parse duration string (e.g. "4h 30m", "2h", "45m")
    let hours = 0;
    const hMatch = s.duration.match(/(\d+)h/);
    const mMatch = s.duration.match(/(\d+)m/);

    if (hMatch) hours += parseInt(hMatch[1]);
    if (mMatch) hours += parseInt(mMatch[1]) / 60;

    // Fallback for simple number strings just in case
    if (!hMatch && !mMatch && !isNaN(parseFloat(s.duration))) {
      hours += parseFloat(s.duration);
    }

    return acc + hours;
  }, 0);

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen">
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <div>
              <h1 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Strategy Hub</h1>
              <h2 className="text-xl font-extrabold leading-none">Financial Hub</h2>
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">visibility_off</span>
          </button>
        </div>
      </nav>

      <main>
        <div className="p-4">
          <div className="bento-card p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Total Bankroll</p>
              <div className="flex gap-2">
                <span className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs font-bold border border-slate-600/50">
                  {totalHours.toFixed(1)}h Played
                </span>
                <span className="bg-accent-lime/20 text-accent-lime px-2 py-1 rounded text-xs font-bold">+{BANKROLL.growth}%</span>
              </div>
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight">${currentTotal.toLocaleString()}</h3>
            <div className="mt-4 flex gap-2">
              <button className="text-[10px] font-bold px-3 py-1 bg-primary text-white rounded-full">ALL TIME</button>
              <button className="text-[10px] font-bold px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-full">1Y</button>
              <button className="text-[10px] font-bold px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-full">1M</button>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="bento-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-tighter">Bankroll Growth</p>
                <p className="text-2xl font-bold">+$4,650</p>
              </div>
              <p className="text-xs text-slate-500">Last 30 Days</p>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={BANKROLL.history}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#19b399" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#19b399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#161b22', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#19b399"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-bold text-slate-500">JUN 01</span>
              <span className="text-[10px] font-bold text-slate-500">JUN 15</span>
              <span className="text-[10px] font-bold text-slate-500">JUN 30</span>
            </div>
          </div>
        </div>

        <div className="px-4 mb-8">
          <button
            onClick={onAddSession}
            className="w-full h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center gap-2 text-primary font-bold transition-all hover:bg-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            Log New Session
          </button>
        </div>

        <div className="px-4 pb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Sessions</h3>
            <button className="text-primary text-xs font-bold uppercase tracking-wider">See All</button>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-xl border flex justify-between items-center transition-all ${session.isLive
                  ? 'bg-primary/10 border-primary relative overflow-hidden'
                  : 'bento-card border-slate-200 dark:border-slate-800'
                  }`}
              >
                {session.isLive && (
                  <div className="absolute top-0 right-0 p-2">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="material-symbols-outlined text-slate-400">
                      {session.isLive ? 'location_on' : 'casino'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase">{session.venue}</h4>
                    <p className="text-xs text-slate-500">{session.game} • {session.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${session.profit >= 0 ? 'text-accent-lime' : 'text-orange-500'}`}>
                    {session.profit >= 0 ? `+$${session.profit}` : `-$${Math.abs(session.profit)}`}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500">{session.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Strategy;
