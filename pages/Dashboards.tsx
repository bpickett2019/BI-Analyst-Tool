import React, { useState } from 'react';
import { useLocation } from 'wouter';

const Dashboards: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('Most Popular');

  // Navigation function for dashboard templates
  const navigateToDashboard = (dashboardType: string) => {
    switch(dashboardType) {
      case 'sales':
        setLocation('/dashboard/sales');
        break;
      case 'marketing':
        setLocation('/dashboard/marketing');
        break;
      case 'finance':
        setLocation('/dashboard/finance');
        break;
      case 'customer':
      case 'retention':
        setLocation('/dashboard/customer');
        break;
      case 'ecommerce':
        setLocation('/dashboard/ecommerce');
        break;
      case 'projects':
        setLocation('/dashboard/projects');
        break;
      default:
        // For other dashboards, navigate to a generic dashboard with an id
        setLocation(`/dashboard/${dashboardType}`);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 h-full overflow-y-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 flex items-center justify-center text-gray-400"
                  >
                    <i className="ri-arrow-right-s-line"></i>
                  </div>
                  <span className="ml-1 text-sm font-medium text-gray-800">
                    Dashboards
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboards</h1>
          <p className="text-gray-600">
            Choose from our pre-built templates or create your own custom
            dashboard.
          </p>
        </div>
        
        {/* Pre-built Dashboards Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Pre-built Dashboards
            </h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <div
                    className="w-4 h-4 flex items-center justify-center text-gray-400"
                  >
                    <i className="ri-filter-3-line"></i>
                  </div>
                </div>
                <select
                  className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>HR</option>
                  <option>Operations</option>
                </select>
              </div>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <div
                    className="w-4 h-4 flex items-center justify-center text-gray-400"
                  >
                    <i className="ri-sort-desc"></i>
                  </div>
                </div>
                <select
                  className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Most Popular</option>
                  <option>Newest First</option>
                  <option>Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sales Overview */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"
                  >
                    <i className="ri-line-chart-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600"
                  >
                    Sales
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Sales Overview</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Track revenue, conversion rates, and sales performance across
                  all channels.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>3.2k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('sales')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Marketing Performance */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"
                  >
                    <i className="ri-megaphone-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-600"
                  >
                    Marketing
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Marketing Performance</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Analyze campaign effectiveness, channel performance, and ROI metrics.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>2.8k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('marketing')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Financial Metrics */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600"
                  >
                    <i className="ri-money-dollar-circle-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600"
                  >
                    Finance
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Financial Metrics</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor revenue, expenses, profit margins, and cash flow in real-time.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>4.1k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('finance')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Customer Success */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600"
                  >
                    <i className="ri-user-heart-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600"
                  >
                    Customer
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer Success</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Track customer satisfaction, retention rates, and support metrics.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>2.5k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('customer')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product Analytics */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"
                  >
                    <i className="ri-rocket-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600"
                  >
                    Product
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Product Analytics</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Analyze product usage, feature adoption, and user engagement metrics.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>3.7k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('product')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Website Analytics */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600"
                  >
                    <i className="ri-global-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-600"
                  >
                    Web
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Website Analytics</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor traffic, user behavior, conversions, and SEO performance.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>3.9k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('website')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Human Resources */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600"
                  >
                    <i className="ri-team-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-600"
                  >
                    HR
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Human Resources</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Track employee performance, hiring metrics, and workforce analytics.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>2.3k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('hr')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Operations */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600"
                  >
                    <i className="ri-settings-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600"
                  >
                    Ops
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Operations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor operational efficiency, process metrics, and resource utilization.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>1.9k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('operations')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Executive Summary */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600"
                  >
                    <i className="ri-presentation-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600"
                  >
                    Executive
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
                <p className="text-gray-600 text-sm mb-4">
                  High-level overview of key business metrics and performance indicators.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>4.5k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('executive')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Inventory & Supply Chain */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600"
                  >
                    <i className="ri-store-2-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-100 text-cyan-600"
                  >
                    Inventory
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Inventory & Supply Chain</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor inventory levels, supplier performance, and logistics metrics.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>2.1k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('inventory')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Support Center */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center text-lime-600"
                  >
                    <i className="ri-customer-service-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-lime-100 text-lime-600"
                  >
                    Support
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Support Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Track ticket volume, resolution times, and customer satisfaction scores.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>1.8k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('support')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* SaaS Metrics */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600"
                  >
                    <i className="ri-line-chart-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-600"
                  >
                    SaaS
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">SaaS Metrics</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor MRR, churn, LTV, CAC, and other key SaaS performance indicators.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>3.4k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('saas')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Social Media Analytics */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600"
                  >
                    <i className="ri-share-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-sky-100 text-sky-600"
                  >
                    Social
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Social Media Analytics</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Track engagement, reach, follower growth, and content performance.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>2.7k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('social')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* E-commerce Dashboard */}
            <div
              className="dashboard-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600"
                  >
                    <i className="ri-shopping-cart-line ri-lg"></i>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600"
                  >
                    E-commerce
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">E-commerce Performance</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor sales, customer behavior, and product performance for your online store.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-eye-line"></i>
                    </div>
                    <span>2.1k views</span>
                  </div>
                  <button
                    onClick={() => navigateToDashboard('ecommerce')}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap"
                  >
                    Use Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Build Your Own Dashboard Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Build Your Own Dashboard
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden border border-primary/20">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-6 lg:mb-0 lg:mr-8">
                  <h3 className="text-xl font-semibold mb-3">Create a Custom Dashboard</h3>
                  <p className="text-gray-600 mb-6 max-w-xl">
                    Build a custom dashboard tailored to your specific needs. Drag and drop widgets, connect to your data sources, and visualize your metrics in real-time.
                  </p>
                  <a
                    href="/create-dashboard"
                    className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-add-line"></i>
                    </div>
                    Create New Dashboard
                  </a>
                </div>
                <div className="w-full lg:w-auto">
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center cursor-grab">
                      <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                        <i className="ri-bar-chart-grouped-line"></i>
                      </div>
                      <span>Chart</span>
                    </div>
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center cursor-grab">
                      <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                        <i className="ri-line-chart-line"></i>
                      </div>
                      <span>Line</span>
                    </div>
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center cursor-grab">
                      <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                        <i className="ri-pie-chart-line"></i>
                      </div>
                      <span>Pie</span>
                    </div>
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center cursor-grab">
                      <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                        <i className="ri-numbers-line"></i>
                      </div>
                      <span>Metric</span>
                    </div>
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center cursor-grab">
                      <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                        <i className="ri-table-line"></i>
                      </div>
                      <span>Table</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboards;