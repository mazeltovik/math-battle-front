//Styles
import './searchPage.scss';

//Types
import { ReceiveCreatedRoom } from '../../socket/socketTypes';
//Images

//MUI
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
//Components
import RoomCard from '../../components/roomCard/roomCard';
//React
import { useState, useEffect, useCallback, useMemo } from 'react';
//Hooks
import useSocket from '../../hooks/useSocket';
import useModal from '../../hooks/useModal';
//Helpers
import theme from '../../helpers/authTheme';
import getRooms from '../../socket/events/getRooms';
import addCreatedRoom from '../../socket/events/addCreatedRoom';
//Handlers
import reqForConnecting from '../../handlers/regForConnecting';
//Socket
import { socket } from '../../socket/socket';

export default function SearchPage() {
  const [rooms, setRooms] = useState<ReceiveCreatedRoom[]>([]);
  const { userId, setTargetRoom } = useSocket();
  const { setOpenModal, setRollUp, openModal, rollUp } = useModal();
  const getRoomsCashed = useMemo(() => getRooms(setRooms), []);
  const getRoomsHandler = useCallback(getRoomsCashed, []);
  const addCreatedRoomCashed = useMemo(
    () => addCreatedRoom(userId, rooms, setRooms, socket),
    []
  );
  const addCreatedRoomHandler = useCallback(addCreatedRoomCashed, []);
  useEffect(() => {
    socket.on('GET_ROOMS', getRoomsHandler);
    socket.on('ADD_CREATED_ROOM', addCreatedRoomHandler);
    socket.emit('GET_ROOMS', {
      userId,
    });
    return () => {
      socket.off('GET_ROOMS', getRoomsHandler);
      socket.off('ADD_CREATED_ROOM', addCreatedRoomHandler);
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
        <Stack
          onClick={reqForConnecting(
            userId,
            openModal,
            rollUp,
            setOpenModal,
            setRollUp,
            setTargetRoom,
            socket
          )}
        >
          {rooms.map((room) => {
            return (
              <RoomCard
                key={room.roomId}
                roomId={room.roomId}
                name={room.name}
                open={true}
                connectedUsers={room.connectedUsers}
                time={room.time}
                difficulty={room.difficulty}
                isAllowedChat={room.isAllowedChat}
              />
            );
          })}
        </Stack>
      </Paper>
    </ThemeProvider>
  );
}
