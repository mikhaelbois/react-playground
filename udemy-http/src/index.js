import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// https://github.com/axios/axios#interceptors
const axiosRequestInterceptor = axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

const axiosResponseInterceptor = axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

// axios.interceptors.request.eject(axiosRequestInterceptor);
// axios.interceptors.response.eject(axiosResponseInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
