
import React from 'react';
import ReactDOM from 'react-dom';
import CreditScoreRouter from './router';
import axios from 'axios';

axios.defaults.withCredentials = true;  //带cookie--默认不带
window.axios = axios;

ReactDOM.render(
    <CreditScoreRouter />, document.getElementById('root')
);
