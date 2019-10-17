import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
import Button from '../../../Utilities/Buttons/DefaultButton/Button';
export interface IEnsayoProps{
    ensayo: IEnsayo
    onSelect: Function
    onQrs: Function
    onRemove: Function
}

const Ensayo:React.SFC<IEnsayoProps> = (props) => {

    const {ensayo,onSelect,onQrs,onRemove} = props;

    return(
        <div className="assay-wrapper">
            <div className="assay">
                <div className="assay-header">
                    {ensayo.name}
                </div>

                <div className="assay-components">
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

                <div className="assay-description">
                    <div className="title">Descripción</div>
                    <div className="content">{ensayo.description}</div>
                </div>

                <div className="assay-actions">
                    <div className="buttons">
                        <Button title="Dashboard"
                                className="action-button"
                                onClick={()=>onSelect(ensayo.idAssay)}
                            />
                        <Button title="QRs"
                                className="action-button"
                                onClick={()=>onQrs(ensayo.idAssay)}
                            />
                         <Button title="Eliminar"
                                className="action-button"
                                onClick={()=>onRemove(ensayo.idAssay)}
                            />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Ensayo;