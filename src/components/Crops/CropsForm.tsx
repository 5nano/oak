import * as React from "react";
import { Form } from "../Form/Form";
import { Field } from "../Form/Field";

const CropsForm: React.SFC = () => {
  return (
    <Form
      action="" //endpoint
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Ingresa los datos del nuevo cultivo
          </div>
          <Field id="name" 
                 label="Nombre" />
          <Field id="description" 
                 label="Descripción" 
                 editor="multilinetextbox"/>
        </React.Fragment>
      )}
    />
  );
};

export default CropsForm;