import * as React from "react";
import Form, { IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";

interface ITreatmentFormProps{
  handleValues: (values:IValues) => void;
}

const TreatmentForm: React.SFC<ITreatmentFormProps>= (props) => {
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
    mix:{
      id:"mix",
      label:"Mezcla",
      editor: "checkbox",
      value:false,
    },
    agrochemical:{
      id:"agrochemical",
      label:"Agroquimico",
      editor: "checkbox",
      value:false,
    }
  };
 
  return (

      <div className="crud-container">
        <div>
            <div className="title-wrapper">
            <img src="../../assets/images/head-icon.png"/>
            <p>Nuevo Tratamiento</p>
            </div>

              <Form
                action=''
                fields={fields}
                type='alternative'
                getValues={props.handleValues}
                render={() => (
                  <React.Fragment>
                    <Field {...fields.tag}/>
                    <Field {...fields.description}/>
                    <Field {...fields.tests}/>
                    <Field {...fields.mix}/>
                    <Field {...fields.agrochemical}/>
                  </React.Fragment>
                )}
            />
        </div>
      </div>
   
  )
};


export default TreatmentForm;