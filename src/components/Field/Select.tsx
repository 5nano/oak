import * as React from 'react'
import { IErrors, IFormContext } from '../Form/Form';

export interface ISelectProps{
    id:string,
    value:any,
    setValues: Function,
    errors: any,
    options:string[],
    getEditorStyle?: (errors: IErrors) => any
}

const Select:React.SFC<ISelectProps> = (props) => {

    const {id,
           value,
           options,
           setValues,
           errors,
           getEditorStyle} = props;

    return(
            <select
                  id={id}
                  name={id}
                  value={value}
                  onChange={
                    (e: React.FormEvent<HTMLSelectElement>) =>
                    {  e.preventDefault();
                      setValues({ [id]: e.currentTarget.value })} 
                  }
                  style={getEditorStyle(errors)}
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