import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const ProductDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'usage', name: 'Usage', icon: 'line-chart-line' },
    { id: 'features', name: 'Features', icon: 'apps-line' },
    { id: 'users', name: 'Users', icon: 'user-line' },
    { id: 'feedback', name: 'Feedback', icon: 'chat-poll-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'activeUsers', 
      title: 'Active Users', 
      value: '128,457', 
      change: 18.5, 
      trending: 'up' as const, 
      icon: 'user-line', 
      bgColor: 'indigo',
      iconColor: 'indigo'
    },
    { 
      id: 'retentionRate', 
      title: 'Retention Rate', 
      value: '86.4%', 
      change: 4.2, 
      trending: 'up' as const, 
      icon: 'user-follow-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'dau', 
      title: 'Daily Active Users', 
      value: '58,245', 
      change: 12.7, 
      trending: 'up' as const, 
      icon: 'user-heart-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'sessionLength', 
      title: 'Avg. Session Length', 
      value: '24.8m', 
      change: 8.5, 
      trending: 'up' as const, 
      icon: 'time-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  // Products data - for product dashboard, we'll use features
  const products = [
    {
      id: 'p1',
      name: 'Dashboard Builder',
      sku: 'FT-001',
      category: 'Core',
      unitsSold: 85472,
      revenue: '42.7%',
      profitMargin: '24.5m',
      trending: 'up' as const,
      icon: 'dashboard-line'
    },
    {
      id: 'p2',
      name: 'Data Explorer',
      sku: 'FT-002',
      category: 'Advanced',
      unitsSold: 65487,
      revenue: '32.8%',
      profitMargin: '18.2m',
      trending: 'up' as const,
      icon: 'bar-chart-box-line'
    },
    {
      id: 'p3',
      name: 'Report Generator',
      sku: 'FT-003',
      category: 'Core',
      unitsSold: 54218,
      revenue: '27.1%',
      profitMargin: '12.8m',
      trending: 'down' as const,
      icon: 'file-chart-line'
    },
    {
      id: 'p4',
      name: 'AI Insights',
      sku: 'FT-004',
      category: 'Premium',
      unitsSold: 35487,
      revenue: '17.8%',
      profitMargin: '8.5m',
      trending: 'up' as const,
      icon: 'robot-line'
    },
    {
      id: 'p5',
      name: 'Data Connectors',
      sku: 'FT-005',
      category: 'Integration',
      unitsSold: 28754,
      revenue: '14.4%',
      profitMargin: '9.2m',
      trending: 'up' as const,
      icon: 'link-m'
    }
  ];

  // Campaign data - for product dashboard, we'll use user segments
  const campaigns = [
    {
      id: 'c1',
      name: 'Power Users',
      revenue: '48,254',
      conversion: '37.6%',
      roi: 'N/A',
      progress: 92,
      icon: 'user-star-line',
      bgColor: 'indigo',
      iconColor: 'indigo'
    },
    {
      id: 'c2',
      name: 'Regular Users',
      revenue: '62,850',
      conversion: '48.9%',
      roi: 'N/A',
      progress: 85,
      icon: 'user-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c3',
      name: 'New Users',
      revenue: '17,353',
      conversion: '13.5%',
      roi: 'N/A',
      progress: 68,
      icon: 'user-add-line',
      bgColor: 'green',
      iconColor: 'green'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="product"
      dashboardTitle="Product Analytics"
      dashboardSubtitle="Analyze product usage, feature adoption, and user engagement metrics"
      badgeLabel="Product"
      badgeColor="indigo"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default ProductDashboard;