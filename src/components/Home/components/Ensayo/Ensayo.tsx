import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'

export interface IEnsayoProps{
    ensayo: IEnsayo;
    onSelect: Function;
    onQrs: Function
}

const Ensayo:React.SFC<IEnsayoProps> = (props) => {

    const {ensayo,onSelect,onQrs} = props;

    return(
        <div className="ensayo-wrapper">
            <div className="ensayo" onClick={() => onSelect(ensayo.idAssay)}>
                <div className="name">
                    <div className="title">Nombre ensayo:</div> 
                    <div>{ensayo.name}</div>
                </div>

                <div className="description">
                    <div className="title">Descripción:</div>
                    <div>{ensayo.description}</div>
                </div>
            </div>
            <a onClick={()=>onQrs(ensayo.idAssay)}>QRs</a>
        </div>
    )
}

export default Ensayo;