import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const HRDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'recruitment', name: 'Recruitment', icon: 'user-add-line' },
    { id: 'performance', name: 'Performance', icon: 'medal-line' },
    { id: 'attendance', name: 'Attendance', icon: 'calendar-check-line' },
    { id: 'training', name: 'Training', icon: 'graduation-cap-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'headcount', 
      title: 'Total Employees', 
      value: '387', 
      change: 5.4, 
      trending: 'up' as const, 
      icon: 'team-line', 
      bgColor: 'teal',
      iconColor: 'teal'
    },
    { 
      id: 'turnover', 
      title: 'Turnover Rate', 
      value: '12.8%', 
      change: -1.9, 
      trending: 'down' as const, 
      icon: 'user-unfollow-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'timeToHire', 
      title: 'Time to Hire', 
      value: '28 days', 
      change: -4.2, 
      trending: 'down' as const, 
      icon: 'timer-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'costPerHire', 
      title: 'Cost Per Hire', 
      value: '$4,350', 
      change: 3.1, 
      trending: 'up' as const, 
      icon: 'money-dollar-circle-line', 
      bgColor: 'amber',
      iconColor: 'amber'
    }
  ];

  // Products data - for HR dashboard, we'll use departments
  const products = [
    {
      id: 'p1',
      name: 'Engineering',
      sku: 'DEPT-001',
      category: 'Technical',
      unitsSold: 128,
      revenue: '35%',
      profitMargin: '9.5%',
      trending: 'up' as const,
      icon: 'terminal-box-line'
    },
    {
      id: 'p2',
      name: 'Sales & Marketing',
      sku: 'DEPT-002',
      category: 'Revenue',
      unitsSold: 85,
      revenue: '22%',
      profitMargin: '8.2%',
      trending: 'up' as const,
      icon: 'line-chart-line'
    },
    {
      id: 'p3',
      name: 'Customer Support',
      sku: 'DEPT-003',
      category: 'Service',
      unitsSold: 62,
      revenue: '16%',
      profitMargin: '15.7%',
      trending: 'down' as const,
      icon: 'customer-service-line'
    },
    {
      id: 'p4',
      name: 'Operations',
      sku: 'DEPT-004',
      category: 'Operations',
      unitsSold: 58,
      revenue: '15%',
      profitMargin: '11.3%',
      trending: 'up' as const,
      icon: 'settings-line'
    },
    {
      id: 'p5',
      name: 'Administration',
      sku: 'DEPT-005',
      category: 'Support',
      unitsSold: 45,
      revenue: '12%',
      profitMargin: '14.8%',
      trending: 'down' as const,
      icon: 'file-list-3-line'
    }
  ];

  // Campaign data - for HR dashboard, we'll use recruitment channels
  const campaigns = [
    {
      id: 'c1',
      name: 'Employee Referrals',
      revenue: '42',
      conversion: '68%',
      roi: '285%',
      progress: 85,
      icon: 'user-shared-line',
      bgColor: 'teal',
      iconColor: 'teal'
    },
    {
      id: 'c2',
      name: 'Job Boards',
      revenue: '38',
      conversion: '42%',
      roi: '156%',
      progress: 65,
      icon: 'newspaper-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c3',
      name: 'LinkedIn',
      revenue: '32',
      conversion: '35%',
      roi: '178%',
      progress: 58,
      icon: 'linkedin-box-line',
      bgColor: 'sky',
      iconColor: 'sky'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="hr"
      dashboardTitle="Human Resources"
      dashboardSubtitle="Track employee performance, hiring metrics, and workforce analytics"
      badgeLabel="HR"
      badgeColor="teal"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default HRDashboard;