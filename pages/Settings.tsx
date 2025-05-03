import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('account');
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences and platform settings.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="py-2">
              <button
                className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'account' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('account')}
              >
                <i className={`ri-user-line mr-3 ${activeTab === 'account' ? 'text-primary' : 'text-gray-500'}`}></i>
                Account
              </button>
              <button
                className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'appearance' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('appearance')}
              >
                <i className={`ri-palette-line mr-3 ${activeTab === 'appearance' ? 'text-primary' : 'text-gray-500'}`}></i>
                Appearance
              </button>
              <button
                className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <i className={`ri-notification-line mr-3 ${activeTab === 'notifications' ? 'text-primary' : 'text-gray-500'}`}></i>
                Notifications
              </button>
              <button
                className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'api' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('api')}
              >
                <i className={`ri-code-s-slash-line mr-3 ${activeTab === 'api' ? 'text-primary' : 'text-gray-500'}`}></i>
                API Keys
              </button>
              <button
                className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'security' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('security')}
              >
                <i className={`ri-shield-keyhole-line mr-3 ${activeTab === 'security' ? 'text-primary' : 'text-gray-500'}`}></i>
                Security
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="Acme Inc."
                    />
                  </div>
                  <div className="pt-4">
                    <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Appearance Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-primary rounded-md p-3 bg-white flex flex-col items-center">
                        <div className="w-full h-12 bg-white border border-gray-200 mb-2 rounded"></div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3 flex flex-col items-center">
                        <div className="w-full h-12 bg-gray-900 mb-2 rounded"></div>
                        <span className="text-sm">Dark</span>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3 flex flex-col items-center">
                        <div className="w-full h-12 bg-gradient-to-r from-white to-gray-900 mb-2 rounded"></div>
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color Accent</label>
                    <div className="flex flex-wrap gap-3">
                      {['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer ${color === '#4f46e5' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Layout Density</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Comfortable</option>
                      <option>Compact</option>
                      <option>Spacious</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                      Apply Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive email notifications for alerts and updates</p>
                    </div>
                    <label className="custom-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dashboard Alerts</h3>
                      <p className="text-sm text-gray-500">Get notified when dashboard metrics exceed thresholds</p>
                    </div>
                    <label className="custom-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Reports</h3>
                      <p className="text-sm text-gray-500">Receive weekly summary reports via email</p>
                    </div>
                    <label className="custom-switch">
                      <input type="checkbox" />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                  <div className="pt-4">
                    <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'api' && (
              <div>
                <h2 className="text-lg font-medium mb-4">API Keys</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Production API Key</h3>
                      <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="password"
                        value="••••••••••••••••••••••••••••••"
                        readOnly
                        className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                      />
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        <i className="ri-clipboard-line"></i>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">Created on: April 5, 2024 • Last used: 2 days ago</div>
                  </div>
                  
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm">
                    <i className="ri-add-line mr-2"></i>
                    Generate New API Key
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Enable two-factor authentication for enhanced security</p>
                      </div>
                      <label className="custom-switch">
                        <input type="checkbox" />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                      Update Security Settings
                    </button>
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

export default Settings;