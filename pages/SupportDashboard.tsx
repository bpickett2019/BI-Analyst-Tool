import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const SupportDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'tickets', name: 'Tickets', icon: 'question-answer-line' },
    { id: 'team', name: 'Support Team', icon: 'team-line' },
    { id: 'satisfaction', name: 'Satisfaction', icon: 'emotion-happy-line' },
    { id: 'knowledge', name: 'Knowledge Base', icon: 'book-2-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'tickets', 
      title: 'Total Tickets', 
      value: '2,487', 
      change: -3.2, 
      trending: 'down' as const, 
      icon: 'question-answer-line', 
      bgColor: 'lime',
      iconColor: 'lime'
    },
    { 
      id: 'resolution', 
      title: 'Avg. Resolution Time', 
      value: '3h 42m', 
      change: -18.5, 
      trending: 'down' as const, 
      icon: 'timer-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'satisfaction', 
      title: 'CSAT Score', 
      value: '92.4%', 
      change: 4.8, 
      trending: 'up' as const, 
      icon: 'emotion-happy-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'firstContact', 
      title: 'First Contact Resolution', 
      value: '78.2%', 
      change: 6.7, 
      trending: 'up' as const, 
      icon: 'chat-check-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  // Products data - for support dashboard, we'll use ticket categories
  const products = [
    {
      id: 'p1',
      name: 'Technical Issues',
      sku: 'TIC-001',
      category: 'Product',
      unitsSold: 875,
      revenue: '35.2%',
      profitMargin: '4h 12m',
      trending: 'down' as const,
      icon: 'bug-line'
    },
    {
      id: 'p2',
      name: 'Billing Inquiries',
      sku: 'TIC-002',
      category: 'Billing',
      unitsSold: 634,
      revenue: '25.5%',
      profitMargin: '2h 48m',
      trending: 'down' as const,
      icon: 'wallet-3-line'
    },
    {
      id: 'p3',
      name: 'Account Access',
      sku: 'TIC-003',
      category: 'Account',
      unitsSold: 428,
      revenue: '17.2%',
      profitMargin: '1h 35m',
      trending: 'up' as const,
      icon: 'user-settings-line'
    },
    {
      id: 'p4',
      name: 'Feature Requests',
      sku: 'TIC-004',
      category: 'Product',
      unitsSold: 342,
      revenue: '13.8%',
      profitMargin: '5h 24m',
      trending: 'up' as const,
      icon: 'lightbulb-line'
    },
    {
      id: 'p5',
      name: 'General Inquiries',
      sku: 'TIC-005',
      category: 'General',
      unitsSold: 208,
      revenue: '8.3%',
      profitMargin: '2h 10m',
      trending: 'down' as const,
      icon: 'question-line'
    }
  ];

  // Campaign data - for support dashboard, we'll use support channels
  const campaigns = [
    {
      id: 'c1',
      name: 'Email Support',
      revenue: '1,245',
      conversion: '94.2%',
      roi: 'N/A',
      progress: 88,
      icon: 'mail-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Live Chat',
      revenue: '842',
      conversion: '98.5%',
      roi: 'N/A',
      progress: 92,
      icon: 'chat-1-line',
      bgColor: 'green',
      iconColor: 'green'
    },
    {
      id: 'c3',
      name: 'Phone Support',
      revenue: '395',
      conversion: '92.7%',
      roi: 'N/A',
      progress: 85,
      icon: 'phone-line',
      bgColor: 'lime',
      iconColor: 'lime'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="support"
      dashboardTitle="Support Center"
      dashboardSubtitle="Track ticket volume, resolution times, and customer satisfaction scores"
      badgeLabel="Support"
      badgeColor="lime"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default SupportDashboard;