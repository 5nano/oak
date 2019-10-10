import * as React from 'react'
import ITreatment from '../../../Interfaces/ITreatment'

var QrCode = require('qrcode.react');

export interface ITreatmentQrsProps {
    treatment: ITreatment
}

const TreatmentQrs:React.SFC<ITreatmentQrsProps> = (props) => {
    const {treatment} = props;
    return(

        
            <div className="treatment-qrs-container">
              <div className="treatment-qrs-title">
                  Códigos QR del tratamiento {treatment.name}
              </div>

              <div className="treatment-qrs">
                {treatment.qrs
                           .map(value => {
                                return (
                                <div className="qr-card">
                                    <div className="qr-title">
                                        {value}
                                    </div>
                                    <QrCode id={value}
                                            value={value}
                                            size={150}
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