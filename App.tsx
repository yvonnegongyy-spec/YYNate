import React, { useState, useEffect } from 'react';
import { AppTab, Session } from './types';
import { getSessions, createSession } from './services/supabase';
import Welcome from './screens/Welcome';
import Locator from './screens/Locator';
import Strategy from './screens/Strategy';
import Coach from './screens/Coach';
import AddSession from './screens/AddSession';
import Login from './screens/Login';
import BottomNav from './components/BottomNav';
import { useAuth } from './contexts/AuthContext';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

const App: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [guestMode, setGuestMode] = useState(false);
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.WELCOME);
  const [sessions, setSessions] = useState<Session[]>([]);

  // Load sessions on mount or when user changes
  useEffect(() => {
    // If guest mode, we can try to load demo sessions or just local state
    // For now, let's load sessions if we have a user OR if we want to show demo data?
    // Actually, getSessions defaults to DEMO_USER_ID if no ID is passed, but we should be explicit
    const targetUserId = user?.id || (guestMode ? DEMO_USER_ID : null);

    if (!targetUserId) return;

    const loadData = async () => {
      try {
        const data = await getSessions(targetUserId);
        setSessions(data || []);
      } catch (e) {
        console.error("Failed to load sessions", e);
      }
    };
    loadData();
  }, [user, guestMode]);

  const handleSaveSession = async (newSession: Session) => {
    const targetUserId = user?.id || (guestMode ? DEMO_USER_ID : null);
    if (!targetUserId) return;

    // Optimistic update
    const tempId = Math.random().toString();
    const orderedSessions = [{ ...newSession, id: tempId }, ...sessions];
    setSessions(orderedSessions);
    setCurrentTab(AppTab.STRATEGY);

    // Persist to DB
    const saved = await createSession(newSession, targetUserId);
    if (saved) {
      setSessions(prev => prev.map(s => s.id === tempId ? saved : s));
    } else {
      console.error("Failed to save session to DB");
      setSessions(prev => prev.filter(s => s.id !== tempId));
      alert("Failed to save session. Please try again.");
    }
  };

  const renderScreen = () => {
    switch (currentTab) {
      case AppTab.LOCATOR:
        return <Locator />;
      case AppTab.STRATEGY:
        return (
          <Strategy
            sessions={sessions}
            onAddSession={() => setCurrentTab(AppTab.ADD_SESSION)}
          />
        );
      case AppTab.COACH:
        return <Coach />;
      case AppTab.ADD_SESSION:
        return (
          <AddSession
            onSave={handleSaveSession}
            onCancel={() => setCurrentTab(AppTab.STRATEGY)}
          />
        );
      case AppTab.SOCIAL:
        return (
          <div className="h-screen flex items-center justify-center text-slate-500">
            Social feature coming soon...
          </div>
        );
      case AppTab.PROFILE:
        return (
          <div className="h-screen flex flex-col items-center justify-center text-slate-500 space-y-4">
            <h2 className="text-xl font-bold text-white">User Profile</h2>
            {user ? (
              <>
                <p>Signed in as: <span className="text-primary">{user.email}</span></p>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-slate-400">Guest Mode (Demo Data)</p>
                <button
                  onClick={() => {
                    setGuestMode(false);
                    window.location.reload();
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        );
      case AppTab.WELCOME:
      default:
        return <Welcome onStart={() => setCurrentTab(AppTab.LOCATOR)} />;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background-dark text-slate-400">Loading...</div>;
  }

  // Enforce Login unless guest mode
  if (!user && !guestMode) {
    return <Login onGuestLogin={() => setGuestMode(true)} />;
  }

  const hideNav = currentTab === AppTab.WELCOME || currentTab === AppTab.ADD_SESSION;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden flex flex-col">
      <div className="flex-1 relative overflow-y-auto custom-scrollbar">
        {renderScreen()}
      </div>
      {!hideNav && (
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
        />
      )}
    </div>
  );
};

export default App;
