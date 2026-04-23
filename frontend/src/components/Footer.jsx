import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      padding: '24px',
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color-light)',
      color: 'var(--text-secondary)',
      fontSize: '14px',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <span>support: </span>
      <a href="#" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 4px' }}>Help center</a>, 
      <a href="#" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 4px' }}>FAQs</a>, 
      <a href="#" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 4px' }}>Contact us</a> 
      {' | '}
      <a href="#" style={{ color: 'var(--danger-color)', textDecoration: 'none', margin: '0 4px' }}>report issue</a>
    </footer>
  );
}
