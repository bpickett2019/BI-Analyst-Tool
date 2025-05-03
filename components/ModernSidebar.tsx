import React from 'react';
import { Link, useLocation } from 'wouter';

interface ModernSidebarProps {
  activePage?: string;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ activePage }) => {
  const [location] = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path: string): boolean => {
    if (activePage) {
      // If activePage is explicitly set, use that
      return activePage === path.replace(/^\//, '');
    }
    // Otherwise, use the current location
    return location === path;
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-['Pacifico'] text-primary">InsightFlow</h1>
      </div>
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="py-2">
          <li className="px-4 py-2">
            <Link href="/">
              <div className={`flex items-center cursor-pointer ${isActive('/') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-home-line"></i>
                </div>
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/dashboards">
              <div className={`flex items-center cursor-pointer ${isActive('/dashboards') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-dashboard-line"></i>
                </div>
                <span>Dashboards</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/data-explorer">
              <div className={`flex items-center cursor-pointer ${isActive('/data-explorer') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-bar-chart-line"></i>
                </div>
                <span>Data Explorer</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/pipelines">
              <div className={`flex items-center cursor-pointer ${isActive('/pipelines') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-git-branch-line"></i>
                </div>
                <span>Pipelines</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/sql-mode">
              <div className={`flex items-center cursor-pointer ${isActive('/sql-mode') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-code-line"></i>
                </div>
                <span>SQL Mode</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/models">
              <div className={`flex items-center cursor-pointer ${isActive('/models') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-database-2-line"></i>
                </div>
                <span>Data Models</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/integrations">
              <div className={`flex items-center cursor-pointer ${isActive('/integrations') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-plug-line"></i>
                </div>
                <span>Integrations</span>
              </div>
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/favorites">
              <div className={`flex items-center cursor-pointer ${isActive('/favorites') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-star-line"></i>
                </div>
                <span>Favorites</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link href="/settings">
          <div className={`flex items-center cursor-pointer ${isActive('/settings') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
            <div className="w-5 h-5 flex items-center justify-center mr-3">
              <i className="ri-settings-line"></i>
            </div>
            <span>Settings</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default ModernSidebar;