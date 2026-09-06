import React from 'react';
import { useApp } from '../context/AppContext';
import { Check } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useApp();

  return (
    <div className={`notification ${toast.show ? 'show' : ''}`}>
      <span className="n-icon"><Check size={16} /></span>
      <span>{toast.message}</span>
    </div>
  );
}
