import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const primaryRef = useRef(null);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
  };

  useEffect(() => {
    // focus the primary action for keyboard users when modal mounts
    if (primaryRef.current) primaryRef.current.focus();
  }, []);

  return (
    <div className="login-backdrop" role="presentation">
      <div className="login-modal" role="dialog" aria-modal="true" aria-label="Sign in to Taskify">
        <div className="flex flex-col items-center gap-4">
          <div className="login-brand bg-blue-500 text-white text-2xl">KB</div>
          <h2 className="text-3xl font-extrabold">Taskify</h2>
          <p className="text-sm text-gray-600 text-center">Sign in to access your personal Taskify board and manage tasks.</p>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <button
            ref={primaryRef}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 btn-ghost focus-ring font-semibold py-3 px-4 rounded transition duration-150"
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
