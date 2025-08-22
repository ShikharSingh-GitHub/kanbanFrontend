import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="user-profile">
      <div className="user-info">
        <div className="user-avatar">
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt={currentUser.displayName || 'User'} 
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder">
              {currentUser.displayName ? 
                currentUser.displayName.charAt(0).toUpperCase() : 
                currentUser.email.charAt(0).toUpperCase()
              }
            </div>
          )}
        </div>
        <div className="user-details">
          <div className="user-name">
            {currentUser.displayName || 'User'}
          </div>
          <div className="user-email">
            {currentUser.email}
          </div>
        </div>
      </div>
      <button 
        className="logout-button"
        onClick={handleLogout}
        title="Sign out"
      >
        <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
};

export default UserProfile;