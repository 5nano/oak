import * as React from 'react';
import { IFieldProps } from '../Field/FieldProps';
import FormButton, { IFormButtonProps } from './FormButton';
import { IRule } from './Validation';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Error from '../Utilities/Messages/Error';
import Success from '../Utilities/Messages/Success';

export interface IFields {
  [key: string]: IFieldProps;
}

interface IFormProps {
    submitForm: (values:IValues)=>Promise<boolean>,

    fields: IFields,

    render: () => React.ReactNode;

    title:string,
}
 
export interface IValues {
    [key: string]: any;
}

export interface IErrors {
    [key: string]: string[]
}

export interface IFormState {
    values: IValues;
    errors: IErrors;
}

export interface IFormContext extends IFormState {
  setValues: (values: IValues) => void;
  
  validate: (fieldName: string) => void;
}

export const FormContext = React.createContext<IFormContext | undefined> (
  undefined
);


export interface DefaultFormProps {
  button: React.SFC<IFormButtonProps>
}

export class Form extends React.Component<IFormProps, IFormState> {
  static defaultProps:DefaultFormProps = {
    button:FormButton
  }
  
  constructor(props: IFormProps){
        super(props);

        const errors: IErrors={}
        const values: IValues = {};
        this.state = {
            errors,
            values,
        };
    }

private setValues = (values: IValues) => {
  this.setState({values: {...this.state.values, ...values}});
 
;}

private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
        if (errors[key].some(error => error.length>0)) {
          haveError = true;
        }
    });
    return haveError;
    }

private handleSubmit = async (
    e: React.MouseEvent
  ): Promise<any> => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.submitForm(this.state.values)
      .then(()=>{
        return true;
      })
      .catch(error => {
        return error.json()
      })
      }
    };
 
  private validate = (fieldName: string): string[] => {
    let newErrors: string[] = [];
    if (
      this.props.fields[fieldName] &&
      this.props.fields[fieldName].validations
    ) {

     newErrors=  this.props.fields[fieldName].validations.map(validation =>{
        const validationRule:IRule = {
          values:this.state.values,
          fieldName:fieldName,
          args:validation!.args
        }
        return validation!.rule(validationRule)
      })
    }
    this.state.errors[fieldName] = newErrors;
    this.setState({
       errors: { ...this.state.errors, [fieldName]: newErrors }
    });
    return newErrors;
 };


 private validateForm(): boolean {
  
  const errors: IErrors = {};
  Object.keys(this.props.fields).map((fieldName: string) => {
    errors[fieldName] = this.validate(fieldName);
  });
  this.setState({ errors });
  return !this.haveErrors(errors);
}


 
  public render() {
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate
    };
    const {title} = this.props;

    
    return (
      <FormContext.Provider value={context}>
        <div className="form-container-wrapper">
          <div className="form-title">
            {title}
          </div>
          <div className="form-container">
            <form className="form" noValidate={true}>
              {this.props.render()}
            </form>
            <Button title="Registrar" onClick={this.handleSubmit}/>
          </div>
        </div>
      </FormContext.Provider>
    );
  }

  

}



export default Form;