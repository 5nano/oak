import * as React from 'react'
import {ITreatment} from '../../../Interfaces/ITreatment'
import Button from '../../Utilities/Buttons/DefaultButton/Button';
import BushService from '../../../services/bush';
var html2canvas = require('html2canvas')
var jsPDF = require( 'jspdf');

var QrCode = require('qrcode.react');

export interface ITreatmentQrsProps {
    treatment: ITreatment
}

const TreatmentQrs:React.SFC<ITreatmentQrsProps> = (props) => {
    const {treatment} = props;

    const downloadPdf = () => {
      getPdf().then((pdf) => {
        pdf.save(`QRs: ${treatment.name}`);
      })
    }
    const sendQrsToEmail = () => {

      const payload = document.getElementById("treatments-qrs")
      html2canvas(payload)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData,'JPEG',0,0);
          let htmlToSend = {
            payload: pdf.output('datauristring')
          }

          console.log(htmlToSend)
          BushService.post(`/mailSender?treatmentName=${treatment.name}&&assayName=harcodeado`,htmlToSend)

        })
    }

    const getPdf = ():Promise<any> => {
      return html2canvas(document.getElementById("treatments-qrs"))
              .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData,'JPEG',0,0);
                return pdf
              })
    }
    return(
            <div className="treatment-qrs-container">
              <Button title="Descargar PDF" onClick={()=>downloadPdf()}/>
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