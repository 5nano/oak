import * as React from "react";
import { IErrors, IFormContext, FormContext, IValues} from "./Form";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IFieldProps {
  /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The editor for the field */
  editor?: Editor;

  /* The drop down items for the field */
  options?: string[];

  /* The field value */
  value?: any;

  validation?: IValidation;
}

export interface IRule {
    values:IValues,
    fieldName: string,
    args: any
}

export interface IValidation {
    rule: (values: IValues, fieldName: string, args: any) => string;
    args?: any;
  }
  


  
export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value
}) => {

    const getError = (errors: IErrors): string => (errors ? errors[id] : "");
    
    const getEditorStyle = (errors: IErrors): any =>
    getError(errors) ? { borderColor: "red" } : {};

    return (
        <FormContext.Consumer>
          {(context: IFormContext) => (
            <div className="form-group">
              {label && <label htmlFor={id}>{label}</label>}
    
              {editor!.toLowerCase() === "textbox" && (
                <input
                  id={id}
                  type="text"
                  value={value}
                  onChange={
                    (e: React.FormEvent<HTMLInputElement>) =>
                      context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  onBlur={() => context.validate(id)}
                  style={getEditorStyle(context.errors)} 
                  className="form-control"
                />
              )}
    
              {editor!.toLowerCase() === "multilinetextbox" && (
                <textarea
                  id={id}
                  value={value}
                  onChange={
                    (e: React.FormEvent<HTMLTextAreaElement>) =>
                      context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  style={getEditorStyle(context.errors)} 
                  onBlur={() => context.validate(id)}
                  className="form-control"
                />
              )}
    
              {editor!.toLowerCase() === "dropdown" && (
                <select
                  id={id}
                  name={id}
                  value={value}
                  onChange={
                    (e: React.FormEvent<HTMLSelectElement>) =>
                      context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  style={getEditorStyle(context.errors)} 
                  onBlur={() => context.validate(id)}
                  className="form-control"
                >
                  {options &&
                    options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              )}
    
              {getError(context.errors) && (
                <div style={{ color: "red", fontSize: "80%" }}>
                <p>{getError(context.errors)}</p>
                </div>
                )}


            </div>
          )}
        </FormContext.Consumer>
    );
}
Field.defaultProps = {
  editor: "textbox"
};

export default Field;