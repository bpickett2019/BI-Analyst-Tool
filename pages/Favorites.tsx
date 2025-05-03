import React from 'react';

const Favorites: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Favorites</h1>
        <p className="mt-2 text-gray-600">Quick access to your bookmarked dashboards and reports.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Empty state when no favorites */}
        <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-lg p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <i className="ri-star-line text-primary text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
          <p className="text-gray-500 mb-4">
            You haven't added any dashboards or reports to your favorites yet.
          </p>
          <a 
            href="/dashboards" 
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <i className="ri-dashboard-line mr-2"></i>
            Browse Dashboards
          </a>
        </div>
      </div>
    </div>
  );
};

export default Favorites;