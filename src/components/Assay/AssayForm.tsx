import * as React from "react";
import { Form, IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import TreatmentForm from './TreatmentForm';
import Treatments from './Treatments';

export interface IAssayFormProps {

}

export interface IAssayFormState{
  name:string,
  description:string,
  crop:string,
  agrochemical:string,
  mix:string,
  treatments: Array<IValues>
}

//fieldName must match with fieldId
  const fields:IFields = {
      name: {
        id: "name",
        label: "Nombre",
        validation: {rule: required}
      },
      description: {
        id:"description",
        label: "Descripcion",
        editor: "multilinetextbox",
        validation: {rule: maxLength, args:200}
      },
      crop: {
          id:"crop",
          label: "Cultivo",
          editor: "dropdown",
          options: ['maiz','soja']
        },
      agrochemical: {
          id:"agrochemical",
          label: "Agroquimico",
          editor: "dropdown",
          options: ['herbicida A','herbicida B']
      },
      mix: {
          id:"mix",
          label: "Mezcla",
          editor: "dropdown",
          options: ['A','B']
      }
  }
class AssayForm extends React.Component<IAssayFormProps,IAssayFormState> {

  constructor(props:IAssayFormProps){
    super(props)

    this.state = {
      name:'',
      description:'',
      crop:'',
      agrochemical:'',
      mix:'',
      treatments: []
    }
  }
 handleValues=(values:IValues):void=>{
    console.log(values.name)
  }

  handleTreatmentValues=(values:IValues):void=>{
    console.log(values)
    this.setState({treatments:[...this.state.treatments,values]})
  }
  
  render(){
    return (
      <div>
      <Form
        action=''
        fields = {fields}
        type='alternative'
        getValues={this.handleValues}
        render={() => (
          <React.Fragment>
            
            <Field {...fields.name}/>
            <Field {...fields.description}/>
            <Field {...fields.crop}/>
            <Field {...fields.agrochemical}/>
            <Field {...fields.mix}/>
            <Treatments treatments={this.state.treatments}/>
          </React.Fragment>
        )}
      />
        <TreatmentForm handleValues={this.handleTreatmentValues}/>
      </div>
    );
  }
};

export default AssayForm;
