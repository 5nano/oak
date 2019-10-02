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

    React.useEffect(()=>{
        context.setValues({[id]: options[0]})
    },[])

    return(
            <select
                  key={id}
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
    )
}

export default Select;