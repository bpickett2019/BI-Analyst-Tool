import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import '../styles/createDashboard.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem, DropZone, ItemTypes } from '../components/DragAndDrop';

const CreateDashboard: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [dashboardTitle] = useState('Build Your Own Dashboard');
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
    // Initialize Charts
    if (window.echarts && lineChartRef.current && pieChartRef.current && barChartRef.current) {
      // Line Chart
      const lineChart = window.echarts.init(lineChartRef.current, null, { renderer: 'canvas' });
      const lineOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "#e2e8f0",
          textStyle: {
            color: "#1f2937",
          },
        },
        legend: {
          data: ["Direct", "Organic", "Social"],
          bottom: 0,
          textStyle: {
            color: "#1f2937",
          },
        },
        grid: {
          top: 10,
          right: 10,
          bottom: 30,
          left: 40,
        },
        xAxis: {
          type: "category",
          data: [
            "Mar 12",
            "Mar 13",
            "Mar 14",
            "Mar 15",
            "Mar 16",
            "Mar 17",
            "Mar 18",
          ],
          axisLine: {
            lineStyle: {
              color: "#e2e8f0",
            },
          },
          axisLabel: {
            color: "#1f2937",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#1f2937",
          },
          splitLine: {
            lineStyle: {
              color: "#f1f5f9",
            },
          },
        },
        series: [
          {
            name: "Direct",
            type: "line",
            smooth: true,
            data: [12450, 13280, 14560, 13890, 15670, 16780, 17890],
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "rgba(87, 181, 231, 1)",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(87, 181, 231, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(87, 181, 231, 0.01)",
                  },
                ],
              },
            },
          },
          {
            name: "Organic",
            type: "line",
            smooth: true,
            data: [8320, 9450, 10230, 9870, 11240, 12340, 13450],
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "rgba(141, 211, 199, 1)",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(141, 211, 199, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(141, 211, 199, 0.01)",
                  },
                ],
              },
            },
          },
          {
            name: "Social",
            type: "line",
            smooth: true,
            data: [5670, 6780, 7340, 6890, 8120, 9230, 9870],
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "rgba(251, 191, 114, 1)",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(251, 191, 114, 0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(251, 191, 114, 0.01)",
                  },
                ],
              },
            },
          },
        ],
      };
      lineChart.setOption(lineOption);

      // Pie Chart
      const pieChart = window.echarts.init(pieChartRef.current, null, { renderer: 'canvas' });
      const pieOption = {
        animation: false,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "#e2e8f0",
          textStyle: {
            color: "#1f2937",
          },
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
          textStyle: {
            color: "#1f2937",
          },
        },
        series: [
          {
            name: "Sales by Category",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 42, name: "Software" },
              { value: 28, name: "Services" },
              { value: 18, name: "Tools" },
              { value: 12, name: "Hardware" },
            ],
            color: [
              "rgba(87, 181, 231, 1)",
              "rgba(141, 211, 199, 1)",
              "rgba(251, 191, 114, 1)",
              "rgba(252, 141, 98, 1)",
            ],
          },
        ],
      };
      pieChart.setOption(pieOption);

      // Bar Chart
      const barChart = window.echarts.init(barChartRef.current, null, { renderer: 'canvas' });
      const barOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "#e2e8f0",
          textStyle: {
            color: "#1f2937",
          },
        },
        grid: {
          top: 10,
          right: 10,
          bottom: 30,
          left: 40,
        },
        xAxis: {
          type: "category",
          data: ["Direct", "Organic", "Social", "Email", "Referral"],
          axisLine: {
            lineStyle: {
              color: "#e2e8f0",
            },
          },
          axisLabel: {
            color: "#1f2937",
            interval: 0,
            rotate: 30,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#1f2937",
            formatter: "{value}%",
          },
          splitLine: {
            lineStyle: {
              color: "#f1f5f9",
            },
          },
        },
        series: [
          {
            data: [4.2, 3.8, 2.7, 3.5, 2.9],
            type: "bar",
            barWidth: "40%",
            itemStyle: {
              color: "rgba(87, 181, 231, 1)",
              borderRadius: [4, 4, 0, 0],
            },
          },
        ],
      };
      barChart.setOption(barOption);

      // Handle window resize
      const handleResize = () => {
        lineChart.resize();
        pieChart.resize();
        barChart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        lineChart.dispose();
        pieChart.dispose();
        barChart.dispose();
      };
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <div className="flex items-center">
            <div className="text-2xl font-['Pacifico'] text-primary mr-8">logo</div>
          </div>

          <div className="text-lg font-semibold">{dashboardTitle}</div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
              <i className="ri-eye-line"></i>
              Preview
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-button text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
              <i className="ri-share-line"></i>
              Share
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary/90 whitespace-nowrap">
              <i className="ri-save-line"></i>
              Save
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
              <span className="text-sm font-medium">JD</span>
            </div>
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
                  <DraggableItem id="database" type={ItemTypes.CHART} name="Database" icon="ri-database-2-line" />
                  <DraggableItem id="excel" type={ItemTypes.CHART} name="Excel" icon="ri-file-excel-2-line" />
                  <DraggableItem id="api" type={ItemTypes.CHART} name="API" icon="ri-api-line" />
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
                  <DraggableItem id="donut-chart" type={ItemTypes.CHART} name="Donut Chart" icon="ri-donut-chart-line" />
                  <DraggableItem id="radar-chart" type={ItemTypes.CHART} name="Radar Chart" icon="ri-radar-line" />
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
                  <DraggableItem id="search" type={ItemTypes.FILTER} name="Search" icon="ri-search-line" />
                  <DraggableItem id="multi-select" type={ItemTypes.FILTER} name="Multi-select" icon="ri-checkbox-multiple-line" />
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
                  <DraggableItem id="number" type={ItemTypes.TEXT} name="Number" icon="ri-number-line" />
                  <DraggableItem id="list" type={ItemTypes.TEXT} name="List" icon="ri-list-check-2" />
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
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-button text-sm hover:bg-gray-50 whitespace-nowrap"
                    onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="text-sm font-medium">{zoomLevel}%</span>
                  <button 
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-button text-sm hover:bg-gray-50 whitespace-nowrap"
                    onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div 
                className="canvas-grid min-h-[800px] bg-white rounded-lg shadow-sm p-6 relative"
                style={{transform: `scale(${zoomLevel/100})`, transformOrigin: 'top left'}}
              >
                <div className="grid grid-cols-12 gap-5 h-full">
                  {/* Header Section */}
                  <div className="col-span-12 mb-4">
                    <DropZone 
                      id="header-zone"
                      accept={[ItemTypes.TEXT]}
                      onDrop={(item) => handleDrop(item, 'header-zone')}
                      className="drop-zone p-4 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center h-16"
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
                      className="drop-zone active p-4 rounded-lg flex flex-col h-64"
                    >
                      {/* Dropped Filter Component */}
                      <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                        <h3 className="text-sm font-medium mb-3">
                          Date Range Filter
                        </h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Time Period</span>
                            <div className="relative">
                              <button className="flex items-center gap-1 text-xs font-medium text-gray-700 px-2 py-1 border border-gray-200 rounded-button">
                                Last 30 Days
                                <i className="ri-arrow-down-s-line"></i>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">From</span>
                              <div className="relative">
                                <input
                                  type="text"
                                  defaultValue="2025-03-12"
                                  className="text-xs border border-gray-200 rounded px-2 py-1 w-28"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">To</span>
                              <div className="relative">
                                <input
                                  type="text"
                                  defaultValue="2025-04-11"
                                  className="text-xs border border-gray-200 rounded px-2 py-1 w-28"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">Compare to</span>
                            <label className="custom-switch">
                              <input type="checkbox" defaultChecked />
                              <span className="switch-slider"></span>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Previous period</span>
                            <label className="custom-radio flex items-center gap-1.5">
                              <input type="radio" name="compare" defaultChecked />
                              <span className="radio-mark"></span>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Same period last year</span>
                            <label className="custom-radio flex items-center gap-1.5">
                              <input type="radio" name="compare" />
                              <span className="radio-mark"></span>
                            </label>
                          </div>
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
                      className="drop-zone active p-4 rounded-lg h-64"
                    >
                      {/* Dropped Chart Component */}
                      <div className="widget-container">
                        <div className="flex items-center justify-between px-4 pt-4 pb-2">
                          <h3 className="text-sm font-medium">Revenue Trends</h3>
                          <div className="flex items-center gap-2">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                              <i className="ri-more-line"></i>
                            </button>
                          </div>
                        </div>
                        <div id="lineChart" ref={lineChartRef} className="chart-container px-2 pb-2 flex-1"></div>
                      </div>
                    </DropZone>
                  </div>

                  {/* Second Row */}
                  <div className="col-span-4">
                    <DropZone 
                      id="chart-zone-2"
                      accept={[ItemTypes.CHART]}
                      onDrop={(item) => handleDrop(item, 'chart-zone-2')}
                      isActive={true}
                      className="drop-zone active p-4 rounded-lg h-64"
                    >
                      {/* Dropped Chart Component */}
                      <div className="widget-container">
                        <div className="flex items-center justify-between px-4 pt-4 pb-2">
                          <h3 className="text-sm font-medium">Sales by Category</h3>
                          <div className="flex items-center gap-2">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                              <i className="ri-more-line"></i>
                            </button>
                          </div>
                        </div>
                        <div id="pieChart" ref={pieChartRef} className="chart-container px-2 pb-2 flex-1"></div>
                      </div>
                    </DropZone>
                  </div>

                  <div className="col-span-4">
                    <DropZone 
                      id="chart-zone-empty"
                      accept={[ItemTypes.CHART]}
                      onDrop={(item) => handleDrop(item, 'chart-zone-empty')}
                      className="drop-zone p-4 rounded-lg h-64"
                    >
                      {/* Empty Drop Zone */}
                      <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-lg">
                        <span className="text-gray-400 text-sm">Drag a component here</span>
                      </div>
                    </DropZone>
                  </div>

                  <div className="col-span-4">
                    <DropZone 
                      id="chart-zone-3"
                      accept={[ItemTypes.CHART]}
                      onDrop={(item) => handleDrop(item, 'chart-zone-3')}
                      isActive={true}
                      className="drop-zone active p-4 rounded-lg h-64"
                    >
                      {/* Dropped Chart Component */}
                      <div className="widget-container">
                        <div className="flex items-center justify-between px-4 pt-4 pb-2">
                          <h3 className="text-sm font-medium">Conversion Rates</h3>
                          <div className="flex items-center gap-2">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                              <i className="ri-more-line"></i>
                            </button>
                          </div>
                        </div>
                        <div id="barChart" ref={barChartRef} className="chart-container px-2 pb-2 flex-1"></div>
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
                      className="drop-zone active p-4 rounded-lg h-64"
                    >
                      {/* Dropped Table Component */}
                      <div className="widget-container">
                        <div className="flex items-center justify-between px-4 pt-4 pb-2">
                          <h3 className="text-sm font-medium">Top Products</h3>
                          <div className="flex items-center gap-2">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                              <i className="ri-more-line"></i>
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto px-4 pb-2 flex-1">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Product
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Category
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Sales
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Revenue
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Growth
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                              <tr>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Premium Analytics Suite
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Software
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">1,245</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  $124,500
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-green-600">
                                  +12.4%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Enterprise Dashboard
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Software
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">876</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  $87,600
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-green-600">
                                  +8.7%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Data Visualization Pro
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">Tools</td>
                                <td className="px-3 py-2 whitespace-nowrap">654</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  $65,400
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-red-600">
                                  -2.3%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Business Intelligence Package
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  Services
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">532</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  $53,200
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-green-600">
                                  +5.8%
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                className={`tab-button active px-3 py-2 text-sm font-medium ${activeTab === 'data' ? 'text-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('data')}
              >
                Data
              </button>
              <button
                className={`tab-button px-3 py-2 text-sm font-medium ${activeTab === 'style' ? 'text-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('style')}
              >
                Style
              </button>
              <button
                className={`tab-button px-3 py-2 text-sm font-medium ${activeTab === 'interactions' ? 'text-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('interactions')}
              >
                Interactions
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-4">
                {/* Data Source Section */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Data Source
                  </h3>
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
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Data Mapping
                  </h3>
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
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Data Formatting
                  </h3>
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
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Date Format</label>
                      <div className="relative">
                        <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                          <span>MMM DD, YYYY</span>
                          <i className="ri-arrow-down-s-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Options Section */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Chart Options
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show Legend</span>
                      <label className="custom-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show Tooltip</span>
                      <label className="custom-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Smooth Line</span>
                      <label className="custom-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Area Fill</span>
                      <label className="custom-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Stack Type</label>
                      <div className="relative">
                        <button className="w-full flex items-center justify-between text-sm px-3 py-1.5 border border-gray-200 rounded bg-white">
                          <span>None</span>
                          <i className="ri-arrow-down-s-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="h-48 border-t border-gray-200 bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <h3 className="font-medium text-sm">Data Preview</h3>
              <div className="flex items-center gap-2 px-1 py-1 bg-gray-100 rounded-full">
                <button className="px-2 py-0.5 text-xs font-medium bg-white rounded-full shadow-sm">
                  Table
                </button>
                <button className="px-2 py-0.5 text-xs font-medium text-gray-600">
                  JSON
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs text-primary font-medium">
                <i className="ri-refresh-line"></i>
                Refresh
              </button>
              <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700">
                <i className="ri-arrow-down-s-line"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customers
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Order Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <tr>
                  <td className="px-3 py-1.5 whitespace-nowrap">Mar 12, 2025</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">Direct</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$12,450</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">145</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">132</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$85.86</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 whitespace-nowrap">Mar 12, 2025</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">Organic</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$8,320</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">98</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">85</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$84.90</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 whitespace-nowrap">Mar 12, 2025</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">Social</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$5,670</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">64</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">58</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$88.59</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 whitespace-nowrap">Mar 13, 2025</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">Direct</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$13,280</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">156</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">142</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$85.13</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 whitespace-nowrap">Mar 13, 2025</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">Organic</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$9,450</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">112</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">98</td>
                  <td className="px-3 py-1.5 whitespace-nowrap">$84.38</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateDashboard;