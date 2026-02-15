import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import devlogData from '../data/devlog.json';
import PhaseCard from '../components/PhaseCard';
import ProgressBar from '../components/ProgressBar';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import { Layers, ArrowUpDown } from 'lucide-react';
import type { DevLog, Phase } from '../types';

type SortField = 'name' | 'hours' | 'progress';
type SortOrder = 'asc' | 'desc';

export default function Phases() {
  const { t } = useTranslation();
  const { phases, totalSequences, completedSequences } = devlogData as DevLog;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const completedPhases = phases.filter(p => p.status === 'completed').length;
  const inProgressPhases = phases.filter(p => p.status === 'in_progress').length;
  const pendingPhases = phases.filter(p => p.status === 'pending').length;

  // Filtrage et tri des phases
  const filteredPhases = useMemo(() => {
    let filtered = phases.filter(phase => {
      const matchesSearch = phase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           phase.sequences.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || phase.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Tri
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'hours') {
        comparison = a.hours - b.hours;
      } else if (sortField === 'progress') {
        const progressA = (a.completed / a.total) * 100;
        const progressB = (b.completed / b.total) * 100;
        comparison = progressA - progressB;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [phases, searchQuery, statusFilter, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const statusFilters = [
    { id: 'all', label: t('filters.all'), active: statusFilter === 'all' },
    { id: 'completed', label: t('filters.completed'), active: statusFilter === 'completed' },
    { id: 'in_progress', label: t('filters.inProgress'), active: statusFilter === 'in_progress' },
    { id: 'pending', label: t('filters.pending'), active: statusFilter === 'pending' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Layers className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('phases.title')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('phases.subtitle', { total: phases.length, completed: completedPhases, inProgress: inProgressPhases, pending: pendingPhases })}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('phases.globalProgress')}</h2>
          <span className="text-2xl font-bold text-primary">
            {Math.round((completedSequences / totalSequences) * 100)}%
          </span>
        </div>
        <ProgressBar value={completedSequences} max={totalSequences} size="lg" />
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{t('phases.completedSequences', { completed: completedSequences, total: totalSequences })}</span>
          <span>{totalSequences - completedSequences} {t('phases.remaining')}</span>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('filters.searchPhases')}
            />
          </div>
        </div>
        <div className="mb-6">
          <FilterChips
            filters={statusFilters}
            onChange={setStatusFilter}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('phases.allPhases')} ({filteredPhases.length})
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('filters.sortBy')}:</span>
            <button
              onClick={() => toggleSort('name')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortField === 'name'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('filters.name')}
              {sortField === 'name' && <ArrowUpDown className="w-3 h-3" />}
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
            <button
              onClick={() => toggleSort('progress')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortField === 'progress'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('filters.progress')}
              {sortField === 'progress' && <ArrowUpDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPhases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
        {filteredPhases.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('filters.noResults')}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('phases.distribution')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-success/10 dark:bg-success/20 rounded-lg">
            <div className="text-3xl font-bold text-success mb-1">{completedPhases}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('phases.completedPhases')}</div>
          </div>
          <div className="text-center p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-1">{inProgressPhases}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('phases.inProgress')}</div>
          </div>
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl font-bold text-gray-600 dark:text-gray-300 mb-1">{pendingPhases}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('phases.upcoming')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
