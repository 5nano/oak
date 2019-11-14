import * as React from "react";
import { Form, IFields, IValues } from "../../../Form/Form";
import { Field } from "../../../Field/Field";
import { requiredValidation, maxLengthValidation} from "../../../Form/Validation";
import BushService from "../../../../services/bush";
import { ICrop } from "../../../../Interfaces/Crop";
import { IAssay } from "../../Assay";
import Loader from "../../../Utilities/Loader/Loader";

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
  endDate: {
      id:'endDate',
      label: "Fecha estimada de finalización",
      editor: "calendar",
      validations: [requiredValidation],
  }
}

class AssayForm extends React.Component<IAssayFormProps,IAssayFormState> {

  constructor(props:IAssayFormProps){
    super(props)

    this.state = {
      crops: [],
      loading: true,
      error: ''
    }

  }
  
  componentDidMount(){
    BushService.get('/cultivos')
    .then(data=> {
      Object.keys(data).forEach(key => {
        this.state.crops.push({name:data[key].name,
                  description:data[key].description,
                  idCrop:data[key].idCrop})
        })
      fields.crop.options=this.state.crops.map(crop => {return crop.name})
      this.setState({loading:false})
    })
    
  }

  submitForm(values:IValues):Promise<boolean>{
    let crop = this.state.crops.find(crop => crop.name === values.crop)
    let assay:IAssay = {
      name:values.name,
      description:values.description,
      idCrop:crop.idCrop,
      estimatedFinished: values.endDate
    }
    return this.props.submitAssayForm(assay)
  }

  

  render(){
    return (
      this.state.loading? 
          <div style={{display:'flex',justifyContent:'center'}}>
            <Loader/>
          </div>
        :
          <Form
            submitForm={this.submitForm.bind(this)}
            fields = {fields}
            title = "Registra tu nuevo ensayo"
            render={() => (
              <React.Fragment>
                
                <Field {...fields.name}/>
                <Field {...fields.description}/>
                <Field {...fields.crop}/>
                <Field {...fields.endDate}/>
            
              </React.Fragment>
              )}
              />
      );
  }
};

export default AssayForm;