import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../../../services/bush';
import Button from '../../../Utilities/Buttons/DefaultButton/Button';

export interface HeaderState {
    showDataUploadMenu: boolean,
 }
export interface HeaderProps extends RouteComponentProps{
    titles: {title: string, path: string}[],
    loggedIn: boolean,
 }

const logout = () => {
    BushService.post('/logout',{})
               .then((response)=>{
                    document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
                    window.location.href = '/';
            })
}

const Header = (props: HeaderProps) => {
    const [showDataUploadMenu, toggleDataUploadMenu] = React.useState(false);

    return (
        <>
            <ReactCSSTransitionGroup
                transitionName="header"
                transitionEnterTimeout={250}
                transitionLeave={false}>
            <div className="header">
                <Link to="/" className="logo-link">
                    <div className="nanivo-info">
                        <img src="../../../../assets/images/nanivo-logo.png" className="header-logo" />
                    </div>
                </Link>
                {
                    props.loggedIn && (
                    <div className="links">
                        {props.titles.map(header => {
                            return <Link to={`/${header.path}`} className="header-link">
                                        {header.title}
                                    </Link>
                        })}
                        <button
                            className="show-data-upload-button"
                            onClick={() => toggleDataUploadMenu(!showDataUploadMenu)}
                        >
                            Cargar nuevos datos
                        </button>
                        <Button title="Cerrar Sesion" onClick={logout}/>
                        
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
                            onClick={() => props.history.push('/mixs')}>
                                Nuevo tipo de mezcla
                        </button>
                        <button 
                            className="show-data-upload-button" 
                            onClick={() => props.history.push('/assay')}>
                                Nuevos ensayos
                        </button>
                    </div>
                </div>
            }
            </ReactCSSTransitionGroup>   
        </>
    )
};
    
export default withRouter(Header);