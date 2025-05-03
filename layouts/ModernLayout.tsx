import React, { useEffect } from 'react';
import { ModernSidebar } from '../components/ModernSidebar';

interface ModernLayoutProps {
  children: React.ReactNode;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ children }) => {
  useEffect(() => {
    console.log('ModernLayout mounted');
    console.log('Current path:', window.location.pathname);
  }, []);

  console.log('Rendering ModernLayout component');
  console.log('Children:', children);

  return (
    <div className="flex h-screen overflow-hidden">
      <ModernSidebar activePage={window.location.pathname.substring(1)} />
      <main className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
};

export default ModernLayout;