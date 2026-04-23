import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_ICONS = {
  'Music': '🎵', 'Art': '🎨', 'Dance': '💃',
  'Drama': '🎭', 'Cooking': '🍳', 'Driving': '🚗'
};

export default function TeacherRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await api.getAllTeacherEnrollments();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await api.updateEnrollmentStatus(id, status);
      fetchRequests(); // refresh
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Group requests by course
  const groupedRequests = requests.reduce((acc, req) => {
    const key = `${req.subcategory} (${req.category})`;
    if (!acc[key]) acc[key] = { items: [], category: req.category, subcategory: req.subcategory };
    acc[key].items.push(req);
    return acc;
  }, {});

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role="teacher" />
      
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: '32px' }}>
            <div>
              <h1 style={{ marginBottom: '8px' }}>Enrollment Requests</h1>
              <p className="text-muted">Manage your students' enrollment and trial requests</p>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <p className="text-muted">Loading requests...</p>
            </div>
          ) : Object.keys(groupedRequests).length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card" 
              style={{ textAlign: 'center', padding: '80px' }}
            >
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>📬</div>
              <h3 style={{ marginBottom: '8px' }}>No requests yet</h3>
              <p className="text-muted">You will see student requests here once they apply to your courses.</p>
            </motion.div>
          ) : (
            <div className="flex-col gap-4">
              {Object.entries(groupedRequests).map(([courseName, group], index) => (
                <motion.section 
                  key={courseName}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="card" 
                  style={{ padding: '24px' }}
                >
                  <div className="flex items-center gap-3" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', 
                      backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', 
                      justifyContent: 'center', fontSize: '20px'
                    }}>
                      {CATEGORY_ICONS[group.category] || '📚'}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '18px', marginBottom: '2px' }}>{group.subcategory}</h2>
                      <span className="text-muted" style={{ fontSize: '13px' }}>{group.category}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', backgroundColor: 'var(--bg-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                      {group.items.length} Request{group.items.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="flex-col gap-3">
                    {group.items.map(req => (
                      <div key={req.id} className="flex items-center justify-between" style={{ 
                        padding: '16px', 
                        borderRadius: '12px',
                        backgroundColor: req.status === 'pending' ? 'rgba(255, 248, 231, 0.5)' : 'var(--bg-color)',
                        border: req.status === 'pending' ? '1px solid #FDE68A' : '1px solid var(--border-color)'
                      }}>
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: '600', fontSize: '14px'
                          }}>
                            {req.learner_name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '15px' }}>{req.learner_name}</div>
                            <div className="flex items-center gap-2" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                              <span>Requested {req.type === 'trial' ? 'a Trial Session' : 'to Enroll'}</span>
                            </div>
                          </div>
                        </div>

                        {req.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button 
                              className="danger-btn" 
                              onClick={() => handleUpdate(req.id, 'rejected')}
                              style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                              <X size={16} /> Reject
                            </button>
                            <button 
                              className="primary-btn" 
                              onClick={() => handleUpdate(req.id, 'accepted')} 
                              style={{ backgroundColor: 'var(--success-color)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                              <Check size={16} /> Accept
                            </button>
                          </div>
                        ) : (
                          <StatusBadge status={req.status} />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
