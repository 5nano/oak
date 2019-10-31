import * as React from 'react'
import {ITreatment} from '../../../Interfaces/ITreatment'
import Button from '../../Utilities/Buttons/DefaultButton/Button';

var QrCode = require('qrcode.react');

export interface ITreatmentQrsProps {
    treatment: ITreatment
}

const TreatmentQrs:React.SFC<ITreatmentQrsProps> = (props) => {
    const {treatment} = props;
    return(
            <div className="treatment-qrs-container">
              <Button title="Imprimir" onClick={()=>window.print()}/>
              <div className="treatment-qrs">
                {treatment.qrs
                           .map(value => {
                                return (
                                <div className="qr-card">
                                    <div className="qr-title">
                                        ID: {value}
                                    </div>
                                    <QrCode id={value}
                                            value={value}
                                            size={200}
                                            level={"H"}
                                            includeMargin={true}
                                            />
                                </div>)
                                        }
                )}
              </div>
            </div>
    )
}

export default TreatmentQrs;