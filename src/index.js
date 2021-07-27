import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Main from './Main';
import ThemeContextProvider from './contexts/ThemeContext';
import LoginPage from './LoginPage';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';

function Root() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    isAuthenticated
      ? <Main />
      : <LoginPage />
  );
}


ReactDOM.render(
  <ThemeContextProvider>
    <AuthContextProvider>
      {/* <App /> */}
      <Root />
    </AuthContextProvider>
  </ThemeContextProvider>,
  document.getElementById('root')
);