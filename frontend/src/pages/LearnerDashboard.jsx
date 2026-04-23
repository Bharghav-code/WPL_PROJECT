import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryCard from '../components/CategoryCard';
import TeacherCard from '../components/TeacherCard';
import { motion } from 'framer-motion';

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
      
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            background: 'linear-gradient(135deg, var(--primary-indigo), var(--primary-dark))',
            borderRadius: '24px',
            padding: '48px',
            color: 'white',
            marginBottom: '48px',
            boxShadow: '0 12px 32px rgba(132, 169, 140, 0.25)'
          }}
        >
          <h1 style={{ fontSize: '40px', marginBottom: '16px', letterSpacing: '-0.02em', color: 'white' }}>Find your next skill.</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '32px' }}>
            Connect with amazing teachers in your local neighbourhood right now.
          </p>
          <button style={{ 
            backgroundColor: 'var(--card-bg)', color: 'var(--primary-dark)', 
            padding: '14px 28px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }} onClick={() => window.scrollTo({ top: 400, behavior: 'smooth'})}>
            Browse Skills →
          </button>
        </motion.div>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Skill Categories</h2>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}
          >
            {CATEGORIES.map(cat => (
              <motion.div key={cat.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                <CategoryCard 
                  icon={cat.icon} 
                  label={cat.id} 
                  onClick={() => navigate(`/learner/category/${cat.id}`)} 
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section>
          <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Teachers Nearby</h2>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {teachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onEnroll={() => navigate(`/learner/category/${teacher.category}`)}
                onTrial={() => navigate(`/learner/category/${teacher.category}`)}
              />
            ))}
          </motion.div>
          {teachers.length === 0 && <p className="text-muted">No teachers found nearby yet.</p>}
        </section>
      </main>

      <aside style={{ width: '300px', backgroundColor: 'var(--bg-color-light)', borderLeft: '1px solid var(--border-color)', padding: '40px 24px' }}>
        <h3 style={{ marginBottom: '24px' }}>Quick Summary</h3>
        <motion.div whileHover={{ scale: 1.02 }} className="card" style={{ padding: '20px', marginBottom: '24px', border: '1px solid var(--card-border)' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-indigo)' }}>12+</div>
          <div className="text-muted" style={{ fontSize: '15px' }}>Teachers active today</div>
        </motion.div>
        <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>Head over to <strong>My Enrollments</strong> to check the status of your requests.</p>
      </aside>
    </div>
  );
}
