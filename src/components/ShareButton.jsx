import { IconButton, Snackbar, Alert } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

function ShareButton({ conversationId }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleShare = () => {
    if (navigator.share && conversationId) {
      const shareableLink = `${window.location.origin}/conversation/${conversationId}`;
      navigator.share({
        title: 'AI Conversation',
        text: 'Check out this conversation',
        url: shareableLink,
      }).catch((error) => {
        console.log('Error sharing', error);
        setSnackbar({ open: true, message: 'Error sharing the conversation.', severity: 'error' });
      });
    } else if (!conversationId) {
      setSnackbar({ open: true, message: 'No conversation to share. Please finish a conversation first.', severity: 'warning' });
    } else {
      setSnackbar({ open: true, message: 'Sharing not supported on this device.', severity: 'info' });
    }
  };

  return (
    <>
      <IconButton onClick={handleShare}>
        <ShareIcon />
        <span style={{marginLeft:'10px'}}> Share</span>
      </IconButton>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ShareButton;
