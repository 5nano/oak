import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);


interface IToolbarProps{
    onZoomChange:any,
    zoom:any
}
 class Toolbar extends React.Component <IToolbarProps> {
    handleZoomChange = (e) => {
        if (this.props.onZoomChange) {
            this.props.onZoomChange(e.target.value)
        }
    }
    render() {
        const zoomRadios = ['Horas', 'Dias', 'Meses'].map((value) => {
            const isActive = this.props.zoom === value;
            return (
                <FormControlLabel
                    control={
                        <GreenCheckbox 
                            checked={isActive}
                            onChange={this.handleZoomChange}
                            value={value}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                            />
                    }
                    label={value}
                >
                </FormControlLabel>
            );

        });

        return (
            <div className="tool-bar">
                    { zoomRadios }
            </div>
        );
    }
}

export default Toolbar;