import { useTranslation } from 'react-i18next';
import devlogData from '../data/devlog.json';
import PhaseCard from '../components/PhaseCard';
import ProgressBar from '../components/ProgressBar';
import { Layers } from 'lucide-react';

export default function Phases() {
  const { t } = useTranslation();
  const { phases, totalSequences, completedSequences } = devlogData;

  const completedPhases = phases.filter(p => p.status === 'completed').length;
  const inProgressPhases = phases.filter(p => p.status === 'in_progress').length;
  const pendingPhases = phases.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Layers className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">{t('phases.title')}</h1>
        </div>
        <p className="text-gray-600">
          {t('phases.subtitle', { total: phases.length, completed: completedPhases, inProgress: inProgressPhases, pending: pendingPhases })}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('phases.globalProgress')}</h2>
          <span className="text-2xl font-bold text-primary">
            {Math.round((completedSequences / totalSequences) * 100)}%
          </span>
        </div>
        <ProgressBar value={completedSequences} max={totalSequences} size="lg" />
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>{t('phases.completedSequences', { completed: completedSequences, total: totalSequences })}</span>
          <span>{totalSequences - completedSequences} {t('phases.remaining')}</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('phases.allPhases')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {phases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('phases.distribution')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <div className="text-3xl font-bold text-success mb-1">{completedPhases}</div>
            <div className="text-sm text-gray-600">{t('phases.completedPhases')}</div>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-1">{inProgressPhases}</div>
            <div className="text-sm text-gray-600">{t('phases.inProgress')}</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <div className="text-3xl font-bold text-gray-600 mb-1">{pendingPhases}</div>
            <div className="text-sm text-gray-600">{t('phases.upcoming')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
