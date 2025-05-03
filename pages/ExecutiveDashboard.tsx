import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const ExecutiveDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'financial', name: 'Financial', icon: 'money-dollar-circle-line' },
    { id: 'sales', name: 'Sales', icon: 'line-chart-line' },
    { id: 'customers', name: 'Customers', icon: 'user-heart-line' },
    { id: 'operations', name: 'Operations', icon: 'settings-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'revenue', 
      title: 'Total Revenue', 
      value: '$12.84M', 
      change: 14.8, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'profit', 
      title: 'Net Profit', 
      value: '$3.76M', 
      change: 18.5, 
      trending: 'up' as const, 
      icon: 'line-chart-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'customers', 
      title: 'Total Customers', 
      value: '24,821', 
      change: 12.4, 
      trending: 'up' as const, 
      icon: 'user-heart-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    },
    { 
      id: 'satisfaction', 
      title: 'Customer Satisfaction', 
      value: '93.7%', 
      change: 5.2, 
      trending: 'up' as const, 
      icon: 'emotion-happy-line', 
      bgColor: 'red',
      iconColor: 'red'
    }
  ];

  // Products data - for executive dashboard, we'll use business units
  const products = [
    {
      id: 'p1',
      name: 'North America',
      sku: 'BU-001',
      category: 'Region',
      unitsSold: 8542,
      revenue: '$6.4M',
      profitMargin: '32%',
      trending: 'up' as const,
      icon: 'map-pin-line'
    },
    {
      id: 'p2',
      name: 'Europe',
      sku: 'BU-002',
      category: 'Region',
      unitsSold: 6158,
      revenue: '$4.2M',
      profitMargin: '28%',
      trending: 'up' as const,
      icon: 'map-pin-line'
    },
    {
      id: 'p3',
      name: 'Asia Pacific',
      sku: 'BU-003',
      category: 'Region',
      unitsSold: 4287,
      revenue: '$2.8M',
      profitMargin: '25%',
      trending: 'up' as const,
      icon: 'map-pin-line'
    },
    {
      id: 'p4',
      name: 'Enterprise Division',
      sku: 'BU-004',
      category: 'Segment',
      unitsSold: 3521,
      revenue: '$5.6M',
      profitMargin: '38%',
      trending: 'up' as const,
      icon: 'building-line'
    },
    {
      id: 'p5',
      name: 'SMB Division',
      sku: 'BU-005',
      category: 'Segment',
      unitsSold: 8956,
      revenue: '$4.8M',
      profitMargin: '26%',
      trending: 'down' as const,
      icon: 'store-2-line'
    }
  ];

  // Campaign data - for executive dashboard, we'll use strategic initiatives
  const campaigns = [
    {
      id: 'c1',
      name: 'Digital Transformation',
      revenue: '$2.4M',
      conversion: '85%',
      roi: '275%',
      progress: 68,
      icon: 'global-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Market Expansion',
      revenue: '$1.8M',
      conversion: '72%',
      roi: '185%',
      progress: 45,
      icon: 'rocket-line',
      bgColor: 'red',
      iconColor: 'red'
    },
    {
      id: 'c3',
      name: 'Product Innovation',
      revenue: '$3.2M',
      conversion: '92%',
      roi: '320%',
      progress: 78,
      icon: 'lightbulb-line',
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="executive"
      dashboardTitle="Executive Summary"
      dashboardSubtitle="High-level overview of key business metrics and performance indicators"
      badgeLabel="Executive"
      badgeColor="red"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default ExecutiveDashboard;