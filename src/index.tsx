import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiTheme from './theme/MuiTheme';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ApolloGlobalProvider from './api/Apollo';

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <MuiTheme>
            <ApolloGlobalProvider>
              <App />
            </ApolloGlobalProvider>
          </MuiTheme>
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);