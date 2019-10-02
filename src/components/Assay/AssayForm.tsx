import * as React from "react";
import { Form, IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import TreatmentForm from './TreatmentForm';
import Treatments from './Treatments';

export interface IAssayFormProps {

}

export interface IAssayFormState{
  treatments: Array<IValues>,
  newTreatment:boolean
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
      treatments: [],
      newTreatment: false
    }
  }
 handleValues=(values:IValues):void=>{
    const data = {
      name: values.name,
      description: values.description,
      crop: values.crop,
      agrochemical: values.agrochemical,
      mix: values.mix,
      treatments: this.state.treatments
    }

    console.log(data)

    fetch('', {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {
            console.log(response)
            console.log(response.json())
    })
  }

  handleTreatmentValues=(values:IValues):void=>{
    this.setState({treatments:[...this.state.treatments,values]})
  }

  handleClick = (e:React.MouseEvent<HTMLElement>):void => {
    this.setState({newTreatment:!this.state.newTreatment})
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
            
            <button type="button" onClick={this.handleClick}>
              Nuevo tratamiento
            </button>

            </React.Fragment>
        )}
        />
        {this.state.newTreatment && 
          <TreatmentForm handleValues={this.handleTreatmentValues}/>
        }
      </div>
    );
  }
};

export default AssayForm;
