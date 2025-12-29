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
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:12}}>
          <div className="login-brand logo" style={{fontSize:20}}>TS</div>
          <div>
            <h2 style={{margin:0,fontSize:20}}>Almost there — set up your profile</h2>
            <div style={{fontSize:13,color:'#9aa6b2'}}>A few details to personalize your board</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:10}}>
            <input className="input-field focus-ring" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <input className="input-field focus-ring" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input className="input-field focus-ring" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          {error && <div style={{color:'#ffb4b4',fontSize:13}}>{error}</div>}

          <div style={{display:'flex',justifyContent:'flex-end',gap:10}}>
            <button type="button" className="btn-ghost" onClick={() => {}} aria-hidden>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save and Continue'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
