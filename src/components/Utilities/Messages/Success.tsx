import * as React from 'react'
import { IMessageProps } from './IMessage'

const Success:React.SFC<IMessageProps> = (props) => {
    return (
        <div className="message-container">
            <div className="message success">
                {props.message}
            </div>
        </div>
    )
}

export default Success;