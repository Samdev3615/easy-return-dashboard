interface FilterChipsProps {
  filters: Array<{
    id: string;
    label: string;
    active: boolean;
  }>;
  onChange: (id: string) => void;
}

export default function FilterChips({ filters, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter.active
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
