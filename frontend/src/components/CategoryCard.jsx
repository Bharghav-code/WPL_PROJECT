import React from 'react';

export default function CategoryCard({ icon, label, onClick }) {
  return (
    <div 
      className="card"
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '24px',
        cursor: 'pointer',
        textAlign: 'center',
        gap: '12px'
      }}
      onClick={onClick}
    >
      <div style={{
        width: '48px', height: '48px', 
        borderRadius: '50%', 
        backgroundColor: '#EFF6FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px'
      }}>
        {icon}
      </div>
      <div style={{ fontWeight: '600', fontSize: '14px' }}>
        {label}
      </div>
    </div>
  );
}
