import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const InventoryDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'stock', name: 'Stock Levels', icon: 'archive-line' },
    { id: 'suppliers', name: 'Suppliers', icon: 'truck-line' },
    { id: 'warehouse', name: 'Warehousing', icon: 'store-2-line' },
    { id: 'logistics', name: 'Logistics', icon: 'route-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'inventory', 
      title: 'Total Inventory Value', 
      value: '$3.82M', 
      change: 8.7, 
      trending: 'up' as const, 
      icon: 'archive-drawer-line', 
      bgColor: 'cyan',
      iconColor: 'cyan'
    },
    { 
      id: 'turnover', 
      title: 'Inventory Turnover', 
      value: '5.6x', 
      change: 12.4, 
      trending: 'up' as const, 
      icon: 'repeat-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'stockouts', 
      title: 'Stockout Rate', 
      value: '1.8%', 
      change: -0.4, 
      trending: 'down' as const, 
      icon: 'alarm-warning-line', 
      bgColor: 'red',
      iconColor: 'red'
    },
    { 
      id: 'leadTime', 
      title: 'Avg. Lead Time', 
      value: '8.4 days', 
      change: -1.2, 
      trending: 'down' as const, 
      icon: 'timer-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    }
  ];

  // Products data - for inventory dashboard, we'll use product categories
  const products = [
    {
      id: 'p1',
      name: 'Electronics',
      sku: 'CAT-001',
      category: 'High Value',
      unitsSold: 12487,
      revenue: '$1.24M',
      profitMargin: '3.5 days',
      trending: 'up' as const,
      icon: 'computer-line'
    },
    {
      id: 'p2',
      name: 'Apparel',
      sku: 'CAT-002',
      category: 'Fast Moving',
      unitsSold: 28752,
      revenue: '$845K',
      profitMargin: '2.8 days',
      trending: 'down' as const,
      icon: 'shirt-line'
    },
    {
      id: 'p3',
      name: 'Home Goods',
      sku: 'CAT-003',
      category: 'Medium Value',
      unitsSold: 9634,
      revenue: '$685K',
      profitMargin: '4.2 days',
      trending: 'up' as const,
      icon: 'home-8-line'
    },
    {
      id: 'p4',
      name: 'Sporting Goods',
      sku: 'CAT-004',
      category: 'Seasonal',
      unitsSold: 7458,
      revenue: '$520K',
      profitMargin: '3.9 days',
      trending: 'up' as const,
      icon: 'basketball-line'
    },
    {
      id: 'p5',
      name: 'Books & Media',
      sku: 'CAT-005',
      category: 'Low Value',
      unitsSold: 18547,
      revenue: '$325K',
      profitMargin: '5.1 days',
      trending: 'down' as const,
      icon: 'book-open-line'
    }
  ];

  // Campaign data - for inventory dashboard, we'll use suppliers
  const campaigns = [
    {
      id: 'c1',
      name: 'Global Distributors Inc.',
      revenue: '$1.24M',
      conversion: '98.5%',
      roi: 'N/A',
      progress: 95,
      icon: 'building-4-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'FastShip Logistics',
      revenue: '$785K',
      conversion: '94.2%',
      roi: 'N/A',
      progress: 88,
      icon: 'truck-line',
      bgColor: 'green',
      iconColor: 'green'
    },
    {
      id: 'c3',
      name: 'Metro Manufacturing',
      revenue: '$658K',
      conversion: '97.8%',
      roi: 'N/A',
      progress: 92,
      icon: 'factory-line',
      bgColor: 'cyan',
      iconColor: 'cyan'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="inventory"
      dashboardTitle="Inventory & Supply Chain"
      dashboardSubtitle="Monitor inventory levels, supplier performance, and logistics metrics"
      badgeLabel="Inventory"
      badgeColor="cyan"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default InventoryDashboard;