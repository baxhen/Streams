import React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;  }
    
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.querySelector('#root')
);