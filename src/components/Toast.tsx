import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  onRefresh: () => void;
  message: string;
}

export default function Toast({ isVisible, onClose, onRefresh, message }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {message}
              </p>
            </div>
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-primary hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Rafraîchir
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
