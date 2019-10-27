import * as React from 'react'
import { IErrors, IFormContext, FormContext } from '../Form/Form';

export interface ISelectProps{
    id:string,
    value:any,
    options:string[],
    getEditorStyle?: (errors: IErrors) => any
}

const Select:React.SFC<ISelectProps> = (props) => {

    const {id,
           value,
           options,
           getEditorStyle} = props;

    return(
      <FormContext.Consumer>
        {(context: IFormContext)=> (
            <select
                  id={id}
                  name={id}
                  value={value}
                  onChange={
                    (e: React.FormEvent<HTMLSelectElement>) =>
                     context.setValues({ [id]: e.currentTarget.value }) 
                  }
                  style={getEditorStyle(context.errors)}
                  className="select"
                >
                  <option value='' selected disabled hidden/>
                  {options &&
                    options.map(option => (
                      <option key={option} 
                              value={option}>
                        {option}
                      </option>
                    ))}
                </select>
         )}
        </FormContext.Consumer>
    )
}

export default Select;