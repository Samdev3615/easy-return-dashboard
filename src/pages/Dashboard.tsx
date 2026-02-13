import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Target, Clock, TrendingUp, Calendar } from 'lucide-react';
import devlogData from '../data/devlog.json';
import StatCard from '../components/StatCard';
import PhaseCard from '../components/PhaseCard';
import SessionCard from '../components/SessionCard';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const { t } = useTranslation();
  const { totalSequences, completedSequences, totalHours, lastUpdate, phases, sessions } = devlogData;

  // Données pour le graphique des heures par phase
  const phaseChartData = phases.map(phase => ({
    name: phase.name.split(' ')[0],
    heures: phase.hours
  }));

  // Statistiques calculées
  const completionPercentage = Math.round((completedSequences / totalSequences) * 100);
  const inProgressPhases = phases.filter(p => p.status === 'in_progress').length;
  const completedPhases = phases.filter(p => p.status === 'completed').length;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-600">
          {t('dashboard.subtitle', { date: formatDate(lastUpdate) })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.globalProgress')}
          value={`${completionPercentage}%`}
          subtitle={`${completedSequences}/${totalSequences} ${t('dashboard.sequences')}`}
          icon={Target}
          color="primary"
        />
        <StatCard
          title={t('dashboard.totalHours')}
          value={totalHours}
          subtitle={t('dashboard.devTime')}
          icon={Clock}
          color="info"
        />
        <StatCard
          title={t('dashboard.activePhases')}
          value={inProgressPhases}
          subtitle={`${completedPhases} ${t('dashboard.completed')}`}
          icon={TrendingUp}
          color="warning"
        />
        <StatCard
          title={t('dashboard.sessions')}
          value={sessions.length}
          subtitle={t('dashboard.devSessions')}
          icon={Calendar}
          color="success"
        />
      </div>

      {/* Progression globale */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.projectProgress')}</h2>
        <ProgressBar
          value={completedSequences}
          max={totalSequences}
          size="lg"
        />
      </div>

      {/* Graphique heures par phase */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('dashboard.hoursByPhase')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={phaseChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Bar
              dataKey="heures"
              fill="#FF6B00"
              radius={[8, 8, 0, 0]}
              name={t('common.hours')}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Phases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.projectPhases')}</h2>
          <a
            href="/phases"
            className="text-primary hover:text-orange-700 text-sm font-medium"
          >
            {t('dashboard.viewAll')} →
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {phases.slice(0, 4).map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </div>

      {/* Sessions récentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.recentSessions')}</h2>
          <a
            href="/sessions"
            className="text-primary hover:text-orange-700 text-sm font-medium"
          >
            {t('dashboard.viewAll')} →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {sessions.slice(0, 3).map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
