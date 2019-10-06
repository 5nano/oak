import * as React from "react";
import { Form, IFields} from "../Form/Form";
import { Field } from "../Field/Field";
import   RegisterButton from "./components/RegisterButton";
import { IComponentFormProps } from "../Form/ComponentFormProps";
import { requiredValidation } from "../Form/Validation";

const UserForm: React.SFC<IComponentFormProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Nombre",
      validations: [requiredValidation]
    },
    lastname: {
      id:"lastname",
      label: "Apellido",
      validations: [requiredValidation]
    },
    email: {
      id:"email",
      label: "Correo electrónico",
      validations: [requiredValidation]
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
      validations: [requiredValidation]
    },
    password: {
      id:"password",
      label: "Contraseña",
      editor: "password",
      validations: [requiredValidation]
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
