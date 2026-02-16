/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 *
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 *
 * UNAUTHORIZED ACCESS, USE, COPYING, OR DISTRIBUTION PROHIBITED
 *
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 *
 * Authorized use only. See COPYRIGHT.md for terms.
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

/**
 * Toast Provider Component
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'info', duration = 5000) => {
      const id = Date.now() + Math.random();

      setToasts((prev) => [...prev, { id, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast notifications
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

/**
 * Toast Container Component
 */
function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-md flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

/**
 * Individual Toast Component
 */
function Toast({ toast, onRemove }) {
  const { id, message, type } = toast;

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <div
      className={`${bgColor} ${borderColor} animate-slide-in-right pointer-events-auto flex items-start gap-3 rounded-lg border-2 p-4 shadow-lg`}
      role="alert"
    >
      <Icon className={`h-5 w-5 ${iconColor} mt-0.5 flex-shrink-0`} />
      <p className={`${textColor} flex-1 text-sm font-medium`}>{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
        aria-label="Close notification"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
