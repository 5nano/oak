import * as React from "react";
import Button from "../Utilities/Buttons/DefaultButton/Button";


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


       fetch('/api/login',{
           method:'POST',
           redirect: 'follow',
           credentials: 'include', // Don't forget to specify this if you need cookies
           mode: 'same-origin',
           headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(this.state)
       })
        .then(response => {
            this.props.validateLogin();
        })
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
                    <p className="help">Don't have an account? <a>Register now</a></p>
                <input
                    id='password'
                    className="password input"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    />
                <a className="help">Forgot password?</a>
                <Button type="submit" title="Ingresar"/>
            </form>
        </div>
    )
    }
}

export default LogIn;
