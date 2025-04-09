import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';

export const AlertNotification = ({ open, onClose, message, severity = 'success' }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        icon={<CheckIcon fontSize="inherit" />}
        severity={severity}
        onClose={onClose}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}