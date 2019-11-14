import * as React from "react";
import { IErrors, IFormContext, FormContext} from "../Form/Form";
import { IFieldProps } from './FieldProps';
import Select from './Select';
import DateFnsUtils from '@date-io/date-fns';

import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DatePicker from "./DatePicker";
export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value,
}) => {

    const getError = (errors: IErrors): string[] => (errors? errors[id] : null);
    
    const getEditorStyle = (errors: IErrors): any =>{
    getError(errors)?{ borderColor: "red" } : {};
  }
    
    return (
        <FormContext.Consumer>
          {(context: IFormContext) => (
            <div className="field-container">
             
              {label && 
                <div className="field-title">{label}</div>
                }
             
              <div className="field-content">
              {editor!.toLowerCase() === "textbox" && (
                <input
                  id={id}
                  type="text"
                  value={value}
                  placeholder={label}
                  onChange={
                    (e: React.FormEvent<HTMLInputElement>) =>
                      context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  style={getEditorStyle(context.errors)} 
                  className="input"
                />
              )}

              {editor!.toLowerCase() === "password" && (
                <input
                  id={id}
                  type="password"
                  value={value}
                  placeholder={label}
                  onChange={
                    (e: React.FormEvent<HTMLInputElement>) =>
                      context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  style={getEditorStyle(context.errors)} 
                  className="input"
                />
              )}
    
              {editor!.toLowerCase() === "multilinetextbox" && (
                <textarea
                  id={id}
                  value={value}
                  placeholder={label}
                  onChange={
                    (e: React.FormEvent<HTMLTextAreaElement>) =>
                      context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  style={getEditorStyle(context.errors)}
                  className="multitext"
                />
              )}
    
              {editor!.toLowerCase() === "dropdown" && (
                <Select id={id} 
                        value={value}
                        options={options}
                        getEditorStyle={getEditorStyle} />
              )}

              {editor!.toLowerCase() === "calendar" && (
                <DatePicker id={id} context={context}/>
              )}

              {getError(context.errors) && (
                getError(context.errors).filter(error => error.length!=0)
                                        .map(error => {
                                          return <div className="field-error">
                                                    <p>{error}</p>
                                                </div>
                                        })
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