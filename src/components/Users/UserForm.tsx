import * as React from "react";
import { Form, IFields, required} from "../Form/Form";
import { Field } from "../Field/Field";
import FormButton from "../Form/FormButton";
import RegisterButton from "./components/RegisterButton";

export interface IUserProps{
  createUrl: string,
}


const UserForm: React.SFC<IUserProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Nombre",
      validation: {rule: required}
    },
    lastname: {
      id:"lastname",
      label: "Apellido",
      validation: {rule: required}
    },
    email: {
      id:"email",
      label: "Correo electrónico",
      validation: {rule: required}
    },
    compania:{
      id:"compania",
      label:"Compañía",
      editor:"dropdown",
      options: [],
    },
    username: {
      id:"username",
      label: "Usuario",
      validation: {rule: required}
    },
    password: {
      id:"password",
      label: "Contraseña",
      editor: "password",
      validation: {rule: required}
    }
  };
  
  return (
      <Form
        action={props.createUrl}
        fields = {fields}
        button = {RegisterButton}
        render={() => (
          <React.Fragment>
            <Field {...fields.name}/>
            <Field {...fields.lastname}/>
            <Field {...fields.email}/>
            <Field {...fields.compania}/>
            <Field {...fields.username}/>
            <Field {...fields.password}/>
          </React.Fragment>
        )}
      />
  );
};

export default UserForm;