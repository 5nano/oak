import * as React from "react";
import { Form, IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";
import TreatmentForm from './TreatmentForm';
import Treatments from './Treatments';
import Agrochemicals from "../Agrochemicals/Agrochemicals";
import { LoaderOptionsPlugin } from "webpack";

export interface IAssayFormProps {

}

export interface IAssayFormState{
  id:Number,
  values:{name:string,
          description:string,
          crop:string,
          agrochemical:string,
          mix:string},
  treatments: Array<IValues>,
  newTreatment:boolean,
  successAssay: boolean,
  loading:{
    agrochemicals:boolean,
    mixs:boolean,
    crops:boolean
  }
}

//fieldName must match with fieldId
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
class AssayForm extends React.Component<IAssayFormProps,IAssayFormState> {

  constructor(props:IAssayFormProps){
    super(props)

    this.state = {
      id:null,
      values: {name:'',
              description:'',
              crop:fields.crop.options[0],
              agrochemical:fields.agrochemical.options[0],
              mix:fields.mix.options[0]},
      treatments: [],
      newTreatment: false,
      successAssay: false,
      loading: {
        agrochemicals:true,
        mixs:true,
        crops:true,
      }
    }
  }

  componentDidMount(){
    fetch('https://nanivo-bush.herokuapp.com/cultivos', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {return response.json()})
      .then(data=> {
        console.log(data)
        fields.crop.options = ["Maiz","Soja"]
        this.setState(prevState => {
          let loading = {...prevState.loading}
          loading.crops = false
          return {loading}
        })
      })
    
    fetch('https://nanivo-bush.herokuapp.com/agroquimicos', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {return response.json()})
      .then(data=> {
        console.log(data)
        fields.agrochemical.options=["Herbicida A","Herbicida B"]
        this.setState(prevState => {
          let loading = {...prevState.loading}
          loading.agrochemicals = false
          return {loading}
        })
      })
    

    fetch('https://nanivo-bush.herokuapp.com/mezclas', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {return response.json()})
    .then(data=> {
      console.log(data)
      fields.mix.options=["A","B"]
      this.setState(prevState => {
        let loading = {...prevState.loading}
        loading.mixs = false
        return {loading}
      })
    })

  }


 handleAssayValues=(values:IValues):void=>{
 /*
    const assayData = {
      name:values.name,
      description:values.description,
      idMixture:this.state.values.mix,
      idAgrochemical:this.state.values.agrochemical,
      idCrop:this.state.values.crop
    }
    fetch('', {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(assayData),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {return response.json()})
      .then(data =>{
        console.log(data);
        this.setState({id:data['idAssay'],successAssay:true})
      })*/
    
    //Proximo paso
   this.setState({successAssay:true})

   //Guardo el estado por si vuelve atras
   this.setState({values: {...this.state.values, ...values}});

  }

  handleTreatmentValues=(values:IValues):void=>{
    console.log(values)
/*
    const data = {
      idAssay:this.state.id,
      name:values.name,
      description:values.description,
      experimentsLength:values.experimentsLength,
      idMixture:this.state.values.mix,
      idAgrochemical:this.state.values.agrochemical,
    }*/
    //this.setState({treatments:[...this.state.treatments,values]})
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