import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Providers from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Providers />, document.getElementById('root'));
registerServiceWorker();
