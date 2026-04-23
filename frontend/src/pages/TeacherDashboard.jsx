import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { api } from '../api/client';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const qs = await api.getTeacherEnrollments();
      setRequests(qs);
      
      const sessionUser = JSON.parse(localStorage.getItem('user'));
      const allListings = await api.getListings();
      setListings(allListings.filter(l => l.teacher_name === sessionUser.name));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await api.updateEnrollmentStatus(id, status);
      fetchData(); // refresh
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDeleteListing = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.deleteListing(id);
      fetchData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <Sidebar role="teacher" />
      
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ marginBottom: '40px', fontSize: '36px' }}
        >
          Teacher Dashboard
        </motion.h1>
        
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Pending Requests ({requests.length})</h2>
          {requests.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted card" style={{ padding: '32px', textAlign: 'center' }}>
              No pending requests at the moment.
            </motion.p>
          ) : (
            <motion.div 
              initial="hidden" animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="flex-col gap-3"
            >
              {requests.map(req => (
                <motion.div key={req.id} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="card flex justify-between items-center" style={{ padding: '24px' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '18px' }}>{req.learner_name}</div>
                    <div className="text-muted" style={{ fontSize: '15px' }}>
                      Requested {req.type === 'trial' ? 'a Trial Session' : 'to Enroll'} for <strong style={{ color: 'var(--text-primary)' }}>{req.subcategory} ({req.category})</strong>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="danger-btn" onClick={() => handleUpdate(req.id, 'rejected')}>Reject</button>
                    <button className="primary-btn" onClick={() => handleUpdate(req.id, 'accepted')} style={{ backgroundColor: 'var(--success-color)' }}>Accept</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px' }}>My Active Listings ({listings.length})</h2>
            <button className="primary-btn" onClick={() => window.location.href='/teacher/list-skill'}>+ List a New Skill</button>
          </div>
          
          {listings.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted card" style={{ padding: '32px', textAlign: 'center' }}>
              You haven't listed any skills yet.
            </motion.p>
          ) : (
            <motion.div 
              initial="hidden" animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
            >
              {listings.map(listing => (
                <motion.div key={listing.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="card flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
                      <h3 style={{ color: 'var(--primary-indigo)', fontSize: '20px' }}>{listing.subcategory}</h3>
                      <span className="text-muted" style={{ fontSize: '12px', background: 'var(--border-color)', padding: '4px 8px', borderRadius: '12px' }}>{listing.category}</span>
                    </div>
                    <p style={{ fontSize: '15px', marginBottom: '24px', lineHeight: '1.5' }}>{listing.description}</p>
                  </div>
                  <button className="danger-btn" style={{ width: '100%', marginTop: 'auto' }} onClick={() => handleDeleteListing(listing.id)}>Delete Listing</button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
