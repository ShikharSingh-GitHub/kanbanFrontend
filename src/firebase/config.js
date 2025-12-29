// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Basic env validation to surface clear errors during dev
const missing = [];
if (!firebaseConfig.apiKey) missing.push('VITE_FIREBASE_API_KEY');
if (!firebaseConfig.authDomain) missing.push('VITE_FIREBASE_AUTH_DOMAIN');
if (!firebaseConfig.projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
if (!firebaseConfig.appId) missing.push('VITE_FIREBASE_APP_ID');

if (missing.length) {
  console.error(`Missing Firebase env vars: ${missing.join(', ')}`);
  throw new Error(`Missing Firebase env vars: ${missing.join(', ')}. Copy .env.example and add your Firebase config.`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
