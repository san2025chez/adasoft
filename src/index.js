import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Evita que el overlay de CRA “mate” la pantalla con el falso runtime error de Chrome:
// "ResizeObserver loop completed with undelivered notifications."
// Importante: solo en development.
(() => {
  if (process.env.NODE_ENV !== 'development') return;

  const isResizeObserverNoise = (msg) =>
    typeof msg === 'string' && msg.includes('ResizeObserver');

  window.addEventListener(
    'error',
    (event) => {
      const message =
        event?.message ||
        (event?.error && typeof event.error.message === 'string' ? event.error.message : '');

      if (isResizeObserverNoise(message)) {
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const message =
        event?.reason && typeof event.reason.message === 'string' ? event.reason.message : '';

      if (isResizeObserverNoise(message)) {
        event.stopImmediatePropagation();
      }
    },
    true
  );
})();

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
