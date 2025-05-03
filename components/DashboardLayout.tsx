import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MetricsSection from "./MetricsSection";
import ChartCard from "./ChartCard";
import RecentActivity from "./RecentActivity";
import TemplateSection from "./TemplateSection";
import { RecommendedInsights } from "./RecommendedInsights";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
              <div className="flex space-x-3">
                <button 
                  type="button" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Metric
                </button>
              </div>
            </div>

            {/* Metrics Section */}
            <MetricsSection />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartCard 
                title="Revenue Trends" 
                chartId="revenue-chart"
              />
              <ChartCard 
                title="Customer Segmentation" 
                chartId="customer-chart"
              />
            </div>

            {/* Recommended Insights Section */}
            <div className="mb-6">
              <RecommendedInsights />
            </div>
            
            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RecentActivity />
              <TemplateSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
