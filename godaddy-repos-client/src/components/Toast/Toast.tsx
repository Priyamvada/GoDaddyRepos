import React from 'react';
import { ToastProps } from './toast.types';
import { baseStyle, dismissButtonStyle, toastStyles } from './toast.styles';

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
}) => (
  <div style={{ ...baseStyle, ...toastStyles[type] }}>
    <span>{message}</span>
    {onClose && (
      <button
        onClick={onClose}
        style={{ ...dismissButtonStyle}}
        aria-label="Close"
      >
        &times;
      </button>
    )}
  </div>
);