import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate, render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Solución mejorada para ResizeObserver
// Esta implementación debe ejecutarse lo antes posible
(function() {
  const consoleWarn = window.console.warn;
  const consoleError = window.console.error;
  
  // Suprimir todos los mensajes relacionados con ResizeObserver
  window.console.warn = function(...args) {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
      return;
    }
    consoleWarn.apply(console, args);
  };
  
  window.console.error = function(...args) {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
      return;
    }
    consoleError.apply(console, args);
  };
  
  // Capturar y prevenir errores de ResizeObserver
  const errorHandler = function(event) {
    if (event && event.message && typeof event.message === 'string' && 
        (event.message.includes('ResizeObserver loop') || 
         event.message.includes('ResizeObserver'))) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return true;
    }
  };
  
  window.addEventListener('error', errorHandler, true);
  window.addEventListener('unhandledrejection', function(event) {
    if (event && event.reason && event.reason.message && 
        typeof event.reason.message === 'string' && 
        event.reason.message.includes('ResizeObserver')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
  
  window.onerror = function(message) {
    if (message && typeof message === 'string' && message.includes('ResizeObserver')) {
      return true;
    }
  };
})();

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
