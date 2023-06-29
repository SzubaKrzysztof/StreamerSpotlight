import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import theme from './theme';
import { AuthProvider } from './Services/AuthContext';
import ErrorBoundary from './helpers/ErrorBoundary';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <ErrorBoundary>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ErrorBoundary>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>
);
