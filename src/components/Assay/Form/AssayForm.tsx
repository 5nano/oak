import * as React from "react";
import { Form, IFields, IValues } from "../../Form/Form";
import { Field } from "../../Field/Field";
import { IFieldsOptions } from "../Assay";
import { required } from "../../Form/Validation";

export interface IAssayFormProps {
  handleValues: (values:IValues) => void;
  fieldsOptions:IFieldsOptions
}


var fields:IFields = {
  name: {
    id: "name",
    label: "Nombre",
    validation: {rule: required}
  },
  description: {
    id:"description",
    label: "Descripcion",
    editor: "multilinetextbox",
    validation: {rule: required}
  },
  crop: {
      id:"crop",
      label: "Cultivo",
      editor: "dropdown",
      options: [],
      validation: {rule: required}
    },
  agrochemical: {
      id:"agrochemical",
      label: "Agroquimico",
      editor: "dropdown",
      options: [],
      validation: {rule: required}
  },
  mix: {
      id:"mix",
      label: "Mezcla",
      editor: "dropdown",
      options: [],
      validation: {rule: required}
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