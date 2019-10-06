import * as React from 'react'

interface IStepperProps{
    title:string,
    description:string
}

const Stepper:React.SFC<IStepperProps> = (props)=>{
    return(
        <div className="stepper">
            <div className="title">
                <p>{props.title}</p>
            </div>
            <div className="description">
                <p>{props.description}</p>
            </div>
            
        </div>
    )
}

export default Stepper;