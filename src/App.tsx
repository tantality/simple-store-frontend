import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './app.routes';
import './app.scss';
import ErrorBoundaryComp from './components/error-boundary.comp';

function App() {
  return (
    <ErrorBoundaryComp>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundaryComp>
  );
}

export default App;
