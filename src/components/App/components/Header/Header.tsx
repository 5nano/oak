import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router"
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { RouteComponentProps } from 'react-router-dom';

export interface HeaderState {
    showDataUploadMenu: boolean,
 }
export interface HeaderProps extends RouteComponentProps {
    titles: string[],
    loggedIn: boolean,
 }

const Header = (props: HeaderProps) => {
    const [showDataUploadMenu, toggleDataUploadMenu] = React.useState(false);

    return (
        <>
            <CSSTransitionGroup
                transitionName="header"
                transitionEnterTimeout={250}
                transitionLeave={false}>
            <div className="header">
                <Link to="/" className="logo-link">
                    <div className="nanivo-info">
                        <img src="../../../../assets/images/logo.png" className="header-logo" />
                        <h1 className="nanivo-title">Nanivo</h1>
                    </div>
                </Link>
                {
                    props.loggedIn && (
                    <div className="links">
                        {props.titles.map(title => {
                            return <Link to={`/${title}`} className="header-link">
                                        {title}
                                    </Link>
                        })}
                        <button
                            className="show-data-upload-button"
                            onClick={() => toggleDataUploadMenu(!showDataUploadMenu)}
                        >
                            Cargar nuevos datos
                        </button>
                    </div>
                    )
                }
            </div>
            {
                showDataUploadMenu &&
                <div className="header submenu">
                    <div className="links">
                        <button 
                            className="show-data-upload-button" 
                            onClick={() => props.history.push('/crops')}>
                                Nuevo tipo de plantación
                        </button>
                        <button 
                            className="show-data-upload-button" 
                            onClick={() => props.history.push('/agrochemicals')}>
                                Nuevo tipo de agroquímico
                        </button>
                        <button 
                            className="show-data-upload-button" 
                            onClick={() => props.history.push('/assay')}>
                                Nuevos ensayos
                        </button>
                    </div>
                </div>
            }
            </CSSTransitionGroup>   
        </>
    )
};
    
export default withRouter(Header);