import * as React from "react";
import { Form, IFields} from "../../../Form/Form";
import { Field } from "../../../Field/Field";
import { IComponentFormProps } from "../../../Form/IFormComponentProps";
import {requiredValidation, maxLengthValidation } from "../../../Form/Validation";

const AgrochemicalsForm: React.SFC<IComponentFormProps> = (props) => {

  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Nombre",
      validations: [requiredValidation]
    },
    description: {
      id:"description",
      label: "Descripcion",
      editor: "multilinetextbox",
      validations: [maxLengthValidation(200)]
    }
  };
  
  const {submitForm} = props;
  
  return (

    <Form
      submitForm={submitForm}
      fields = {fields}
      title = "Ingresa un nuevo agroquimico"
      render={() => (
        <React.Fragment>
          
          <Field {...fields.name}/>
          <Field {...fields.description}/>
          
        </React.Fragment>
      )}
    />
  );
};

export default AgrochemicalsForm;
