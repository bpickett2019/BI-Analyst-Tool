import React from 'react';
import { DashboardTemplate } from '../components/DashboardTemplate';

export const SocialDashboard: React.FC = () => {
  // Dashboard sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: 'dashboard-line' },
    { id: 'engagement', name: 'Engagement', icon: 'heart-line' },
    { id: 'audience', name: 'Audience', icon: 'user-line' },
    { id: 'content', name: 'Content', icon: 'image-line' },
    { id: 'campaigns', name: 'Campaigns', icon: 'megaphone-line' }
  ];

  // KPI cards
  const kpiCards = [
    { 
      id: 'followers', 
      title: 'Total Followers', 
      value: '482.5K', 
      change: 15.3, 
      trending: 'up' as const, 
      icon: 'user-follow-line', 
      bgColor: 'sky',
      iconColor: 'sky'
    },
    { 
      id: 'engagement', 
      title: 'Engagement Rate', 
      value: '5.8%', 
      change: 2.1, 
      trending: 'up' as const, 
      icon: 'heart-line', 
      bgColor: 'pink',
      iconColor: 'pink'
    },
    { 
      id: 'reach', 
      title: 'Total Reach', 
      value: '1.82M', 
      change: 24.7, 
      trending: 'up' as const, 
      icon: 'broadcast-line', 
      bgColor: 'blue',
      iconColor: 'blue'
    },
    { 
      id: 'clickThrough', 
      title: 'Click-through Rate', 
      value: '3.2%', 
      change: 0.8, 
      trending: 'up' as const, 
      icon: 'cursor-line', 
      bgColor: 'purple',
      iconColor: 'purple'
    }
  ];

  // Products data - for social dashboard, we'll use platforms
  const products = [
    {
      id: 'p1',
      name: 'Instagram',
      sku: 'SOC-001',
      category: 'Image',
      unitsSold: 185420,
      revenue: '38.4%',
      profitMargin: '6.2%',
      trending: 'up' as const,
      icon: 'instagram-line'
    },
    {
      id: 'p2',
      name: 'Twitter',
      sku: 'SOC-002',
      category: 'Text',
      unitsSold: 128754,
      revenue: '26.7%',
      profitMargin: '4.8%',
      trending: 'up' as const,
      icon: 'twitter-x-line'
    },
    {
      id: 'p3',
      name: 'Facebook',
      sku: 'SOC-003',
      category: 'Mixed',
      unitsSold: 95482,
      revenue: '19.8%',
      profitMargin: '3.5%',
      trending: 'down' as const,
      icon: 'facebook-circle-line'
    },
    {
      id: 'p4',
      name: 'LinkedIn',
      sku: 'SOC-004',
      category: 'Professional',
      unitsSold: 48752,
      revenue: '10.1%',
      profitMargin: '2.7%',
      trending: 'up' as const,
      icon: 'linkedin-box-line'
    },
    {
      id: 'p5',
      name: 'TikTok',
      sku: 'SOC-005',
      category: 'Video',
      unitsSold: 24180,
      revenue: '5.0%',
      profitMargin: '8.3%',
      trending: 'up' as const,
      icon: 'tiktok-line'
    }
  ];

  // Campaign data - for social dashboard, we'll use content types
  const campaigns = [
    {
      id: 'c1',
      name: 'Video Content',
      revenue: '245K',
      conversion: '8.2%',
      roi: '312%',
      progress: 85,
      icon: 'video-line',
      bgColor: 'pink',
      iconColor: 'pink'
    },
    {
      id: 'c2',
      name: 'Image Posts',
      revenue: '158K',
      conversion: '6.7%',
      roi: '278%',
      progress: 78,
      icon: 'image-line',
      bgColor: 'green',
      iconColor: 'green'
    },
    {
      id: 'c3',
      name: 'Interactive Stories',
      revenue: '79K',
      conversion: '5.4%',
      roi: '185%',
      progress: 62,
      icon: 'slideshow-line',
      bgColor: 'blue',
      iconColor: 'blue'
    }
  ];

  return (
    <DashboardTemplate
      dashboardType="social"
      dashboardTitle="Social Media Analytics"
      dashboardSubtitle="Track engagement, reach, follower growth, and content performance"
      badgeLabel="Social"
      badgeColor="sky"
      sections={sections}
      kpiCards={kpiCards}
      products={products}
      campaigns={campaigns}
    />
  );
};

export default SocialDashboard;