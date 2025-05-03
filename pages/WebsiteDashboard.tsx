import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const WebsiteDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'traffic', name: 'Traffic', icon: 'global-line' },
    { id: 'behavior', name: 'User Behavior', icon: 'user-settings-line' },
    { id: 'conversions', name: 'Conversions', icon: 'exchange-funds-line' },
    { id: 'seo', name: 'SEO', icon: 'search-eye-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'visitors', 
      title: 'Total Visitors', 
      value: '349,521', 
      change: 12.8, 
      trending: 'up' as const, 
      icon: 'user-line', 
      bgColor: 'pink',
      iconColor: 'pink'
    },
    { 
      id: 'pageviews', 
      title: 'Page Views', 
      value: '1.25M', 
      change: 18.4, 
      trending: 'up' as const, 
      icon: 'file-list-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'bounceRate', 
      title: 'Bounce Rate', 
      value: '38.2%', 
      change: -4.6, 
      trending: 'down' as const, 
      icon: 'arrow-go-back-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'avgTime', 
      title: 'Avg. Session Duration', 
      value: '3:42', 
      change: 8.7, 
      trending: 'up' as const, 
      icon: 'time-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  // Products data - for website dashboard, we'll use top pages
  const products = [
    {
      id: 'p1',
      name: 'Homepage',
      sku: 'PAGE-001',
      category: 'Landing Page',
      unitsSold: 147852,
      revenue: '29.4%',
      profitMargin: '1:45',
      trending: 'up' as const,
      icon: 'home-line'
    },
    {
      id: 'p2',
      name: 'Product Listing',
      sku: 'PAGE-002',
      category: 'Product',
      unitsSold: 98547,
      revenue: '19.7%',
      profitMargin: '2:31',
      trending: 'up' as const,
      icon: 'list-check'
    },
    {
      id: 'p3',
      name: 'Blog Articles',
      sku: 'PAGE-003',
      category: 'Content',
      unitsSold: 76321,
      revenue: '15.3%',
      profitMargin: '3:12',
      trending: 'down' as const,
      icon: 'article-line'
    },
    {
      id: 'p4',
      name: 'About Us',
      sku: 'PAGE-004',
      category: 'Company',
      unitsSold: 45689,
      revenue: '9.1%',
      profitMargin: '1:08',
      trending: 'down' as const,
      icon: 'information-line'
    },
    {
      id: 'p5',
      name: 'Contact Page',
      sku: 'PAGE-005',
      category: 'Support',
      unitsSold: 29874,
      revenue: '6.0%',
      profitMargin: '0:52',
      trending: 'up' as const,
      icon: 'contacts-line'
    }
  ];

  // Campaign data - for website dashboard, we'll use traffic sources
  const campaigns = [
    {
      id: 'c1',
      name: 'Organic Search',
      revenue: '142.7K',
      conversion: '3.8%',
      roi: '285%',
      progress: 85,
      icon: 'search-line',
      bgColor: 'green',
      iconColor: 'green'
    },
    {
      id: 'c2',
      name: 'Direct Traffic',
      revenue: '98.3K',
      conversion: '4.2%',
      roi: 'N/A',
      progress: 92,
      icon: 'arrow-right-up-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c3',
      name: 'Social Media',
      revenue: '64.8K',
      conversion: '2.7%',
      roi: '195%',
      progress: 68,
      icon: 'share-line',
      bgColor: 'pink',
      iconColor: 'pink'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="website"
      dashboardTitle="Website Analytics"
      dashboardSubtitle="Monitor traffic, user behavior, conversions, and SEO performance"
      badgeLabel="Web"
      badgeColor="pink"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default WebsiteDashboard;