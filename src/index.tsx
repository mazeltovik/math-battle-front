import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SocketProvider } from './contexts/socketContext';
import { AlertProvider } from './contexts/alertContext';
import { SidebarProvider } from './contexts/sidebarContext';
import Wrapper from './components/routerWrapper/routerWrapper';
import { App } from './app';
import AuthPage from './pages/authPage/authPage';
import SearchPage from './pages/searchPage/searchPage';
import CreatePage from './pages/createPage/createPage';

import CountdownTimer from './components/countdownTimer/countdownTimer';

import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <p>Main Page</p>,
      },
    ],
  },
  {
    path: '/search',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/create',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <CreatePage />,
      },
    ],
  },
  {
    path: '/achievements',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <p>Achievements</p>,
      },
    ],
  },
  {
    path: '/settings',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <p>Settings</p>,
      },
    ],
  },
  {
    path: 'author',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <p>About</p>,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
  },
]);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AlertProvider>
    <SocketProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </SocketProvider>
  </AlertProvider>
);
