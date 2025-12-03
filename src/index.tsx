import './styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app.tsx';

const container = document.querySelector('#root');

const theme = createTheme({
    primaryColor: 'blue',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
});

const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme}>
                <Notifications />
                <App />
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);
