import React from 'react';

export default function TeacherCard({ teacher, onEnroll, onTrial }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%', 
            backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '18px', color: 'var(--primary-blue)'
          }}>
            {teacher.teacher_name?.charAt(0) || 'T'}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '16px' }}>{teacher.teacher_name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{teacher.subcategory}</span>
              <span style={{ color: '#F59E0B' }}>★ 4.8</span>
            </div>
          </div>
        </div>
        <div style={{
          backgroundColor: '#EFF6FF', color: 'var(--primary-blue)', 
          padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '500'
        }}>
          {teacher.distance_km} km away
        </div>
      </div>
      
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {teacher.description}
      </p>

      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
        <strong>Available:</strong> {teacher.availability}
      </div>
      
      {teacher.trial_info && (
        <div style={{ fontSize: '12px', backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '6px' }}>
          <strong>Trial:</strong> {teacher.trial_info}
        </div>
      )}

      <div className="flex gap-2" style={{ marginTop: 'auto', paddingTop: '8px' }}>
        <button className="primary-btn" style={{ flex: 1 }} onClick={onEnroll}>
          Enroll
        </button>
        {teacher.trial_info && (
          <button className="secondary-btn" style={{ flex: 1 }} onClick={onTrial}>
            Trial Session
          </button>
        )}
      </div>
    </div>
  );
}
