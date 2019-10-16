import * as React from 'react'

interface IButtonProps {
    title:string,
    onClick?:(e:React.MouseEvent)=>void,
    type?:any,
    className?:string
}

const Button: React.SFC<IButtonProps> = (props) => {
    const {type,title,onClick,className} = props;
    return(
        <button type={type} className={`button ${className}`} onClick={onClick}>
            {title}
        </button>
    )
}

Button.defaultProps = {
    type:'button',
    onClick:()=>{},
    className:''
}
export default Button;