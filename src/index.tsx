import { createRoot } from 'react-dom/client';
import { App } from './app';
import AuthPage from './pages/authPage/authPage';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<AuthPage />);
