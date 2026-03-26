import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TeacherCard from '../components/TeacherCard';
import { api } from '../api/client';
import { ArrowLeft } from 'lucide-react';

const SUBCATEGORIES = {
  'Music': ['Guitar', 'Piano', 'Violin', 'Singing'],
  'Art': ['Sketching', 'Painting', 'Pottery', 'Origami'],
  'Dance': ['Bharatnatyam', 'Hip-Hop', 'Salsa', 'Freestyle'],
  'Drama': ['Acting', 'Puppetry', 'Storytelling', 'Mime'],
  'Cooking': ['Baking', 'Indian Cuisine', 'Pasta & Italian', 'Healthy Meals'],
  'Driving': ['Car (Manual)', 'Car (Automatic)', 'Two-Wheeler', 'Parking & Basics']
};

export default function TeacherList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeSubcategory, setActiveSubcategory] = useState(SUBCATEGORIES[category]?.[0] || '');
  const [maxKm, setMaxKm] = useState(4.0);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, [category, maxKm]);

  const fetchTeachers = async () => {
    try {
      const allListings = await api.getListings(category, maxKm);
      setTeachers(allListings);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTeachers = teachers.filter(t => t.subcategory === activeSubcategory);

  const handleEnroll = async (id, type) => {
    try {
      await api.enroll(id, type);
      alert('Request sent successfully!');
      navigate('/learner/enrollments');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role="learner" />
      
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        <button 
          className="flex items-center gap-2" 
          style={{ background: 'none', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: '500' }}
          onClick={() => navigate('/learner/dashboard')}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 style={{ marginBottom: '8px' }}>{category} Teachers</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>Dashboard {'>'} {category}</p>

        <div className="flex gap-2" style={{ marginBottom: '40px', flexWrap: 'wrap' }}>
          {SUBCATEGORIES[category]?.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubcategory(sub)}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                border: activeSubcategory === sub ? '1.5px solid var(--primary-blue)' : '1.5px solid var(--border-color)',
                backgroundColor: activeSubcategory === sub ? '#EFF6FF' : 'white',
                color: activeSubcategory === sub ? 'var(--primary-blue)' : 'var(--text-primary)',
                fontWeight: activeSubcategory === sub ? '600' : '400'
              }}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
          <h2>{activeSubcategory} Teachers Near You</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted">Distance: under {maxKm.toFixed(1)} km</span>
            <input 
              type="range" 
              min="0.5" 
              max="8.0" 
              step="0.5" 
              value={maxKm} 
              onChange={e => setMaxKm(parseFloat(e.target.value))}
              style={{ width: '150px' }}
            />
          </div>
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '64px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👀</div>
            <h3>No teachers found</h3>
            <p className="text-muted">Try increasing the distance slider to find more people.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {filteredTeachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onEnroll={() => handleEnroll(teacher.id, 'enroll')}
                onTrial={() => handleEnroll(teacher.id, 'trial')}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
