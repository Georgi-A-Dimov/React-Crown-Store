import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user.context.jsx';
import { CategoriesProvider } from './contexts/categories.context.jsx';
import { CartProvider } from './contexts/cart.context.jsx';
import ErrorBoundary from './errors/error-boundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <ErrorBoundary>
        <CategoriesProvider>
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </CategoriesProvider>
      </ErrorBoundary>
      
    </BrowserRouter>
  </React.StrictMode>,
)