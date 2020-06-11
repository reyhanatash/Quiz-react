import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
        className="preview-file"
      >
        <DialogTitle id="responsive-dialog-title">{props.name}</DialogTitle>
        <DialogContent>
          <DialogContentText className="d-flex flex-column align-items-start p-2">
            {props.fileType && props.fileType.includes('image') ? (
              <img
                src={props.base64data}
                alt={props.name}
                className="align-self-center"
              />
            ) : props.fileType && props.fileType.includes('audio') ? (
              <audio
                src={props.base64data}
                controls
                controlsList="nodownload"
              ></audio>
            ) : props.fileType && props.fileType.includes('video') ? (
              <video
                src={props.base64data}
                controls
                controlsList="nodownload"
              ></video>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="justify-content-start">
          <Button
            onClick={props.handleClose}
            color="primary"
            autoFocus
            className="btn-light col-lg-2 col-md-12 "
          >
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
