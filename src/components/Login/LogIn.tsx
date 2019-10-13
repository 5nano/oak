import * as React from "react";
import BushService from '../../services/bush';

export interface ILogInState {
    username:string,
    password:string
}

export interface ILogInProps {
    validateLogin: Function
}

export class LogIn extends React.Component<ILogInProps,ILogInState> {


    constructor(props: ILogInProps){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> => {
       e.preventDefault();

       BushService.put('/usuarios/validar', this.state)
        .then(response => {
            document.cookie = `user=${this.state.username};max-age=60*60*24*365`
            this.props.validateLogin();
        });
      }

    private handleChange =  (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        console.log(event.target.id);
        const newState = {[event.target.id]: event.target.value} as Pick <ILogInState,keyof ILogInState>;
        this.setState(newState);
    }

    render(){
    return(
        <div className="login">
            <div className="login-background" />
            <div className="login-container">
                <div className="title">Crop Testing Automation</div>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input
                        id='username'
                        className="username input"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder="Username"
                        size={60}
                        />
                        <p className="help">Don't have an account? <a>Register now</a></p>
                    <input
                        id='password'
                        className="password input"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        size={60}
                        />
                    <a className="help">Forgot password?</a>
                    <button type="submit" className="input">Ingresar</button>

                </form>
            </div>
        </div>
    )
    }
}

export default LogIn;
