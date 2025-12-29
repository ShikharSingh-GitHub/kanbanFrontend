import React, { useState } from 'react';
import api from '../api';

const Profile = ({ onSaved }) => {
  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { data } = await api.post('/api/users/me', { displayName, fullName, username });
      onSaved(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save profile');
    }
    setSaving(false);
  };

  return (
    <div className="login-backdrop">
      <div className="login-modal" role="dialog" aria-modal="true" aria-label="Complete your profile">
        <h2 className="text-2xl font-bold mb-4">Almost there — set up your profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="focus-ring" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <input className="focus-ring" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input className="focus-ring" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button type="submit" className="btn-ghost" disabled={saving}>{saving ? 'Saving...' : 'Save and Continue'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
