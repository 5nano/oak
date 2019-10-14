import * as React from 'react'

interface IButtonProps {
    title:string,
    onClick?:(e:React.MouseEvent)=>void,
    type?:any
}

const Button: React.SFC<IButtonProps> = (props) => {
    const {type,title,onClick} = props;
    return(
        <button type={type} className="button" onClick={onClick}>
            {title}
        </button>
    )
}

Button.defaultProps = {
    type:'button',
    onClick:()=>{}
}
export default Button;