import * as React from 'react';
import { IFieldProps } from './Field';

export interface IFields {
  [key: string]: IFieldProps;
}

interface IFormProps {
    action: string;

    fields: IFields,

    render: () => React.ReactNode;
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
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
 
    if (this.validateForm()) {
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
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
            if (response.status > 200) {
              // Map the validation errors to IErrors 
              let responseBody: any;
              responseBody = response.json();
              const errors: IErrors = {};
            
              Object.keys(responseBody).map((key: string) => {
                // For ASP.NET core, the field names are in title case - so convert to camel case
                const fieldName = key.charAt(0).toLowerCase() + key.substring(1);
                errors[fieldName] = responseBody[key];
              });
              this.setState({ errors });
              return false
            }else return true
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
        <form onSubmit={this.handleSubmit} noValidate={true}>
          <div className="container">

            {this.props.render()}

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={this.haveErrors(errors)}
              >
                Submit
              </button>
            </div>
            {submitSuccess && (
              <div className="alert alert-info" role="alert">
                The form was successfully submitted!
              </div>
            )}
            {submitSuccess === false &&
              !this.haveErrors(errors) && (
                <div className="alert alert-danger" role="alert">
                  Sorry, an unexpected error has occurred
                </div>
              )}
            {submitSuccess === false &&
              this.haveErrors(errors) && (
                <div className="alert alert-danger" role="alert">
                  Sorry, the form is invalid. Please review, adjust and try again
                </div>
              )}
          </div>
        </form>
      </FormContext.Provider>
    );
  }
}




export default Form;
