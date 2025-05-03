import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button type="button" className="px-4 border-r border-gray-200 text-gray-500 md:hidden">
        <i className="ri-menu-line text-xl"></i>
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <div className="max-w-2xl w-full">
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <i className="ri-search-line ml-3"></i>
              </div>
              <input 
                id="search-field" 
                className="block w-full h-full pl-10 pr-3 py-2 border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" 
                placeholder="Search datasets, metrics, charts..." 
                type="search" 
              />
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <button type="button" className="p-1 text-gray-400 hover:text-gray-500">
            <i className="ri-notification-3-line text-xl"></i>
          </button>
          <button type="button" className="p-1 text-gray-400 hover:text-gray-500">
            <i className="ri-settings-3-line text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
