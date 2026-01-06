
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { MEDICAL_DISCLAIMER } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simple auto-auth for demo if session exists
  useEffect(() => {
    const savedUser = localStorage.getItem('ncd_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('ncd_user', JSON.stringify(authenticatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ncd_user');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white animate-pulse text-xl">Initializing NCD EarlyDetect Uganda...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
          <Dashboard user={user} />
        </main>
        
        {/* Persistent Safety Disclaimer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-yellow-200 p-2 text-center text-xs text-yellow-800 z-50">
          <div className="container mx-auto font-medium flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            {MEDICAL_DISCLAIMER}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
