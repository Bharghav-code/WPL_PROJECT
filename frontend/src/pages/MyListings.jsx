import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { api } from '../api/client';
import { ArrowLeft, Users, Calendar, BookOpen, X, MapPin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_ICONS = {
  'Music': '🎵', 'Art': '🎨', 'Dance': '💃',
  'Drama': '🎭', 'Cooking': '🍳', 'Driving': '🚗'
};

export default function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const data = await api.getMyListings();
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudents = async (listing) => {
    setSelectedListing(listing);
    setStudentModalOpen(true);
    setLoadingStudents(true);
    try {
      const data = await api.getListingStudents(listing.id);
      setStudents(data.students);
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const closeModal = () => {
    setStudentModalOpen(false);
    setSelectedListing(null);
    setStudents([]);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
              <h1 style={{ marginBottom: '8px' }}>My Listings</h1>
              <p className="text-muted">All courses you are currently teaching</p>
            </div>
            <button
              className="primary-btn"
              onClick={() => navigate('/teacher/list-skill')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              + List a New Skill
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <p className="text-muted">Loading your listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card"
              style={{ textAlign: 'center', padding: '80px' }}
            >
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>📋</div>
              <h3 style={{ marginBottom: '8px' }}>No listings yet</h3>
              <p className="text-muted" style={{ marginBottom: '24px' }}>
                Start sharing your skills with the community!
              </p>
              <button className="primary-btn" onClick={() => navigate('/teacher/list-skill')}>
                Create Your First Listing
              </button>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Category accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                    background: 'linear-gradient(90deg, var(--primary-indigo), var(--primary-dark))'
                  }} />

                  {/* Header */}
                  <div className="flex items-center justify-between" style={{ marginBottom: '16px', paddingTop: '8px' }}>
                    <div className="flex items-center gap-2">
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '22px'
                      }}>
                        {CATEGORY_ICONS[listing.category] || '📚'}
                      </div>
                      <div>
                        <h3 style={{ marginBottom: '2px', color: 'var(--text-primary)' }}>{listing.subcategory}</h3>
                        <span className="text-muted" style={{ fontSize: '12px' }}>{listing.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px',
                    lineHeight: '1.5', flex: 1,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {listing.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-2" style={{ marginBottom: '20px' }}>
                    <div style={{
                      flex: 1, padding: '12px', borderRadius: '12px',
                      backgroundColor: 'rgba(132, 169, 140, 0.08)', textAlign: 'center'
                    }}>
                      <div className="flex items-center justify-center gap-2" style={{ marginBottom: '4px' }}>
                        <Users size={16} style={{ color: 'var(--primary-indigo)' }} />
                        <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary-indigo)' }}>
                          {listing.student_count}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                        Students
                      </div>
                    </div>
                    <div style={{
                      flex: 1, padding: '12px', borderRadius: '12px',
                      backgroundColor: 'rgba(159, 122, 234, 0.08)', textAlign: 'center'
                    }}>
                      <div className="flex items-center justify-center gap-2" style={{ marginBottom: '4px' }}>
                        <Calendar size={16} style={{ color: 'var(--accent-cyan)' }} />
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                        {formatDate(listing.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* View Students button */}
                  <button
                    className="secondary-btn"
                    onClick={() => handleViewStudents(listing)}
                    style={{
                      width: '100%', padding: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                  >
                    <Users size={16} /> View Students
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Students Modal */}
      <AnimatePresence>
        {studentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
              backdropFilter: 'blur(4px)'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="card"
              style={{
                width: '560px', maxHeight: '80vh', overflow: 'auto',
                padding: '32px', position: 'relative',
                backgroundColor: 'white', border: 'none'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'none', color: 'var(--text-secondary)', padding: '4px'
                }}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2" style={{ marginBottom: '24px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '20px'
                }}>
                  {CATEGORY_ICONS[selectedListing?.category] || '📚'}
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', marginBottom: '2px' }}>
                    {selectedListing?.subcategory}
                  </h2>
                  <span className="text-muted" style={{ fontSize: '13px' }}>
                    Enrolled Students
                  </span>
                </div>
              </div>

              {loadingStudents ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
                  <p className="text-muted">Loading students...</p>
                </div>
              ) : students.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '48px',
                  backgroundColor: 'var(--bg-color)', borderRadius: '16px'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>👤</div>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>No students yet</h3>
                  <p className="text-muted" style={{ fontSize: '13px' }}>
                    Students will appear here once their enrollment is accepted.
                  </p>
                </div>
              ) : (
                <div className="flex-col" style={{ gap: '12px' }}>
                  {students.map((student, i) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '14px 16px', borderRadius: '14px',
                        backgroundColor: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary-indigo), var(--primary-dark))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '700', fontSize: '16px', flexShrink: 0
                      }}>
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>
                          {student.name}
                        </div>
                        <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
                          <span className="flex items-center" style={{ fontSize: '12px', color: 'var(--text-secondary)', gap: '4px' }}>
                            <Mail size={12} /> {student.email}
                          </span>
                          <span className="flex items-center" style={{ fontSize: '12px', color: 'var(--text-secondary)', gap: '4px' }}>
                            <MapPin size={12} /> {student.location}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
