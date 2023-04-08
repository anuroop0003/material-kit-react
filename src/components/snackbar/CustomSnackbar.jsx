import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { toggleSnackbar } from '../../stateManagement/Slices/snackbarSlice';

const CustomizedAlert = styled(MuiAlert)({
  fontFamily: 'Cambria, Georgia, serif',
  fontSize: '1.25rem',
  fontWeight: 700,
  '.MuiAlert-icon': {
    alignItems: 'center',
    fontSize: '1.5rem',
  },
  // '.MuiAlert-message': {

  // }
});

// const Alert = forwardRef(function Alert(props, ref) {
//   return (
//     <CustomizedAlert elevation={6} ref={ref} variant="standard" {...props} />
//   );
// });

const Alert = forwardRef((props, ref) => ( <CustomizedAlert elevation={6} ref={ref} variant="standard" {...props} />));

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const { showSnackbar } = useSelector((state) => state);

  // console.log("showSnackbar", showSnackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      toggleSnackbar({
        isOpen: false,
        message: showSnackbar?.message,
        severity: showSnackbar?.severity,
      }),
    );
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      disableWindowBlurListener
      autoHideDuration={4000}
      open={showSnackbar?.isOpen}
      onClose={handleClose}
    >
      <Alert severity={showSnackbar?.severity} sx={{ width: '100%' }}>
        {showSnackbar?.message}
      </Alert>
    </Snackbar>
  );
}
