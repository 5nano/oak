import * as React from "react";
import { Form, IFields, required} from "../Form/Form";
import { Field } from "../Form/Field";

export interface IUserProps{
  createUrl: string,
}


const Register: React.SFC<IUserProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Nombre",
      validation: {rule: required}
    },
    password: {
      id:"password",
      label: "Descripcion",
      editor: "multilinetextbox",
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
          <Field {...fields.name}/>
          <Field {...fields.password}/>
        </React.Fragment>
      )}
    />
  );
};

export default Register;
