import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast Context
const ToastContext = createContext(null);

// Toast Types
const toastTypes = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-500/20 border-green-500/30 text-green-400'
  },
  error: {
    icon: XCircle,
    className: 'bg-red-500/20 border-red-500/30 text-red-400'
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
  },
  info: {
    icon: Info,
    className: 'bg-violet-500/20 border-violet-500/30 text-violet-400'
  }
};

// Single Toast Component
function Toast({ id, type, message, onClose }) {
  const { icon: Icon, className } = toastTypes[type] || toastTypes.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div 
      className={`
        flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl
        shadow-lg animate-slide-in
        ${className}
      `}
      style={{
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button 
        onClick={() => onClose(id)}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Container Component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (message) => addToast('success', message),
    error: (message) => addToast('error', message),
    warning: (message) => addToast('warning', message),
    info: (message) => addToast('info', message)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2 max-w-sm">
        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
        {toasts.map(t => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            message={t.message}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
