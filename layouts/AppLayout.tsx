import React from 'react';
import { Toaster } from '@/components/ui/toaster';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default AppLayout;
