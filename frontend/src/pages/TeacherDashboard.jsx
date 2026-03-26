import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { api } from '../api/client';

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
      // Hack: we fetch all and filter by current user since there is no /my-listings endpoint specified
      // But wait! in models.py the user ID is needed. Since we don't have a /my-listings in requirements
      // Requirements say: GET /api/listings optionally filtered by category.
      // So let's fetch all listings and filter on client to show "My Active Listings".
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
      
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        <h1 style={{ marginBottom: '32px' }}>Teacher Dashboard</h1>
        
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Pending Requests ({requests.length})</h2>
          {requests.length === 0 ? (
            <p className="text-muted card">No pending requests at the moment.</p>
          ) : (
            <div className="flex-col gap-3">
              {requests.map(req => (
                <div key={req.id} className="card flex justify-between items-center">
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{req.learner_name}</div>
                    <div className="text-muted" style={{ fontSize: '14px' }}>
                      Requested {req.type === 'trial' ? 'a Trial Session' : 'to Enroll'} for <strong>{req.subcategory} ({req.category})</strong>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="danger-btn" onClick={() => handleUpdate(req.id, 'rejected')}>Reject</button>
                    <button className="primary-btn" onClick={() => handleUpdate(req.id, 'accepted')} style={{ backgroundColor: 'var(--success-color)' }}>Accept</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
            <h2>My Active Listings ({listings.length})</h2>
            <button className="primary-btn" onClick={() => window.location.href='/teacher/list-skill'}>+ List a New Skill</button>
          </div>
          
          {listings.length === 0 ? (
            <p className="text-muted card">You haven't listed any skills yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {listings.map(listing => (
                <div key={listing.id} className="card">
                  <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
                    <h3 style={{ color: 'var(--primary-blue)' }}>{listing.subcategory}</h3>
                    <span className="text-muted" style={{ fontSize: '12px' }}>{listing.category}</span>
                  </div>
                  <p style={{ fontSize: '14px', marginBottom: '16px' }}>{listing.description}</p>
                  <button className="danger-btn" style={{ width: '100%' }} onClick={() => handleDeleteListing(listing.id)}>Delete Listing</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
