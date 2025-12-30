import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  getIdToken
} from 'firebase/auth';
import { setAuthToken } from '../api';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };


  // Sign out
  const logOut = () => {
    return signOut(auth);
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Force refresh token to ensure we have a fresh one
          const token = await getIdToken(user, true);
          setAuthToken(token);
        } catch (err) {
          console.error('Failed to get ID token:', err);
          setAuthToken(null);
        }
      } else {
        setAuthToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh token every 50 minutes (tokens expire at 1 hour)
  useEffect(() => {
    if (!currentUser) return;
    const intervalId = setInterval(async () => {
      try {
        const token = await getIdToken(currentUser, true);
        setAuthToken(token);
        console.log('Token refreshed');
      } catch (err) {
        console.error('Token refresh failed:', err);
      }
    }, 50 * 60 * 1000); // 50 minutes

    return () => clearInterval(intervalId);
  }, [currentUser]);

  const value = {
    currentUser,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
