import * as React from 'react'
import { IMessageProps } from './IMessage'

const Success:React.SFC<IMessageProps> = (props) => {
    return (
        <div className="success">
            {props.message}
        </div>
    )
}

export default Success;