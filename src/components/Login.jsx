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
        <div className="login-header">
          <div className="login-brand bg-blue-500 text-white text-2xl">TSKFY</div>
          <div>
            <h2 className="text-3xl font-extrabold">Taskify</h2>
            <p className="login-desc">Sign in to access your personal Taskify board and manage tasks.</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="actions">
          <button
            ref={primaryRef}
            onClick={handleGoogleSignIn}
            className="btn-ghost focus-ring font-semibold"
            aria-label="Sign in with Google"
          >
            <FaGoogle style={{color:'#ef4444'}} />
            <span style={{marginLeft:10}}>Continue with Google</span>
          </button>

          <div className="legal">By continuing, you agree to the app's Terms.</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
