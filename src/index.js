import React from 'react';
import { AppRegistry } from 'react-native'; // Import AppRegistry
import App from './App';
import { name as appName } from './app.json'; // Import app name from app.json
import ContextProvider from './context/context';

const Root = () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

AppRegistry.registerComponent(appName, () => Root); // Register the root component

// For web support (optional):
if (typeof document !== 'undefined') {
  const { createRoot } = require('react-dom/client');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Root />);
  }
}