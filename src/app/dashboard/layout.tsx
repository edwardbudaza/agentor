'use client';

import { Authenticated } from 'convex/react';

import { Header } from '@/components/header';
import NavigationProvider from '@/components/providers/navigation-provider';
import { Sidebar } from '@/components/sidebar';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <NavigationProvider>
      <div className="flex h-screen">
        <Authenticated>
          <Sidebar />
        </Authenticated>

        <div className="flex-1">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
};
export default DashboardLayout;
