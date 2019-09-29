import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export interface HeaderProps { 
    titles: string[],
 }

const Header = (props: HeaderProps) => (
    <div className="header">
        <div className="nanivo-info">
            <img src="../../../../assets/images/logo.png" className="header-logo" />
            <h1 className="nanivo-title">Nanivo</h1>
        </div>
        <div className="links">
            {props.titles.map(title => {
                return <Link to={`/${title}`} className="header-link">
                            {title}
                        </Link>
            })}
        </div>
    </div>
);
    
export default Header;