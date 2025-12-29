import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import Board from './components/Board';
import Login from './components/Login';
import Profile from './components/Profile';
import { auth } from './firebase/config';
import api from './api';
import './App.css';

const App = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkProfile = async () => {
      if (!currentUser) return setNeedsProfile(false);
      try {
        await api.get('/api/users/me');
        setNeedsProfile(false);
      } catch (err) {
        if (err?.response?.status === 404) setNeedsProfile(true);
        else setNeedsProfile(false);
      }
    };
    checkProfile();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="app">
      {!currentUser ? (
        <Login />
      ) : needsProfile ? (
        <Profile onSaved={() => setNeedsProfile(false)} />
      ) : (
        <>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={() => auth.signOut()}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </header>
          <main className="p-4">
            <Board />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
