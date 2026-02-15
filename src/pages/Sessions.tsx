import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Clock, ArrowUpDown } from 'lucide-react';
import devlogData from '../data/devlog.json';
import SessionCard from '../components/SessionCard';
import SearchBar from '../components/SearchBar';
import type { DevLog } from '../types';

type SortField = 'date' | 'hours';
type SortOrder = 'asc' | 'desc';

export default function Sessions() {
  const { t, i18n } = useTranslation();
  const { sessions, totalHours } = devlogData as DevLog;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const chartData = [...sessions]
    .reverse()
    .map(session => ({
      session: `#${session.id}`,
      heures: session.duration,
      date: new Date(session.date).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' })
    }));

  const averageHours = (totalHours / sessions.length).toFixed(1);
  const longestSession = Math.max(...sessions.map(s => s.duration));

  // Filtrage et tri des sessions
  const filteredSessions = useMemo(() => {
    let filtered = sessions.filter(session => {
      const searchLower = searchQuery.toLowerCase();
      return session.title.toLowerCase().includes(searchLower) ||
             session.sequences.some(seq => seq.toLowerCase().includes(searchLower)) ||
             session.id.toString().includes(searchQuery);
    });

    // Tri
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'hours') {
        comparison = a.duration - b.duration;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [sessions, searchQuery, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'date' ? 'desc' : 'asc');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Clock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('sessions.title')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('sessions.subtitle', { count: sessions.length, hours: totalHours, avg: averageHours })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('sessions.totalHours')}</div>
          <div className="text-3xl font-bold text-primary">{totalHours}h</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('sessions.avgDuration')}</div>
          <div className="text-3xl font-bold text-info">{averageHours}h</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('sessions.longestSession')}</div>
          <div className="text-3xl font-bold text-success">{longestSession}h</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('sessions.evolution')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
            />
            <Line
              type="monotone"
              dataKey="heures"
              stroke="#FF6B00"
              strokeWidth={3}
              dot={{ fill: '#FF6B00', r: 4 }}
              activeDot={{ r: 6 }}
              name={t('common.hours')}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t('filters.searchSessions')}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('sessions.allSessions')} ({filteredSessions.length})
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('filters.sortBy')}:</span>
            <button
              onClick={() => toggleSort('date')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortField === 'date'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('filters.date')}
              {sortField === 'date' && <ArrowUpDown className="w-3 h-3" />}
            </button>
            <button
              onClick={() => toggleSort('hours')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortField === 'hours'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('filters.hours')}
              {sortField === 'hours' && <ArrowUpDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
        {filteredSessions.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('filters.noResults')}
          </div>
        )}
      </div>
    </div>
  );
}
