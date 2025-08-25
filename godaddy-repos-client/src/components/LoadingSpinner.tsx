import React from 'react';
import loadingSpinner from '../assets/loadingSpinner.gif';

const spinnerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
};

export const LoadingSpinner: React.FC = () => (
  <div style={spinnerStyle}>
    <img src={loadingSpinner} alt="Loading..." />
  </div>
);