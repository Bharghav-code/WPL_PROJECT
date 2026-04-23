import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      padding: '24px',
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color-light)',
      fontSize: '14px',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <span style={{ fontWeight: 'bold' }}>Support : </span>
      <Link to="/help" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 8px' }}>Help Center</Link> 
      {' | '}
      <Link to="/faq" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 8px' }}>FAQs</Link> 
      {' | '}
      <Link to="/contact" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 8px' }}>Contact Us</Link> 
      {' | '}
      <Link to="/report" style={{ color: 'var(--primary-indigo)', textDecoration: 'none', margin: '0 8px' }}>Report Issue</Link>
    </footer>
  );
}
