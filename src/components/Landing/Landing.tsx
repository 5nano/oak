import * as React from 'react'
const Landing:React.SFC = () => {
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
                        <button className="signup-button">Sign Up</button>
                    </div>
                </div>
                <div className="landing-container">
                    <div className="login">
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Landing;
