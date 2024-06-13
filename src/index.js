import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Workflowsapp from './Component/WorkFlowEditor/App';


// Synchronous rendering
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Workflowsapp />
  </React.StrictMode>, 
  document.getElementById('root')
);

// Performance monitoring
reportWebVitals();
