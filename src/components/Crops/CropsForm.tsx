import * as React from "react";
import { Form, IFields, required, maxLength } from "../Form/Form";
import { Field } from "../Form/Field";

const CropsForm: React.SFC = () => {

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
      action='http://localhost:8080/bush/cultivo/insertar'
      fields = {fields}
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Ingresa los datos del nuevo cultivo
          </div>
          <Field {...fields.name}/>
          <Field {...fields.description}/>
        </React.Fragment>
      )}
    />
  );
};

export default CropsForm;
