import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const EcommerceDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'products', name: 'Products', icon: 'shopping-bag-3-line' },
    { id: 'orders', name: 'Orders', icon: 'shopping-cart-2-line' },
    { id: 'customers', name: 'Customers', icon: 'user-3-line' },
    { id: 'marketing', name: 'Marketing', icon: 'megaphone-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'revenue', 
      title: 'Total Sales', 
      value: '$684,250', 
      change: 16.8, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'red',
      iconColor: 'red'
    },
    { 
      id: 'orders', 
      title: 'Orders', 
      value: '3,582', 
      change: 12.3, 
      trending: 'up' as const, 
      icon: 'shopping-cart-2-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'avg-order', 
      title: 'Avg. Order Value', 
      value: '$191.02', 
      change: 4.5, 
      trending: 'up' as const, 
      icon: 'bar-chart-box-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    },
    { 
      id: 'cart-abandon', 
      title: 'Cart Abandonment', 
      value: '24.7%', 
      change: -2.3, 
      trending: 'down' as const, 
      icon: 'shopping-basket-line', 
      bgColor: 'green',
      iconColor: 'green'
    }
  ];

  // Products data
  const products = [
    {
      id: 'p1',
      name: 'Premium Headphones',
      sku: 'PRD-001',
      category: 'Electronics',
      unitsSold: 785,
      revenue: '$94,200',
      profitMargin: '48%',
      trending: 'up' as const,
      icon: 'headphone-line'
    },
    {
      id: 'p2',
      name: 'Wireless Keyboard',
      sku: 'PRD-002',
      category: 'Electronics',
      unitsSold: 632,
      revenue: '$50,560',
      profitMargin: '53%',
      trending: 'up' as const,
      icon: 'keyboard-line'
    },
    {
      id: 'p3',
      name: 'Ergonomic Office Chair',
      sku: 'PRD-003',
      category: 'Furniture',
      unitsSold: 324,
      revenue: '$129,600',
      profitMargin: '38%',
      trending: 'up' as const,
      icon: 'chair-line'
    },
    {
      id: 'p4',
      name: 'Smart Watch',
      sku: 'PRD-004',
      category: 'Wearables',
      unitsSold: 548,
      revenue: '$87,680',
      profitMargin: '58%',
      trending: 'up' as const,
      icon: 'watch-line'
    },
    {
      id: 'p5',
      name: 'Laptop Backpack',
      sku: 'PRD-005',
      category: 'Accessories',
      unitsSold: 926,
      revenue: '$46,300',
      profitMargin: '62%',
      trending: 'down' as const,
      icon: 'shopping-bag-line'
    }
  ];

  // Campaign data
  const campaigns = [
    {
      id: 'c1',
      name: 'Back to School Sale',
      revenue: '$86,450',
      conversion: '8.7%',
      roi: '285%',
      progress: 80,
      icon: 'book-open-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Free Shipping Weekend',
      revenue: '$42,780',
      conversion: '12.1%',
      roi: '310%',
      progress: 92,
      icon: 'truck-line',
      bgColor: 'red',
      iconColor: 'red'
    },
    {
      id: 'c3',
      name: 'Flash Sale',
      revenue: '$38,250',
      conversion: '14.8%',
      roi: '325%',
      progress: 95,
      icon: 'flashlight-line',
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="ecommerce"
      dashboardTitle="E-commerce Performance"
      dashboardSubtitle="Track sales, orders, products, and customer behavior"
      badgeLabel="E-commerce"
      badgeColor="red"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default EcommerceDashboard;