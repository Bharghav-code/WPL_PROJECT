import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { api } from '../api/client';
import { Mail, Info, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
              <div key={enr.id} className="card" style={{ padding: '20px 24px' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: expandedId === enr.id ? '16px' : '0' }}>
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
                  <div className="flex items-center gap-4">
                    <StatusBadge status={enr.status} />
                    <button 
                      onClick={() => toggleExpand(enr.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--primary-indigo)', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '0' }}
                    >
                      <Info size={14} /> Teacher {expandedId === enr.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {expandedId === enr.id && (
                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '13px' }}>
                     <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                        <Mail size={14} /> <strong>Email:</strong> {enr.teacher_email || 'Not provided'}
                     </div>
                     {enr.teacher_bio && (
                       <div style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>
                         <strong>Background:</strong> {enr.teacher_bio}
                       </div>
                     )}
                     {enr.teacher_social_links && (
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                         <LinkIcon size={14} /> <strong>Social:</strong> {enr.teacher_social_links}
                       </div>
                     )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
