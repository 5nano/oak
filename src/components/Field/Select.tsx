import * as React from 'react'
import { IErrors, IFormContext } from '../Form/Form';

export interface ISelectProps{
    id:string,
    value:any,
    context:IFormContext,
    options:string[],
    getEditorStyle: (errors: IErrors) => any
}

const Select:React.SFC<ISelectProps> = (props) => {

    const {id,
           value,
           options,
           context,
           getEditorStyle} = props;

    return(
            <select
                  id={id}
                  name={id}
                  value={value}
                  onChange={
                    (e: React.FormEvent<HTMLSelectElement>) =>
                    {  e.preventDefault();
                      context.setValues({ [id]: e.currentTarget.value })} 
                  }
                  style={getEditorStyle(context.errors)}
                  className="select"
                >
                  <option value='' selected disabled hidden/>
                  {options &&
                    options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
    )
}

export default Select;