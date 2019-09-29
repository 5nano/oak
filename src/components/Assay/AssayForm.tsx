import * as React from "react";
import { Form, IFields, required, maxLength } from "../Form/Form";
import { Field } from "../Field/Field";
import Treatments from './Treatments';

const AssayForm: React.SFC= () => {

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
    },
    crop: {
        id:"crop",
        label: "Cultivo",
        editor: "dropdown",
        options: ['maiz','soja']
      },
    agrochemical: {
        id:"agrochemical",
        label: "Agroquimico",
        editor: "dropdown",
        options: ['herbicida A','herbicida B']
    },
    mix: {
        id:"mix",
        label: "Mezcla",
        editor: "dropdown",
        options: ['A','B']
    },
    treatments: {
      id:"treatments",
      label: "Tratamientos",
      editor: "custom",
      custom: Treatments
    }
  };
  
  
  return (
    <Form
      action=''
      fields = {fields}
      render={() => (
        <React.Fragment>
          
          <Field {...fields.name}/>
          <Field {...fields.description}/>
          <Field {...fields.crop}/>
          <Field {...fields.agrochemical}/>
          <Field {...fields.mix}/>
          <Field {...fields.treatments}/>
   

        </React.Fragment>
      )}
    />
  );
};

export default AssayForm;
