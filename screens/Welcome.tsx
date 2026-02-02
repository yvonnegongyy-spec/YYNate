
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-between items-center px-6 py-12 max-w-[480px] mx-auto overflow-hidden bg-background-dark text-white">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

      <div className="flex w-full items-center justify-between z-10">
        <div className="text-white/60 flex size-12 items-center justify-start">
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="flex size-12 items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
            <span className="material-symbols-outlined text-white/80">account_circle</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full relative">
        <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10"></div>
        <div className="relative flex items-center justify-center w-56 h-56 mb-8">
          <div className="absolute inset-0 border border-primary/20 rounded-[2rem] rotate-45 scale-90"></div>
          <div className="absolute inset-0 border border-primary/10 rounded-[3rem] -rotate-12"></div>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-3xl bg-background-dark border border-primary/30 glow-effect overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50"></div>
            <span className="material-symbols-outlined text-primary text-6xl icon-glow font-light">psychology</span>
          </div>
          <div className="absolute top-0 right-8 size-4 rounded-full bg-primary animate-pulse"></div>
          <div className="absolute bottom-12 left-2 size-2 rounded-full bg-primary/40"></div>
        </div>

        <div className="text-center space-y-4 px-2">
          <h1 className="text-white text-4xl font-extrabold tracking-tight leading-tight">
            Master Every <br /><span className="text-primary">Hand</span>
          </h1>
          <p className="text-white/60 text-base font-normal leading-relaxed max-w-[280px] mx-auto">
            Your personal GTO coach is ready to analyze your play in real-time.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 z-10">
        <button
          onClick={onStart}
          className="flex w-full items-center justify-center h-14 rounded-xl bg-primary text-white text-lg font-bold tracking-tight shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
        >
          Get Started
        </button>
        <button className="flex w-full items-center justify-center h-14 rounded-xl border border-white/20 bg-transparent text-white text-lg font-semibold hover:bg-white/5 transition-colors active:scale-[0.98]">
          Sign In
        </button>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium uppercase tracking-[0.1em]">
            <span className="material-symbols-outlined text-sm">groups</span>
            Social
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20"></div>
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium uppercase tracking-[0.1em]">
            <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            AI Tools
          </div>
        </div>
      </div>
      <div className="mt-8 h-1.5 w-32 rounded-full bg-white/10"></div>
    </div>
  );
};

export default Welcome;
