import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate, render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Silenciar warning ResizeObserver loop en desarrollo (console y overlay)
if (process.env.NODE_ENV === 'development') {
  const realWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('ResizeObserver loop completed')
    ) {
      return;
    }
    realWarn(...args);
  };
  // Filtrar en errores globales para evitar overlay
  window.addEventListener('error', function(e) {
    if (
      typeof e.message === 'string' &&
      e.message.includes('ResizeObserver loop completed')
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }
  }, true);
  window.onerror = function(message, source, lineno, colno, error) {
    if (
      typeof message === 'string' &&
      message.includes('ResizeObserver loop completed')
    ) {
      return true; // Evita que el error llegue al overlay
    }
  };
}

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
