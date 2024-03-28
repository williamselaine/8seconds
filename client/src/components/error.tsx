import { Alert, Snackbar, Slide } from '@mui/material';
import { MixerReducer } from '../types';
import { useSelector } from 'react-redux';

function Error() {
  const error = useSelector((state: MixerReducer) => state.error);
  return (
    <Snackbar
        open={!!error}
        autoHideDuration={6000}
        TransitionComponent={Slide}
    >
        <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
}

export default Error;