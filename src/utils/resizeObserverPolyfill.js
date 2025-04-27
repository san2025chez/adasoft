// ResizeObserver error suppression
// Este archivo previene los errores de ResizeObserver en la consola durante desarrollo

const suppressResizeObserverErrors = () => {
  const errorHandler = (e) => {
    if (
      e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
      e.message === 'ResizeObserver loop limit exceeded'
    ) {
      // Prevenir que el error se propague a la consola
      e.stopImmediatePropagation();
    }
  };

  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', errorHandler);

  return () => {
    window.removeEventListener('error', errorHandler);
    window.removeEventListener('unhandledrejection', errorHandler);
  };
};

export default suppressResizeObserverErrors;
