import './pendingOfConnection.scss';

//Hooks
import useModal from '../../../hooks/useModal';
import useSocket from '../../../hooks/useSocket';
//MUI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

//Helpers
import theme from '../../../helpers/authTheme';

//Socket
import { socket } from '../../../socket/socket';

export default function PendingOfConnection() {
  const { setOpenModal, setRollUp, openModal } = useModal();
  const { targetRoom, setTargetRoom, userId } = useSocket();
  return openModal ? (
    <div className="modal_container">
      <div className="modal_content">
        <ThemeProvider theme={theme}>
          <Paper>
            <Stack spacing={3} alignItems={'center'}>
              <div
                className="rollUp"
                onClick={() => {
                  setOpenModal(false);
                  setRollUp(true);
                }}
              >
                <p>—</p>
              </div>
              <p>You are trying to connect:</p>
              <CircularProgress sx={{ color: 'brown.main' }} />
              <Button
                variant="contained"
                type="submit"
                onClick={() => {
                  setOpenModal(false);
                  socket.emit('LEAVE_AWAITING_ROOM', { userId, targetRoom });
                  setTargetRoom('');
                }}
                sx={{
                  width: '100%',
                  ':hover': {
                    bgcolor: 'brown.dark',
                  },
                  bgcolor: 'brown.light',
                }}
              >
                Leave
              </Button>
            </Stack>
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  ) : (
    <div
      className="rollUp-container"
      onClick={() => {
        setRollUp(false);
        setOpenModal(true);
      }}
    >
      <LinearProgress sx={{ height: '10px', cursor: 'pointer' }} />
    </div>
  );
}
