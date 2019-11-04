import * as React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/styles';
import { Theme, SnackbarContent, IconButton } from '@material-ui/core';
import clsx from 'clsx';

import { amber, green, red, blue } from '@material-ui/core/colors';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

export type FeedbackVariant= "success" | "warning" | "error" | "info";

export interface Feedback {
  variant:FeedbackVariant,
  message:string
}
export interface Props {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
  }

  const useStyles1 = makeStyles( ()=> ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: red[600],
    },
    info: {
      backgroundColor: blue[600],
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: "1",
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));
function MySnackbarContentWrapper(props: Props) {
    const classes = useStyles1(props);
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }

  export default MySnackbarContentWrapper;