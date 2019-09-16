import * as React from "react";


export interface ILogInState {
    username:string,
    password:string
}

export interface ILogInProps {

}

export class LogIn extends React.Component<ILogInProps,ILogInState> {


    constructor(props: ILogInProps){
        super(props);
        this.state ={
            username: '',
            password: '',
        }
    }

    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> => {
       e.preventDefault();


       fetch('',{
           method:'POST',
           mode:'cors',
           headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(this.state)
       }).then(response => console.log(response))
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
        <div className="container login-background">
            <form onSubmit={this.handleSubmit}>
                <div className="title">Bienvenido!</div>
                <div className="title">NANIVO</div>
                <input
                    id='username'
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="username"
                    />
                <input
                    id='password'
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="password"
                    />
                <button type="submit">Ingresar</button>

            </form>
        </div>
    )
    }
}

export default LogIn;
