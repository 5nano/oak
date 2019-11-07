import * as React from 'react'
import {ITreatment} from '../../../Interfaces/ITreatment'
import Button from '../../Utilities/Buttons/DefaultButton/Button';
import BushService from '../../../services/bush';
import Loader from '../../Utilities/Loader/Loader';
import Success from '../../Utilities/Messages/Success';
import Error from '../../Utilities/Messages/Error';
var html2canvas = require('html2canvas')
var jsPDF = require( 'jspdf');

var QrCode = require('qrcode.react');

export interface ITreatmentQrsProps {
    treatment: ITreatment
    idAssay:string
}

const TreatmentQrs:React.SFC<ITreatmentQrsProps> = (props) => {
    const {treatment} = props;

    const [loading,setLoading] = React.useState(false)
    const [success,setSuccess] = React.useState(false)
    const [error,setError] = React.useState(false)

    const downloadPdf = () => {
      getPdf().then((pdf) => {
        pdf.save(`QRs: ${treatment.name}`);
        setLoading(false)
      })
    }

    const sendQrsToEmail = () => {
      getPdf().then(pdf => {
          let htmlToSend = {
            html: renderEmailTemplate(),
            base64pdf: pdf.output('datauristring').split(',')[1]
        }
    
        BushService.post(`/mailSender?treatmentName=${treatment.name}&&assayId=${props.idAssay}`,htmlToSend)
                  .then(()=> {
                    setLoading(false)
                    setSuccess(true)
                  })
                  .catch(error => {
                    setError(true)
                    setLoading(false)
                  })

      })
    }

    const getPdf = ():Promise<any> => {
      setSuccess(false)
      setError(false)
      setLoading(true)
      return html2canvas(document.getElementById("treatments-qrs"))
              .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData,'JPEG',0,0);
                return pdf
              })
    }


    const renderEmailTemplate = () => {`
      <div className="email-template">
          <div className="email-header">
            <h2>Hola!</h2>
          </div>
          <div className="email-content">
            <h1>Codigos QR del tratamiento {treatment.name}</h1>
            <p>
              Aquí le adjuntamos los códigos QR que solicitó. Recuerde pegar
              cada código QR en el recipiente correspondiente donde se sembró la planta 
              que desea identificar. 
            </p>
            <hr/>
            <div className="email-footer">
            <img src="../../../../assets/images/nanivo-logo.png"/>
            </div>
          </div>
        </div>`
    }
    return(
        loading? <Loader/> 
        :
        <div className="treatment-qrs-container">
          {success && <Success message="Los codigos QRs fueron enviados a tu correo electrónico"/>}
          {error && <Error message="Hubo un problema al enviar tus códigos QRs, intente más tarde"/>}
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