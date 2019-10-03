import * as React from 'react'
import { IFormButtonProps } from '../../Form/FormButton'


const RegisterButton:React.SFC<IFormButtonProps> = (props) => {
    const {onClick,disabled} = props
    return(
        <div className='register-button'>
            <button onClick={onClick} disabled={disabled}>
                Register
            </button>
        </div>
    )
}

export default RegisterButton;