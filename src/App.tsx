import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";
import AppRoutes from './app.routes';
import './app.scss';
import ErrorBoundaryComp from './components/error-boundary.comp';

function App() {
  return (
    <ErrorBoundaryComp>
      <SnackbarProvider maxSnack={5} autoHideDuration={5000} style={{ fontSize: '17px' }}>
        <Provider store={store}>
          <Router>
            <AppRoutes />
          </Router>
        </Provider>
      </SnackbarProvider>
    </ErrorBoundaryComp >
  );
}

export default App;
