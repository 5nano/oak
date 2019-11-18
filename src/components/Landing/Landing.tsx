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
                <div className="landing-header">
                    <div className="landing-logo">
                        <img src='../../assets/images/nanivo-logo.png'/>
                    </div>
                    <div className="landing-links">
                        <div className="link">
                            <h4>Contactanos</h4>
                        </div>
                        <div className="link">
                            <h4>Nanivo Box</h4>
                        </div>
                    </div>
                    <div className="landing-user">
                        <Button type="button" 
                                title="Sign Up" 
                                onClick={()=>props.history.push('/register')} />
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
    )
}

export default Landing;
