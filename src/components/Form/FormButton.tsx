import * as React from 'react';

export interface IFormButtonProps{
    onClick:(event: React.MouseEvent) => void;
    disabled: any;
}

const FormButton:React.SFC<IFormButtonProps>=(props) => {

    const {disabled,onClick} = props;
    return(
        <button onClick={onClick} disabled={disabled}>
            Agregar
        </button>
    )
}

export default FormButton;