import * as React from 'react'
import { IMessageProps } from './IMessage'

const Info:React.SFC<IMessageProps> = (props) => {
    return (
        <div className="message-container">
            <div className="message info">
                {props.message}
            </div>
        </div>
    )
}

export default Info;