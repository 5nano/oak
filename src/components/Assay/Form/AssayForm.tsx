import * as React from "react";
import { Form, IFields, IValues } from "../../Form/Form";
import { Field } from "../../Field/Field";
import { IFieldsOptions, IAssay } from "../Assay";
import { requiredValidation, maxLengthValidation, isEmailValidation } from "../../Form/Validation";

export interface IAssayFormProps {
  handleValues: (values:IValues) => void;
  fieldsOptions:IFieldsOptions;
}

var fields:IFields = {
  name: {
    id: "name",
    label: "Nombre",
    validations: [requiredValidation]
  },
  description: {
    id:"description",
    label: "Descripcion",
    editor: "multilinetextbox",
    validations: [requiredValidation,maxLengthValidation(200)]
  },
  crop: {
      id:"crop",
      label: "Cultivo",
      editor: "dropdown",
      options: [],
      validations: [requiredValidation]
    },
  agrochemical: {
      id:"agrochemical",
      label: "Agroquimico",
      editor: "dropdown",
      options: [],
      validations: [requiredValidation]
  },
  mix: {
      id:"mix",
      label: "Mezcla",
      editor: "dropdown",
      options: [],
      validations: [requiredValidation]
  }
}

const AssayForm:React.SFC<IAssayFormProps> = (props) => {

  React.useEffect(()=>{
    fields.crop.options = props.fieldsOptions.cropOptions.map(option => option[0])
    fields.agrochemical.options = props.fieldsOptions.agrochemicalOptions.map(option => option[0])
    fields.mix.options = props.fieldsOptions.mixsOptions.map(option => option[0])
  })
    
    return (
          <Form
            action=''
            fields = {fields}
            type='alternative'
            getValues={props.handleValues}
            render={() => (
              <React.Fragment>
                
                <Field {...fields.name}/>
                <Field {...fields.description}/>
                <Field {...fields.crop}/>
                <Field {...fields.agrochemical}/>
                <Field {...fields.mix}/>
            
              </React.Fragment>
            )}
            />
    );
};

export default AssayForm;