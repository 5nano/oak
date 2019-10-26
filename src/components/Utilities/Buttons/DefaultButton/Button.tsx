import * as React from 'react'

interface IButtonProps {
    title:string,
    onClick?:(e:React.MouseEvent)=>void,
    type?:any,
    className?:string,
    disabled?:boolean
}

const Button: React.SFC<IButtonProps> = (props) => {
    const {type,title,onClick,className,disabled} = props;
    return(
        <button type={type} 
                className={`button ${className}`}
                onClick={onClick}
                disabled={disabled}>
            {title}
        </button>
    )
}

Button.defaultProps = {
    type:'button',
    onClick:()=>{},
    className:'',
    disabled:false
}
export default Button;