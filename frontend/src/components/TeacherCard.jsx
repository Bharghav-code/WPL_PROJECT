import React, { useState } from 'react';
import { Mail, Info, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';

export default function TeacherCard({ teacher, onEnroll, onTrial }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%', 
            backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '18px', color: 'var(--primary-indigo)'
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
          backgroundColor: '#EFF6FF', color: 'var(--primary-indigo)', 
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
        <div style={{ fontSize: '12px', backgroundColor: 'var(--bg-color)', padding: '8px', borderRadius: '6px' }}>
          <strong>Trial:</strong> {teacher.trial_info}
        </div>
      )}

      {/* Teacher Profile Toggle */}
      <div style={{ marginTop: '4px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          style={{ background: 'none', border: 'none', color: 'var(--primary-indigo)', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '0' }}
        >
          <Info size={14} /> About Teacher {showInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {showInfo && (
          <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', fontSize: '13px' }}>
             <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <Mail size={14} /> <strong>Email:</strong> {teacher.teacher_email || 'Not provided'}
             </div>
             {teacher.teacher_bio && (
               <div style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>
                 <strong>Background:</strong> {teacher.teacher_bio}
               </div>
             )}
             {teacher.teacher_social_links && (
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                 <LinkIcon size={14} /> <strong>Social:</strong> {teacher.teacher_social_links}
               </div>
             )}
          </div>
        )}
      </div>

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
