//Styles
import './awaitersPage.scss';

//Types
import { Awaiter } from '../../socket/socketTypes';
//Images

//MUI
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

//Components
import AwaiterCard from '../../components/awaiterCard/awaiterCard';
//React
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
//Hooks
import useSocket from '../../hooks/useSocket';
import useModal from '../../hooks/useModal';
//Helpers
import theme from '../../helpers/authTheme';
//Handlers
import aproveAwaiter from '../../handlers/aproveAwaiter';
import getAwaiters from '../../socket/events/getAwaiters';
import approveConnection from '../../socket/events/approveConnection';
//Socket
import { socket } from '../../socket/socket';

export default function AwaitersPage() {
  const { userId } = useSocket();
  const [awaiters, setAwaiters] = useState<Awaiter[]>([]);
  const { setOpenModal, setRollUp } = useModal();
  const navigate = useNavigate();
  const getAwaitersCashed = useMemo(() => getAwaiters(setAwaiters), []);
  const getAwaitersHandler = useCallback(getAwaitersCashed, []);
  const approveConnectionCashed = useMemo(
    () => approveConnection(navigate, setOpenModal, setRollUp),
    []
  );
  const approveConnectionHandler = useCallback(approveConnectionCashed, []);
  useEffect(() => {
    socket.on('GET_AWAITERS', getAwaitersHandler);
    socket.on('APPROVE_CONNECTION', approveConnectionHandler);
    socket.emit('GET_AWAITERS', {
      userId,
    });
    return () => {
      socket.off('GET_AWAITERS', getAwaitersHandler);
      socket.off('APPROVE_CONNECTION', approveConnectionHandler);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          mt: '1rem',
          mb: '1rem',
          padding: '1rem',
          bgcolor: 'brown.light',
          position: 'relative',
        }}
      >
        <div
          className="awaiters-container"
          onClick={aproveAwaiter(socket, userId)}
        >
          {awaiters.map((awaiter) => {
            return (
              <AwaiterCard
                key={awaiter.userId}
                userId={awaiter.userId}
                name={awaiter.name}
              />
            );
          })}
        </div>
      </Paper>
    </ThemeProvider>
  );
}
