import * as React from "react";
import UserForm from "./UserForm";

import CrudView from '../CRUD/CrudView';


const Register: React.SFC = () => {
  
  return (
    <div className='register'>
      <div className='register-background'>
        <div className='register-container'>
        <div className="title">Crop Testing Automation</div>

          <UserForm createUrl='https://nanivo-bush.herokuapp.com/usuarios/insertar'/>
        </div>
      </div>
    </div>
 );
};

export default Register;