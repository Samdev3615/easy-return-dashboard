interface ProgressBarProps {
  value: number;
  max: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProgressBar({
  value,
  max,
  showPercentage = true,
  size = 'md',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const getColor = () => {
    if (percentage === 100) return 'bg-success';
    if (percentage >= 50) return 'bg-primary';
    if (percentage > 0) return 'bg-warning';
    return 'bg-gray-300';
  };

  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${getColor()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
          <span>{value}/{max}</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
