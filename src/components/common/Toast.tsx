import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Toast: React.FC = () => {
  const toast = useAppStore((state) => state.toast);
  const clearToast = useAppStore((state) => state.clearToast);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-sky-500" />,
  };

  const borderStyles = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-slate-900/90 text-slate-900 dark:text-white',
    error: 'border-red-500/30 bg-red-50/90 dark:bg-slate-900/90 text-slate-900 dark:text-white',
    info: 'border-sky-500/30 bg-sky-50/90 dark:bg-slate-900/90 text-slate-900 dark:text-white',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] pointer-events-auto"
      >
        <div
          className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl ${borderStyles[toast.type]}`}
        >
          <span className="shrink-0">{icons[toast.type]}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={clearToast}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
