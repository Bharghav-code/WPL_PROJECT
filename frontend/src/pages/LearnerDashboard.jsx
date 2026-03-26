import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryCard from '../components/CategoryCard';
import TeacherCard from '../components/TeacherCard';

const CATEGORIES = [
  { id: 'Music', icon: '🎵' },
  { id: 'Art', icon: '🎨' },
  { id: 'Dance', icon: '💃' },
  { id: 'Drama', icon: '🎭' },
  { id: 'Cooking', icon: '🍳' },
  { id: 'Driving', icon: '🚗' }
];

export default function LearnerDashboard() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = React.useState([]);

  React.useEffect(() => {
    import('../api/client').then(({ api }) => {
      api.getListings(null, 4.0)
        .then(data => setTeachers(data.slice(0, 3))) // just show top 3 nearby
        .catch(console.error);
    });
  }, []);

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role="learner" />
      
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-dark))',
          borderRadius: '16px',
          padding: '48px',
          color: 'white',
          marginBottom: '48px'
        }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Find your next skill.</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '24px' }}>
            Connect with amazing teachers in your local neighbourhood right now.
          </p>
          <button style={{ 
            backgroundColor: 'white', color: 'var(--primary-blue)', 
            padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold' 
          }} onClick={() => window.scrollTo({ top: 400, behavior: 'smooth'})}>
            Browse Skills →
          </button>
        </div>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Skill Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {CATEGORIES.map(cat => (
              <CategoryCard 
                key={cat.id} 
                icon={cat.icon} 
                label={cat.id} 
                onClick={() => navigate(`/learner/category/${cat.id}`)} 
              />
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '24px' }}>Teachers Nearby</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {teachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onEnroll={() => navigate(`/learner/category/${teacher.category}`)}
                onTrial={() => navigate(`/learner/category/${teacher.category}`)}
              />
            ))}
          </div>
          {teachers.length === 0 && <p className="text-muted">No teachers found nearby yet.</p>}
        </section>
      </main>

      <aside style={{ width: '280px', backgroundColor: 'white', borderLeft: '1px solid var(--border-color)', padding: '32px 24px' }}>
        <h3 style={{ marginBottom: '24px' }}>Quick Summary</h3>
        <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-blue)' }}>12+</div>
          <div className="text-muted" style={{ fontSize: '14px' }}>Teachers active today</div>
        </div>
        <p className="text-muted" style={{ fontSize: '14px' }}>Head over to "My Enrollments" to check the status of your requests.</p>
      </aside>
    </div>
  );
}
