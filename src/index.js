import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import Initialize from './Initialize';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Initialize />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
