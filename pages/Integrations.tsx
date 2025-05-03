import React, { useState } from 'react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: 'connected' | 'available' | 'failed';
  connectedDate?: string;
}

const Integrations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showConnectedOnly, setShowConnectedOnly] = useState<boolean>(false);

  const integrations: Integration[] = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Import CRM data, contacts, and sales opportunities',
      icon: 'ri-salesforce-fill',
      category: 'crm',
      status: 'connected',
      connectedDate: 'Apr 2, 2025'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Sync marketing campaigns and contact data',
      icon: 'ri-hub-fill',
      category: 'crm',
      status: 'available'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Import website traffic and user behavior data',
      icon: 'ri-google-fill',
      category: 'analytics',
      status: 'connected',
      connectedDate: 'Mar 28, 2025'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Sync payment and subscription data',
      icon: 'ri-bank-card-line',
      category: 'payments',
      status: 'available'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Import e-commerce store data and orders',
      icon: 'ri-shopping-bag-fill',
      category: 'e-commerce',
      status: 'failed'
    },
    {
      id: 'bigquery',
      name: 'Google BigQuery',
      description: 'Connect your BigQuery datasets and tables',
      icon: 'ri-database-2-line',
      category: 'data-warehouse',
      status: 'connected',
      connectedDate: 'Apr 8, 2025'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send reports and alerts to your Slack channels',
      icon: 'ri-slack-fill',
      category: 'communication',
      status: 'available'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Import email marketing campaigns and performance data',
      icon: 'ri-mail-send-line',
      category: 'marketing',
      status: 'available'
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      description: 'Sync customer support tickets and resolution metrics',
      icon: 'ri-customer-service-2-line',
      category: 'customer-support',
      status: 'available'
    },
    {
      id: 'aws-s3',
      name: 'AWS S3',
      description: 'Import data from S3 buckets and objects',
      icon: 'ri-amazon-fill',
      category: 'cloud-storage',
      status: 'connected',
      connectedDate: 'Mar 15, 2025'
    },
    {
      id: 'snowflake',
      name: 'Snowflake',
      description: 'Connect to your Snowflake data warehouse',
      icon: 'ri-snowy-fill',
      category: 'data-warehouse',
      status: 'available'
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Import project management tasks and milestones',
      icon: 'ri-task-line',
      category: 'project-management',
      status: 'available'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'crm', name: 'CRM' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'payments', name: 'Payments' },
    { id: 'e-commerce', name: 'E-Commerce' },
    { id: 'data-warehouse', name: 'Data Warehouse' },
    { id: 'communication', name: 'Communication' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'customer-support', name: 'Customer Support' },
    { id: 'cloud-storage', name: 'Cloud Storage' },
    { id: 'project-management', name: 'Project Management' }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory;
    const matchesConnected = !showConnectedOnly || integration.status === 'connected';
    
    return matchesSearch && matchesCategory && matchesConnected;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Settings</span>
          <div className="w-4 h-4 flex items-center justify-center mx-1">
            <i className="ri-arrow-right-s-line"></i>
          </div>
          <span className="text-gray-900">Integrations</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
            <p className="text-gray-500 mt-1">
              Connect your favorite tools and data sources
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search integrations..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-button w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"
              >
                <i className="ri-search-line"></i>
              </div>
            </div>
            <div className="relative">
              <label className="custom-switch flex items-center">
                <span className="text-sm text-gray-700 mr-2">Connected Only</span>
                <input 
                  type="checkbox" 
                  checked={showConnectedOnly}
                  onChange={() => setShowConnectedOnly(!showConnectedOnly)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Categories */}
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">Categories</h2>
          </div>
          <div className="p-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`flex items-center justify-between w-full p-2 text-left rounded ${activeCategory === category.id ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="text-sm font-medium">{category.name}</span>
                {category.id !== 'all' && (
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {integrations.filter(i => i.category === category.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Integrations View */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map(integration => (
              <div key={integration.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-xl">
                      <i className={integration.icon}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                        {integration.status === 'connected' && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Connected</span>
                        )}
                        {integration.status === 'failed' && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Failed</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
                      <div className="flex items-center justify-between">
                        {integration.status === 'connected' ? (
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-3 h-3 flex items-center justify-center mr-1">
                              <i className="ri-time-line"></i>
                            </div>
                            <span>Connected {integration.connectedDate}</span>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <button 
                          className={`px-3 py-1.5 rounded-button text-sm ${
                            integration.status === 'connected' 
                              ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
                              : integration.status === 'failed'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-primary text-white hover:bg-primary/90'
                          }`}
                        >
                          {integration.status === 'connected' ? 'Configure' : 
                            integration.status === 'failed' ? 'Reconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredIntegrations.length === 0 && (
            <div className="flex flex-col items-center justify-center h-60 text-gray-400">
              <div className="w-16 h-16 flex items-center justify-center text-gray-300 mb-4">
                <i className="ri-search-line text-5xl"></i>
              </div>
              <p className="text-center">No integrations found matching your filters.<br/>Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Integrations;