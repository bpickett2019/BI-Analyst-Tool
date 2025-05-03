import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const SalesDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'products', name: 'Products', icon: 'shopping-bag-3-line' },
    { id: 'customers', name: 'Customers', icon: 'user-3-line' },
    { id: 'orders', name: 'Orders', icon: 'shopping-cart-2-line' },
    { id: 'channels', name: 'Channels', icon: 'store-2-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'revenue', 
      title: 'Total Revenue', 
      value: '$487,362', 
      change: 12.5, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'orders', 
      title: 'Total Orders', 
      value: '1,458', 
      change: 8.2, 
      trending: 'up' as const, 
      icon: 'shopping-cart-2-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    },
    { 
      id: 'avg-order', 
      title: 'Average Order Value', 
      value: '$334.27', 
      change: 3.1, 
      trending: 'up' as const, 
      icon: 'bar-chart-box-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'conversion', 
      title: 'Conversion Rate', 
      value: '3.8%', 
      change: -0.4, 
      trending: 'down' as const, 
      icon: 'percent-line', 
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  // Products data
  const products = [
    {
      id: 'p1',
      name: 'Wireless Earbuds Pro',
      sku: 'WEP001',
      category: 'Electronics',
      unitsSold: 3245,
      revenue: '$259,600',
      profitMargin: '42%',
      trending: 'up' as const,
      icon: 'headphone-line'
    },
    {
      id: 'p2',
      name: 'Ultra HD Smart TV 55"',
      sku: 'TV055',
      category: 'Home Entertainment',
      unitsSold: 1876,
      revenue: '$845,200',
      profitMargin: '37%',
      trending: 'up' as const,
      icon: 'tv-2-line'
    },
    {
      id: 'p3',
      name: 'Premium Fitness Watch',
      sku: 'FW120',
      category: 'Wearables',
      unitsSold: 2542,
      revenue: '$381,300',
      profitMargin: '48%',
      trending: 'up' as const,
      icon: 'watch-line'
    },
    {
      id: 'p4',
      name: 'Portable Bluetooth Speaker',
      sku: 'PBS075',
      category: 'Audio',
      unitsSold: 3127,
      revenue: '$156,350',
      profitMargin: '41%',
      trending: 'down' as const,
      icon: 'speaker-line'
    },
    {
      id: 'p5',
      name: 'Professional Camera Set',
      sku: 'CAM200',
      category: 'Photography',
      unitsSold: 982,
      revenue: '$491,000',
      profitMargin: '35%',
      trending: 'down' as const,
      icon: 'camera-3-line'
    }
  ];

  // Campaign data
  const campaigns = [
    {
      id: 'c1',
      name: 'Summer Sale 2023',
      revenue: '$125,400',
      conversion: '12.5%',
      roi: '320%',
      progress: 85,
      icon: 'sun-line',
      bgColor: 'amber',
      iconColor: 'amber'
    },
    {
      id: 'c2',
      name: 'New Product Launch',
      revenue: '$87,600',
      conversion: '9.2%',
      roi: '245%',
      progress: 68,
      icon: 'rocket-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c3',
      name: 'Holiday Season Promo',
      revenue: '$203,800',
      conversion: '15.7%',
      roi: '378%',
      progress: 92,
      icon: 'gift-line',
      bgColor: 'red',
      iconColor: 'red'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="sales"
      dashboardTitle="Sales Analytics"
      dashboardSubtitle="Track performance metrics, revenue, and product sales"
      badgeLabel="Sales"
      badgeColor="blue"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default SalesDashboard;