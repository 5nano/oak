import * as React from 'react'
import Popover from '@material-ui/core/Popover';
import Button from '../Utilities/Buttons/DefaultButton/Button';

interface IAssayFeedbackProps{
    idAssay:Number,
    finishAssay:Function,
    closeFeedback:Function
}
const AssayFeedback:React.SFC<IAssayFeedbackProps> = (props) => {

    const [anchorEl,setAnchorEl] = React.useState(document.getElementById('home-searcher'))
    
    const [feedbackComment,setFeedbackComment] = React.useState<string>('')
    const handleClose = () => {
        setAnchorEl(null)
        props.closeFeedback()
    }

    const open = Boolean(anchorEl)
    const id= open? 'feedback-popover' : undefined;
    return (
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
    >
        <div className="feedback-container">
            <div className="feedback-stars">
                <div className="stars-title">
                    Califica tu ensayo
                </div>
                <div className="stars">

                </div>
            </div>
            <div className="feedback-comments">
            <textarea
                  id='feedback-comment'
                  value={feedbackComment}
                  placeholder='Ingresa un comentario sobre la experiencia del ensayo'
                  onChange={
                    (e: React.FormEvent<HTMLTextAreaElement>) =>
                      setFeedbackComment( e.currentTarget.value ) 
                  }
                  className="multitext"
                />
            </div>
            <Button title="Finalizar ensayo" onClick={()=>props.finishAssay()}/>
            <Button title="Cancelar" onClick={()=> handleClose()}/>
        </div>
    </Popover>
    )
}

export default AssayFeedback;