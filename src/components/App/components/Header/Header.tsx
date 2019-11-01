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

const logout = () => {
    BushService.post('/logout',{})
               .then((response)=>{
                    document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
                    window.location.href = '/';
            })
}

const Header = (props:RouteComponentProps) => {
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

            <div className="header-controller">
                <Button title="Galeria de fotos" 
                        onClick={()=>props.history.push('/photos')}
                        className="header-action"
                        />
                <Button title="Cargar datos" 
                        onClick={()=>toggleDataUploadMenu(!showDataUploadMenu)}
                        className="show-data-upload-button header-action"
                        />
                <Button title="Cerrar Sesion" 
                        onClick={logout}
                        className="header-action"
                        />
            </div>

            </div>
            {
                showDataUploadMenu &&
                <div className="header submenu">
                    <div className="links">
                        <Button title="Cultivos" 
                                className="show-data-upload-button" 
                                onClick={() => props.history.push('/crops')}
                        />
                        <Button title="Agroquimicos" 
                                className="show-data-upload-button" 
                                onClick={() => props.history.push('/agrochemicals')}
                        />
                        <Button title="Mezclas" 
                                className="show-data-upload-button" 
                                onClick={() => props.history.push('/mixs')}
                        />
                        <Button title="Ensayos" 
                                className="show-data-upload-button" 
                                onClick={() => props.history.push('/assay')}
                        />
                    </div>
                </div>
            }
            </ReactCSSTransitionGroup>   
        </>
    )
};
    
export default withRouter(Header);