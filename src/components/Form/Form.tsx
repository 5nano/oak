import * as React from 'react';
import { IFieldProps } from '../Field/FieldProps';
import { values } from 'd3';

export interface IFields {
  [key: string]: IFieldProps;
}

interface IFormProps {
    action: string;

    fields: IFields,

    render: () => React.ReactNode;

    type?: string,

    getValues?: (values:IValues) => void;
}

export interface IValues {
    [key: string]: any;
}

export interface IErrors {
    [key: string]: string
}

export interface IFormState {
    values: IValues;
    errors: IErrors;
    submitSuccess?: boolean;
}

export interface IFormContext extends IFormState {
  setValues: (values: IValues) => void;
  
  validate: (fieldName: string) => void;
}

export const FormContext = React.createContext<IFormContext | undefined> (
  undefined
);

export const required = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "Este campo debe completarse"
    : "";

export const maxLength = (
  values: IValues,
  fieldName: string,
  length: number
): string =>
  values[fieldName] && values[fieldName].length > length
    ? `Este campo no puede exceder ${length} caracteres`
    : "";

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps){
        super(props);

        const errors: IErrors={}
        const values: IValues = {};
        this.state = {
            errors,
            values
        };
    }

private setValues = (values: IValues) => {
  
  this.setState({values: {...this.state.values, ...values}});
 
;}

private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
        if (errors[key].length > 0) {
        haveError = true;
        }
    });
    return haveError;
    }

private handleSubmit = async (
    e: React.MouseEvent
  ): Promise<void> => {
    e.preventDefault();
 
    if (this.validateForm()) {
      if(this.props.type === 'alternative'){
        this.props.getValues(this.state.values);
        /*devuelve los valores al padre*/ 
      }else{
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
      }
    }
  };
 
  private validate = (fieldName: string): string => {
    let newError: string = "";
  
    if (
      this.props.fields[fieldName] &&
      this.props.fields[fieldName].validation
    ) {
      newError = this.props.fields[fieldName].validation!.rule(
        this.state.values,
        fieldName,
        this.props.fields[fieldName].validation!.args
      );
    }
    this.state.errors[fieldName] = newError;
    this.setState({
       errors: { ...this.state.errors, [fieldName]: newError }
    });
    return newError;
 };


 private validateForm(): boolean {
  
  const errors: IErrors = {};
  Object.keys(this.props.fields).map((fieldName: string) => {
    errors[fieldName] = this.validate(fieldName);
  });
  this.setState({ errors });
  return !this.haveErrors(errors);
}
 
private async submitForm(): Promise<boolean> {

    return fetch(this.props.action, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(this.state.values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => {
            console.log(response)

            if (response.status > 200) return false
            else return true
    })

  }
 
  public render() {
    const { submitSuccess, errors } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate
    };

    return (
      <FormContext.Provider value={context}>
        <div className="form-container">
          <form className="form-control" noValidate={true}>

            {this.props.render()}

            {submitSuccess && (
              <div className="result-success" role="alert">
                El registro fue exitoso!
              </div>
            )}
            {submitSuccess === false &&
              !this.haveErrors(errors) && (
                <div className="result-error" role="alert">
                  Perdon, un error inesperado ocurrió
                </div>
              )}
            {submitSuccess === false &&
              this.haveErrors(errors) && (
                <div className="result-error" role="alert">
                  Perdón, el formulario es inválido. Porfavor, revise y vuelva a intentar.
                </div>
              )}

          </form>

            <button
                type="button"
                disabled={this.haveErrors(errors)}
                onClick={this.handleSubmit}
              >
                Agregar
            </button>

        </div>
      </FormContext.Provider>
    );
  }
}




export default Form;