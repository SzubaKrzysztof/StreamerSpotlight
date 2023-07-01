import React, { ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../components/pages/ErrorPage';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
    }

    render(): ReactNode {
        if (this.state.hasError && this.state.error && this.state.errorInfo) {
            return <ErrorPage error={this.state.error} errorInfo={this.state.errorInfo} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
