import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
export interface IEnsayoProps{
    ensayo: IEnsayo
    onSelect: Function
    onQrs: Function
    onRemove: Function
}

const Ensayo:React.SFC<IEnsayoProps> = (props) => {

    const {ensayo,onSelect,onQrs,onRemove} = props;

    React.useEffect(()=>{
        
    },[])
    return(
        <div className="ensayo-wrapper">
            <div className="ensayo">
                <div className="name">
                    <div className="title">Nombre ensayo:</div> 
                    <div>{ensayo.name}</div>
                </div>

                <div className="content">
                    <div className="component">
                        <div className="component-img">
                            <img src='../../../../assets/images/agrochemical-icon.png'/>
                        </div>
                        <div className="component-name">
                            Galant
                        </div>
                    </div>

                    <div className="component">
                        <div className="component-img">
                            <img src='../../../../assets/images/crop-icon.png'/>
                        </div>
                        <div className="component-name">
                            Soja
                        </div>
                    </div>

                    <div className="component">
                        <div className="component-img">
                            <img src='../../../../assets/images/mix-icon.png'/>
                        </div>
                        <div className="component-name">
                            A
                        </div>
                    </div>
                </div>

                <div className="description">
                    <div className="title">Descripción:</div>
                    <div>{ensayo.description}</div>
                </div>

                <div className="actions">
                    <a onClick={() => onSelect(ensayo.idAssay)}>Dashboard</a>
                    <a onClick={()=>onQrs(ensayo.idAssay)}>QRs</a>
                    <a onClick={() => onRemove(ensayo.idAssay)}>Eliminar</a>
                </div>
            </div>

        </div>
    )
}

export default Ensayo;