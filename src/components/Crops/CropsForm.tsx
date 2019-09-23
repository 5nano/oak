import * as React from "react";
import { Form, IFields, required, maxLength } from "../Form/Form";
import { Field } from "../Form/Field";

export interface IFormProps{
  createUrl: string,
}

const CropsForm: React.SFC<IFormProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Nombre",
      validation: {rule: required}
    },
    description: {
      id:"description",
      label: "Descripcion",
      editor: "multilinetextbox",
      validation: {rule: maxLength, args:200}
    }
  };
  
  
  return (
    <Form
      action={props.createUrl}
      fields = {fields}
      render={() => (
        <React.Fragment>
          
          <Field {...fields.name}/>
          <Field {...fields.description}/>
          
        </React.Fragment>
      )}
    />
  );
};

export default CropsForm;
