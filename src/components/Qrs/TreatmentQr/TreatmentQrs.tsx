import * as React from 'react'
import {ITreatment} from '../../../Interfaces/ITreatment'
import Button from '../../Utilities/Buttons/DefaultButton/Button';
import BushService from '../../../services/bush';
import Loader from '../../Utilities/Loader/Loader';
import MySnackbarContentWrapper, { Feedback } from '../../Feedback/MySnackbarContentWrapper';
import { Snackbar } from '@material-ui/core';
import { IEnsayo } from '../../../Interfaces/IEnsayo';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import MailIcon from '@material-ui/icons/Mail';
var html2canvas = require('html2canvas')
var jsPDF = require( 'jspdf');

var QrCode = require('qrcode.react');

export interface ITreatmentQrsProps {
    treatment: ITreatment
    assay:IEnsayo
}

const TreatmentQrs:React.SFC<ITreatmentQrsProps> = (props) => {
    const {treatment} = props;

    const [loading,setLoading] = React.useState(false)
    const [feedback,setFeedback] = React.useState<Feedback>(null)

    const downloadPdf = () => {
      getPdf().then((pdf) => {
        pdf.save(`QRs - ${treatment.name}`);
        setLoading(false)
      })
    }

    const sendQrsToEmail = () => {
      getPdf().then(pdf => {
          let htmlToSend = {
            subject: `Códigos QR del tratamiento ${treatment.name}`,
            html:"<html><img src='https://i.ibb.co/4mJpcHr/qrs.jpg'></img></html>",
            base64pdf: pdf.output('datauristring').split(',')[1]
        }
    
        BushService.post("/mailSender",htmlToSend)
                  .then(()=> {
                    setLoading(false)
                    setFeedback({variant:'success',message:'Los códigos QR fueron enviados a tu correo electrónico'})
                  })
                  .catch(error => {
                    setLoading(false)
                    setFeedback({variant:'error',message:'Hubo un problema al enviar tus códigos QRs, intente más tarde'})
                  })

      })
    }

    const getPdf = ():Promise<any> => {
      setLoading(true)
      return html2canvas(document.getElementById("treatments-qrs"))
              .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData,'JPEG',0,0);
                return pdf
              })
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent,reason?:string) => {
      if (reason ==='clickaway') { 
          return;
      }
      setFeedback(null)
  }


    return(
        loading? <Loader/> 
        :
        <div className="treatment-qrs-container">
          <div className="qr-actions">
            <Button icon={PictureAsPdfIcon} title="Descargar" onClick={()=>downloadPdf()}/>
            <Button icon={MailIcon} title="Enviar por correo electrónico" onClick={()=>sendQrsToEmail()}/>
          </div>
          <div id="treatments-qrs" className="treatment-qrs">
            {treatment.qrs
                        .map(value => {
                            return (
                            <div className="qr-card">
                                <div className="qr-title">
                                    <p>E-{props.assay.name}</p>
                                    <p>T-{props.treatment.name}</p>
                                    <p>P-{value.split('-')[1]}</p>
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
          
          <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={feedback!=null}
                autoHideDuration={6000}
                onClose={handleSnackbarClose.bind(this)}
                >
                    <MySnackbarContentWrapper
                        onClose={handleSnackbarClose.bind(this)}
                        variant={feedback? feedback.variant : 'success'}
                        message={feedback? feedback.message:''}/>
                </Snackbar>

        </div>
    )
}

export default TreatmentQrs;