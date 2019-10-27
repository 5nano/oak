import * as React from 'react'
import { IMessageProps } from './IMessage'

const Info:React.SFC<IMessageProps> = (props) => {
    return (
        <div className="message info">
            {props.message}
        </div>
    )
}

export default Info;