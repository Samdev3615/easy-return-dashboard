import { useTranslation } from 'react-i18next';
import { Phase } from '../types';
import ProgressBar from './ProgressBar';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

interface PhaseCardProps {
  phase: Phase;
}

export default function PhaseCard({ phase }: PhaseCardProps) {
  const { t } = useTranslation();
  const getStatusIcon = () => {
    switch (phase.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (phase.status) {
      case 'completed':
        return 'border-l-success';
      case 'in_progress':
        return 'border-l-primary';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className={`bg-white rounded-xl border-l-4 ${getStatusColor()} p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-2xl">{phase.emoji}</span>
            <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="font-mono">{phase.sequences}</span>
            <span>•</span>
            <span>{phase.hours}h</span>
          </div>
        </div>
        {getStatusIcon()}
      </div>

      <ProgressBar value={phase.completed} max={phase.total} />

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {phase.completed} / {phase.total} {t('dashboard.sequences')}
        </span>
        <span className={`font-medium ${
          phase.status === 'completed' ? 'text-success' :
          phase.status === 'in_progress' ? 'text-primary' :
          'text-gray-400'
        }`}>
          {phase.status === 'completed' ? t('phases.statusCompleted') :
           phase.status === 'in_progress' ? t('phases.statusInProgress') :
           t('phases.statusPending')}
        </span>
      </div>
    </div>
  );
}
