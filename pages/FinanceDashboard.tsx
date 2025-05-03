import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const FinanceDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'revenue', name: 'Revenue', icon: 'funds-line' },
    { id: 'expenses', name: 'Expenses', icon: 'swap-line' },
    { id: 'profitability', name: 'Profitability', icon: 'line-chart-line' },
    { id: 'forecast', name: 'Forecast', icon: 'calculator-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'revenue', 
      title: 'Total Revenue', 
      value: '$4.85M', 
      change: 14.2, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'expenses', 
      title: 'Total Expenses', 
      value: '$2.34M', 
      change: 7.8, 
      trending: 'up' as const, 
      icon: 'swap-line', 
      bgColor: 'amber',
      iconColor: 'amber'
    },
    { 
      id: 'profit', 
      title: 'Net Profit', 
      value: '$2.51M', 
      change: 18.4, 
      trending: 'up' as const, 
      icon: 'line-chart-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'margin', 
      title: 'Profit Margin', 
      value: '51.8%', 
      change: 5.2, 
      trending: 'up' as const, 
      icon: 'percent-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  // Products data - for finance dashboard, we'll use accounts/departments
  const products = [
    {
      id: 'p1',
      name: 'Sales Department',
      sku: 'DEP001',
      category: 'Revenue',
      unitsSold: 1258,
      revenue: '$1.85M',
      profitMargin: '64%',
      trending: 'up' as const,
      icon: 'shopping-bag-line'
    },
    {
      id: 'p2',
      name: 'Marketing Department',
      sku: 'DEP002',
      category: 'Expense',
      unitsSold: 452,
      revenue: '$720K',
      profitMargin: '38%',
      trending: 'up' as const,
      icon: 'megaphone-line'
    },
    {
      id: 'p3',
      name: 'Product Development',
      sku: 'DEP003',
      category: 'Expense',
      unitsSold: 327,
      revenue: '$980K',
      profitMargin: '42%',
      trending: 'down' as const,
      icon: 'tools-line'
    },
    {
      id: 'p4',
      name: 'Customer Support',
      sku: 'DEP004',
      category: 'Expense',
      unitsSold: 215,
      revenue: '$430K',
      profitMargin: '28%',
      trending: 'down' as const,
      icon: 'customer-service-line'
    },
    {
      id: 'p5',
      name: 'Administrative',
      sku: 'DEP005',
      category: 'Overhead',
      unitsSold: 183,
      revenue: '$275K',
      profitMargin: '18%',
      trending: 'down' as const,
      icon: 'building-line'
    }
  ];

  // Campaign data - for finance dashboard, we'll use financial projects
  const campaigns = [
    {
      id: 'c1',
      name: 'Cost Optimization Initiative',
      revenue: '$345K',
      conversion: '14.2%',
      roi: '278%',
      progress: 68,
      icon: 'scissors-cut-line',
      bgColor: 'amber',
      iconColor: 'amber'
    },
    {
      id: 'c2',
      name: 'Revenue Growth Strategy',
      revenue: '$520K',
      conversion: '18.5%',
      roi: '325%',
      progress: 75,
      icon: 'line-chart-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c3',
      name: 'Digital Transformation',
      revenue: '$275K',
      conversion: '8.7%',
      roi: '185%',
      progress: 42,
      icon: 'database-2-line',
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="finance"
      dashboardTitle="Financial Overview"
      dashboardSubtitle="Track revenue, expenses, profitability, and financial projections"
      badgeLabel="Finance"
      badgeColor="amber"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default FinanceDashboard;