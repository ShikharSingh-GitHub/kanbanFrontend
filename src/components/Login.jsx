import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/60 to-slate-800/40 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">KB</div>
          <h2 className="text-3xl font-extrabold">Kanban Board</h2>
          <p className="text-sm text-gray-600 text-center">Sign in to access your personal kanban board and manage tasks.</p>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:shadow-sm text-gray-800 font-semibold py-2 px-4 rounded transition duration-150"
            aria-label="Sign in with Google"
          >
            <FaGoogle className="text-red-500" />
            <span>Continue with Google</span>
          </button>

          <div className="text-xs text-center text-gray-500">By continuing, you agree to the app's Terms.</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
