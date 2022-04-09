import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/header/Header'
import {
  BrowserRouter
} from "react-router-dom";
import DataProvider from './redux/store'

ReactDOM.render(
  <BrowserRouter>
    <DataProvider>
         
          <App />
    </DataProvider>
   
  </BrowserRouter>,
  document.getElementById('root')
);

