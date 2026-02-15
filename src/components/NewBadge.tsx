import { motion } from 'framer-motion';

interface NewBadgeProps {
  className?: string;
}

export default function NewBadge({ className = '' }: NewBadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg ${className}`}
    >
      NEW
    </motion.span>
  );
}
