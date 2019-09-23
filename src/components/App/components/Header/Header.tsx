import * as React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';

export interface HeaderProps {  }

const Header = (props: HeaderProps) => (
    <div className="header">
        <div className="nanivo-info">
            <img src="../../../../assets/images/logo.png" className="header-logo" />
            <h1 className="nanivo-title">Nanivo</h1>
        </div>
        <div className="links">
            <a className="header-link">Home</a>
            <a className="header-link">Contact</a>
            <a className="header-link">Signup</a>
        </div>
    </div>
);
    
export default Header;