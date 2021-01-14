import React, { useEffect } from 'react';
import ErrorBoundary from './components/basic/ErrorBoundary';
import PermissionRoute from './routes/PermissionRoute';
import './styles/normalize.less';
import './styles/common.less';
const App = props => {
  return <ErrorBoundary>
    <PermissionRoute />
  </ErrorBoundary>;
};

export default App;
