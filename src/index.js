import React from 'react';
import {components} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

import './Styles/Main/index.css';
import './Assets/icons/style.css';
import frameworkConfig from './Config/frameworkConfig';

import registerServiceWorker from './registerServiceWorker';

frameworkConfig();
ReactDOM.render(<components.Index />, document.getElementById('root'));
registerServiceWorker();
