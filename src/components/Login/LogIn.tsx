import * as React from "react";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { RouteComponentProps } from "react-router-dom";

export interface ILogInState {
    username:string,
    password:string
}

export interface ILogInProps extends RouteComponentProps{
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

       BushService.post('/login', this.state)
        .then(response => {
            document.cookie = `user=${this.state.username};max-age=${60*60*24*365};`
            this.props.validateLogin();
            this.props.history.push('/home')
        });
      }

    private handleChange =  (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newState = {[event.target.id]: event.target.value} as Pick <ILogInState,keyof ILogInState>;
        this.setState(newState);
    }

    render(){
    return(
        <div className="login-container">
            <form className="login-form" onSubmit={this.handleSubmit}>
                <input
                    id='username'
                    className="username input"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Username"
                    />
                    <p className="help" onClick={()=>this.props.history.push('/register')}>No tenes una cuenta?  
                        <a>Registrate ahora</a>
                    </p>
                <input
                    id='password'
                    className="password input"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    />
                <p className="help">  
                    <a >Olvidate tu contraseña?</a>
                </p>
                <Button type="submit" title="Ingresar"/>
            </form>
        </div>
    )
    }
}

export default LogIn;
