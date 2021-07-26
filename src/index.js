import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Main from './Main';
import ThemeContextProvider from './contexts/ThemeContext';

ReactDOM.render(
  <ThemeContextProvider>
    {/* <App /> */}
    <Main />
  </ThemeContextProvider>,
  document.getElementById('root')
);