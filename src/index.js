import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './router/router'
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <AppRoutes />, document.getElementById('root'));
serviceWorker.unregister();
