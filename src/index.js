import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';


import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();




const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth_token');
    if(token){
        return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          }

    }else{
        return {
            headers: {
              ...headers
            }
          }
    }
    // return the headers to the context so httpLink can read them
   
  });
  

const link = new HttpLink({
    uri: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL
  })
const client = new ApolloClient({  
  link: authLink.concat(link),
  cache: cache
})



const store = createStore(reducers, {}, applyMiddleware(thunk));
ReactDOM.render( 
    <ApolloProvider client={client} >
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


