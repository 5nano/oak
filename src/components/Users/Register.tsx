import * as React from "react";
import UserForm from "./UserForm";
import { IValues } from "../Form/Form";

const submitForm = (values:IValues,setError:Function): Promise<boolean> => {

  return fetch('https://nanivo-bush.herokuapp.com/usuarios/insertar', {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(response => {
          console.log(response)
          if (!response.ok) throw response
          else return true
  }).catch(error => error.json()
                         .then((error:any) => {
                           console.log(error.message)
                           setError({serverError:error.message})
                           return false;
                         }))
}

const Register: React.SFC = () => {
  
  return (
    <div className='register'>
      <div className='register-background'>
        <div className='register-container'>
        <div className="title">Crop Testing Automation</div>

          <UserForm submitForm={submitForm}/>
        </div>
      </div>
    </div>
 );
};

export default Register;