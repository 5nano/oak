import * as React from "react";
import { Form, IFields, required, maxLength } from "../Form/Form";
import { Field } from "../Form/Field";

const CompanyForm: React.SFC = () => {

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
      action='https://nanivo-bush.herokuapp.com/bush/companias/insertar'
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

export default CompanyForm;
