import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-neutral-900 font-display">
                Something went wrong
              </h1>
              <p className="text-xs text-neutral-500 leading-relaxed">
                An unexpected interface error occurred. You can refresh the view or navigate back to safety.
              </p>
            </div>
            {this.state.error?.message && (
              <pre className="text-[11px] p-3 rounded-xl bg-neutral-100 text-neutral-700 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                size="md"
                fullWidth
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={this.handleReset}
              >
                Reload
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                icon={<Home className="w-4 h-4" />}
                onClick={() => (window.location.href = '/')}
              >
                Go Home
              </Button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
