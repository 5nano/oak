import * as React from 'react';

export interface IFormButtonProps{
    onClick:(event: React.MouseEvent) => void;
}

const FormButton:React.SFC<IFormButtonProps>=(props) => {

    const {onClick} = props;
    return(
        <button onClick={onClick}>
            Agregar
        </button>
    )
}

export default FormButton;