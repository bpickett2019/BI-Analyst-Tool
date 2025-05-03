import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';

// Define dashboard section types
interface DashboardSection {
  id: string;
  name: string;
  icon: string;
}

// Define KPI card types
interface KpiCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trending: 'up' | 'down';
  icon: string;
  bgColor: string;
  iconColor: string;
}

// Define campaign performance type
interface Campaign {
  id: string;
  name: string;
  revenue: string;
  conversion: string;
  roi: string;
  progress: number;
  icon: string;
  bgColor: string;
  iconColor: string;
}

// Define product type
interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitsSold: number;
  revenue: string;
  profitMargin: string;
  trending: 'up' | 'down';
  icon: string;
}

// Dashboard Template Props
interface DashboardTemplateProps {
  dashboardType: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  badgeLabel: string;
  badgeColor: string;
  sections: DashboardSection[];
  kpiCards: KpiCard[];
  products: Product[];
  campaigns: Campaign[];
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  dashboardType,
  dashboardTitle,
  dashboardSubtitle,
  badgeLabel,
  badgeColor,
  sections,
  kpiCards,
  products,
  campaigns
}) => {
  // Active section state
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  
  // References for charts
  const revenueChartRef = useRef<HTMLDivElement>(null);
  const categorySalesChartRef = useRef<HTMLDivElement>(null);
  const acquisitionChartRef = useRef<HTMLDivElement>(null);
  const channelChartRef = useRef<HTMLDivElement>(null);
  const geoChartRef = useRef<HTMLDivElement>(null);
  const productChartRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize charts when component mounts
  useEffect(() => {
    // Initialize charts after DOM is fully loaded
    if (typeof window !== 'undefined' && window.echarts) {
      const resizeHandler = () => {
        // Resize all charts when window size changes
        if (revenueChartRef.current) {
          const revenueChart = window.echarts.getInstanceByDom(revenueChartRef.current);
          revenueChart && revenueChart.resize();
        }
        
        if (categorySalesChartRef.current) {
          const categorySalesChart = window.echarts.getInstanceByDom(categorySalesChartRef.current);
          categorySalesChart && categorySalesChart.resize();
        }
        
        if (acquisitionChartRef.current) {
          const acquisitionChart = window.echarts.getInstanceByDom(acquisitionChartRef.current);
          acquisitionChart && acquisitionChart.resize();
        }
        
        if (channelChartRef.current) {
          const channelChart = window.echarts.getInstanceByDom(channelChartRef.current);
          channelChart && channelChart.resize();
        }
        
        if (geoChartRef.current) {
          const geoChart = window.echarts.getInstanceByDom(geoChartRef.current);
          geoChart && geoChart.resize();
        }
        
        // Resize product trend charts
        productChartRefs.current.forEach(ref => {
          if (ref) {
            const chart = window.echarts.getInstanceByDom(ref);
            chart && chart.resize();
          }
        });
      };
      
      // Create revenue trend chart
      if (revenueChartRef.current) {
        const revenueChart = window.echarts.init(revenueChartRef.current);
        const revenueOption = {
          animation: false,
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: {
              color: "#1f2937",
            },
          },
          legend: {
            data: ["This Period", "Previous Period"],
            bottom: 0,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20", "Apr 21", "Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30", "May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7", "May 8", "May 9", "May 10"]
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "This Period",
              type: "line",
              smooth: true,
              data: [18500, 19200, 18400, 20100, 22500, 23100, 21400, 19800, 20900, 23600, 24100, 23400, 22500, 19700, 18900, 20300, 21700, 22800, 24100, 25300, 26200, 24800, 23900, 24200, 25600, 27300, 26400, 25100, 23900, 25200],
              lineStyle: {
                color: "#4f46e5",
              },
              itemStyle: {
                color: "#4f46e5",
              },
              symbol: "circle",
              symbolSize: 6,
            },
            {
              name: "Previous Period",
              type: "line",
              smooth: true,
              data: [15200, 16400, 17100, 16800, 18900, 19500, 18200, 17400, 18700, 19900, 20300, 19700, 18400, 16900, 15700, 16800, 18100, 19300, 20800, 21700, 22400, 21900, 20600, 19900, 21000, 22300, 21400, 20300, 19600, 20800],
              lineStyle: {
                color: "#94a3b8",
              },
              itemStyle: {
                color: "#94a3b8",
              },
              symbol: "circle",
              symbolSize: 6,
            },
          ],
        };
        revenueChart.setOption(revenueOption);
      }
      
      // Create category sales chart (pie chart)
      if (categorySalesChartRef.current) {
        const categorySalesChart = window.echarts.init(categorySalesChartRef.current);
        const categorySalesOption = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: {
              color: "#1f2937",
            },
          },
          legend: {
            bottom: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#1f2937",
            },
          },
          series: [
            {
              name: "Category Sales",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 4,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "16",
                  fontWeight: "bold",
                },
              },
              data: [
                { value: 1867500, name: "Electronics", itemStyle: { color: "#4f46e5" } },
                { value: 1178400, name: "Mobile", itemStyle: { color: "#8b5cf6" } },
                { value: 752400, name: "Home Entertainment", itemStyle: { color: "#d946ef" } },
                { value: 468750, name: "Audio", itemStyle: { color: "#ec4899" } },
                { value: 421600, name: "Wearables", itemStyle: { color: "#f43f5e" } },
              ],
            },
          ],
        };
        categorySalesChart.setOption(categorySalesOption);
      }
      
      // Create acquisition funnel chart
      if (acquisitionChartRef.current) {
        const acquisitionChart = window.echarts.init(acquisitionChartRef.current);
        const acquisitionOption = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: {
              color: "#1f2937",
            },
          },
          legend: {
            bottom: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#1f2937",
            },
          },
          series: [
            {
              name: "Funnel",
              type: "funnel",
              left: "10%",
              top: 10,
              bottom: 60,
              width: "80%",
              min: 0,
              max: 100,
              minSize: "0%",
              maxSize: "100%",
              sort: "descending",
              gap: 2,
              label: {
                show: true,
                position: "inside",
                color: "#fff",
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: "solid",
                },
              },
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 1,
              },
              emphasis: {
                label: {
                  fontSize: 14,
                },
              },
              data: [
                { value: 100, name: "Visits", itemStyle: { color: "#4f46e5" } },
                { value: 48, name: "Products Viewed", itemStyle: { color: "#8b5cf6" } },
                { value: 24, name: "Add to Cart", itemStyle: { color: "#d946ef" } },
                { value: 14, name: "Checkout", itemStyle: { color: "#ec4899" } },
                { value: 8, name: "Purchase", itemStyle: { color: "#f43f5e" } },
              ],
            },
          ],
        };
        acquisitionChart.setOption(acquisitionOption);
      }
      
      // Create sales by channel chart
      if (channelChartRef.current) {
        const channelChart = window.echarts.init(channelChartRef.current);
        const channelOption = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: {
              color: "#1f2937",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            data: ["Online Store", "Marketplace", "Retail", "Wholesale", "Direct"],
            axisLabel: {
              color: "#1f2937",
            },
          },
          series: [
            {
              name: "Sales",
              type: "bar",
              data: [
                { value: 182500, itemStyle: { color: "#4f46e5" } },
                { value: 142700, itemStyle: { color: "#8b5cf6" } },
                { value: 89600, itemStyle: { color: "#d946ef" } },
                { value: 54200, itemStyle: { color: "#ec4899" } },
                { value: 18400, itemStyle: { color: "#f43f5e" } },
              ],
              label: {
                show: true,
                position: "right",
                formatter: "${c}",
              },
            },
          ],
        };
        channelChart.setOption(channelOption);
      }
      
      // Create geographical chart
      if (geoChartRef.current) {
        const geoChart = window.echarts.init(geoChartRef.current);
        const geoOption = {
          tooltip: {
            trigger: "item",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: {
              color: "#1f2937",
            },
          },
          legend: {
            bottom: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#1f2937",
            },
          },
          series: [
            {
              name: "Geographic Sales",
              type: "pie",
              radius: "80%",
              center: ["50%", "45%"],
              data: [
                { value: 42, name: "North America", itemStyle: { color: "#4f46e5" } },
                { value: 28, name: "Europe", itemStyle: { color: "#8b5cf6" } },
                { value: 18, name: "Asia", itemStyle: { color: "#d946ef" } },
                { value: 8, name: "South America", itemStyle: { color: "#ec4899" } },
                { value: 4, name: "Other", itemStyle: { color: "#f43f5e" } },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        geoChart.setOption(geoOption);
      }
      
      // Create product trend charts (mini sparklines)
      productChartRefs.current.forEach((ref, index) => {
        if (ref) {
          const trendChart = window.echarts.init(ref);
          const data = [];
          // Generate random data for the mini charts
          for (let i = 0; i < 20; i++) {
            data.push(Math.floor(Math.random() * 100) + 50);
          }
          
          const trendOption = {
            animation: false,
            grid: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                type: "line",
                data: data,
                showSymbol: false,
                lineStyle: {
                  color: products[index]?.trending === 'up' ? "#10b981" : "#ef4444",
                  width: 2,
                },
                areaStyle: {
                  color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: products[index]?.trending === 'up' ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
                    },
                    {
                      offset: 1,
                      color: products[index]?.trending === 'up' ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    },
                  ]),
                },
              },
            ],
          };
          trendChart.setOption(trendOption);
        }
      });
      
      // Add event listener for window resize
      window.addEventListener('resize', resizeHandler);
      
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [products]);
  
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboards" className="mr-4 text-gray-500 hover:text-gray-900">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line"></i>
            </div>
          </Link>
          <div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{dashboardTitle}</h1>
              <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full bg-${badgeColor}-100 text-${badgeColor}-600`}>
                {badgeLabel}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {dashboardSubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-calendar-line"></i>
              </div>
              <span>{dateRange}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-down-s-line"></i>
              </div>
            </button>
            {showDateDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Quick Select</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        setDateRange('Today');
                        setShowDateDropdown(false);
                      }}
                    >
                      Today
                    </button>
                    <button 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        setDateRange('Yesterday');
                        setShowDateDropdown(false);
                      }}
                    >
                      Yesterday
                    </button>
                    <button 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        setDateRange('Last 7 Days');
                        setShowDateDropdown(false);
                      }}
                    >
                      Last 7 Days
                    </button>
                    <button 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        setDateRange('Last 30 Days');
                        setShowDateDropdown(false);
                      }}
                    >
                      Last 30 Days
                    </button>
                    <button 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        setDateRange('This Month');
                        setShowDateDropdown(false);
                      }}
                    >
                      This Month
                    </button>
                    <button 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        setDateRange('Last Month');
                        setShowDateDropdown(false);
                      }}
                    >
                      Last Month
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Custom Range</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={() => setShowDateDropdown(false)}
                >
                  Apply Range
                </button>
              </div>
            )}
          </div>
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-download-line"></i>
            </div>
          </button>
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-settings-3-line"></i>
            </div>
          </button>
        </div>
      </header>
      
      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm font-medium bg-primary text-white rounded-full">
                All Channels
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full">
                Online Store
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full">
                Retail
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full">
                Marketplace
              </button>
            </div>
            <div className="h-6 border-r border-gray-300"></div>
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-filter-3-line"></i>
              </div>
              <span>Filter</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 px-1 py-1 bg-gray-100 rounded-full">
              <button className="p-1 rounded-full bg-white shadow-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-layout-grid-line"></i>
                </div>
              </button>
              <button className="p-1 rounded-full hover:bg-white">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-list-check-2"></i>
                </div>
              </button>
            </div>
            <button className="p-1 rounded-lg hover:bg-gray-100">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-refresh-line"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpiCards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                <div className={`w-8 h-8 rounded-full bg-${card.bgColor}-100 flex items-center justify-center text-${card.iconColor}-600`}>
                  <i className={`ri-${card.icon}`}></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold">{card.value}</span>
                <span className={`text-sm text-${card.trending === 'up' ? 'green' : 'red'}-500 flex items-center`}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`ri-arrow-${card.trending}-line`}></i>
                  </div>
                  {Math.abs(card.change)}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">vs. previous period</p>
            </div>
          ))}
        </div>
        
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">This Period</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-xs text-gray-600">Previous Period</span>
              </div>
              <button className="p-1 rounded-lg hover:bg-gray-100 ml-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-more-2-fill"></i>
                </div>
              </button>
            </div>
          </div>
          <div className="chart-container" ref={revenueChartRef}></div>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales by Category */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Sales by Category</h3>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-more-2-fill"></i>
                </div>
              </button>
            </div>
            <div className="chart-container" ref={categorySalesChartRef}></div>
          </div>
          
          {/* Customer Acquisition */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Customer Acquisition Funnel</h3>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-more-2-fill"></i>
                </div>
              </button>
            </div>
            <div className="chart-container" ref={acquisitionChartRef}></div>
          </div>
        </div>
        
        {/* Top Products Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            <button className="text-sm text-primary hover:text-primary/80">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit Margin
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
                          <i className={`ri-${product.icon}`}></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">#{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.unitsSold.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600">{product.profitMargin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`text-${product.trending === 'up' ? 'green' : 'red'}-500 text-sm flex items-center mr-3`}>
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className={`ri-arrow-${product.trending}-line`}></i>
                          </div>
                        </div>
                        <div className="w-16 h-8">
                          <div
                            ref={(el) => {
                              productChartRefs.current[index] = el;
                            }}
                            className="h-full w-full"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Two More Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales by Channel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Sales by Channel</h3>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-more-2-fill"></i>
                </div>
              </button>
            </div>
            <div className="chart-container" ref={channelChartRef}></div>
          </div>
          
          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Geographic Distribution</h3>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-more-2-fill"></i>
                </div>
              </button>
            </div>
            <div className="chart-container" ref={geoChartRef}></div>
          </div>
        </div>
        
        {/* Campaign Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Campaign Performance</h3>
            <button className="text-sm text-primary hover:text-primary/80">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-${campaign.bgColor}-100 flex items-center justify-center text-${campaign.iconColor}-600 mr-3`}>
                    <i className={`ri-${campaign.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{campaign.name}</h4>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">{campaign.progress}%</span>
                  <span className="text-sm text-gray-500">Revenue: {campaign.revenue}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Conversion: {campaign.conversion}</span>
                  <span className="text-xs text-gray-500">ROI: {campaign.roi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;