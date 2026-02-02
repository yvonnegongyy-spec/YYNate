
import React, { useState } from 'react';
import { Session } from '../types';

interface AddSessionProps {
  onSave: (session: Session) => void;
  onCancel: () => void;
}

const AddSession: React.FC<AddSessionProps> = ({ onSave, onCancel }) => {
  const [venue, setVenue] = useState('');
  const [game, setGame] = useState('$1/$3 NLH');
  const [buyIn, setBuyIn] = useState('');
  const [cashOut, setCashOut] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venue || !buyIn || !cashOut) return;

    const profit = parseFloat(cashOut) - parseFloat(buyIn);
    const newSession: Session = {
      id: Date.now().toString(),
      venue,
      game,
      duration: `${hours || '0'}h ${minutes || '0'}m`,
      profit,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      buyIn: parseFloat(buyIn),
      cashOut: parseFloat(cashOut)
    };

    onSave(newSession);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white pb-10">
      <header className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-background-dark z-10">
        <button onClick={onCancel} className="p-2 -ml-2 text-white/60">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-lg font-bold">Log Session</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-6 max-w-md mx-auto w-full">
        <form onSubmit={handleSave} className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Game Info</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs text-white/40 font-bold uppercase tracking-tighter">Venue</label>
              <input 
                type="text" 
                placeholder="e.g. Bellagio, Aria..." 
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/40 font-bold uppercase tracking-tighter">Game Type</label>
              <select 
                value={game}
                onChange={(e) => setGame(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
              >
                <option className="bg-background-dark">$1/$2 NLH</option>
                <option className="bg-background-dark">$1/$3 NLH</option>
                <option className="bg-background-dark">$2/$5 NLH</option>
                <option className="bg-background-dark">$5/$10 NLH</option>
                <option className="bg-background-dark">$1/$2 PLO</option>
                <option className="bg-background-dark">Tournament</option>
              </select>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Financials</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/40 font-bold uppercase tracking-tighter">Buy-in ($)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  required
                  value={buyIn}
                  onChange={(e) => setBuyIn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/40 font-bold uppercase tracking-tighter">Cash-out ($)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  required
                  value={cashOut}
                  onChange={(e) => setCashOut(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Time</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/40 font-bold uppercase tracking-tighter">Hours</label>
                <input 
                  type="number" 
                  placeholder="h" 
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/40 font-bold uppercase tracking-tighter">Minutes</label>
                <input 
                  type="number" 
                  placeholder="m" 
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              Save Session
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddSession;
