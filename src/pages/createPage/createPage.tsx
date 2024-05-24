//Styles
import './createPage.scss';

//Types

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
//React
import { useState, useEffect } from 'react';
//Hooks
import useSocket from '../../hooks/useSocket';
import useSome from '../../hooks/useSome';
//Helpers
import theme from '../../helpers/authTheme';
//Handlers

//Socket
import { socket } from '../../socket/socket';

export default function CreatePage() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('30');
  const [difficulty, setDifficulty] = useState(2);
  const [isAllowedChat, setIsAllowedChat] = useState(false);
  const [isError, setIsError] = useState(false);
  const { userId, socketId } = useSocket();
  useSome();
  useEffect(() => {
    socket.on('createRoom', (data) => console.log(data));
  }, []);
  const handleTimeChange = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (name.length == 0) {
      setIsError(true);
    }
    const roomConfig = {
      userId: '0a99aeb5-31d0-4c5c-8b25-047916266cba',
      socketId,
      name,
      time,
      difficulty,
      isAllowedChat,
    };
    socket.emit('createRoom', roomConfig);
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
      </Paper>
    </ThemeProvider>
  );
}
