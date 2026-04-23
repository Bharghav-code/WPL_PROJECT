import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/role-select');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDemoLogin = async (role) => {
    try {
      const demoEmail = role === 'teacher' ? 'rahul@example.com' : 'learner@test.com';
      const res = await api.login(demoEmail, 'password123');
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate(role === 'teacher' ? '/teacher/dashboard' : '/learner/dashboard');
    } catch (err) {
      setError('Demo login failed: ' + err.message);
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
            Where every <span style={{ color: 'var(--card-bg)' }}>skill</span><br/>finds its home.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Connect, learn, and grow with experts in your neighbourhood.
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
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h2>
          <p className="text-muted" style={{ marginBottom: '32px' }}>Sign in to your account</p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="flex-col gap-3">
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ paddingLeft: '48px' }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                placeholder="Password" 
                style={{ paddingLeft: '48px' }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
              Sign In
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <span style={{ padding: '0 12px', color: 'var(--text-secondary)', fontSize: '14px' }}>or quick access</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button" 
              className="secondary-btn" 
              style={{ flex: 1, padding: '12px' }}
              onClick={() => handleDemoLogin('learner')}
            >
              Demo Learner
            </button>
            <button 
              type="button" 
              className="secondary-btn" 
              style={{ flex: 1, padding: '12px' }}
              onClick={() => handleDemoLogin('teacher')}
            >
              Demo Teacher
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px' }}>
            <span className="text-muted">New here? </span>
            <Link to="/register" style={{ color: 'var(--primary-indigo)', fontWeight: '600' }}>Create Account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
