import * as React from "react";
import { Form, IFields} from "../Form/Form";
import { Field } from "../Field/Field";
import { IComponentFormProps } from "../Form/ComponentFormProps";
import { requiredValidation, maxLengthValidation } from "../Form/Validation";

const CropsForm: React.SFC<IComponentFormProps> = (props) => {

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
  
  
  return (
    <Form
      action={props.createUrl}
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

export default CropsForm;
