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
//Hooks
import useSocket from '../../hooks/useSocket';
import useModal from '../../hooks/useModal';
//Helpers
import theme from '../../helpers/authTheme';
//Handlers
import aproveAwaiter from '../../handlers/aproveAwaiter';
//Socket
import { socket } from '../../socket/socket';

export default function AwaitersPage() {
  const { socketId } = useSocket();
  const [awaiters, setAwaiters] = useState<Awaiter[]>([]);
  useEffect(() => {
    socket.on('GET_AWAITERS', (data: Awaiter[]) => {
      console.log(data);
      setAwaiters(data);
    });
    socket.emit('GET_AWAITERS', {
      userId: socketId,
    });
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
        <div className="awaiters-container" onClick={aproveAwaiter(socket)}>
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
