import React, { useState, useEffect, useRef } from 'react';

const DataExplorer: React.FC = () => {
  const [activeTable, setActiveTable] = useState<string>('customers');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'id', 'name', 'email', 'region', 'status', 'created_at'
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const tables = [
    { id: 'customers', name: 'Customers', count: 1243 },
    { id: 'orders', name: 'Orders', count: 5621 },
    { id: 'products', name: 'Products', count: 354 },
    { id: 'suppliers', name: 'Suppliers', count: 87 },
  ];

  const allColumns = [
    { id: 'id', name: 'ID', type: 'integer' },
    { id: 'name', name: 'Name', type: 'varchar' },
    { id: 'email', name: 'Email', type: 'varchar' },
    { id: 'region', name: 'Region', type: 'varchar' },
    { id: 'status', name: 'Status', type: 'varchar' },
    { id: 'created_at', name: 'Created At', type: 'timestamp' },
    { id: 'updated_at', name: 'Updated At', type: 'timestamp' },
    { id: 'phone', name: 'Phone', type: 'varchar' },
    { id: 'address', name: 'Address', type: 'varchar' },
    { id: 'country', name: 'Country', type: 'varchar' },
    { id: 'subscription_tier', name: 'Subscription Tier', type: 'varchar' },
    { id: 'last_login', name: 'Last Login', type: 'timestamp' },
  ];

  const data = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', region: 'North', status: 'Active', created_at: '2025-01-15' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', region: 'South', status: 'Active', created_at: '2025-01-18' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', region: 'East', status: 'Inactive', created_at: '2025-01-20' },
    { id: 4, name: 'David Brown', email: 'david@example.com', region: 'West', status: 'Active', created_at: '2025-01-22' },
    { id: 5, name: 'Emily Davis', email: 'emily@example.com', region: 'North', status: 'Pending', created_at: '2025-01-25' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', region: 'South', status: 'Active', created_at: '2025-01-28' },
    { id: 7, name: 'Grace Wilson', email: 'grace@example.com', region: 'East', status: 'Active', created_at: '2025-01-30' },
    { id: 8, name: 'Henry Moore', email: 'henry@example.com', region: 'West', status: 'Inactive', created_at: '2025-02-01' },
    { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', region: 'North', status: 'Active', created_at: '2025-02-03' },
    { id: 10, name: 'Jack Anderson', email: 'jack@example.com', region: 'South', status: 'Pending', created_at: '2025-02-05' },
  ];

  const toggleColumnSelector = () => {
    setShowColumnSelector(!showColumnSelector);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleChart = () => {
    setShowChart(!showChart);
    
    // Initialize chart on first show
    if (!showChart && chartRef.current) {
      setTimeout(() => {
        if (window.echarts && chartRef.current) {
          const chart = window.echarts.init(chartRef.current);
          const option = {
            title: {
              text: 'Customers by Region',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Region',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 3, name: 'North' },
                  { value: 3, name: 'South' },
                  { value: 2, name: 'East' },
                  { value: 2, name: 'West' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          chart.setOption(option);
          
          window.addEventListener('resize', () => {
            chart.resize();
          });
        }
      }, 0);
    }
  };

  const handleTableClick = (tableId: string) => {
    setActiveTable(tableId);
  };

  const handleColumnToggle = (columnId: string) => {
    if (selectedColumns.includes(columnId)) {
      // Prevent deselecting all columns
      if (selectedColumns.length > 1) {
        setSelectedColumns(selectedColumns.filter(id => id !== columnId));
      }
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Data Analysis</span>
          <div className="w-4 h-4 flex items-center justify-center mx-1">
            <i className="ri-arrow-right-s-line"></i>
          </div>
          <span className="text-gray-900">Data Explorer</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Explorer</h1>
            <p className="text-gray-500 mt-1">
              Explore and analyze your datasets interactively
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50"
                onClick={toggleColumnSelector}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-table-line"></i>
                </div>
                <span>Columns</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
              {showColumnSelector && (
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64">
                  <div className="mb-2 pb-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-700">Visible Columns</div>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {allColumns.map(column => (
                      <label key={column.id} className="flex items-center py-1 px-1 hover:bg-gray-50 rounded">
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          checked={selectedColumns.includes(column.id)}
                          onChange={() => handleColumnToggle(column.id)}
                        />
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">{column.name}</div>
                          <div className="text-xs text-gray-500">{column.type}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50"
                onClick={toggleFilters}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-filter-3-line"></i>
                </div>
                <span>Filters</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-72">
                  <div className="mb-2 pb-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-700">Filter Data</div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                        <option value="">All Regions</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
                        <option value="">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Created Date</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="border border-gray-300 rounded px-2 py-1.5 text-sm" placeholder="From" />
                        <input type="date" className="border border-gray-300 rounded px-2 py-1.5 text-sm" placeholder="To" />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-button text-sm mr-2">
                        Clear
                      </button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-button text-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50"
                onClick={toggleChart}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-pie-chart-line"></i>
                </div>
                <span>{showChart ? 'Hide Chart' : 'Show Chart'}</span>
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-download-line"></i>
                </div>
                <span>Export</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Table Browser */}
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search tables..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line"></i>
              </div>
            </div>
            <h2 className="font-medium text-gray-900">Tables</h2>
          </div>
          <div className="p-2">
            {tables.map(table => (
              <button
                key={table.id}
                className={`flex items-center justify-between w-full p-2 text-left rounded ${activeTable === table.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => handleTableClick(table.id)}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-500">
                    <i className="ri-table-line"></i>
                  </div>
                  <span className="text-sm font-medium">{table.name}</span>
                </div>
                <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">{table.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Data View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Table Info & Search */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{tables.find(t => t.id === activeTable)?.name} Table</h3>
                <p className="text-sm text-gray-500">Showing {data.length} of {tables.find(t => t.id === activeTable)?.count} records</p>
              </div>
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search in results..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Chart View (Conditional) */}
          {showChart && (
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700">Data Visualization</h3>
                <div className="flex items-center space-x-2">
                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                    <option>Pie Chart</option>
                    <option>Bar Chart</option>
                    <option>Line Chart</option>
                  </select>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                    <option>Region</option>
                    <option>Status</option>
                    <option>Created Date</option>
                  </select>
                </div>
              </div>
              <div ref={chartRef} className="h-64 w-full"></div>
            </div>
          )}

          {/* Data Table */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {allColumns
                        .filter(column => selectedColumns.includes(column.id))
                        .map(column => (
                          <th 
                            key={column.id}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {column.name}
                          </th>
                        ))
                      }
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        {selectedColumns.includes('id') && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.id}</td>
                        )}
                        {selectedColumns.includes('name') && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                        )}
                        {selectedColumns.includes('email') && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.email}</td>
                        )}
                        {selectedColumns.includes('region') && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.region}</td>
                        )}
                        {selectedColumns.includes('status') && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              row.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              row.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        )}
                        {selectedColumns.includes('created_at') && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.created_at}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                      <span className="font-medium">{tables.find(t => t.id === activeTable)?.count}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <i className="ri-arrow-left-s-line"></i>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white hover:bg-primary/90">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        125
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <i className="ri-arrow-right-s-line"></i>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;