import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is SkillShare?",
      answer: "SkillShare is a community-driven platform where you can discover and learn new skills from local teachers in your neighborhood, or list your own skills to teach others."
    },
    {
      question: "How do I enroll in a class?",
      answer: "Once you create a learner account, you can browse skills by category. Click on a teacher's card to request an enrollment. The teacher will review your request and accept you into the class."
    },
    {
      question: "Is it free to list a skill as a teacher?",
      answer: "Yes! Listing a skill is completely free. You can host classes, trial sessions, and build a local community."
    },
    {
      question: "How do I contact support?",
      answer: "You can click on 'Contact us' in the footer, or email support@skillshare.local. We typically respond within 24 hours."
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '60px 24px' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            background: 'none', border: 'none', color: 'var(--primary-indigo)', 
            cursor: 'pointer', marginBottom: '32px', fontWeight: 'bold', fontSize: '16px' 
          }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '18px' }}>
          Everything you need to know about the product and how it works.
        </p>

        <div style={{ display: 'grid', gap: '24px' }}>
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
              style={{ padding: '32px', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}
            >
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-primary)' }}>{faq.question}</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
