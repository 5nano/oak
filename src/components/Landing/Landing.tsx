import * as React from 'react'
import LogIn from '../Login/LogIn'
import Button from '../Utilities/Buttons/DefaultButton/Button';
import { RouteComponentProps } from 'react-router-dom';

interface ILandingProps extends RouteComponentProps{
    validateLogin: Function
}


const Landing:React.SFC<ILandingProps> = (props) => {
    const {validateLogin} = props;
    return(
        <div className="landing">
            <div className="landing-background">
                <div className="landing-header">
                    <div className="landing-logo">
                        <img src='../../assets/images/nanivo-logo.png'/>
                    </div>
                    <div className="landing-links">
                        <div className="link">
                            <h4>Contacto</h4>
                        </div>
                        <div className="link">
                            <h4>Nosotros</h4>
                        </div>
                    </div>
                    <div className="landing-user">
                        <Button title="Sign Up"/>
                    </div>
                </div>
                <div className="landing-container">
                    <div className="landing-info">
                        <div className="info-heading">
                             Automatización para ensayos de cultivos en laboratorios.
                        </div>
                        <div className="info-content">
                            Nanivo hace más fácil ensayar con cultivos en tiempo real.
                        </div>

                    </div>

                    <LogIn {...props} validateLogin={validateLogin}/>

                </div>
            </div>
            
        </div>
    )
}

export default Landing;
