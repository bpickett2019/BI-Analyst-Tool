import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import '../styles/createDashboard.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem, DropZone, ItemTypes } from '../components/DragAndDrop';
import { DateRangePicker } from '../components/DateRangePicker';

const CreateDashboard: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [dashboardTitle, setDashboardTitle] = useState('Marketing Performance Dashboard');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState('data');
  
  // State for drop zones
  const [dropZoneContents, setDropZoneContents] = useState<{[key: string]: any}>({
    'filter-zone': true,
    'chart-zone-1': true,
    'chart-zone-2': true,
    'chart-zone-3': true,
    'table-zone': true,
  });
  
  // Chart refs
  const lineChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  // Handle drop
  const handleDrop = (item: any, zoneId: string) => {
    console.log(`Dropped ${item.name} onto ${zoneId}`);
    setDropZoneContents(prev => ({
      ...prev,
      [zoneId]: item
    }));
  };

  useEffect(() => {
    // Check if ECharts is available in the window object
    if (window.echarts && lineChartRef.current && pieChartRef.current && barChartRef.current) {
      // Initialize Line Chart
      const lineChart = window.echarts.init(lineChartRef.current);
      const lineChartOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Organic', 'Paid', 'Email'],
          bottom: 0,
          textStyle: {
            fontSize: 10
          },
          itemWidth: 12,
          itemHeight: 8
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          axisLabel: {
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10
          }
        },
        series: [
          {
            name: 'Organic',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              width: 2.5
            },
            itemStyle: {
              color: '#4f46e5'
            }
          },
          {
            name: 'Paid',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            lineStyle: {
              width: 2.5
            },
            itemStyle: {
              color: '#f43f5e'
            }
          },
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
            smooth: true,
            lineStyle: {
              width: 2.5
            },
            itemStyle: {
              color: '#10b981'
            }
          }
        ]
      };
      lineChart.setOption(lineChartOption);

      // Initialize Pie Chart
      const pieChart = window.echarts.init(pieChartRef.current);
      const pieChartOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          textStyle: {
            fontSize: 10
          },
          itemWidth: 12,
          itemHeight: 8,
          data: ['Electronics', 'Apparel', 'Food', 'Furniture', 'Other']
        },
        series: [
          {
            name: 'Sales',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '11',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Electronics', itemStyle: { color: '#4f46e5' } },
              { value: 735, name: 'Apparel', itemStyle: { color: '#f43f5e' } },
              { value: 580, name: 'Food', itemStyle: { color: '#10b981' } },
              { value: 484, name: 'Furniture', itemStyle: { color: '#f59e0b' } },
              { value: 300, name: 'Other', itemStyle: { color: '#6366f1' } }
            ]
          }
        ]
      };
      pieChart.setOption(pieChartOption);

      // Initialize Bar Chart
      const barChart = window.echarts.init(barChartRef.current);
      const barChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '8%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Landing', 'Products', 'Cart', 'Checkout', 'Thank You'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              fontSize: 10,
              interval: 0,
              rotate: 15
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              fontSize: 10
            }
          }
        ],
        series: [
          {
            name: 'Conversion',
            type: 'bar',
            barWidth: '60%',
            data: [
              { value: 100, itemStyle: { color: '#4f46e5' } },
              { value: 68, itemStyle: { color: '#4361ee' } },
              { value: 45, itemStyle: { color: '#3a0ca3' } },
              { value: 32, itemStyle: { color: '#3f37c9' } },
              { value: 28, itemStyle: { color: '#5e60ce' } }
            ]
          }
        ]
      };
      barChart.setOption(barChartOption);

      // Handle window resize
      const handleResize = () => {
        lineChart.resize();
        pieChart.resize();
        barChart.resize();
      };

      window.addEventListener('resize', handleResize);
      
      // Trigger resize to properly fit containers
      setTimeout(() => {
        handleResize();
      }, 200);

      return () => {
        window.removeEventListener('resize', handleResize);
        lineChart.dispose();
        pieChart.dispose();
        barChart.dispose();
      };
    }
  }, []);

  const handleSaveDashboard = () => {
    // In a real implementation, this would save the dashboard configuration
    alert('Dashboard saved successfully!');
    setLocation('/dashboards');
  };

  const increaseZoom = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const decreaseZoom = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-white text-gray-800">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <div className="text-lg font-semibold">
            <input 
              type="text" 
              value={dashboardTitle} 
              onChange={(e) => setDashboardTitle(e.target.value)}
              className="border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 p-1 rounded"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
              <i className="ri-eye-line"></i>
              Preview
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
              <i className="ri-share-line"></i>
              Share
            </button>
            <button 
              onClick={handleSaveDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary/90 whitespace-nowrap"
            >
              <i className="ri-save-line"></i>
              Save
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Components Panel */}
          <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search components" 
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border-none rounded component-search text-sm"
                />
                <div className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* Data Sources Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-gray-700">Data Sources</h3>
                  <button className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700">
                    <i className="ri-arrow-up-s-line"></i>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DraggableItem id="table" type={ItemTypes.TABLE} name="Table" icon="ri-table-line" />
                  <DraggableItem id="database" type={ItemTypes.TABLE} name="Database" icon="ri-database-2-line" />
                  <DraggableItem id="excel" type={ItemTypes.TABLE} name="Excel" icon="ri-file-excel-2-line" />
                  <DraggableItem id="api" type={ItemTypes.TABLE} name="API" icon="ri-api-line" />
                </div>
              </div>

              {/* Charts Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-gray-700">Charts</h3>
                  <button className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700">
                    <i className="ri-arrow-up-s-line"></i>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DraggableItem id="bar-chart" type={ItemTypes.CHART} name="Bar Chart" icon="ri-bar-chart-horizontal-line" />
                  <DraggableItem id="line-chart" type={ItemTypes.CHART} name="Line Chart" icon="ri-line-chart-line" />
                  <DraggableItem id="pie-chart" type={ItemTypes.CHART} name="Pie Chart" icon="ri-pie-chart-line" />
                  <DraggableItem id="scatter-plot" type={ItemTypes.CHART} name="Scatter Plot" icon="ri-bubble-chart-line" />
                </div>
              </div>

              {/* Filters Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-gray-700">Filters</h3>
                  <button className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700">
                    <i className="ri-arrow-up-s-line"></i>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DraggableItem id="date-range" type={ItemTypes.FILTER} name="Date Range" icon="ri-calendar-line" />
                  <DraggableItem id="dropdown" type={ItemTypes.FILTER} name="Dropdown" icon="ri-filter-3-line" />
                </div>
              </div>

              {/* Text Elements Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-gray-700">Text Elements</h3>
                  <button className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700">
                    <i className="ri-arrow-up-s-line"></i>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DraggableItem id="heading" type={ItemTypes.TEXT} name="Heading" icon="ri-heading-line" />
                  <DraggableItem id="paragraph" type={ItemTypes.TEXT} name="Paragraph" icon="ri-text-line" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
                  <i className="ri-layout-grid-line"></i>
                  Grid
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
                  <i className="ri-align-center"></i>
                  Align
                </button>
                <div className="h-5 border-r border-gray-300 mx-1"></div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
                  <i className="ri-arrow-go-back-line"></i>
                  Undo
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
                  <i className="ri-arrow-go-forward-line"></i>
                  Redo
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Zoom:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={decreaseZoom}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-button text-sm hover:bg-gray-50 whitespace-nowrap"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="text-sm font-medium">{zoomLevel}%</span>
                  <button 
                    onClick={increaseZoom}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-button text-sm hover:bg-gray-50 whitespace-nowrap"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div 
                className="canvas-grid min-h-[800px] bg-white rounded-lg shadow-md p-6 relative"
                style={{transform: `scale(${zoomLevel/100})`, transformOrigin: 'top left'}}
              >
                <div className="grid grid-cols-12 gap-6 h-full">
                  {/* Header Section */}
                  <div className="col-span-12 mb-4">
                    <DropZone 
                      id="header-zone"
                      accept={[ItemTypes.TEXT]}
                      onDrop={(item) => handleDrop(item, 'header-zone')}
                      className="rounded-lg flex items-center justify-center h-16 border-2 border-dashed border-gray-200"
                      emptyContent={<span className="text-gray-400 text-sm">Drag and drop header elements here</span>}
                    />
                  </div>

                  {/* First Row */}
                  <div className="col-span-3">
                    <DropZone 
                      id="filter-zone"
                      accept={[ItemTypes.FILTER]}
                      onDrop={(item) => handleDrop(item, 'filter-zone')}
                      isActive={true}
                      className="rounded-lg h-64 border-2 border-dashed border-gray-200"
                    >
                      {/* Date Range Filter Component */}
                      <div className="widget-container">
                        <div className="widget-header">
                          <h3 className="widget-title">Date Filter</h3>
                          <div className="widget-controls">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-more-2-fill text-sm"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <DateRangePicker />
                        </div>
                      </div>
                    </DropZone>
                  </div>

                  <div className="col-span-9">
                    <DropZone 
                      id="chart-zone-1"
                      accept={[ItemTypes.CHART]}
                      onDrop={(item) => handleDrop(item, 'chart-zone-1')}
                      isActive={true}
                      className="rounded-lg h-64 border-2 border-dashed border-gray-200"
                    >
                      {/* Chart Widget */}
                      <div className="widget-container">
                        <div className="widget-header">
                          <h3 className="widget-title">Traffic Sources</h3>
                          <div className="widget-controls">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-settings-3-line text-sm"></i>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-more-2-fill text-sm"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div ref={lineChartRef} className="chart-container"></div>
                        </div>
                      </div>
                    </DropZone>
                  </div>

                  {/* Second Row */}
                  <div className="col-span-6">
                    <DropZone 
                      id="chart-zone-2"
                      accept={[ItemTypes.CHART]}
                      onDrop={(item) => handleDrop(item, 'chart-zone-2')}
                      isActive={true}
                      className="rounded-lg h-64 border-2 border-dashed border-gray-200"
                    >
                      {/* Chart Widget */}
                      <div className="widget-container">
                        <div className="widget-header">
                          <h3 className="widget-title">Product Categories</h3>
                          <div className="widget-controls">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-settings-3-line text-sm"></i>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-more-2-fill text-sm"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div ref={pieChartRef} className="chart-container"></div>
                        </div>
                      </div>
                    </DropZone>
                  </div>

                  <div className="col-span-6">
                    <DropZone 
                      id="chart-zone-3"
                      accept={[ItemTypes.CHART]}
                      onDrop={(item) => handleDrop(item, 'chart-zone-3')}
                      isActive={true}
                      className="rounded-lg h-64 border-2 border-dashed border-gray-200"
                    >
                      {/* Chart Widget */}
                      <div className="widget-container">
                        <div className="widget-header">
                          <h3 className="widget-title">Conversion Funnel</h3>
                          <div className="widget-controls">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-settings-3-line text-sm"></i>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-more-2-fill text-sm"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div ref={barChartRef} className="chart-container"></div>
                        </div>
                      </div>
                    </DropZone>
                  </div>

                  {/* Third Row */}
                  <div className="col-span-12">
                    <DropZone 
                      id="table-zone"
                      accept={[ItemTypes.TABLE]}
                      onDrop={(item) => handleDrop(item, 'table-zone')}
                      isActive={true}
                      className="rounded-lg h-64 border-2 border-dashed border-gray-200"
                    >
                      {/* Table Container */}
                      <div className="widget-container">
                        <div className="widget-header">
                          <h3 className="widget-title">Top Products</h3>
                          <div className="widget-controls">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-filter-3-line text-sm"></i>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-download-line text-sm"></i>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                              <i className="ri-more-2-fill text-sm"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="h-full overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                <tr className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap">Premium Analytics Suite</td>
                                  <td className="px-4 py-3 whitespace-nowrap">Software</td>
                                  <td className="px-4 py-3 whitespace-nowrap">1,245</td>
                                  <td className="px-4 py-3 whitespace-nowrap">$124,500</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-green-600">+12.4%</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap">Enterprise Dashboard</td>
                                  <td className="px-4 py-3 whitespace-nowrap">Software</td>
                                  <td className="px-4 py-3 whitespace-nowrap">876</td>
                                  <td className="px-4 py-3 whitespace-nowrap">$87,600</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-green-600">+8.7%</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap">Data Visualization Pro</td>
                                  <td className="px-4 py-3 whitespace-nowrap">Tools</td>
                                  <td className="px-4 py-3 whitespace-nowrap">654</td>
                                  <td className="px-4 py-3 whitespace-nowrap">$65,400</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-red-600">-2.3%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </DropZone>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties Panel */}
          <div className="w-72 border-l border-gray-200 bg-white flex flex-col">
            <div className="p-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Properties</h2>
            </div>

            <div className="flex px-3 border-b border-gray-200">
              <button 
                className={`tab-button ${activeTab === 'data' ? 'active' : ''} px-3 py-2 text-sm font-medium ${activeTab === 'data' ? 'text-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('data')}
              >
                Data
              </button>
              <button 
                className={`tab-button ${activeTab === 'style' ? 'active' : ''} px-3 py-2 text-sm font-medium ${activeTab === 'style' ? 'text-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('style')}
              >
                Style
              </button>
              <button 
                className={`tab-button ${activeTab === 'interactions' ? 'active' : ''} px-3 py-2 text-sm font-medium ${activeTab === 'interactions' ? 'text-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('interactions')}
              >
                Interactions
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {activeTab === 'data' && (
                <div className="space-y-4">
                  {/* Data Source Section */}
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Data Source</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">sales_data</span>
                        <button className="text-xs text-primary">Change</button>
                      </div>
                      <div className="text-xs text-gray-500">
                        Last updated: 2025-04-11 09:45 AM
                      </div>
                    </div>
                  </div>

                  {/* Data Mapping Section */}
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Data Mapping</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">X-Axis</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>date</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Y-Axis</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>revenue</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Series</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>channel</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Formatting Section */}
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Data Formatting</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Number Format</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>Currency ($)</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Decimal Places</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>2</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'style' && (
                <div className="space-y-4">
                  {/* Chart Appearance Section */}
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Chart Appearance</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Chart Type</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>Line Chart</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Color Scheme</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>Primary</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Show Grid Lines</label>
                        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            defaultChecked
                          />
                          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-primary"></span>
                          <span className="absolute inset-y-0 start-0 block size-4 rounded-full bg-white transition-all peer-checked:start-4"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'interactions' && (
                <div className="space-y-4">
                  {/* Interactivity Section */}
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Interactivity</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Enable Tooltips</label>
                        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            defaultChecked
                          />
                          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-primary"></span>
                          <span className="absolute inset-y-0 start-0 block size-4 rounded-full bg-white transition-all peer-checked:start-4"></span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Enable Zooming</label>
                        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            defaultChecked
                          />
                          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-primary"></span>
                          <span className="absolute inset-y-0 start-0 block size-4 rounded-full bg-white transition-all peer-checked:start-4"></span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Click Action</label>
                        <div className="relative">
                          <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                            <span>Show Details</span>
                            <i className="ri-arrow-down-s-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateDashboard;

// Declare global type for window to include echarts
declare global {
  interface Window {
    echarts: any;
  }
}