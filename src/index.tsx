import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './styles.scss';

let root = document.getElementById('app-root');
if (!root) {
    root = document.createElement('DIV');
    root.setAttribute('id', 'app-root');
    
    document.querySelector('body').appendChild(root);
}


ReactDOM.render(
    <App title="A title" />,
    root
)