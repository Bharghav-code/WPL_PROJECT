import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Mail, Lock, User, MapPin } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.register(formData);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/role-select');
    } catch (err) {
      setError(JSON.parse(err.message).error || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Panel */}
      <div style={{ width: '40%', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '64px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 'auto' }}>SkillShare</h1>
        <div style={{ marginTop: 'auto', marginBottom: '120px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.2', marginBottom: '16px' }}>
            Join your <span style={{ color: 'var(--accent-green)' }}>local</span> community.
          </h2>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: '60%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Create Account</h2>
          <p className="text-muted" style={{ marginBottom: '32px' }}>Sign up to start learning or teaching.</p>

          {error && <div style={{ color: 'var(--danger-color)', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

          <form onSubmit={handleRegister} className="flex-col gap-3">
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-secondary)' }} />
              <input 
                type="text" placeholder="Full Name" style={{ paddingLeft: '48px' }} required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-secondary)' }} />
              <input 
                type="email" placeholder="Email address" style={{ paddingLeft: '48px' }} required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-secondary)' }} />
              <input 
                type="text" placeholder="Location area e.g., Andheri" style={{ paddingLeft: '48px' }} required
                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-secondary)' }} />
              <input 
                type="password" placeholder="Password" style={{ paddingLeft: '48px' }} required
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', padding: '14px' }}>
              Create Account →
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
