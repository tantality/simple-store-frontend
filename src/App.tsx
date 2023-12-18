import React from 'react';
import './app.scss';
import ErrorBoundaryComp from './components/error-boundary.comp';

function App() {
  return (
    <ErrorBoundaryComp>
      <div className="App" />
    </ErrorBoundaryComp>
  );
}

export default App;
