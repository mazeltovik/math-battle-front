import { createRoot } from 'react-dom/client';
import { App } from './app';
import AuthPage from './pages/authPage/authPage';
import SidebarMenu from './components/sidebarMenu/sidebarMenu';
import { SidebarProvider } from './contexts/sidebarContext';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <SidebarProvider>
    <SidebarMenu />
  </SidebarProvider>
);
