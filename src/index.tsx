import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SocketProvider } from './contexts/socketContext';
import { AlertProvider } from './contexts/alertContext';
import { SidebarProvider } from './contexts/sidebarContext';
import { ModalProvider } from './contexts/modalContext';
import Wrapper from './components/routerWrapper/routerWrapper';
import { App } from './app';
import AuthPage from './pages/authPage/authPage';
import SearchPage from './pages/searchPage/searchPage';
import CreatePage from './pages/createPage/createPage';
import AwaitersPage from './pages/awaitersPage/awaitersPage';

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
    path: '/author',
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
  {
    path: '/awaiters',
    element: <Wrapper />,
    children: [
      {
        path: '',
        element: <AwaitersPage />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AlertProvider>
    <SocketProvider>
      <ModalProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </ModalProvider>
    </SocketProvider>
  </AlertProvider>
);
