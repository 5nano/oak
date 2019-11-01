import * as React from 'react'
import {ITreatment} from '../../../Interfaces/ITreatment'
import Button from '../../Utilities/Buttons/DefaultButton/Button';
import BushService from '../../../services/bush';

var QrCode = require('qrcode.react');

export interface ITreatmentQrsProps {
    treatment: ITreatment
}

const TreatmentQrs:React.SFC<ITreatmentQrsProps> = (props) => {
    const {treatment} = props;
    const sendQrsToEmail = () => {
      const payload = {
        payload: document.getElementById("treatments-qrs").innerHTML
      }
      console.log(payload)
      console.log(treatment.qrs)
     // BushService.post(`/mailSender?treatmentName=${treatment.name}&&assayName=harcodeado`,payload)
    }
    return(
            <div className="treatment-qrs-container">
              <Button title="Imprimir" onClick={()=>window.print()}/>
              <Button title="Enviar por correo electrónico" onClick={()=>sendQrsToEmail()}/>

             <div id="treatments-qrs" className="treatment-qrs">
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
                                            renderAs={'svg'}
                                            />
                                </div>)
                                        }
                )}
              </div>
            </div>
    )
}

export default TreatmentQrs;