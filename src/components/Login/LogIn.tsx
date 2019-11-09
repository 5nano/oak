import * as React from "react";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { RouteComponentProps } from "react-router-dom";

export interface ILogInState {
    username:string,
    password:string,
    loading:boolean
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
            loading: false
        }
    }

    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> => {
       e.preventDefault();
       this.setState({loading:true})

       let loginInfo = {
           username:this.state.username,
           password:this.state.password
       }
       BushService.post('/login', loginInfo)
        .then(response => {
            document.cookie = `user=${this.state.username};max-age=${60*60*24*365};`
            this.props.validateLogin();
            this.props.history.push('/home')
            this.setState({loading:false})
        });
      }

    private handleChangeUsername =  (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        this.setState({username:event.target.value})
    }

    private handleChangePassword =  (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        this.setState({password:event.target.value})
    }


    render(){
    return(
        <div className="login-container">
            <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="login-input">
                    <input
                        id='username'
                        className="username input"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChangeUsername}
                        placeholder="Username"
                        />
                        <p className="help" onClick={()=>this.props.history.push('/register')}>No tenes una cuenta?  
                            <a>Registrate ahora</a>
                        </p>
                </div>

                <div className="login-input">
                    <input
                        id='password'
                        className="password input"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        placeholder="Password"
                        />
                    <p className="help">  
                        <a >Olvidate tu contraseña?</a>
                    </p>
                </div>
                <Button type="submit" title={this.state.loading? "Verificando...":"Ingresar"}/>
            </form>
        </div>
    )
    }
}

export default LogIn;
