import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <i className="ri-bubble-chart-fill text-primary text-xl mr-2"></i>
            <span className="text-xl font-semibold">InsightFlow</span>
          </div>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <nav className="flex-1 space-y-1">
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white bg-primary rounded-md group">
              <i className="ri-dashboard-line mr-3 text-white"></i>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
              <i className="ri-database-2-line mr-3 text-gray-400 group-hover:text-gray-500"></i>
              Datasets
            </a>
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
              <i className="ri-line-chart-line mr-3 text-gray-400 group-hover:text-gray-500"></i>
              Analytics
            </a>
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
              <i className="ri-ai-generate mr-3 text-gray-400 group-hover:text-gray-500"></i>
              AI Insights
            </a>
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
              <i className="ri-settings-4-line mr-3 text-gray-400 group-hover:text-gray-500"></i>
              Settings
            </a>
          </nav>
          <div className="mt-auto">
            <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
              <i className="ri-question-line mr-3 text-gray-400 group-hover:text-gray-500"></i>
              Help & Support
            </a>
            <div className="flex items-center px-2 py-3 mt-2 text-sm font-medium text-gray-600 rounded-md">
              <img 
                className="w-8 h-8 rounded-full mr-3" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User avatar" 
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Alex Morgan</p>
                <p className="text-xs text-gray-500">alex@insightflow.io</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
