import React, { useEffect, useState, useRef } from 'react';

const SQLMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('query-1');
  const [schemaOpen, setSchemaOpen] = useState<{ [key: string]: boolean }>({
    'postgres': true,
    'mysql': false,
    'bigquery': false
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<boolean>(false);

  const toggleSchema = (db: string) => {
    setSchemaOpen(prev => ({
      ...prev,
      [db]: !prev[db]
    }));
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleRunQuery = () => {
    setResults(true);
  };

  const handleClearQuery = () => {
    // In a real application, this would clear the editor
    setResults(false);
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
          <span className="text-gray-900">SQL Mode</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SQL Mode</h1>
            <p className="text-gray-500 mt-1">
              Write and run SQL queries directly against your data
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-save-line"></i>
                </div>
                <span>Save</span>
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-history-line"></i>
                </div>
                <span>History</span>
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-share-line"></i>
                </div>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Schema Browser */}
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">Schema Browser</h2>
          </div>
          <div className="p-2">
            <div className="mb-3">
              <button 
                className="flex items-center justify-between w-full p-2 text-left rounded hover:bg-gray-100"
                onClick={() => toggleSchema('postgres')}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 text-blue-600">
                    <i className="ri-database-2-line"></i>
                  </div>
                  <span className="text-sm font-medium">PostgreSQL</span>
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-arrow-${schemaOpen['postgres'] ? 'down' : 'right'}-s-line`}></i>
                </div>
              </button>
              {schemaOpen['postgres'] && (
                <div className="ml-7 mt-1">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                        <i className="ri-table-line"></i>
                      </div>
                      <span className="text-sm text-gray-700">customers</span>
                    </div>
                    <div className="ml-5 text-xs text-gray-500">
                      <div>id (integer)</div>
                      <div>name (varchar)</div>
                      <div>email (varchar)</div>
                      <div>created_at (timestamp)</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                        <i className="ri-table-line"></i>
                      </div>
                      <span className="text-sm text-gray-700">orders</span>
                    </div>
                    <div className="ml-5 text-xs text-gray-500">
                      <div>id (integer)</div>
                      <div>customer_id (integer)</div>
                      <div>product_id (integer)</div>
                      <div>amount (decimal)</div>
                      <div>created_at (timestamp)</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                        <i className="ri-table-line"></i>
                      </div>
                      <span className="text-sm text-gray-700">products</span>
                    </div>
                    <div className="ml-5 text-xs text-gray-500">
                      <div>id (integer)</div>
                      <div>name (varchar)</div>
                      <div>price (decimal)</div>
                      <div>stock (integer)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <button 
                className="flex items-center justify-between w-full p-2 text-left rounded hover:bg-gray-100"
                onClick={() => toggleSchema('mysql')}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 text-orange-600">
                    <i className="ri-database-2-line"></i>
                  </div>
                  <span className="text-sm font-medium">MySQL</span>
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-arrow-${schemaOpen['mysql'] ? 'down' : 'right'}-s-line`}></i>
                </div>
              </button>
              {schemaOpen['mysql'] && (
                <div className="ml-7 mt-1">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                        <i className="ri-table-line"></i>
                      </div>
                      <span className="text-sm text-gray-700">users</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                        <i className="ri-table-line"></i>
                      </div>
                      <span className="text-sm text-gray-700">posts</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <button 
                className="flex items-center justify-between w-full p-2 text-left rounded hover:bg-gray-100"
                onClick={() => toggleSchema('bigquery')}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 text-green-600">
                    <i className="ri-database-2-line"></i>
                  </div>
                  <span className="text-sm font-medium">BigQuery</span>
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-arrow-${schemaOpen['bigquery'] ? 'down' : 'right'}-s-line`}></i>
                </div>
              </button>
              {schemaOpen['bigquery'] && (
                <div className="ml-7 mt-1">
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500">
                        <i className="ri-database-2-line"></i>
                      </div>
                      <span className="text-sm text-gray-700">analytics</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main SQL Editor and Results Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Query Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              <button 
                className={`px-6 py-2 text-sm font-medium border-r border-gray-200 ${activeTab === 'query-1' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => handleTabClick('query-1')}
              >
                Query 1
              </button>
              <button 
                className={`px-6 py-2 text-sm font-medium border-r border-gray-200 ${activeTab === 'query-2' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => handleTabClick('query-2')}
              >
                Query 2
              </button>
              <button 
                className="px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-add-line"></i>
                </div>
              </button>
            </div>
          </div>

          {/* SQL Editor */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Database:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                <option>PostgreSQL</option>
                <option>MySQL</option>
                <option>BigQuery</option>
              </select>
              <div className="flex-1"></div>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-button flex items-center whitespace-nowrap shadow-sm hover:bg-primary/90 transition-colors mr-2"
                onClick={handleRunQuery}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-play-line"></i>
                </div>
                <span>Run Query</span>
              </button>
              <button 
                className="text-gray-700 border border-gray-300 px-4 py-2 rounded-button flex items-center whitespace-nowrap shadow-sm hover:bg-gray-50"
                onClick={handleClearQuery}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-delete-bin-line"></i>
                </div>
                <span>Clear</span>
              </button>
            </div>

            {/* Code editor area */}
            <div 
              ref={editorRef}
              className="border border-gray-300 rounded-lg p-3 font-mono text-sm h-40 bg-gray-50 overflow-y-auto whitespace-pre"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <span className="text-gray-500">1</span> <span className="text-blue-600">SELECT</span> * <br />
              <span className="text-gray-500">2</span> <span className="text-blue-600">FROM</span> customers <br />
              <span className="text-gray-500">3</span> <span className="text-blue-600">WHERE</span> created_at &gt; <span className="text-green-600">'2025-01-01'</span> <br />
              <span className="text-gray-500">4</span> <span className="text-blue-600">ORDER BY</span> name <br />
              <span className="text-gray-500">5</span> <span className="text-blue-600">LIMIT</span> 100;
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {results ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Results</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">23 rows returned in 0.05s</span>
                    <button className="text-gray-700 border border-gray-300 px-3 py-1.5 rounded-button text-sm whitespace-nowrap hover:bg-gray-50">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-download-line"></i>
                      </div>
                      <span className="ml-1">Export</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Alice Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">alice@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-15 09:23:11</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bob Johnson</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">bob@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-18 14:05:42</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Carol Williams</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">carol@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-02-01 11:30:17</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <div className="w-16 h-16 flex items-center justify-center text-gray-300 mb-4">
                  <i className="ri-file-list-line text-5xl"></i>
                </div>
                <p className="mb-6">Run a query to see results</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm cursor-pointer transition-all">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Basic SELECT Query
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Retrieve data from a table with conditions
                    </p>
                    <div className="text-xs bg-gray-50 p-2 rounded font-mono">
                      SELECT * FROM customers WHERE region = 'North' LIMIT 100;
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm cursor-pointer transition-all">
                    <h4 className="font-medium text-gray-900 mb-2">
                      JOIN Example
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Combine data from multiple tables
                    </p>
                    <div className="text-xs bg-gray-50 p-2 rounded font-mono">
                      SELECT o.id, c.name, p.name, o.amount<br/>
                      FROM orders o<br/>
                      JOIN customers c ON o.customer_id = c.id<br/>
                      JOIN products p ON o.product_id = p.id;
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm cursor-pointer transition-all">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Aggregation Query
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Calculate summaries and group data
                    </p>
                    <div className="text-xs bg-gray-50 p-2 rounded font-mono">
                      SELECT DATE_TRUNC('month', created_at) as month,<br/>
                      SUM(amount) as total_sales<br/>
                      FROM orders<br/>
                      GROUP BY month<br/>
                      ORDER BY month;
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLMode;