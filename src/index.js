import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './components/App';

const client = new ApolloClient({
  uri: 'https://luitze-apollo-server.herokuapp.com/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
