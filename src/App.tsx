import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";
import AppRoutes from './app.routes';
import './app.scss';
import ErrorBoundaryComp from './components/error-boundary.comp';

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;
