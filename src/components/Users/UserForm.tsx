import * as React from "react";
import { Form, IFields, IValues} from "../Form/Form";
import { Field } from "../Field/Field";
import { IComponentFormProps } from "../Form/IFormComponentProps";
import { requiredValidation, isEmailValidation } from "../Form/Validation";
import Button from "../Utilities/Buttons/DefaultButton/Button";
import BushService from "../../services/bush";
import Companies from "../Companies/Companies";
import { object } from "prop-types";
import { ICompany } from "../../Interfaces/ICompany";
import Spinner from "react-spinner-material";

const UserForm: React.SFC<IComponentFormProps> = (props) => {

  const fields:IFields = {
    firstName: {
      id: "firstName",
      label: "Nombre",
      validations: [requiredValidation]
    },
    lastName: {
      id:"lastName",
      label: "Apellido",
      validations: [requiredValidation]
    },
    email: {
      id:"email",
      label: "Correo electrónico",
      validations: [requiredValidation,isEmailValidation]
    },
    username: {
      id:"username",
      label: "Usuario",
      validations: [requiredValidation]
    },
    password: {
      id:"password",
      label: "Contraseña",
      editor: "password",
      validations: [requiredValidation]
    }
  }
  const [loading,setLoading] = React.useState(true)
  const [companieField,setCompanieField] = React.useState<IFields>({
      compania:{
        id:"compania",
        label:"Compañía",
        editor:"dropdown",
        options: [],
        validations: [requiredValidation]
      },
    }
  )

  const [companies,setCompanies] = React.useState<ICompany[]>([])

  React.useEffect(()=>{
     BushService.get('/companias')
        .then(data => {
          Object.keys(data).forEach(key=>{
            let newCompanies = companies;
            newCompanies.push(data[key])
            setCompanies(newCompanies)

            setCompanieField(prevState => {
              let compania= {...prevState.compania}
              compania.options.push(data[key].name)
              return {compania}
            })
          })
          setLoading(false)
        })
  },[])
  

  const submitForm = (values:IValues) => {
    let companieId = companies.find(company => company.name === values.compania).companyId
    values.compania = companieId
    props.submitForm(values)
  }

  return (

    !loading?
        <Form
        submitForm={submitForm.bind(this)}
          fields = {fields}
          title="Registrar"
          render={() => (
            <React.Fragment>
              <Field {...fields.firstName}/>
              <Field {...fields.lastName}/>
              <Field {...fields.email}/>
              <Field {...companieField.compania}/>
              <Field {...fields.username}/>
              <Field {...fields.password}/>
            </React.Fragment>
          )}
        />
      :
      <div className="user-loading">
        <Spinner  size={240} 
                  spinnerColor={"#6AC1A9"} 
                  spinnerWidth={3} 
                  visible={true}/>
      </div>
  );
};

export default UserForm;
