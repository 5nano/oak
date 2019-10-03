import * as React from "react";
import { Form, IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import TreatmentForm from './TreatmentForm';
import Treatments from './Treatments';

export interface IAssayFormProps {

}

export interface IAssayFormState{
  values:{name:string,
          description:string,
          crop:string,
          agrochemical:string,
          mix:string},
  treatments: Array<IValues>,
  newTreatment:boolean,
  successAssay: boolean
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
        validation: {rule: required}
      },
      crop: {
          id:"crop",
          label: "Cultivo",
          editor: "dropdown",
          options: ['maiz','soja'],
          validation: {rule: required}
        },
      agrochemical: {
          id:"agrochemical",
          label: "Agroquimico",
          editor: "dropdown",
          options: ['herbicida A','herbicida B'],
          validation: {rule: required}
      },
      mix: {
          id:"mix",
          label: "Mezcla",
          editor: "dropdown",
          options: ['A','B'],
          validation: {rule: required}
      }
  }
class AssayForm extends React.Component<IAssayFormProps,IAssayFormState> {

  constructor(props:IAssayFormProps){
    super(props)

    this.state = {
      values: {name:'',
              description:'',
              crop:fields.crop.options[0],
              agrochemical:fields.agrochemical.options[0],
              mix:fields.mix.options[0]},
      treatments: [],
      newTreatment: false,
      successAssay: false
    }
  }
 handleAssayValues=(values:IValues):void=>{
 
    

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

    //Proximo paso
   this.setState({successAssay:true})

   //Guardo el estado por si vuelve atras
   this.setState({values: {...this.state.values, ...values}});

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