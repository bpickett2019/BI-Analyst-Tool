import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const ProjectsDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'projects', name: 'Projects', icon: 'folder-chart-line' },
    { id: 'tasks', name: 'Tasks', icon: 'task-line' },
    { id: 'team', name: 'Team', icon: 'team-line' },
    { id: 'timeline', name: 'Timeline', icon: 'calendar-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'active', 
      title: 'Active Projects', 
      value: '32', 
      change: 4, 
      trending: 'up' as const, 
      icon: 'folder-open-line', 
      bgColor: 'sky',
      iconColor: 'sky'
    },
    { 
      id: 'completed', 
      title: 'Completed Projects', 
      value: '148', 
      change: 12, 
      trending: 'up' as const, 
      icon: 'checkbox-circle-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'tasks', 
      title: 'Open Tasks', 
      value: '457', 
      change: -15, 
      trending: 'down' as const, 
      icon: 'task-line', 
      bgColor: 'amber',
      iconColor: 'amber'
    },
    { 
      id: 'resource', 
      title: 'Resource Utilization', 
      value: '87.2%', 
      change: 5.4, 
      trending: 'up' as const, 
      icon: 'bar-chart-grouped-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    }
  ];

  // Products data - for projects dashboard, we'll use project items
  const products = [
    {
      id: 'p1',
      name: 'Website Redesign',
      sku: 'PRJ-001',
      category: 'Web Development',
      unitsSold: 78,
      revenue: '$85,000',
      profitMargin: '42%',
      trending: 'up' as const,
      icon: 'code-box-line'
    },
    {
      id: 'p2',
      name: 'Mobile App Development',
      sku: 'PRJ-002',
      category: 'Software',
      unitsSold: 65,
      revenue: '$120,000',
      profitMargin: '38%',
      trending: 'up' as const,
      icon: 'smartphone-line'
    },
    {
      id: 'p3',
      name: 'Marketing Campaign',
      sku: 'PRJ-003',
      category: 'Marketing',
      unitsSold: 92,
      revenue: '$68,500',
      profitMargin: '52%',
      trending: 'down' as const,
      icon: 'megaphone-line'
    },
    {
      id: 'p4',
      name: 'Product Launch',
      sku: 'PRJ-004',
      category: 'Strategy',
      unitsSold: 84,
      revenue: '$92,000',
      profitMargin: '45%',
      trending: 'up' as const,
      icon: 'rocket-line'
    },
    {
      id: 'p5',
      name: 'Infrastructure Upgrade',
      sku: 'PRJ-005',
      category: 'IT',
      unitsSold: 56,
      revenue: '$145,000',
      profitMargin: '32%',
      trending: 'down' as const,
      icon: 'database-2-line'
    }
  ];

  // Campaign data - for projects dashboard, we'll use project milestones
  const campaigns = [
    {
      id: 'c1',
      name: 'Q3 Release Cycle',
      revenue: '$325K',
      conversion: '92%',
      roi: '275%',
      progress: 78,
      icon: 'calendar-check-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Infrastructure Migration',
      revenue: '$240K',
      conversion: '85%',
      roi: '230%',
      progress: 65,
      icon: 'server-line',
      bgColor: 'amber',
      iconColor: 'amber'
    },
    {
      id: 'c3',
      name: 'UI/UX Overhaul',
      revenue: '$175K',
      conversion: '88%',
      roi: '305%',
      progress: 42,
      icon: 'paint-brush-line',
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="projects"
      dashboardTitle="Project Management"
      dashboardSubtitle="Track projects, tasks, team performance, and resource allocation"
      badgeLabel="Projects"
      badgeColor="sky"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default ProjectsDashboard;