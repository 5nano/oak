import * as React from 'react'
import Popover from '@material-ui/core/Popover';
import Button from '../Utilities/Buttons/DefaultButton/Button';
import Rating from '@material-ui/lab/Rating';
import { setFlagsFromString } from 'v8';

interface IAssayFeedbackProps{
    idAssay:Number,
    finishAssay:Function,
    closeFeedback:Function
}
const AssayFeedback:React.SFC<IAssayFeedbackProps> = (props) => {

    const [anchorEl,setAnchorEl] = React.useState(document.getElementById('home'))
    
    const [feedbackComment,setFeedbackComment] = React.useState<string>('')
    const [rating,setRating] = React.useState<number>(null)
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
                    <Rating 
                        name="assay-feedback"
                        size="large"
                        value={rating}
                        onChange={(event,newValue) => setRating(newValue)}
                    />
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
                  style={{resize:'none'}}
                />
            </div>
            <Button title="Finalizar ensayo" onClick={()=>props.finishAssay(rating,feedbackComment)}/>
            <Button title="Cancelar" onClick={()=> handleClose()}/>
        </div>
    </Popover>
    )
}

export default AssayFeedback;