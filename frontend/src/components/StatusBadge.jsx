import React from 'react';

export default function StatusBadge({ status }) {
  let bgColor, color;

  switch (status.toLowerCase()) {
    case 'accepted':
      bgColor = '#DCFCE7';
      color = '#166534';
      break;
    case 'rejected':
      bgColor = '#FEE2E2';
      color = '#991B1B';
      break;
    default:
      bgColor = '#FEF9C3';
      color = '#854D0E';
  }

  return (
    <span style={{
      backgroundColor: bgColor,
      color: color,
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'capitalize'
    }}>
      {status}
    </span>
  );
}
