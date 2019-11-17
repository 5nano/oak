import * as React from 'react'

interface IButtonProps {
    title:string,
    onClick?:(e:React.MouseEvent)=>void,
    type?:any,
    className?:string,
    disabled?:boolean,
    icon?: any
}

const Button: React.SFC<IButtonProps> = (props) => {
    const {type,title,onClick,className,disabled,icon:Icon} = props;
    return(
        <div className={`${className} button`}>
            {Icon!=null && <Icon/>}
            <button type={type} 
                    onClick={onClick}
                    disabled={disabled}>
                {title}
            </button>
        </div>
    )
}

Button.defaultProps = {
    type:'button',
    onClick:()=>{},
    className:'',
    disabled:false
}
export default Button;