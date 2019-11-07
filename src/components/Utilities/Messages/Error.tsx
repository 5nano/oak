import * as React from 'react'
import { IMessageProps } from './IMessage'

const Error:React.SFC<IMessageProps> = (props) => {
    return (
        <div className="message-container">
            <div className="message error">
                {props.message}
            </div>
        </div>
    )
}

export default Error;