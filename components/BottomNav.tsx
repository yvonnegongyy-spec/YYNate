
import React from 'react';
import { AppTab } from '../types';

interface BottomNavProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: AppTab.STRATEGY, label: 'WALLET', icon: 'account_balance_wallet' },
    { id: AppTab.COACH, label: 'COACH', icon: 'psychology', isSpecial: true },
    { id: AppTab.LOCATOR, label: 'LOCATOR', icon: 'distance' },
    { id: AppTab.SOCIAL, label: 'SOCIAL', icon: 'group' },
    { id: AppTab.PROFILE, label: 'PROFILE', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-4 z-40">
      <div className="max-w-md mx-auto flex justify-between items-center relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              tab.isSpecial ? '-top-10 absolute left-1/2 -translate-x-1/2 z-50' : ''
            } ${currentTab === tab.id ? 'text-primary' : 'text-slate-500'}`}
          >
            {tab.isSpecial ? (
              <div className="size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40 border-4 border-background-light dark:border-background-dark">
                <span className={`material-symbols-outlined text-[32px] ${currentTab === tab.id ? 'fill-[1]' : ''}`}>
                  {tab.icon}
                </span>
              </div>
            ) : (
              <>
                <span className={`material-symbols-outlined text-2xl ${currentTab === tab.id ? 'fill-[1]' : ''}`}>
                  {tab.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
