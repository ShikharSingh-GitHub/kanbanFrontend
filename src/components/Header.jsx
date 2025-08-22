import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside(() => setShowDropdown(false));

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Kanban Board</h1>
        
        {user && (
          <div className="user-menu" ref={dropdownRef}>
            <button className="user-profile" onClick={toggleDropdown}>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=667eea&color=fff`}
                alt="Profile"
                className="profile-avatar"
              />
              <span className="user-name">{user.displayName || user.email}</span>
              <svg className={`dropdown-arrow ${showDropdown ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="user-info">
                  <p className="user-email">{user.email}</p>
                  <p className="provider-info">
                    Signed in with {user.providerData[0]?.providerId === 'google.com' ? 'Google' : 'GitHub'}
                  </p>
                </div>
                <hr className="dropdown-divider" />
                <button className="logout-button" onClick={handleLogout}>
                  <svg className="logout-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;