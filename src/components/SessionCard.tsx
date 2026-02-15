import { useTranslation } from 'react-i18next';
import { Session } from '../types';
import { Calendar, Clock, CheckSquare } from 'lucide-react';

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const { t, i18n } = useTranslation();
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {t('sessions.session')} #{session.id}
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(session.date)}</span>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {session.title}
          </h3>
        </div>
        <div className="flex items-center space-x-1 text-primary">
          <Clock className="w-4 h-4" />
          <span className="font-semibold">{session.duration}h</span>
        </div>
      </div>

      {session.sequences.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {session.sequences.map((seq) => (
              <span
                key={seq}
                className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
              >
                <CheckSquare className="w-3 h-3" />
                <span>{seq}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Section "Ce qui a été fait" */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <span className="w-6 h-6 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-2">
            ✓
          </span>
          {t('common.whatWasDone')}
        </h4>
        <div className="space-y-2">
          {session.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-blue-500 dark:text-blue-400 mt-0.5 font-bold">→</span>
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{t(`sessionHighlights.${highlight}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
