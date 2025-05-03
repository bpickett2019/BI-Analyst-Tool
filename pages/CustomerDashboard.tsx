import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const CustomerDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'segments', name: 'Segments', icon: 'pie-chart-line' },
    { id: 'behavior', name: 'Behavior', icon: 'user-settings-line' },
    { id: 'retention', name: 'Retention', icon: 'user-heart-line' },
    { id: 'feedback', name: 'Feedback', icon: 'chat-4-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'clv', 
      title: 'Lifetime Value', 
      value: '$856', 
      change: 18.2, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'retention', 
      title: 'Retention Rate', 
      value: '78.4%', 
      change: 5.3, 
      trending: 'up' as const, 
      icon: 'user-heart-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'churn', 
      title: 'Churn Rate', 
      value: '4.2%', 
      change: -1.5, 
      trending: 'down' as const, 
      icon: 'user-unfollow-line', 
      bgColor: 'red',
      iconColor: 'red'
    },
    { 
      id: 'nps', 
      title: 'NPS Score', 
      value: '62', 
      change: 8, 
      trending: 'up' as const, 
      icon: 'star-line', 
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  // Products data - for customer dashboard, we'll use segments instead
  const products = [
    {
      id: 'p1',
      name: 'Enterprise Clients',
      sku: 'SEG001',
      category: 'B2B',
      unitsSold: 124,
      revenue: '$1.2M',
      profitMargin: '58%',
      trending: 'up' as const,
      icon: 'building-4-line'
    },
    {
      id: 'p2',
      name: 'SMB Customers',
      sku: 'SEG002',
      category: 'B2B',
      unitsSold: 862,
      revenue: '$2.4M',
      profitMargin: '48%',
      trending: 'up' as const,
      icon: 'store-2-line'
    },
    {
      id: 'p3',
      name: 'Premium Consumers',
      sku: 'SEG003',
      category: 'B2C',
      unitsSold: 3840,
      revenue: '$1.9M',
      profitMargin: '62%',
      trending: 'up' as const,
      icon: 'vip-crown-line'
    },
    {
      id: 'p4',
      name: 'Regular Consumers',
      sku: 'SEG004',
      category: 'B2C',
      unitsSold: 12450,
      revenue: '$3.7M',
      profitMargin: '38%',
      trending: 'down' as const,
      icon: 'user-3-line'
    },
    {
      id: 'p5',
      name: 'Educational Institutions',
      sku: 'SEG005',
      category: 'Non-profit',
      unitsSold: 278,
      revenue: '$835K',
      profitMargin: '42%',
      trending: 'up' as const,
      icon: 'graduation-cap-line'
    }
  ];

  // Campaign data - for customer dashboard, we'll use retention programs
  const campaigns = [
    {
      id: 'c1',
      name: 'Loyalty Program',
      revenue: '$486K',
      conversion: '32.5%',
      roi: '385%',
      progress: 92,
      icon: 'award-line',
      bgColor: 'amber',
      iconColor: 'amber'
    },
    {
      id: 'c2',
      name: 'Win-back Campaign',
      revenue: '$128K',
      conversion: '8.4%',
      roi: '210%',
      progress: 68,
      icon: 'user-follow-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c3',
      name: 'Customer Feedback',
      revenue: '$75K',
      conversion: '24.7%',
      roi: '195%',
      progress: 74,
      icon: 'feedback-line',
      bgColor: 'green',
      iconColor: 'green'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="customer"
      dashboardTitle="Customer Analytics"
      dashboardSubtitle="Understand customer behavior, retention, and lifetime value"
      badgeLabel="Customer"
      badgeColor="green"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default CustomerDashboard;