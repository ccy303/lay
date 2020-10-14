import React, { useEffect } from 'react';
import ErrorBoundary from './components/basic/ErrorBoundary';
import PermissionRoute from './routes/PermissionRoute';
import './styles/normalize.scss';
import './styles/common.scss';
const App = props => {
  return <ErrorBoundary>
    <PermissionRoute />
  </ErrorBoundary>;
};

export default App;
