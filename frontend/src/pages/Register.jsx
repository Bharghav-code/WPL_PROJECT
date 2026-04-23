import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Mail, Lock, User, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Left Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ 
          width: '45%', 
          backgroundColor: 'var(--primary-indigo)', 
          padding: '64px', 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'relative'
        }}
      >
        <h1 style={{ fontSize: '28px', color: 'white', marginBottom: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>S</span>
          </div>
          SkillShare
        </h1>
        
        <div style={{ marginTop: 'auto', marginBottom: '120px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontSize: '56px', fontWeight: '700', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-0.03em', color: 'white' }}
          >
            Join your <span style={{ color: 'var(--card-bg)' }}>local</span><br/>community.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Start sharing your skills or learning from others today.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div style={{ width: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card"
          style={{ width: '100%', maxWidth: '440px', padding: '40px' }}
        >
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Create Account</h2>
          <p className="text-muted" style={{ marginBottom: '32px' }}>Sign up to start learning or teaching.</p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="flex-col gap-3">
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="text" placeholder="Full Name" style={{ paddingLeft: '48px' }} required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="email" placeholder="Email address" style={{ paddingLeft: '48px' }} required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="text" placeholder="Location area e.g., Andheri" style={{ paddingLeft: '48px' }} required
                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="password" placeholder="Password" style={{ paddingLeft: '48px' }} required
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
              Create Account
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px' }}>
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" style={{ color: 'var(--primary-indigo)', fontWeight: '600' }}>Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
