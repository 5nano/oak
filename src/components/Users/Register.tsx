import * as React from "react";
import { Form, IFields, required} from "../Form/Form";
import { Field } from "../Field/Field";

export interface IUserProps{
  createUrl: string,
}


const Register: React.SFC<IUserProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    firstName: {
      id: "firstName",
      label: "Nombre",
      validation: {rule: required}
    },
    lastName: {
      id: "lastName",
      label: "Apellido",
      validation: {rule: required}
    },
    username: {
      id: "username",
      label: "Usuario",
      validation: {rule: required}
    },
    password: {
      id:"password",
      label: "Password",
      editor: "password",
      validation: {rule: required}
    }
  };
  
  return (
    <Form
      action={props.createUrl}
      fields = {fields}
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Ingresa los datos del nuevo usuario
          </div>
          <Field {...fields.firstName}/>
          <Field {...fields.lastName}/>
          <Field {...fields.username}/>
          <Field {...fields.password}/>
        </React.Fragment>
      )}
    />
  );
};

export default Register;
