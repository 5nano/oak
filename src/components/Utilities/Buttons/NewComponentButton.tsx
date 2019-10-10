import * as React from 'react'
import { IFormButtonProps } from '../../Form/FormButton';

const NewComponentButton:React.SFC<IFormButtonProps> = (props) => {
    const {onClick} = props
    return(
        <div className='new-component-button'>
            <button onClick={onClick} >
                Agregar
            </button>
        </div>
    )
}

export default NewComponentButton;