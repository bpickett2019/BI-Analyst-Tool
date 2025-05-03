import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const OperationsDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'efficiency', name: 'Efficiency', icon: 'speed-line' },
    { id: 'resources', name: 'Resources', icon: 'database-2-line' },
    { id: 'processes', name: 'Processes', icon: 'flow-chart' },
    { id: 'infrastructure', name: 'Infrastructure', icon: 'server-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'uptime', 
      title: 'System Uptime', 
      value: '99.97%', 
      change: 0.12, 
      trending: 'up' as const, 
      icon: 'server-line', 
      bgColor: 'orange',
      iconColor: 'orange'
    },
    { 
      id: 'throughput', 
      title: 'Throughput', 
      value: '14.8K/hr', 
      change: 8.4, 
      trending: 'up' as const, 
      icon: 'speed-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'responseTime', 
      title: 'Avg. Response Time', 
      value: '235ms', 
      change: -18.2, 
      trending: 'down' as const, 
      icon: 'timer-flash-line', 
      bgColor: 'green',
      iconColor: 'green'
    },
    { 
      id: 'errorRate', 
      title: 'Error Rate', 
      value: '0.18%', 
      change: -0.05, 
      trending: 'down' as const, 
      icon: 'error-warning-line', 
      bgColor: 'red',
      iconColor: 'red'
    }
  ];

  // Products data - for operations dashboard, we'll use systems
  const products = [
    {
      id: 'p1',
      name: 'Main API Service',
      sku: 'SYS-001',
      category: 'Backend',
      unitsSold: 28795,
      revenue: '99.99%',
      profitMargin: '82ms',
      trending: 'up' as const,
      icon: 'code-box-line'
    },
    {
      id: 'p2',
      name: 'Web Application',
      sku: 'SYS-002',
      category: 'Frontend',
      unitsSold: 18542,
      revenue: '99.98%',
      profitMargin: '178ms',
      trending: 'up' as const,
      icon: 'layout-masonry-line'
    },
    {
      id: 'p3',
      name: 'Database Cluster',
      sku: 'SYS-003',
      category: 'Storage',
      unitsSold: 7834,
      revenue: '99.995%',
      profitMargin: '45ms',
      trending: 'up' as const,
      icon: 'database-2-line'
    },
    {
      id: 'p4',
      name: 'Authentication',
      sku: 'SYS-004',
      category: 'Security',
      unitsSold: 5671,
      revenue: '99.99%',
      profitMargin: '92ms',
      trending: 'down' as const,
      icon: 'lock-line'
    },
    {
      id: 'p5',
      name: 'Analytics Pipeline',
      sku: 'SYS-005',
      category: 'Data',
      unitsSold: 4298,
      revenue: '99.95%',
      profitMargin: '126ms',
      trending: 'up' as const,
      icon: 'bar-chart-horizontal-line'
    }
  ];

  // Campaign data - for operations dashboard, we'll use deployment cycles
  const campaigns = [
    {
      id: 'c1',
      name: 'Production Release 2.8',
      revenue: '18',
      conversion: '100%',
      roi: 'N/A',
      progress: 92,
      icon: 'rocket-line',
      bgColor: 'blue',
      iconColor: 'blue'
    },
    {
      id: 'c2',
      name: 'Infrastructure Upgrade',
      revenue: '14',
      conversion: '85%',
      roi: 'N/A',
      progress: 68,
      icon: 'server-line',
      bgColor: 'orange',
      iconColor: 'orange'
    },
    {
      id: 'c3',
      name: 'Security Audit',
      revenue: '12',
      conversion: '92%',
      roi: 'N/A',
      progress: 75,
      icon: 'shield-check-line',
      bgColor: 'green',
      iconColor: 'green'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="operations"
      dashboardTitle="Operations"
      dashboardSubtitle="Monitor operational efficiency, process metrics, and resource utilization"
      badgeLabel="Ops"
      badgeColor="orange"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default OperationsDashboard;