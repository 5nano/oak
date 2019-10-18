import * as React from "react";
import { Form, IFields, IValues } from "../../../Form/Form";
import { Field } from "../../../Field/Field";
import { requiredValidation, maxLengthValidation, isEmailValidation } from "../../../Form/Validation";
import BushService from "../../../../services/bush";
import { ICrop } from "../../../../Interfaces/Crop";

interface IAssayFormProps {
  submitAssayForm: (values:IValues) => Promise<boolean>;
}

interface IAssayFormState{
  crops: Array<ICrop>,
  loading: boolean,
  error:string
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
}

class AssayForm extends React.Component<IAssayFormProps,IAssayFormState> {

  constructor(props:IAssayFormProps){
    super(props)

    this.state = {
      crops: [],
      loading: true,
      error: ''
    }

    BushService.get('/cultivos')
    .then(data=> {
      Object.keys(data).forEach(key => {
        this.state.crops.push({name:data[key].name,
                  description:data[key].description,
                  id:data[key].idCrop})
        })
      fields.crop.options=this.state.crops.map(crop => {return crop.name})
      this.setState({loading:false})
    })
  }

  submitForm(values:IValues):Promise<boolean>{
    let crop = this.state.crops.find(crop => crop.name === values.crop)
    values.crop = crop
    return this.props.submitAssayForm(values)
  }

  render(){
    return (
      !this.state.loading &&
          <Form
            submitForm={this.submitForm.bind(this)}
            fields = {fields}
            title = "Registrar"
            render={() => (
              <React.Fragment>
                
                <Field {...fields.name}/>
                <Field {...fields.description}/>
                <Field {...fields.crop}/>
            
              </React.Fragment>
              )}
              />
      );
  }
};

export default AssayForm;