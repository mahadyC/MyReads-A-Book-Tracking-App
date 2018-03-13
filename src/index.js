import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MyReads from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><MyReads /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
