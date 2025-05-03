import React from 'react';

interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ id, title, value, change, trend, color }) => {
  const getBorderColor = () => {
    switch (color) {
      case 'primary':
        return 'border-primary';
      case 'success':
        return 'border-success';
      case 'warning':
        return 'border-warning';
      case 'secondary':
        return 'border-secondary';
      default:
        return 'border-primary';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-5 border-l-4 ${getBorderColor()} h-full drag-handle`} data-id={id}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-center">
          <button className="text-gray-400 hover:text-gray-500">
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
          <i className={`ri-arrow-${trend}-s-fill`}></i>
          {Math.abs(change)}%
        </p>
      </div>
      <p className="mt-1 text-xs text-gray-500">Compared to last month</p>
    </div>
  );
};

export default MetricCard;
