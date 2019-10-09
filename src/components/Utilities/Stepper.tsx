import * as React from 'react'

interface IStepperProps{
    description:string
}

const Stepper:React.SFC<IStepperProps> = (props)=>{
    return(
        <div className="stepper">
            <div className="description">
                <p>{props.description}</p>
            </div>
            
        </div>
    )
}

export default Stepper;