import React, { useState, useEffect } from 'react';
import { Pipeline as PipelineType } from '../types/pipeline';
import { pipelineService, pipelineTemplates } from '../services/pipelineService';

const Pipelines: React.FC = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineType | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedPipelineIds, setSelectedPipelineIds] = useState<string[]>([]);
  const [pipelines, setPipelines] = useState<PipelineType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const data = await pipelineService.getPipelines();
        setPipelines(data);
      } catch (error) {
        console.error('Failed to fetch pipelines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPipelines();
  }, []);

  const handlePipelineSelect = (pipeline: PipelineType) => {
    setSelectedPipeline(pipeline);
    setIsPanelOpen(true);
  };

  const handleClosePanelDetails = () => {
    setIsPanelOpen(false);
  };

  const handlePipelineSelectionChange = (pipelineId: string) => {
    if (selectedPipelineIds.includes(pipelineId)) {
      setSelectedPipelineIds(selectedPipelineIds.filter(id => id !== pipelineId));
    } else {
      setSelectedPipelineIds([...selectedPipelineIds, pipelineId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPipelineIds.length === pipelines.length) {
      setSelectedPipelineIds([]);
    } else {
      setSelectedPipelineIds(pipelines.map(p => p.id));
    }
  };

  const handleViewModeChange = (mode: 'table' | 'grid') => {
    setViewMode(mode);
  };

  const clearSelection = () => {
    setSelectedPipelineIds([]);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Operations</span>
          <div className="w-4 h-4 flex items-center justify-center mx-1">
            <i className="ri-arrow-right-s-line"></i>
          </div>
          <span className="text-gray-900">Pipelines</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pipelines</h1>
            <p className="text-gray-500 mt-1">
              Manage data workflows, sync jobs, and transformations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pipelines..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-button w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"
              >
                <i className="ri-search-line"></i>
              </div>
            </div>
            <div className="relative">
              <button
                className="flex items-center text-gray-700 border border-gray-300 rounded-button px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-filter-3-line"></i>
                </div>
                <span>Filters</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
            </div>
            <div className="bg-gray-200 rounded-full p-1 flex">
              <button
                onClick={() => handleViewModeChange('table')}
                className={`view-toggle px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  viewMode === 'table' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-table-line"></i>
                </div>
              </button>
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`view-toggle px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-layout-grid-line"></i>
                </div>
              </button>
            </div>
            <button
              className="bg-primary text-white px-4 py-2 rounded-button flex items-center whitespace-nowrap shadow-sm hover:bg-primary/90 transition-colors"
            >
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-add-line"></i>
              </div>
              <span>Create Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Templates */}
      <div className="px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Pipeline Templates</h2>
          <a href="#" className="text-primary text-sm hover:underline">Browse All Templates</a>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {pipelineTemplates.map(template => (
            <div
              key={template.id}
              className="flex-shrink-0 w-56 border border-gray-200 rounded p-3 hover:border-primary hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${template.iconBg} mr-3`}
                >
                  <i className={template.icon}></i>
                </div>
                <h3 className="font-medium text-gray-900">{template.name}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {template.description}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-time-line"></i>
                </div>
                <span>{template.setupTime} setup</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-8 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="select-all" 
              className="hidden"
              checked={selectedPipelineIds.length === pipelines.length && pipelines.length > 0}
              onChange={handleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
            >
              {selectedPipelineIds.length === pipelines.length && pipelines.length > 0 && (
                <div className="w-3 h-3 bg-primary rounded"></div>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            <div className="relative">
              <button
                className="flex items-center text-sm border border-gray-300 rounded-button px-3 py-1.5 whitespace-nowrap hover:bg-gray-50"
              >
                <span>All</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Date Range:</span>
            <div className="relative">
              <button
                className="flex items-center text-sm border border-gray-300 rounded-button px-3 py-1.5 whitespace-nowrap hover:bg-gray-50"
              >
                <span>Last 30 days</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Tags:</span>
            <div className="relative">
              <button
                className="flex items-center text-sm border border-gray-300 rounded-button px-3 py-1.5 whitespace-nowrap hover:bg-gray-50"
              >
                <span>All Tags</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </button>
            </div>
          </div>
          <button 
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            onClick={clearSelection}
          >
            <div className="w-4 h-4 flex items-center justify-center mr-1">
              <i className="ri-refresh-line"></i>
            </div>
            <span>Clear Filters</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Auto-refresh:</span>
            <label className="custom-switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <select
              className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white"
            >
              <option>1 min</option>
              <option>5 min</option>
              <option>10 min</option>
              <option>Off</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              className="text-sm border border-gray-300 rounded px-2 py-1.5 pr-8 bg-white"
            >
              <option>Last Run</option>
              <option>Name</option>
              <option>Success Rate</option>
              <option>Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions Toolbar (conditionally displayed) */}
      {selectedPipelineIds.length > 0 && (
        <div className="px-8 py-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-4">{selectedPipelineIds.length} pipelines selected</span>
            <div className="flex space-x-2">
              <button
                className="bg-white text-gray-700 border border-gray-300 px-3 py-1.5 rounded-button text-sm flex items-center whitespace-nowrap hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-1.5">
                  <i className="ri-play-line"></i>
                </div>
                <span>Run</span>
              </button>
              <button
                className="bg-white text-gray-700 border border-gray-300 px-3 py-1.5 rounded-button text-sm flex items-center whitespace-nowrap hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-1.5">
                  <i className="ri-pause-line"></i>
                </div>
                <span>Pause</span>
              </button>
              <button
                className="bg-white text-gray-700 border border-gray-300 px-3 py-1.5 rounded-button text-sm flex items-center whitespace-nowrap hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-1.5">
                  <i className="ri-download-2-line"></i>
                </div>
                <span>Export</span>
              </button>
              <button
                className="bg-white text-red-600 border border-gray-300 px-3 py-1.5 rounded-button text-sm flex items-center whitespace-nowrap hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center mr-1.5">
                  <i className="ri-delete-bin-line"></i>
                </div>
                <span>Delete</span>
              </button>
            </div>
          </div>
          <button 
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={clearSelection}
          >
            Cancel Selection
          </button>
        </div>
      )}

      {/* Pipeline List - Table View */}
      {viewMode === 'table' ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-4">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md w-full mb-4"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-md w-full mb-2"></div>
              ))}
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <th className="px-3 py-3 w-8">
                    <input 
                      type="checkbox" 
                      id="table-select-all" 
                      className="hidden"
                      checked={selectedPipelineIds.length === pipelines.length && pipelines.length > 0}
                      onChange={handleSelectAll}
                    />
                    <label
                      htmlFor="table-select-all"
                      className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
                    >
                      {selectedPipelineIds.length === pipelines.length && pipelines.length > 0 && (
                        <div className="w-2 h-2 bg-primary rounded"></div>
                      )}
                    </label>
                  </th>
                  <th className="px-3 py-3">Pipeline Name</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Last Run</th>
                  <th className="px-3 py-3">Success Rate</th>
                  <th className="px-3 py-3">Schedule</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pipelines.map((pipeline) => (
                  <tr
                    key={pipeline.id}
                    className={`hover:bg-gray-50 cursor-pointer pipeline-row ${
                      selectedPipelineIds.includes(pipeline.id) ? 'bg-gray-100' : ''
                    }`}
                    onClick={(e) => {
                      // Don't open panel if clicking on a checkbox or action button
                      if (
                        e.target instanceof HTMLElement &&
                        (e.target.closest('input[type="checkbox"]') || e.target.closest('button'))
                      ) {
                        return;
                      }
                      handlePipelineSelect(pipeline);
                    }}
                  >
                    <td className="px-3 py-4">
                      <input 
                        type="checkbox" 
                        id={`pipeline-${pipeline.id}`} 
                        className="hidden"
                        checked={selectedPipelineIds.includes(pipeline.id)}
                        onChange={() => handlePipelineSelectionChange(pipeline.id)}
                      />
                      <label
                        htmlFor={`pipeline-${pipeline.id}`}
                        className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedPipelineIds.includes(pipeline.id) && (
                          <div className="w-2 h-2 bg-primary rounded"></div>
                        )}
                      </label>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${pipeline.iconBg} mr-3`}
                        >
                          <i className={pipeline.icon}></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {pipeline.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pipeline.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          pipeline.status === 'running' 
                            ? 'status-running' 
                            : pipeline.status === 'paused' 
                              ? 'status-paused' 
                              : 'status-failed'
                        }`}
                      >
                        {pipeline.status === 'running' 
                          ? 'Running' 
                          : pipeline.status === 'paused' 
                            ? 'Paused' 
                            : 'Failed'}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div>{pipeline.lastRun}</div>
                      <div className="text-xs">Completed in {pipeline.lastRunDuration}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">
                          {pipeline.successRate}%
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              pipeline.successRate > 90 
                                ? 'bg-green-500' 
                                : pipeline.successRate > 75 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${pipeline.successRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div>{pipeline.schedule.description}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          title="Run Now"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="ri-play-line text-gray-500"></i>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          title={pipeline.status === 'paused' ? 'Resume' : 'Pause'}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className={`${pipeline.status === 'paused' ? 'ri-play-line' : 'ri-pause-line'} text-gray-500`}></i>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          title="Edit"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="ri-pencil-line text-gray-500"></i>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          title="Delete"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="ri-delete-bin-line text-gray-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        /* Grid View */
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-4">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className={`border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all cursor-pointer ${
                    selectedPipelineIds.includes(pipeline.id) ? 'border-primary bg-gray-50' : ''
                  }`}
                  onClick={() => handlePipelineSelect(pipeline)}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="mr-3">
                        <input 
                          type="checkbox" 
                          id={`grid-pipeline-${pipeline.id}`} 
                          className="hidden"
                          checked={selectedPipelineIds.includes(pipeline.id)}
                          onChange={() => handlePipelineSelectionChange(pipeline.id)}
                        />
                        <label
                          htmlFor={`grid-pipeline-${pipeline.id}`}
                          className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {selectedPipelineIds.includes(pipeline.id) && (
                            <div className="w-2 h-2 bg-primary rounded"></div>
                          )}
                        </label>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${pipeline.iconBg} mr-2`}>
                            <i className={pipeline.icon}></i>
                          </div>
                          <h3 className="font-medium text-gray-900">{pipeline.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{pipeline.description}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            pipeline.status === 'running' 
                              ? 'status-running' 
                              : pipeline.status === 'paused' 
                                ? 'status-paused' 
                                : 'status-failed'
                          }`}>
                            {pipeline.status === 'running' 
                              ? 'Running' 
                              : pipeline.status === 'paused' 
                                ? 'Paused' 
                                : 'Failed'}
                          </span>
                          <span className="text-xs text-gray-500">{pipeline.lastRun}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          <span className="text-xs font-medium text-gray-900 mr-2">{pipeline.successRate}%</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                pipeline.successRate > 90 
                                  ? 'bg-green-500' 
                                  : pipeline.successRate > 75 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${pipeline.successRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            <i className="ri-calendar-line mr-1"></i>
                            {pipeline.schedule.description}
                          </div>
                          <div className="flex space-x-1">
                            <button 
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100" 
                              title="Run Now"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="ri-play-line text-gray-500 text-xs"></i>
                            </button>
                            <button 
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100" 
                              title="Edit"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="ri-pencil-line text-gray-500 text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pipeline Details Panel */}
      {selectedPipeline && (
        <div className={`pipeline-details-panel fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l border-gray-200 z-10 transform transition-all duration-300 overflow-y-auto custom-scrollbar ${isPanelOpen ? 'open' : ''}`}>
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Pipeline Details</h2>
            <button
              id="close-details"
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Close details panel"
              onClick={handleClosePanelDetails}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-close-line"></i>
              </div>
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${selectedPipeline.iconBg} mr-3`}>
                <i className={selectedPipeline.icon}></i>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedPipeline.name}
                </h3>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    selectedPipeline.status === 'running' 
                      ? 'status-running' 
                      : selectedPipeline.status === 'paused' 
                        ? 'status-paused' 
                        : 'status-failed'
                  } mr-2`}>
                    {selectedPipeline.status === 'running' 
                      ? 'Running' 
                      : selectedPipeline.status === 'paused' 
                        ? 'Paused' 
                        : 'Failed'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last run: {selectedPipeline.lastRun}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                {selectedPipeline.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedPipeline.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-xs ${index === 0 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'} px-2 py-1 rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Pipeline Configuration
              </h4>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Schedule</span>
                  <button className="text-xs text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="flex items-center mb-1">
                    <div className="w-4 h-4 flex items-center justify-center mr-2 text-gray-500">
                      <i className="ri-calendar-line"></i>
                    </div>
                    <span className="text-sm text-gray-900">
                      {selectedPipeline.schedule.description}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2 text-gray-500">
                      <i className="ri-time-line"></i>
                    </div>
                    <span className="text-sm text-gray-900">
                      Typical duration: {selectedPipeline.schedule.typicalDuration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Data Sources</span>
                  <button className="text-xs text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  {selectedPipeline.dataSources.map((source, index) => (
                    <div key={index}>
                      <div className="flex items-center mb-2">
                        <div className="w-5 h-5 flex items-center justify-center mr-2 rounded-full bg-blue-100 text-blue-600">
                          <i className={source.icon || "ri-database-2-line text-xs"}></i>
                        </div>
                        <span className="text-sm text-gray-900">{source.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {source.entities.map((entity, idx) => (
                          <div key={idx} className={idx < source.entities.length - 1 ? "mb-1" : ""}>
                            • {entity}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Destination</span>
                  <button className="text-xs text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 rounded-full bg-green-100 text-green-600">
                      <i className={selectedPipeline.destination.icon || "ri-database-2-line text-xs"}></i>
                    </div>
                    <span className="text-sm text-gray-900">
                      {selectedPipeline.destination.name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Transformations</span>
                  <button className="text-xs text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-gray-500">
                    {selectedPipeline.transformations.map((transform, idx) => (
                      <div key={idx} className={idx < selectedPipeline.transformations.length - 1 ? "mb-1" : ""}>
                        • {transform.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Notifications</span>
                  <button className="text-xs text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  {selectedPipeline.notifications.map((notification, idx) => (
                    <div key={idx}>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-2 text-gray-500">
                          <i className="ri-mail-line"></i>
                        </div>
                        <span className="text-sm text-gray-900">{notification.type}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {notification.recipients.map((recipient, recipientIdx) => (
                          <div key={recipientIdx}>{recipient}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Execution History
              </h4>
              <div className="space-y-3 mb-3">
                {selectedPipeline.history.map((run, idx) => (
                  <div key={idx} className="bg-gray-50 rounded p-3">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 flex items-center justify-center mr-2 ${run.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                          <i className={run.status === 'success' ? 'ri-checkbox-circle-line' : 'ri-close-circle-line'}></i>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {run.timestamp}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{run.duration}</span>
                    </div>
                    <div className="pl-6">
                      <div className="text-xs text-gray-500 mb-1">
                        Processed {run.recordsProcessed.toLocaleString()} records
                      </div>
                      <button className="text-xs text-primary hover:underline">
                        View Logs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-sm text-primary hover:underline">
                View All History
              </button>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Dependencies</h4>
              <div className="bg-gray-50 rounded p-3 mb-3">
                <div className="text-sm font-medium text-gray-900 mb-2">Upstream</div>
                <div className="text-xs text-gray-500">
                  {selectedPipeline.dependencies.upstream.length > 0 ? (
                    selectedPipeline.dependencies.upstream.map((dep, idx) => (
                      <div key={idx} className={idx < selectedPipeline.dependencies.upstream.length - 1 ? "mb-1" : ""}>
                        • {dep.name}
                      </div>
                    ))
                  ) : (
                    <div>No upstream dependencies</div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Downstream
                </div>
                <div className="text-xs text-gray-500">
                  {selectedPipeline.dependencies.downstream.length > 0 ? (
                    selectedPipeline.dependencies.downstream.map((dep, idx) => (
                      <div key={idx} className={idx < selectedPipeline.dependencies.downstream.length - 1 ? "mb-1" : ""}>
                        • {dep.name}
                      </div>
                    ))
                  ) : (
                    <div>No downstream dependencies</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-primary text-white px-4 py-2 rounded-button flex-1 text-center whitespace-nowrap shadow-sm hover:bg-primary/90 transition-colors">
                View Full Analytics
              </button>
              <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-button flex-1 text-center whitespace-nowrap hover:bg-gray-50">
                Edit Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pipelines;