import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const SaaSDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'revenue', name: 'Revenue', icon: 'money-dollar-circle-line' },
    { id: 'customers', name: 'Customers', icon: 'user-heart-line' },
    { id: 'usage', name: 'Usage', icon: 'line-chart-line' },
    { id: 'churn', name: 'Churn', icon: 'user-unfollow-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'mrr', 
      title: 'Monthly Recurring Revenue', 
      value: '$385,240', 
      change: 12.8, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'violet',
      iconColor: 'violet'
    },
    { 
      id: 'arpu', 
      title: 'Avg. Revenue Per User', 
      value: '$79.50', 
      change: 5.2, 
      trending: 'up' as const, 
      icon: 'user-settings-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'churn', 
      title: 'Customer Churn', 
      value: '2.4%', 
      change: -0.8, 
      trending: 'down' as const, 
      icon: 'user-unfollow-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'ltv', 
      title: 'Customer LTV', 
      value: '$2,850', 
      change: 8.7, 
      trending: 'up' as const, 
      icon: 'user-star-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  // Products data - for SaaS dashboard, we'll use subscription tiers
  const products = [
    {
      id: 'p1',
      name: 'Enterprise Plan',
      sku: 'TIER-001',
      category: 'Premium',
      unitsSold: 128,
      revenue: '$195K',
      profitMargin: '0.8%',
      trending: 'up' as const,
      icon: 'building-line'
    },
    {
      id: 'p2',
      name: 'Business Plan',
      sku: 'TIER-002',
      category: 'Mid-tier',
      unitsSold: 845,
      revenue: '$126K',
      profitMargin: '1.2%',
      trending: 'up' as const,
      icon: 'briefcase-line'
    },
    {
      id: 'p3',
      name: 'Team Plan',
      sku: 'TIER-003',
      category: 'Mid-tier',
      unitsSold: 1247,
      revenue: '$42K',
      profitMargin: '2.1%',
      trending: 'up' as const,
      icon: 'team-line'
    },
    {
      id: 'p4',
      name: 'Starter Plan',
      sku: 'TIER-004',
      category: 'Basic',
      unitsSold: 2854,
      revenue: '$18K',
      profitMargin: '5.2%',
      trending: 'down' as const,
      icon: 'rocket-line'
    },
    {
      id: 'p5',
      name: 'Free Tier',
      sku: 'TIER-005',
      category: 'Free',
      unitsSold: 8945,
      revenue: '$0',
      profitMargin: 'N/A',
      trending: 'up' as const,
      icon: 'gift-line'
    }
  ];

  // Campaign data - for SaaS dashboard, we'll use acquisition channels
  const campaigns = [
    {
      id: 'c1',
      name: 'Direct & Organic',
      revenue: '$185K',
      conversion: '3.2%',
      roi: '285%',
      progress: 88,
      icon: 'global-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Paid Search & Social',
      revenue: '$125K',
      conversion: '2.8%',
      roi: '195%',
      progress: 72,
      icon: 'advertisement-line',
      bgColor: 'purple',
      iconColor: 'purple'
    },
    {
      id: 'c3',
      name: 'Referral Program',
      revenue: '$75K',
      conversion: '4.5%',
      roi: '320%',
      progress: 65,
      icon: 'share-forward-line',
      bgColor: 'green',
      iconColor: 'green'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="saas"
      dashboardTitle="SaaS Metrics"
      dashboardSubtitle="Monitor MRR, churn, LTV, CAC, and other key SaaS performance indicators"
      badgeLabel="SaaS"
      badgeColor="violet"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default SaaSDashboard;