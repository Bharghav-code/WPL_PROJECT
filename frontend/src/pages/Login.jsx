import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Mail, Lock } from 'lucide-react';

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
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Panel */}
      <div style={{ width: '40%', backgroundColor: 'var(--primary-blue)', color: 'white', padding: '64px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 'auto' }}>SkillShare</h1>
        
        <div style={{ marginTop: 'auto', marginBottom: '120px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.2', marginBottom: '16px' }}>
            Where every <span style={{ color: 'var(--accent-green)' }}>skill</span> finds its home.
          </h2>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Learn from people in your neighbourhood.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: '60%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h2>
          <p className="text-muted" style={{ marginBottom: '32px' }}>Sign in to continue</p>

          {error && <div style={{ color: 'var(--danger-color)', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

          <form onSubmit={handleLogin} className="flex-col gap-3">
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-secondary)' }} />
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
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                placeholder="Password" 
                style={{ paddingLeft: '48px' }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', padding: '14px' }}>
              Sign In →
            </button>
          </form>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              type="button" 
              className="secondary-btn" 
              style={{ flex: 1, padding: '10px' }}
              onClick={() => handleDemoLogin('learner')}
            >
              Demo Learner
            </button>
            <button 
              type="button" 
              className="secondary-btn" 
              style={{ flex: 1, padding: '10px' }}
              onClick={() => handleDemoLogin('teacher')}
            >
              Demo Teacher
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
            <span className="text-muted">New here? </span>
            <Link to="/register" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
