import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/AppSidebar';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';


function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-6">
        {/* Optional trigger for toggling sidebar */}
        {/* <SidebarTrigger /> */}
        
        {/* Welcome content shown at the top */}
        <WelcomeContainer />

        {/* Render children inside the layout */}
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
