import * as React from 'react'
import { IFormContext } from '../Form/Form'

export interface ICheckboxProps {
    id:string,
    value:any,
    context:IFormContext
}

const Checkbox:React.SFC<ICheckboxProps> = (props) => {
    const {id,value,context} = props
    const [actualValue,setActualValue] = React.useState(value)

    React.useEffect(()=>{
        context.setValues({[id]: value})
    },[])

    return(
        <input type="checkbox"
                id={id}
                name={id}
                value={value}
                onChange={
                    (e: React.FormEvent<HTMLInputElement>) =>{
                    context.setValues({ [id]: !actualValue })
                    setActualValue(!actualValue)
                    }
                }
                className="form-control"
                />
    )
}

export default Checkbox;