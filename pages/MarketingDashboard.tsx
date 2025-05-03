import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const MarketingDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'campaigns', name: 'Campaigns', icon: 'megaphone-line' },
    { id: 'channels', name: 'Channels', icon: 'broadcast-line' },
    { id: 'audience', name: 'Audience', icon: 'group-line' },
    { id: 'content', name: 'Content', icon: 'file-text-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'acquisition', 
      title: 'Customer Acquisition', 
      value: '2,854', 
      change: 15.3, 
      trending: 'up' as const, 
      icon: 'user-add-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'cac', 
      title: 'Acquisition Cost', 
      value: '$18.42', 
      change: -8.1, 
      trending: 'down' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'conversion', 
      title: 'Conversion Rate', 
      value: '4.6%', 
      change: 1.2, 
      trending: 'up' as const, 
      icon: 'percent-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    },
    { 
      id: 'engagement', 
      title: 'Engagement Rate', 
      value: '24.8%', 
      change: 3.5, 
      trending: 'up' as const, 
      icon: 'line-chart-line', 
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  // Products data
  const products = [
    {
      id: 'p1',
      name: 'Email Newsletter',
      sku: 'EM001',
      category: 'Email Marketing',
      unitsSold: 6240,
      revenue: '$18,720',
      profitMargin: '82%',
      trending: 'up' as const,
      icon: 'mail-line'
    },
    {
      id: 'p2',
      name: 'Social Media Ads',
      sku: 'SM002',
      category: 'Paid Social',
      unitsSold: 12780,
      revenue: '$63,900',
      profitMargin: '56%',
      trending: 'up' as const,
      icon: 'facebook-circle-line'
    },
    {
      id: 'p3',
      name: 'Google Search Ads',
      sku: 'SEA003',
      category: 'Paid Search',
      unitsSold: 9845,
      revenue: '$78,760',
      profitMargin: '61%',
      trending: 'up' as const,
      icon: 'google-line'
    },
    {
      id: 'p4',
      name: 'Influencer Program',
      sku: 'INF004',
      category: 'Influencer Marketing',
      unitsSold: 1850,
      revenue: '$46,250',
      profitMargin: '48%',
      trending: 'down' as const,
      icon: 'user-star-line'
    },
    {
      id: 'p5',
      name: 'Content Marketing',
      sku: 'CON005',
      category: 'Content',
      unitsSold: 4250,
      revenue: '$21,250',
      profitMargin: '75%',
      trending: 'up' as const,
      icon: 'article-line'
    }
  ];

  // Campaign data
  const campaigns = [
    {
      id: 'c1',
      name: 'Back to School',
      revenue: '$53,400',
      conversion: '5.8%',
      roi: '285%',
      progress: 78,
      icon: 'book-open-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Flash Sale Weekend',
      revenue: '$86,200',
      conversion: '12.4%',
      roi: '320%',
      progress: 92,
      icon: 'flashlight-line',
      bgColor: 'red',
      iconColor: 'red'
    },
    {
      id: 'c3',
      name: 'Product Awareness',
      revenue: '$34,800',
      conversion: '3.2%',
      roi: '175%',
      progress: 45,
      icon: 'lightbulb-line',
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="marketing"
      dashboardTitle="Marketing Performance"
      dashboardSubtitle="Track campaigns, channels, and audience engagement"
      badgeLabel="Marketing"
      badgeColor="purple"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default MarketingDashboard;