import * as React from "react";
import Form, { IFields, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import { required } from "../Form/Validation";

interface ITreatmentFormProps{
  handleValues: (values:IValues) => void;
}

const TreatmentForm: React.SFC<ITreatmentFormProps>= (props) => {
  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Etiqueta",
      validation: {rule: required}

    },
    description: {
      id:"description",
      label: "Descripcion",
      editor: "multilinetextbox",
      validation: {rule: required}
    },
    experimentsLength: {
        id:"experimentsLength",
        label: "Cantidad de pruebas",
        validation: {rule: required}
      },
    mix:{
      id:"mix",
      label:"Mezcla",
      editor: "checkbox",
      value:false,
      validation: {rule: required}
    },
    agrochemical:{
      id:"agrochemical",
      label:"Agroquimico",
      editor: "checkbox",
      value:false,
      validation: {rule: required}
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