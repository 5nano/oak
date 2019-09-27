import * as React from "react";
import Form, { IFields, required, maxLength } from "../Form/Form";
import { Field } from "../Field/Field";

const TreatmentForm: React.SFC= () => {

  const [newTreatment,setTreatment] = React.useState(false);

  //fieldName must match with fieldId
  const fields: IFields = {
    tag: {
      id: "tag",
      label: "Etiqueta",
      validation: {rule: required}
    },
    description: {
      id:"description",
      label: "Descripcion",
      editor: "multilinetextbox",
      validation: {rule: maxLength, args:200}
    },
    tests: {
        id:"tests",
        label: "Cantidad de pruebas",
        validation: {rule: required}
      },
  };

  const handleNewTreatment = () =>{
    setTreatment(!newTreatment)
  }
  
  
  return (
    <Form
      action=''
      fields={fields}
      render={() => (
        <React.Fragment>
          <Field {...fields.tag}/>
          <Field {...fields.description}/>
          <Field {...fields.tests}/>
        </React.Fragment>
      )}
      />
  )
};


export default TreatmentForm;