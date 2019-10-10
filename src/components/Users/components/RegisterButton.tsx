import * as React from 'react'
import { IFormButtonProps } from '../../Form/FormButton'


const RegisterButton:React.SFC<IFormButtonProps> = (props) => {
    const {onClick} = props
    return(
        <div className='register-button'>
            <button onClick={onClick} >
                Registrar
            </button>
        </div>
    )
}

export default RegisterButton;