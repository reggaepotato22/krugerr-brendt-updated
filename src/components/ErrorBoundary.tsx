import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-red-500 mb-4">Something went wrong</h1>
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full overflow-auto">
            <h2 className="text-xl text-yellow-500 mb-2">Error:</h2>
            <pre className="text-red-300 mb-4 whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
            </pre>
            <h2 className="text-xl text-yellow-500 mb-2">Component Stack:</h2>
            <pre className="text-gray-400 text-sm whitespace-pre-wrap">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
