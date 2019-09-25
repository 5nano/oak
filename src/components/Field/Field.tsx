import * as React from "react";
import { IErrors, IFormContext, FormContext} from "../Form/Form";
import { IFieldProps } from './FieldProps';

export interface IRule {
    values: {
      [key: string]: any
    },
    fieldName: string,
    args: any
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
            <div className="field-container">
              {label && <div className="field-title">{label}</div>}
    
              <div className="field-content">
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
            </div>
          )}
        </FormContext.Consumer>
    );
}

Field.defaultProps = {
  editor: "textbox"
};

export default Field;