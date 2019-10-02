import * as React from "react";
import { Form, IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import TreatmentForm from './TreatmentForm';
import Treatments from './Treatments';

export interface IAssayFormProps {

}

export interface IAssayFormState{
  treatments: Array<IValues>,
  newTreatment:boolean,
  successAssay: boolean
}

//fieldName must match with fieldId
  const fields:IFields = {
      name: {
        id: "name",
        label: "Nombre",
      },
      description: {
        id:"description",
        label: "Descripcion",
        editor: "multilinetextbox",
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
      newTreatment: false,
      successAssay: false
    }
  }
 handleAssayValues=(values:IValues):void=>{
    const data = {
      name: values.name,
      description: values.description,
      crop: values.crop,
      agrochemical: values.agrochemical,
      mix: values.mix
    }

    console.log(data)

    this.setState({successAssay:true})

    /*fetch('', {
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
    */
  }

  handleTreatmentValues=(values:IValues):void=>{
    console.log(values)
    this.setState({treatments:[...this.state.treatments,values]})
  }

  handleClick = (e:React.MouseEvent<HTMLElement>):void => {
    this.setState({newTreatment:!this.state.newTreatment})
  }
  

  handlePrevStep = (e:React.MouseEvent<HTMLElement>):void => {
    this.setState({successAssay:false})
  }
  render(){
    return (
      <div className="assay-wrapper">

        {!this.state.successAssay && (
        <div className="assay-container">
          <p>PASO 1: Agregue los datos del ensayo</p>
          <Form
            action=''
            fields = {fields}
            type='alternative'
            getValues={this.handleAssayValues}
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
        </div>
        )}

        {this.state.successAssay && (
            <div className="treatments-container">
                <p>PASO 2: Agregue los tratamientos del ensayo</p>
                <Treatments treatments={this.state.treatments}/>
                    
                  <button type="button" onClick={this.handleClick}>
                    Nuevo tratamiento
                  </button>


                  {this.state.newTreatment && 
                    <TreatmentForm handleValues={this.handleTreatmentValues}/>
                  }

                  <button type="button" onClick={this.handlePrevStep}>
                    Atras
                  </button>

            </div>
        )}

      </div>
    );
  }
};

export default AssayForm;
