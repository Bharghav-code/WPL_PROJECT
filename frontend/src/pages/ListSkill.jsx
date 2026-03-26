import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { api } from '../api/client';

const CATEGORIES = {
  'Music': ['Guitar', 'Piano', 'Violin', 'Singing'],
  'Art': ['Sketching', 'Painting', 'Pottery', 'Origami'],
  'Dance': ['Bharatnatyam', 'Hip-Hop', 'Salsa', 'Freestyle'],
  'Drama': ['Acting', 'Puppetry', 'Storytelling', 'Mime'],
  'Cooking': ['Baking', 'Indian Cuisine', 'Pasta & Italian', 'Healthy Meals'],
  'Driving': ['Car (Manual)', 'Car (Automatic)', 'Two-Wheeler', 'Parking & Basics']
};

export default function ListSkill() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    description: '',
    availability: '',
    hasTrial: false,
    trial_info: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.subcategory || !formData.description || !formData.availability) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await api.createListing({
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        availability: formData.availability,
        trial_info: formData.hasTrial ? formData.trial_info : ''
      });
      navigate('/teacher/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role="teacher" />
      
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        <h1 style={{ marginBottom: '8px' }}>List a New Skill</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>Share your knowledge with your neighbours.</p>

        <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ maxWidth: '600px' }}>
          {error && <div style={{ color: 'var(--danger-color)' }}>{error}</div>}

          <div className="card flex-col gap-3">
            <h3 style={{ marginBottom: '8px' }}>1. What will you teach?</h3>
            <div className="flex gap-3">
              <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Category</label>
                <select 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--border-color)', backgroundColor: '#F1F5FF' }}
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value, subcategory: ''})}
                >
                  <option value="">Select Category</option>
                  {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Subcategory</label>
                <select 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--border-color)', backgroundColor: '#F1F5FF' }}
                  value={formData.subcategory}
                  onChange={e => setFormData({...formData, subcategory: e.target.value})}
                  disabled={!formData.category}
                >
                  <option value="">Select Subcategory</option>
                  {formData.category && CATEGORIES[formData.category].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px', marginTop: '16px' }}>Short Description / Bio</label>
              <textarea 
                rows="3" 
                placeholder="E.g., I have been playing guitar for 10 years and love teaching beginners..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="card flex-col gap-3">
            <h3 style={{ marginBottom: '8px' }}>2. Availability</h3>
            <div>
              <label className="text-muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>When are you free to teach?</label>
              <input 
                type="text" 
                placeholder="E.g., Weekends 10am-12pm or Wed evenings"
                value={formData.availability}
                onChange={e => setFormData({...formData, availability: e.target.value})}
              />
            </div>
          </div>

          <div className="card flex-col gap-3">
            <h3 style={{ marginBottom: '8px' }}>3. Trial Session</h3>
            <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={formData.hasTrial}
                onChange={e => setFormData({...formData, hasTrial: e.target.checked})}
                style={{ width: 'auto' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Offer a trial session to beginners</span>
            </label>

            {formData.hasTrial && (
              <div style={{ marginTop: '16px' }}>
                <label className="text-muted" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Describe your trial session</label>
                <textarea 
                  rows="2" 
                  placeholder="E.g., First 30 min is free, we will cover basic chords..."
                  value={formData.trial_info}
                  onChange={e => setFormData({...formData, trial_info: e.target.value})}
                ></textarea>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3" style={{ marginTop: '16px' }}>
            <button type="button" className="secondary-btn" onClick={() => navigate('/teacher/dashboard')}>Cancel</button>
            <button type="submit" className="primary-btn">Post Listing</button>
          </div>
        </form>
      </main>
    </div>
  );
}
