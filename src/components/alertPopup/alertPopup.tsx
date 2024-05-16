import { Snackbar, Alert } from '@mui/material';
import useAlert from '../../hooks/useAlert';

const AlertPopup = () => {
  const { text, type, open, setOpen } = useAlert();

  const handleClose = () => {
    setOpen(false);
  };
  if (text && type) {
    return (
      <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
        <Alert
          severity={type}
          elevation={6}
          variant="filled"
          sx={{
            width: '100%',
          }}
          onClose={handleClose}
        >
          {text}
        </Alert>
      </Snackbar>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
