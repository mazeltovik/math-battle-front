//Styles
import './createPage.scss';

//Types
import { ReceiveCreatedRoom } from '../../socket/socketTypes';
//Эманера
//Images

//MUI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//Components
import DifficultyRating from '../../components/difficultyRating/difficultyRating';
import RoomCard from '../../components/roomCard/roomCard';
//React
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//Hooks
import useSocket from '../../hooks/useSocket';
import useAlert from '../../hooks/useAlert';
import useModal from '../../hooks/useModal';
//Helpers
import theme from '../../helpers/authTheme';
//Handlers
import createRoom from '../../socket/events/createRoom';
import approveConnection from '../../socket/events/approveConnection';
//Socket
import { socket } from '../../socket/socket';

export default function CreatePage() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('30');
  const [difficulty, setDifficulty] = useState(2);
  const [isAllowedChat, setIsAllowedChat] = useState(false);
  const [isError, setIsError] = useState(false);
  const [roomConfig, setRoomConfig] = useState<ReceiveCreatedRoom[] | null>(
    null
  );
  const [openRoomCard, setOpenRoomCard] = useState(false);
  const { userId } = useSocket();
  const { showErrorAlert, showWarningAlert } = useAlert();
  const { setOpenModal, setRollUp } = useModal();
  const navigate = useNavigate();
  const createRoomCashed = useMemo(
    () =>
      createRoom(
        setRoomConfig,
        setOpenRoomCard,
        showErrorAlert,
        showWarningAlert
      ),
    []
  );
  const createRoomHandler = useCallback(createRoomCashed, []);
  const approveConnectionCashed = useMemo(
    () => approveConnection(navigate, setOpenModal, setRollUp),
    []
  );
  const approveConnectionHandler = useCallback(approveConnectionCashed, []);
  useEffect(() => {
    socket.on('GET_ROOM_BY_USER_ID', createRoomHandler);
    socket.on('CREATE_ROOM', createRoomHandler);
    socket.on('APPROVE_CONNECTION', approveConnectionHandler);
    socket.emit('GET_ROOM_BY_USER_ID', {
      userId,
    });
    return () => {
      socket.off('CREATE_ROOM', createRoomHandler);
      socket.off('GET_ROOM_BY_USER_ID', createRoomHandler);
      socket.off('APPROVE_CONNECTION', approveConnectionHandler);
    };
  }, []);
  const handleTimeChange = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (name.length == 0) {
      setIsError(true);
    }
    if (!roomConfig && name) {
      const socketRoomConfig = {
        userId,
        name,
        time,
        difficulty,
        isAllowedChat,
        connectedUsers: 1,
      };
      socket.emit('CREATE_ROOM', socketRoomConfig);
    }
    if (roomConfig) {
      showWarningAlert('You have already created room.');
    }
  };
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
        <div className="create-room-container">
          <form className="create-room-form">
            <Stack spacing={3}>
              <div className="nameContainer">
                <TextField
                  label="Please, write down the name of your room"
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (isError) {
                      setIsError(false);
                    }
                    setName(event.target.value);
                  }}
                  color="success"
                  sx={{ width: '100%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MeetingRoomIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                {isError && (
                  <Paper
                    sx={{
                      // width: '100%',
                      mr: '1rem',
                      padding: '10px',
                      bgcolor: 'cyan.light',
                      color: '#bb2525',
                      position: 'absolute',
                      zIndex: '3',
                    }}
                  >
                    Please write the correct name of your room
                  </Paper>
                )}
              </div>
              <FormControl variant="filled">
                <InputLabel
                  id="timeSelectLabel"
                  sx={{
                    '&.Mui-focused': {
                      color: '#2e7d32',
                    },
                  }}
                >
                  Please select a round time
                </InputLabel>
                <Select
                  labelId="timeSelectLabel"
                  id="timeSelect"
                  value={time}
                  onChange={handleTimeChange}
                  color="success"
                >
                  <MenuItem value={30}>Thirty Seconds</MenuItem>
                  <MenuItem value={45}>Forty Five Seconds</MenuItem>
                  <MenuItem value={60}>Sixty Seconds</MenuItem>
                </Select>
              </FormControl>
              <Stack spacing={2}>
                <p>Please select the difficulty of the game:</p>
                <DifficultyRating
                  defaultDifficulty={difficulty}
                  setDifficulty={setDifficulty}
                />
              </Stack>
              <Stack direction={'row'}>
                <p>Enable chat?</p>
                <Checkbox
                  value={isAllowedChat}
                  onClick={() => {
                    setIsAllowedChat(!isAllowedChat);
                  }}
                  sx={{
                    pt: 0,
                    pb: 0,
                    color: 'white',
                    '&.Mui-checked': {
                      color: 'cyan.dark',
                    },
                  }}
                />
              </Stack>
              <Button
                variant="contained"
                type="submit"
                // disabled={true}
                onClick={handleSubmit}
                sx={{
                  ':hover': {
                    bgcolor: 'cyan.dark',
                  },
                  bgcolor: 'cyan.light',
                  // width: { xs: '100%', sm: '40%' },
                }}
              >
                Create
              </Button>
            </Stack>
          </form>
        </div>
        {roomConfig && (
          <RoomCard
            roomId={roomConfig[0].roomId}
            open={openRoomCard}
            name={roomConfig[0].name}
            connectedUsers={roomConfig[0].connectedUsers}
            time={roomConfig[0].time}
            difficulty={roomConfig[0].difficulty}
            isAllowedChat={roomConfig[0].isAllowedChat}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
