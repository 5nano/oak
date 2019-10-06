import * as React from "react";
import Form, { IFields, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import {requiredValidation } from "../Form/Validation";

interface ITreatmentFormProps{
  handleValues: (values:IValues) => void;
}

const TreatmentForm: React.SFC<ITreatmentFormProps>= (props) => {
  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Etiqueta",
      validations: [requiredValidation]

    },
    description: {
      id:"description",
      label: "Descripcion",
      editor: "multilinetextbox",
      validations: [requiredValidation]
    },
    experimentsLength: {
        id:"experimentsLength",
        label: "Cantidad de pruebas",
        validations: [requiredValidation]
      },
    mix:{
      id:"mix",
      label:"Mezcla",
      editor: "checkbox",
      value:false,
      validations: [requiredValidation]
    },
    agrochemical:{
      id:"agrochemical",
      label:"Agroquimico",
      editor: "checkbox",
      value:false,
      validations: [requiredValidation]
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
              action='nanivo-bush.herokuapp.com/tratamientos/insertar'
              fields={fields}
              type='alternative'
              getValues={props.handleValues}
              render={() => (
                <React.Fragment>
                  <Field {...fields.name}/>
                  <Field {...fields.description}/>
                  <Field {...fields.experimentsLength}/>
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