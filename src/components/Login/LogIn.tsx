import * as React from "react";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { RouteComponentProps } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MySnackbarContentWrapper from "../Feedback/MySnackbarContentWrapper";

export interface ILogInState {
    username:string,
    password:string,
    loading:boolean,
    feedback:boolean
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
            loading: false,
            feedback: false
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
        })
        .catch(error => {
            this.setState({feedback:true});
        })
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

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({feedback:false});
      };

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

            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={this.state.feedback}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant="error"
                message="Usuario y/o contraseña incorrecta"
                />
            </Snackbar>
        </div>
    )
    }
}

export default LogIn;
