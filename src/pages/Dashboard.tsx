import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, TrendingUp, Calendar } from 'lucide-react';
import devlogData from '../data/devlog.json';
import StatCard from '../components/StatCard';
import PhaseCard from '../components/PhaseCard';
import SessionCard from '../components/SessionCard';
import ProgressBar from '../components/ProgressBar';
import StatCardSkeleton from '../components/StatCardSkeleton';
import PhaseCardSkeleton from '../components/PhaseCardSkeleton';
import SessionCardSkeleton from '../components/SessionCardSkeleton';
import Skeleton from '../components/Skeleton';
import type { DevLog } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const { totalSequences, completedSequences, totalHours, lastUpdate, phases, sessions } = devlogData as DevLog;

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Données pour le graphique des heures par phase
  const phaseChartData = phases.map(phase => ({
    name: phase.name.split(' ')[0],
    heures: phase.hours
  }));

  // Données pour le graphique d'évolution cumulée
  const evolutionData = [...sessions]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc, session, index) => {
      const prevTotal = index > 0 ? acc[index - 1].total : 0;
      acc.push({
        date: new Date(session.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        total: prevTotal + session.duration,
        session: session.duration
      });
      return acc;
    }, [] as Array<{ date: string; total: number; session: number }>);

  // Statistiques calculées
  const completionPercentage = Math.round((completedSequences / totalSequences) * 100);
  const inProgressPhases = phases.filter(p => p.status === 'in_progress').length;
  const completedPhases = phases.filter(p => p.status === 'completed').length;

  // Statistiques avancées
  const avgTimePerSequence = completedSequences > 0 ? (totalHours / completedSequences).toFixed(2) : '0';
  const remainingSequences = totalSequences - completedSequences;
  const estimatedRemainingHours = remainingSequences * parseFloat(avgTimePerSequence);

  // Calcul de la vitesse (basé sur les dates des sessions)
  const firstSession = sessions[sessions.length - 1];
  const lastSession = sessions[0];
  const daysBetween = firstSession && lastSession ?
    Math.max(1, Math.ceil((new Date(lastSession.date).getTime() - new Date(firstSession.date).getTime()) / (1000 * 60 * 60 * 24))) : 1;
  const sequencesPerWeek = ((completedSequences / daysBetween) * 7).toFixed(1);

  // Estimation de fin
  const weeksRemaining = remainingSequences > 0 && parseFloat(sequencesPerWeek) > 0 ?
    Math.ceil(remainingSequences / parseFloat(sequencesPerWeek)) : 0;
  const estimatedEndDate = new Date();
  estimatedEndDate.setDate(estimatedEndDate.getDate() + (weeksRemaining * 7));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        {/* Charts Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <Skeleton className="h-6 w-48 mb-6" />
          <Skeleton className="h-[300px] w-full" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>

        {/* Phases Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PhaseCardSkeleton />
            <PhaseCardSkeleton />
            <PhaseCardSkeleton />
            <PhaseCardSkeleton />
          </div>
        </div>

        {/* Sessions Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="space-y-4">
            <SessionCardSkeleton />
            <SessionCardSkeleton />
            <SessionCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('dashboard.subtitle', { date: formatDate(lastUpdate) })}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
      >
        <motion.div variants={item}>
          <StatCard
            title={t('dashboard.globalProgress')}
            value={`${completionPercentage}%`}
            subtitle={`${completedSequences}/${totalSequences} ${t('dashboard.sequences')}`}
            icon={Target}
            color="primary"
            tooltip={t('dashboard.tooltipProgress')}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={t('dashboard.totalHours')}
            value={totalHours}
            subtitle={t('dashboard.devTime')}
            icon={Clock}
            color="info"
            tooltip={t('dashboard.tooltipHours')}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={t('dashboard.activePhases')}
            value={inProgressPhases}
            subtitle={`${completedPhases} ${t('dashboard.completed')}`}
            icon={TrendingUp}
            color="warning"
            tooltip={t('dashboard.tooltipPhases')}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title={t('dashboard.sessions')}
            value={sessions.length}
            subtitle={t('dashboard.devSessions')}
            icon={Calendar}
            color="success"
            tooltip={t('dashboard.tooltipSessions')}
          />
        </motion.div>
      </motion.div>

      {/* Graphique d'évolution cumulée */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        variants={item}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('dashboard.hoursEvolution')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={evolutionData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
            <XAxis
              dataKey="date"
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
              labelStyle={{ color: '#374151', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#FF6B00"
              strokeWidth={2}
              fill="url(#colorTotal)"
              name={t('dashboard.cumulativeHours')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Statistiques avancées */}
      <motion.div
        className="bg-gradient-to-br from-primary/5 to-orange-50 dark:from-primary/10 dark:to-orange-900/10 rounded-xl p-6 shadow-sm border-2 border-primary/20 dark:border-primary/30"
        variants={item}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-primary mr-2" />
          {t('dashboard.advancedStats')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('dashboard.avgTimePerSequence')}</div>
            <div className="text-3xl font-bold text-info mb-1">{avgTimePerSequence}h</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.basedOnCompleted')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('dashboard.progressSpeed')}</div>
            <div className="text-3xl font-bold text-success mb-1">{sequencesPerWeek}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.sequencesPerWeek')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('dashboard.estimatedCompletion')}</div>
            <div className="text-3xl font-bold text-warning mb-1">{weeksRemaining}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {weeksRemaining > 0 ? `~${formatDate(estimatedEndDate.toISOString())}` : t('dashboard.completed')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progression globale */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        variants={item}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.projectProgress')}</h2>
        <ProgressBar
          value={completedSequences}
          max={totalSequences}
          size="lg"
        />
      </motion.div>

      {/* Graphique heures par phase */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        variants={item}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('dashboard.hoursByPhase')}</h2>
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
      </motion.div>

      {/* Phases */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.projectPhases')}</h2>
          <a
            href="/phases"
            className="text-primary hover:text-orange-700 dark:hover:text-orange-600 text-sm font-medium"
          >
            {t('dashboard.viewAll')} →
          </a>
        </div>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={container}
        >
          {phases.slice(0, 4).map((phase) => (
            <motion.div key={phase.id} variants={item}>
              <PhaseCard phase={phase} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Sessions récentes */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.recentSessions')}</h2>
          <a
            href="/sessions"
            className="text-primary hover:text-orange-700 dark:hover:text-orange-600 text-sm font-medium"
          >
            {t('dashboard.viewAll')} →
          </a>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-4"
          variants={container}
        >
          {sessions.slice(0, 3).map((session) => (
            <motion.div key={session.id} variants={item}>
              <SessionCard session={session} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
