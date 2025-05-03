import React from 'react';

interface ChartCardProps {
  title: string;
  chartId: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartId }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex space-x-1">
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <i className="ri-refresh-line"></i>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <i className="ri-download-line"></i>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <i className="ri-more-2-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div id={chartId} className="h-80"></div>
      </div>
    </div>
  );
};

export default ChartCard;
