import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    profile_photo: '',
    bio: '',
    languages: '',
    social_links: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();
  
  // Determine role based on location state (passed from Sidebar click) or fallback to last known role
  const currentRole = location.state?.role || localStorage.getItem('currentRole') || 'learner';

  useEffect(() => {
    localStorage.setItem('currentRole', currentRole);
  }, [currentRole]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setProfile({
          name: data.name || '',
          email: data.email || '',
          location: data.location || '',
          profile_photo: data.profile_photo || '',
          bio: data.bio || '',
          languages: data.languages || '',
          social_links: data.social_links || ''
        });
      }
      setLoading(false);
    })
    .catch(() => {
      setError('Failed to load profile');
      setLoading(false);
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profile_photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:5001/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
        // Update local storage user display name
        const updatedUser = { ...user, name: profile.name, location: profile.location };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        setError(data.error || 'Update failed');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  if (loading) return <div style={{ padding: '40px' }}>Loading...</div>;

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role={currentRole} />
      
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--text-primary)' }}>Profile Settings</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Update your personal information and biography.</p>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '40px', backgroundColor: 'var(--card-bg)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            
            {message && <div style={{ padding: '12px', backgroundColor: 'rgba(132, 169, 140, 0.2)', color: 'var(--primary-indigo)', borderRadius: '8px', marginBottom: '24px' }}>{message}</div>}
            {error && <div style={{ padding: '12px', backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'var(--danger-color)', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg-color-light)',
                backgroundImage: `url(${profile.profile_photo})`, backgroundSize: 'cover', backgroundPosition: 'center',
                border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', color: 'var(--text-secondary)'
              }}>
                {!profile.profile_photo && (profile.name ? profile.name.charAt(0) : 'U')}
              </div>
              <div>
                <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" className="form-control" 
                  value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email ID *</label>
                <input 
                  type="email" className="form-control" 
                  value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Bio (Skills, Interests) *</label>
              <textarea 
                className="form-control" 
                rows="4"
                placeholder="Tell us about yourself..."
                value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Location (Optional)</label>
              <input 
                type="text" className="form-control" 
                value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div className="form-group">
                <label className="form-label">Languages Spoken</label>
                <input 
                  type="text" className="form-control" placeholder="e.g. English, Hindi, Spanish"
                  value={profile.languages} onChange={e => setProfile({...profile, languages: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Social Links (Optional)</label>
                <input 
                  type="text" className="form-control" placeholder="LinkedIn, Twitter, Portfolio URL"
                  value={profile.social_links} onChange={e => setProfile({...profile, social_links: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="w-100" style={{
              backgroundColor: 'var(--primary-indigo)', color: 'white', border: 'none',
              padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Save Changes
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
