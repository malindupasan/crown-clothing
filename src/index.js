import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { UserProvider } from './contexts/user.contexts';
import { ProductProvider } from './contexts/products.context';

import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
