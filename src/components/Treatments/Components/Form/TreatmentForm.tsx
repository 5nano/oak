import * as React from "react";
import Form, { IFields, IValues } from "../../../Form/Form";
import { Field } from "../../../Field/Field";
import {requiredValidation, isNumberValidation } from "../../../Form/Validation";
import BushService from "../../../../services/bush";
import { IAgrochemical } from "../../../../Interfaces/Agrochemical";
import { IMix } from "../../../../Interfaces/Mix";
import {ITreatment,ITreatmentBackend } from "../../../../Interfaces/ITreatment";


interface ITreatmentFormProps{
  idAssay:Number,
  submitTreatmentForm: (values:IValues) => Promise<void>;
}

interface ITreatmentFormState{
  agrochemicals: Array<IAgrochemical>,
  mixs: Array<IMix>,
  loadingAgrochemicals: boolean,
  loadingMixs: boolean,
}
var fields: IFields = {
  name: {
    id: "name",
    label: "Etiqueta",
    validations: [requiredValidation]
  },
  description: {
    id:"description",
    label: "Descripcion",
    editor: "multilinetextbox",
    validations: [requiredValidation]
  },
  pressure: {
    id: "pressure",
    label: "Presión",
    validations: [requiredValidation,isNumberValidation]
  },
  experimentsLength: {
      id:"experimentsLength",
      label: "Cantidad de pruebas",
      validations: [requiredValidation,isNumberValidation]
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
};

class TreatmentForm extends React.Component<ITreatmentFormProps,ITreatmentFormState> {
  
  constructor(props){
    super(props)
    this.state = {
      agrochemicals:[],
      mixs:[],
      loadingAgrochemicals: true,
      loadingMixs: true
    }

    BushService.get('/agroquimicos')
    .then(data=> {
      Object.keys(data).forEach(key => {
          this.state.agrochemicals.push({
            name:data[key].name,
            description:data[key].description,
            idAgrochemical:data[key].idAgrochemical
          })
      })
      fields.agrochemical.options=this.state.agrochemicals.map(agrochemical => {return agrochemical.name})
      this.setState({loadingAgrochemicals:false})
    })
  
  BushService.get('/mezclas')
    .then(data=> {
      Object.keys(data).forEach(key => {
        this.state.mixs.push({
          name:data[key].name,
          description:data[key].description,
          idMixture:data[key].idMixture
        })
    })
    fields.mix.options=this.state.mixs.map(mix => {return mix.name})
    this.setState({loadingMixs:false})
    })
  }

  submitForm(values:IValues){
    let agrochemical = this.state.agrochemicals.find(agrochemical=> agrochemical.name === values.agrochemical)
    let mix = this.state.mixs.find(mix=> mix.name === values.mix)
   
    const newTreatment:ITreatmentBackend = {
      idAssay:this.props.idAssay,
      name:values.name,
      description:values.description,
      pressure: values.pressure,
      experimentsLength:values.experimentsLength,
      idMixture: mix.idMixture,
      idAgrochemical: agrochemical.idAgrochemical,
    }

    return this.props.submitTreatmentForm(newTreatment)
  }

  render(){
    return (
        <Form
          submitForm={this.submitForm.bind(this)}
          fields={fields}
          title = "Registrar"
          render={() => (
            <React.Fragment>
              <Field {...fields.name}/>
              <Field {...fields.description}/>
              <Field {...fields.pressure}/>
              <Field {...fields.experimentsLength}/>
              <Field {...fields.mix}/>
              <Field {...fields.agrochemical}/>
            </React.Fragment>
          )}
        />
    )
  }
};


export default TreatmentForm;