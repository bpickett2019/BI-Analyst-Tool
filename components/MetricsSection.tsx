import React, { useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MetricCard from './MetricCard';
import useLayoutPersistence from '../hooks/useLayoutPersistence';

// Default metrics data
const DEFAULT_METRICS = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$89,241",
    change: 5.4,
    trend: "up",
    color: "primary"
  },
  {
    id: "customers",
    title: "New Customers",
    value: "1,432",
    change: 12.2,
    trend: "up",
    color: "success"
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "24.8%",
    change: -1.1,
    trend: "down",
    color: "warning"
  },
  {
    id: "avg-order",
    title: "Avg. Order Value",
    value: "$142.32",
    change: 3.2,
    trend: "up",
    color: "secondary"
  }
];

// Default layout for the metrics
const DEFAULT_LAYOUT = [
  { i: "revenue", x: 0, y: 0, w: 1, h: 1 },
  { i: "customers", x: 1, y: 0, w: 1, h: 1 },
  { i: "conversion", x: 2, y: 0, w: 1, h: 1 },
  { i: "avg-order", x: 3, y: 0, w: 1, h: 1 }
];

const ResponsiveGridLayout = WidthProvider(Responsive);

const MetricsSection: React.FC = () => {
  const { layout, saveLayout } = useLayoutPersistence('metrics', DEFAULT_LAYOUT);

  // Initialize charts after the component mounts
  useEffect(() => {
    const initCharts = () => {
      // Revenue chart
      if (window.echarts && document.getElementById('revenue-chart')) {
        const revenueChart = window.echarts.init(document.getElementById('revenue-chart'));
        const revenueOption = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Revenue', 'Profit'],
            bottom: 0
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Revenue',
              type: 'line',
              stack: 'Total',
              data: [20000, 32000, 29000, 38000, 42000, 45000, 55000, 52000, 59000, 62000, 68000, 89000],
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(79, 70, 229, 0.4)'
                  }, {
                    offset: 1, color: 'rgba(79, 70, 229, 0.1)'
                  }]
                }
              },
              smooth: true,
              lineStyle: {
                width: 3,
                color: '#4F46E5'
              },
              symbol: 'circle',
              symbolSize: 8
            },
            {
              name: 'Profit',
              type: 'line',
              stack: 'Total',
              data: [5000, 9000, 8000, 12000, 15000, 18000, 23000, 21000, 25000, 28000, 32000, 40000],
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(16, 185, 129, 0.4)'
                  }, {
                    offset: 1, color: 'rgba(16, 185, 129, 0.1)'
                  }]
                }
              },
              smooth: true,
              lineStyle: {
                width: 3,
                color: '#10B981'
              },
              symbol: 'circle',
              symbolSize: 8
            }
          ]
        };
        revenueChart.setOption(revenueOption);
      }

      // Customer chart
      if (window.echarts && document.getElementById('customer-chart')) {
        const customerChart = window.echarts.init(document.getElementById('customer-chart'));
        const customerOption = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            bottom: 0
          },
          series: [
            {
              name: 'Customer Segments',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Enterprise' },
                { value: 735, name: 'SMB' },
                { value: 580, name: 'Startup' },
                { value: 484, name: 'Individual' }
              ]
            }
          ]
        };
        customerChart.setOption(customerOption);
      }

      // Handle resize
      window.addEventListener('resize', function() {
        if (window.echarts) {
          const revenueChart = document.getElementById('revenue-chart') ? 
            window.echarts.getInstanceByDom(document.getElementById('revenue-chart')) : null;
          const customerChart = document.getElementById('customer-chart') ? 
            window.echarts.getInstanceByDom(document.getElementById('customer-chart')) : null;

          if (revenueChart) revenueChart.resize();
          if (customerChart) customerChart.resize();
        }
      });
    };

    // Check if ECharts is loaded
    if (window.echarts) {
      initCharts();
    } else {
      // Load ECharts dynamically if not available
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
      script.async = true;
      script.onload = initCharts;
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  // Handle layout changes
  const handleLayoutChange = (currentLayout: any) => {
    saveLayout(currentLayout);
  };

  return (
    <div id="metrics-container" className="mb-6">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={150}
        isDraggable={true}
        isResizable={false}
        onLayoutChange={(layout) => handleLayoutChange(layout)}
        draggableHandle=".drag-handle"
        margin={[20, 20]}
      >
        {DEFAULT_METRICS.map((metric) => (
          <div key={metric.id} className="metric-card">
            <MetricCard 
              id={metric.id}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              color={metric.color}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
      
      <div className="flex justify-end mt-4">
        <button 
          type="button" 
          id="save-layout-btn" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => {
            saveLayout(layout);
            alert('Dashboard layout saved successfully!');
          }}
        >
          <i className="ri-save-line mr-2"></i>
          Save Layout
        </button>
      </div>
    </div>
  );
};

// Add type definition for global ECharts
declare global {
  interface Window {
    echarts: any;
  }
}

export default MetricsSection;
