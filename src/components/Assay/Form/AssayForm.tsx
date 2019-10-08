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


  
  const [assay,setAssay] = React.useState<IAssay>(null)

  React.useEffect(()=>{
    fields.crop.options = props.fieldsOptions.cropOptions.map(option => option[0])
    fields.agrochemical.options = props.fieldsOptions.agrochemicalOptions.map(option => option[0])
    fields.mix.options = props.fieldsOptions.mixsOptions.map(option => option[0])
  
    if(assay) {

      let agrochemicalName=props.fieldsOptions.agrochemicalOptions.find(option=>option[1]===assay.idAgrochemical)[0]
      let cropName=props.fieldsOptions.cropOptions.find(option=>option[1]===assay.idCrop)[0];
      let mixName=props.fieldsOptions.mixsOptions.find(option=>option[1]===assay.idMix)[0];

      fields.name.value = assay.name
      fields.description.value = assay.description
      fields.crop.value = cropName
      fields.agrochemical.value = agrochemicalName,
      fields.mix.value = mixName
    }
  })
    
    const handleValues = (values:IValues):void => {

      setAssay({
        id:null,
        name:values.name,
        description:values.description,
        idAgrochemical: props.fieldsOptions.agrochemicalOptions.find(option => option[0]===values.agrochemical)[1],
        idCrop: props.fieldsOptions.cropOptions.find(option => option[0]===values.crop)[1],
        idMix: props.fieldsOptions.mixsOptions.find(option => option[0]===values.mix)[1]
      })
      props.handleValues(values)
    }
    return (
          <Form
            action=''
            fields = {fields}
            type='alternative'
            getValues={handleValues}
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