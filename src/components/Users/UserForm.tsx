import * as React from "react";
import { Form, IFields} from "../Form/Form";
import { Field } from "../Field/Field";
import   RegisterButton from "./components/RegisterButton";
import { IComponentFormProps } from "../Form/IFormComponentProps";
import { requiredValidation } from "../Form/Validation";

const UserForm: React.SFC<IComponentFormProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    firstName: {
      id: "firstName",
      label: "Nombre",
      validations: [requiredValidation]
    },
    lastName: {
      id:"lastName",
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
      //pedir las companias al back
      options: [
        "Nanotica"
      ],
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
  
  const{submitForm}=props;
  return (
      <Form
       submitForm={submitForm}
        fields = {fields}
        button = {RegisterButton}
        render={() => (
          <React.Fragment>
            <Field {...fields.firstName}/>
            <Field {...fields.lastName}/>
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
