import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import queryClient from './api/queryClient';
import createStore from './state';

const store = createStore();
window.store = store;

ReactDOM.render(
    <ThemeProvider>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
