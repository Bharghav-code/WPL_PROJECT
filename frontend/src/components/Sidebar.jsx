import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings, PlusCircle, List, Mail, LogOut } from 'lucide-react';

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const learnerLinks = [
    { name: 'Dashboard', path: '/learner/dashboard', icon: <Home size={20} /> },
    { name: 'My Enrollments', path: '/learner/enrollments', icon: <BookOpen size={20} /> },
    { name: 'Settings', path: '/profile', icon: <Settings size={20} /> }
  ];

  const teacherLinks = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: <Home size={20} /> },
    { name: 'List a Skill', path: '/teacher/list-skill', icon: <PlusCircle size={20} /> },
    { name: 'My Listings', path: '/teacher/my-listings', icon: <List size={20} /> },
    { name: 'Requests', path: '/teacher/requests', icon: <Mail size={20} /> },
    { name: 'Settings', path: '/profile', icon: <Settings size={20} /> }
  ];

  const links = role === 'teacher' ? teacherLinks : learnerLinks;
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{
      width: '240px',
      backgroundColor: 'var(--bg-color-light)',
      borderRight: '1px solid var(--border-color)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0'
    }}>
      <div style={{ padding: '0 24px', marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--primary-indigo)', marginBottom: '8px' }}>SkillShare</h2>
        <div className="flex items-center gap-2" style={{ marginTop: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-primary)' }}>{user.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>📍 {user.location}</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none' }}>
          {links.map(link => {
            const isActive = currentPath === link.path;
            return (
              <li key={link.name}>
                <a 
                  href="javascript:void(0)"
                  onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 24px',
                    color: isActive ? 'var(--primary-indigo)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(132, 169, 140, 0.1)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--primary-indigo)' : '3px solid transparent',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s'
                  }}
                >
                  {link.icon}
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ padding: '24px' }}>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', 
            color: 'var(--danger-color)', backgroundColor: 'transparent',
            padding: '8px 0', fontSize: '14px', fontWeight: '600'
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
