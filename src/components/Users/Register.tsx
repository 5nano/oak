import * as React from "react";
import UserForm from "./UserForm";
import { IValues } from "../Form/Form";
import BushService from '../../services/bush';

const submitForm = (values:IValues,setError:Function): Promise<boolean> => {

  return BushService.post('/usuarios/insertar', values) 
    .then(() => true)
    .catch(error => error.json()
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