import * as React from "react";
import { IFields, required, maxLength } from "../Form/Form";
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
  
          <div>
          <button onClick={handleNewTreatment}>+</button>
          <p>Experimentos</p>
            
          {newTreatment && (
          <div>
          <Field {...fields.tag}/>
          <Field {...fields.description}/>
          <Field {...fields.tests}/>
          </div>
          )}
          </div>
  )
};

export default TreatmentForm;
