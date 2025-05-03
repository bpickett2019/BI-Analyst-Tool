import React from 'react';

const activities = [
  {
    id: 1,
    type: 'upload',
    title: 'New dataset uploaded',
    description: 'Marketing_Campaign_Results.csv',
    timestamp: '2 hours ago by Alex Morgan',
    icon: 'ri-file-upload-line',
    color: 'bg-indigo-100 text-primary',
  },
  {
    id: 2,
    type: 'dashboard',
    title: 'Dashboard created',
    description: 'Q3 Performance Analysis',
    timestamp: '5 hours ago by Taylor Kim',
    icon: 'ri-dashboard-line',
    color: 'bg-green-100 text-success',
  },
  {
    id: 3,
    type: 'share',
    title: 'Report shared',
    description: 'Monthly Sales Report with Finance team',
    timestamp: 'Yesterday at 4:30 PM',
    icon: 'ri-share-forward-line',
    color: 'bg-blue-100 text-blue-600',
  }
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow col-span-1">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div className="p-5" key={activity.id}>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center h-10 w-10 rounded-md ${activity.color}`}>
                  <i className={activity.icon}></i>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <p className="text-xs text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <a href="#" className="text-sm font-medium text-primary hover:text-indigo-500">View all activity</a>
      </div>
    </div>
  );
};

export default RecentActivity;
