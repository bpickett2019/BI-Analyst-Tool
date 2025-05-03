import React, { useEffect, useState, useRef } from 'react';

interface ModelField {
  name: string;
  type: string;
  constraints?: string[];
}

interface ModelRelationship {
  name: string;
  relatedModel: string;
  type: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  fields: number;
  relationships: number;
  lastModified: string;
  status: 'Active' | 'Draft' | 'Archived';
}

// Define window with echarts
declare global {
  interface Window {
    echarts: any;
  }
}

const DataModels: React.FC = () => {
  const [showModelDetails, setShowModelDetails] = useState<boolean>(false);
  const [showCreateModel, setShowCreateModel] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<Model | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Schema');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const relationshipDiagramRef = useRef<HTMLDivElement>(null);
  
  // Sample model data
  const models: Model[] = [
    {
      id: '1',
      name: 'Users',
      description: 'User accounts and authentication data',
      icon: 'ri-table-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      fields: 12,
      relationships: 4,
      lastModified: 'April 10, 2025',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Orders',
      description: 'Customer order and transaction data',
      icon: 'ri-shopping-cart-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      fields: 15,
      relationships: 3,
      lastModified: 'April 9, 2025',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Products',
      description: 'Product catalog and inventory data',
      icon: 'ri-price-tag-3-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      fields: 18,
      relationships: 2,
      lastModified: 'April 8, 2025',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Categories',
      description: 'Product categories and hierarchies',
      icon: 'ri-folder-line',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      fields: 6,
      relationships: 1,
      lastModified: 'April 7, 2025',
      status: 'Active'
    },
    {
      id: '5',
      name: 'Shipments',
      description: 'Shipping and delivery information',
      icon: 'ri-truck-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      fields: 10,
      relationships: 2,
      lastModified: 'April 6, 2025',
      status: 'Active'
    },
    {
      id: '6',
      name: 'Payments',
      description: 'Payment transactions and methods',
      icon: 'ri-money-dollar-circle-line',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      fields: 14,
      relationships: 2,
      lastModified: 'April 5, 2025',
      status: 'Active'
    },
    {
      id: '7',
      name: 'Support Tickets',
      description: 'Customer support and issue tracking',
      icon: 'ri-customer-service-line',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      fields: 16,
      relationships: 3,
      lastModified: 'April 4, 2025',
      status: 'Active'
    },
    {
      id: '8',
      name: 'Addresses',
      description: 'Customer and shipping addresses',
      icon: 'ri-map-pin-line',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      fields: 9,
      relationships: 2,
      lastModified: 'April 3, 2025',
      status: 'Draft'
    }
  ];

  // Sample fields
  const fields: ModelField[] = [
    { name: 'id', type: 'UUID', constraints: ['Primary Key'] },
    { name: 'email', type: 'VARCHAR(255)', constraints: ['Unique'] },
    { name: 'username', type: 'VARCHAR(100)', constraints: ['Unique'] },
    { name: 'password_hash', type: 'VARCHAR(255)', constraints: ['Not Null'] },
    { name: 'first_name', type: 'VARCHAR(100)' },
    { name: 'last_name', type: 'VARCHAR(100)' }
  ];

  // Sample relationships
  const relationships: ModelRelationship[] = [
    { name: 'orders', relatedModel: 'Orders', type: 'One-to-Many' },
    { name: 'addresses', relatedModel: 'Addresses', type: 'One-to-Many' },
    { name: 'support_tickets', relatedModel: 'Support Tickets', type: 'One-to-Many' },
    { name: 'payments', relatedModel: 'Payments', type: 'One-to-Many' }
  ];

  const initializeRelationshipDiagram = () => {
    if (window.echarts && relationshipDiagramRef.current) {
      const chart = window.echarts.init(relationshipDiagramRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          padding: 10,
          textStyle: {
            color: '#1f2937'
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [0, 8],
            edgeLabel: {
              fontSize: 12
            },
            data: [
              {
                name: 'Users',
                x: 100,
                y: 100,
                itemStyle: {
                  color: 'rgba(87, 181, 231, 1)'
                },
                symbolSize: 50
              },
              {
                name: 'Orders',
                x: 200,
                y: 50,
                itemStyle: {
                  color: 'rgba(141, 211, 199, 1)'
                },
                symbolSize: 50
              },
              {
                name: 'Addresses',
                x: 200,
                y: 150,
                itemStyle: {
                  color: 'rgba(141, 211, 199, 1)'
                },
                symbolSize: 50
              },
              {
                name: 'Support Tickets',
                x: 300,
                y: 100,
                itemStyle: {
                  color: 'rgba(251, 191, 114, 1)'
                },
                symbolSize: 50
              },
              {
                name: 'Payments',
                x: 300,
                y: 200,
                itemStyle: {
                  color: 'rgba(252, 141, 98, 1)'
                },
                symbolSize: 50
              }
            ],
            links: [
              {
                source: 'Users',
                target: 'Orders',
                label: {
                  show: true,
                  formatter: '1:N'
                },
                lineStyle: {
                  color: 'rgba(87, 181, 231, 0.8)',
                  width: 2
                }
              },
              {
                source: 'Users',
                target: 'Addresses',
                label: {
                  show: true,
                  formatter: '1:N'
                },
                lineStyle: {
                  color: 'rgba(87, 181, 231, 0.8)',
                  width: 2
                }
              },
              {
                source: 'Users',
                target: 'Support Tickets',
                label: {
                  show: true,
                  formatter: '1:N'
                },
                lineStyle: {
                  color: 'rgba(87, 181, 231, 0.8)',
                  width: 2
                }
              },
              {
                source: 'Users',
                target: 'Payments',
                label: {
                  show: true,
                  formatter: '1:N'
                },
                lineStyle: {
                  color: 'rgba(87, 181, 231, 0.8)',
                  width: 2
                }
              }
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      };
      
      chart.setOption(option);
      
      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
  };

  const handleModelClick = (model: Model) => {
    setActiveModel(model);
    setShowModelDetails(true);
  };

  const handleCloseModelDetails = () => {
    setShowModelDetails(false);
  };

  const handleShowCreateModel = () => {
    setShowCreateModel(true);
  };

  const handleCloseCreateModel = () => {
    setShowCreateModel(false);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleAddField = () => {
    showToast('success', 'New field added successfully');
  };

  const handleAddRelationship = () => {
    showToast('success', 'New relationship added successfully');
  };

  const handleSaveChanges = () => {
    showToast('success', 'Changes saved successfully');
    setTimeout(() => {
      handleCloseModelDetails();
    }, 1500);
  };

  const handleCreateModel = () => {
    showToast('success', 'New model created successfully');
    setTimeout(() => {
      handleCloseCreateModel();
    }, 1500);
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToastType(type);
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  useEffect(() => {
    // Initialize diagram when model details sidebar is shown
    if (showModelDetails) {
      setTimeout(() => {
        initializeRelationshipDiagram();
      }, 100);
    }
  }, [showModelDetails, selectedTab]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Data Models</h1>
            <p className="text-sm text-gray-500">Manage your database schemas and relationships</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-search-line"></i>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Search models..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-64" 
              />
            </div>
            <div className="flex items-center bg-gray-100 rounded-button p-1">
              <button className="px-3 py-1 rounded-button bg-white shadow-sm text-gray-700 text-sm whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-layout-grid-line"></i>
                  </div>
                  <span>Grid</span>
                </div>
              </button>
              <button className="px-3 py-1 text-gray-500 text-sm whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-list-check"></i>
                  </div>
                  <span>List</span>
                </div>
              </button>
            </div>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-button flex items-center text-sm font-medium whitespace-nowrap"
              onClick={handleShowCreateModel}
            >
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-add-line"></i>
              </div>
              Create New Model
            </button>
          </div>
        </div>
        <div className="flex items-center mt-4 border-b border-gray-200">
          <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium text-sm">All Models</button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm">Recently Modified</button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm">Favorites</button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm">Shared with Me</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>12 models</span>
            <span>•</span>
            <div className="flex items-center">
              <span>Sort by:</span>
              <button className="ml-1 flex items-center font-medium text-gray-700">
                Last modified
                <div className="w-4 h-4 flex items-center justify-center ml-1">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-upload-2-line"></i>
              </div>
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-download-2-line"></i>
              </div>
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-more-2-fill"></i>
              </div>
            </button>
          </div>
        </div>

        {/* Grid of Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <div 
              key={model.id}
              className="model-card bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              onClick={() => handleModelClick(model)}
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg ${model.iconBg} flex items-center justify-center ${model.iconColor}`}>
                    <i className={model.icon}></i>
                  </div>
                  <h3 className="ml-2 font-medium text-gray-800">{model.name}</h3>
                </div>
                <div className="hover-actions opacity-0 transition-opacity duration-200">
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast('success', 'Model actions menu opened');
                    }}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-more-2-fill"></i>
                    </div>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-database-2-line"></i>
                    </div>
                    <span>{model.fields} fields</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-link"></i>
                    </div>
                    <span>{model.relationships} relationships</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Last modified: {model.lastModified}</span>
                  <span className={`px-2 py-1 ${
                    model.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    model.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  } rounded-full`}>{model.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-8 of 12 models
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </main>

      {/* Model Details Sidebar */}
      {showModelDetails && (
        <div className="fixed inset-0 z-10 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
            onClick={handleCloseModelDetails}
          ></div>
          <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-xl transform transition-transform">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{activeModel?.name}</h2>
                  <p className="text-sm text-gray-500">{activeModel?.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                    onClick={() => showToast('success', 'Edit mode activated')}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-edit-line"></i>
                    </div>
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100" 
                    onClick={handleCloseModelDetails}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-close-line"></i>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="px-6 py-2 border-b border-gray-200">
                <div className="flex space-x-4">
                  <button 
                    className={`px-1 py-2 ${selectedTab === 'Schema' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'} text-sm`}
                    onClick={() => handleTabClick('Schema')}
                  >
                    Schema
                  </button>
                  <button 
                    className={`px-1 py-2 ${selectedTab === 'Relationships' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'} text-sm`}
                    onClick={() => handleTabClick('Relationships')}
                  >
                    Relationships
                  </button>
                  <button 
                    className={`px-1 py-2 ${selectedTab === 'Metadata' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'} text-sm`}
                    onClick={() => handleTabClick('Metadata')}
                  >
                    Metadata
                  </button>
                  <button 
                    className={`px-1 py-2 ${selectedTab === 'History' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'} text-sm`}
                    onClick={() => handleTabClick('History')}
                  >
                    History
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {selectedTab === 'Schema' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Fields</h3>
                      <button 
                        className="text-xs text-primary font-medium"
                        onClick={handleAddField}
                      >
                        + Add Field
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Constraints</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {fields.map((field, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{field.name}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{field.type}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {field.constraints && field.constraints.map((constraint, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1">{constraint}</span>
                                ))}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <button 
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={() => showToast('success', `Editing field: ${field.name}`)}
                                >
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className="ri-edit-line"></i>
                                  </div>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedTab === 'Relationships' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Relationships</h3>
                      <button 
                        className="text-xs text-primary font-medium"
                        onClick={handleAddRelationship}
                      >
                        + Add Relationship
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related Model</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {relationships.map((relationship, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{relationship.name}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{relationship.relatedModel}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{relationship.type}</span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <button 
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={() => showToast('success', `Editing relationship: ${relationship.name}`)}
                                >
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className="ri-edit-line"></i>
                                  </div>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Relationship Diagram</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 h-64 relative">
                    <div ref={relationshipDiagramRef} className="w-full h-full"></div>
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 border border-gray-200"
                        onClick={() => showToast('success', 'Zoomed in')}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-zoom-in-line"></i>
                        </div>
                      </button>
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 border border-gray-200"
                        onClick={() => showToast('success', 'Zoomed out')}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-zoom-out-line"></i>
                        </div>
                      </button>
                      <button 
                        className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 border border-gray-200"
                        onClick={() => showToast('success', 'Diagram reset')}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-refresh-line"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Created on April 1, 2025 by Emily Johnson
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1 border border-gray-300 rounded-button text-sm text-gray-600 whitespace-nowrap"
                      onClick={handleCloseModelDetails}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-3 py-1 bg-primary text-white rounded-button text-sm whitespace-nowrap"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Model Dialog */}
      {showCreateModel && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={handleCloseCreateModel}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Create New Model</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500" 
                    onClick={handleCloseCreateModel}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-close-line"></i>
                    </div>
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <label htmlFor="modelName" className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                  <input 
                    type="text" 
                    id="modelName" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="modelDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    id="modelDescription" 
                    rows={3} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model Icon</label>
                  <div className="grid grid-cols-8 gap-2">
                    <button className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-blue-200">
                      <i className="ri-table-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-database-2-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-file-list-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-user-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-shopping-cart-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-price-tag-3-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-folder-line"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <i className="ri-more-fill"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Initial Fields</label>
                    <button 
                      className="text-xs text-primary font-medium"
                      onClick={handleAddField}
                    >
                      + Add Field
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">id</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">UUID (Primary Key)</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => showToast('success', 'Field deleted')}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-delete-bin-line"></i>
                              </div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">name</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">VARCHAR(255)</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => showToast('success', 'Field deleted')}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-delete-bin-line"></i>
                              </div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">created_at</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">TIMESTAMP</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => showToast('success', 'Field deleted')}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-delete-bin-line"></i>
                              </div>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-button text-sm text-gray-700 whitespace-nowrap" 
                  onClick={handleCloseCreateModel}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-primary text-white rounded-button text-sm font-medium whitespace-nowrap"
                  onClick={handleCreateModel}
                >
                  Create Model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {isToastVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-3 rounded-lg shadow-lg flex items-center`}>
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className={toastType === 'success' ? 'ri-check-line' : 'ri-error-warning-line'}></i>
            </div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataModels;