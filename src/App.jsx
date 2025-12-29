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
          <header className="app-header">
            <div className="brand">
              <div className="logo">TS</div>
              <div>
                <h1>Taskify</h1>
                <div className="tagline">A simple, fast Kanban board</div>
              </div>
            </div>
            <div className="user-info">
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:12,color:'#9aa6b2'}}>{currentUser.email}</div>
                <div style={{fontSize:13,fontWeight:600}}>{currentUser.displayName || ''}</div>
              </div>
              <div className="avatar">{(currentUser.displayName||currentUser.email||'U')[0]?.toUpperCase()}</div>
              <button
                onClick={() => auth.signOut()}
                className="btn-ghost focus-ring"
                aria-label="Sign out"
              >
                Sign Out
              </button>
            </div>
          </header>

          <main>
            <div className="main-container">
              <Board />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
