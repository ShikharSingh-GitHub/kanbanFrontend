import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setError('');
      await signInWithGitHub();
    } catch (error) {
      setError('Failed to sign in with GitHub');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Kanban Board</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            <FaGoogle />
            Continue with Google
          </button>
          
          <button
            onClick={handleGitHubSignIn}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            <FaGithub />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
