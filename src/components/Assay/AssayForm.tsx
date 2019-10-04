import * as React from "react";
import { Form, IFields, required, maxLength, IValues } from "../Form/Form";
import { Field } from "../Field/Field";

export interface IAssayFormProps {
  handleValues: (values:IValues) => void;
}

export interface IAssayFormState{
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
      loading: {
        agrochemicals:true,
        mixs:true,
        crops:true,
      }
    }
    
  }

  componentDidMount(){

    this.setLoading()
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

  setLoading(){
    this.setState(prevState => {
      let loading = {...prevState.loading}
      loading.mixs = true
      loading.agrochemicals =true
      loading.crops=true;
      return {loading}
    })
  }


  render(){
    return (
          <Form
            action=''
            fields = {fields}
            type='alternative'
            getValues={this.props.handleValues}
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
  }
};

export default AssayForm;