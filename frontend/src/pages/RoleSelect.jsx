import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>How would you like to continue today?</h2>
      <p className="text-muted" style={{ marginBottom: '48px' }}>Choose your path to get started.</p>

      <div className="flex gap-4">
        <div 
          className="card"
          onClick={() => navigate('/learner/dashboard')}
          style={{ width: '300px', textAlign: 'center', cursor: 'pointer', padding: '48px 24px' }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
          <h3>I want to Learn</h3>
          <p className="text-muted" style={{ marginTop: '8px' }}>Find a teacher nearby and pick up a new skill.</p>
        </div>

        <div 
          className="card"
          onClick={() => navigate('/teacher/dashboard')}
          style={{ width: '300px', textAlign: 'center', cursor: 'pointer', padding: '48px 24px' }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏫</div>
          <h3>I want to Teach</h3>
          <p className="text-muted" style={{ marginTop: '8px' }}>Share what you know and earn or volunteer.</p>
        </div>
      </div>
    </div>
  );
}
