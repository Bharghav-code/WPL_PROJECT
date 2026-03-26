import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { api } from '../api/client';

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await api.getLearnerEnrollments();
      setEnrollments(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role="learner" />
      
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        <h1 style={{ marginBottom: '32px' }}>My Enrollments</h1>

        {enrollments.length === 0 ? (
          <div className="card text-center" style={{ padding: '64px' }}>
            <h3 style={{ marginBottom: '8px' }}>You haven't requested any classes yet.</h3>
            <p className="text-muted">Head over to the Dashboard to find a skill to learn.</p>
          </div>
        ) : (
          <div className="flex-col gap-3">
            {enrollments.map(enr => (
              <div key={enr.id} className="card flex justify-between items-center" style={{ padding: '20px 24px' }}>
                <div className="flex items-center gap-4">
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px', 
                    backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {enr.category === 'Music' ? '🎵' : 
                     enr.category === 'Art' ? '🎨' : 
                     enr.category === 'Dance' ? '💃' : 
                     enr.category === 'Drama' ? '🎭' : 
                     enr.category === 'Cooking' ? '🍳' : '🚗'}
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '4px' }}>
                      {enr.subcategory} <span style={{ fontWeight: '400', color: 'var(--text-secondary)' }}>— {enr.teacher_name}</span>
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Request Type: <strong>{enr.type === 'trial' ? 'Trial Session' : 'Enrollment'}</strong>
                    </div>
                  </div>
                </div>
                <StatusBadge status={enr.status} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
