import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SpaApp from './SpaApp.jsx'
import LocalReactCrud from './LocalReactCrud.jsx'

const rootElement = document.getElementById('root');

if (window.location.pathname.includes('spa.html')) {
  ReactDOM.createRoot(rootElement).render(<SpaApp />);
} else if (window.location.pathname.includes('react.html')) {
  ReactDOM.createRoot(rootElement).render(<LocalReactCrud />);
} else {
  ReactDOM.createRoot(rootElement).render(<App />);
}