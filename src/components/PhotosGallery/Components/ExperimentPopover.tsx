import * as React from 'react';
import { ITest} from '../../../Interfaces/Experimento';
import { Popover } from '@material-ui/core';
interface IExperimentPopoverProps{
    experiment:ITest;
    closeExperimentImage:Function
}
const ExperimentPopover:React.SFC<IExperimentPopoverProps> = (props) => {
    const {experiment,closeExperimentImage} = props;
    const [anchorEl,setAnchorEl] = React.useState(document.getElementById('gallery-container'))

    const open = Boolean(anchorEl)
    const id= open? 'experiment-popover' : undefined;
    
    const handleClose = () => {
        setAnchorEl(null)
        closeExperimentImage()
    }
    return(
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
        vertical: 'bottom',
        horizontal: 'center',
        }}
     >
      <div className="experiment-popover-container">
          <div className="experiment">
            <div className="experiment-image">
                <img src={experiment.pathImage}/>
            </div>
            <div className="experiment-content">
                <h1>Fecha de imagen: </h1>
                <h2>{experiment.timestamp}</h2>
                <h1>Altura: </h1>
                <h2>{experiment.height} px</h2>
                <h1>Ancho: </h1>
                <h2>{experiment.width} px</h2>
                <h1>Area: </h1>
                <h2>{experiment.area} px</h2>
            </div>
          </div>
      </div>
    </Popover>
    )
}

export default ExperimentPopover;