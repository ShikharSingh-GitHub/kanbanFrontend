// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMZPZNUY85gPAg6JX3a-RZxfq9oY3Z3l0",
  authDomain: "kanban-aedf3.firebaseapp.com",
  projectId: "kanban-aedf3",
  storageBucket: "kanban-aedf3.appspot.com",
  messagingSenderId: "130658872894",
  appId: "1:130658872894:web:2012cb92117d470e3aab6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
