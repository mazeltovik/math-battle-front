//Styles
import './roomPage.scss';

//Types
//Images

//MUI

//Components
import GameTab from '../../components/GameTab/GameTab';
import CountdownTimer from '../../components/countdownTimer/countdownTimer';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
//React
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
//Hooks
import useSocket from '../../hooks/useSocket';
import useModal from '../../hooks/useModal';

//Helpers
import theme from '../../helpers/authTheme';
//Handlers

//Socket
import { socket } from '../../socket/socket';

export default function RoomPage() {
  const { pathname } = useLocation();
  const roomId = pathname.split('/')[2];
  const { socketId } = useSocket();
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
          height: '95vh',
        }}
      >
        <div className="game_container">
          <div className="timer_container">
            {/* <CountdownTimer
              seconds={30}
              size={200}
              strokeBgColor={'#324d67'}
              strokeColor={'#c5e4e7'}
              strokeWidth={10}
            /> */}
          </div>
          <div className="gameplay_container">Gameplay</div>
          <GameTab socketId={socketId} roomId={roomId} socket={socket} />
        </div>
      </Paper>
    </ThemeProvider>
  );
}
