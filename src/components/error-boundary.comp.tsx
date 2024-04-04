import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorComp from './error.comp';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryComp extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorComp />;
    }

    return this.props.children;
  }
}

export default ErrorBoundaryComp;