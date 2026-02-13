import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import devlogData from '../data/devlog.json';
import SessionCard from '../components/SessionCard';

export default function Sessions() {
  const { t, i18n } = useTranslation();
  const { sessions, totalHours } = devlogData;

  const chartData = [...sessions]
    .reverse()
    .map(session => ({
      session: `#${session.id}`,
      heures: session.duration,
      date: new Date(session.date).toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' })
    }));

  const averageHours = (totalHours / sessions.length).toFixed(1);
  const longestSession = Math.max(...sessions.map(s => s.duration));

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Clock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">{t('sessions.title')}</h1>
        </div>
        <p className="text-gray-600">
          {t('sessions.subtitle', { count: sessions.length, hours: totalHours, avg: averageHours })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">{t('sessions.totalHours')}</div>
          <div className="text-3xl font-bold text-primary">{totalHours}h</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">{t('sessions.avgDuration')}</div>
          <div className="text-3xl font-bold text-info">{averageHours}h</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">{t('sessions.longestSession')}</div>
          <div className="text-3xl font-bold text-success">{longestSession}h</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('sessions.evolution')}</h2>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('sessions.allSessions')}</h2>
        <div className="space-y-4">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
