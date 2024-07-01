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
import { useNavigate } from 'react-router-dom';
//Hooks
import useSocket from '../../hooks/useSocket';
import useModal from '../../hooks/useModal';
import useAlert from '../../hooks/useAlert';
//Helpers
import theme from '../../helpers/authTheme';
import getRooms from '../../socket/events/getRooms';
import addCreatedRoom from '../../socket/events/addCreatedRoom';
import updateConnectedUsers from '../../socket/events/updateConnectedUsers';
//Handlers
import reqForConnecting from '../../handlers/regForConnecting';
import approveConnection from '../../socket/events/approveConnection';
//Socket
import { socket } from '../../socket/socket';

export default function SearchPage() {
  const [rooms, setRooms] = useState<ReceiveCreatedRoom[]>([]);
  const { userId, setTargetRoom } = useSocket();
  const { setOpenModal, setRollUp, openModal, rollUp } = useModal();
  const { showWarningAlert } = useAlert();
  const navigate = useNavigate();

  //Memoize getRooms
  const getRoomsCashed = useMemo(() => getRooms(setRooms), []);
  const getRoomsHandler = useCallback(getRoomsCashed, []);

  //Memoize addCreatedRoom
  const addCreatedRoomCashed = useMemo(() => addCreatedRoom(setRooms), []);
  const addCreatedRoomHandler = useCallback(addCreatedRoomCashed, []);

  //Memoize approveConnection
  const approveConnectionCashed = useMemo(
    () => approveConnection(navigate, setOpenModal, setRollUp),
    []
  );
  const approveConnectionHandler = useCallback(approveConnectionCashed, []);

  // Memoize updated users
  const updateConnectedUsersCashed = useMemo(
    () => updateConnectedUsers(setRooms),
    []
  );
  const updateConnectedUsersHandler = useCallback(
    updateConnectedUsersCashed,
    []
  );

  useEffect(() => {
    socket.on('GET_ROOMS', getRoomsHandler);
    socket.on('ADD_CREATED_ROOM', addCreatedRoomHandler);
    socket.on('APPROVE_CONNECTION', approveConnectionHandler);
    socket.on('UPDATE_CONNECTED_USERS', updateConnectedUsersHandler);
    socket.emit('GET_ROOMS', {
      userId,
    });
    return () => {
      socket.off('GET_ROOMS', getRoomsHandler);
      socket.off('ADD_CREATED_ROOM', addCreatedRoomHandler);
      socket.off('APPROVE_CONNECTION', approveConnectionHandler);
      socket.off('UPDATE_CONNECTED_USERS', updateConnectedUsersHandler);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {rooms.length == 0 ? (
        <div className="empty-rooms">
          <p> the rooms have not been created</p>
        </div>
      ) : (
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
            overflow: 'auto',
          }}
          id={'scrollbar'}
        >
          <Stack
            onClick={reqForConnecting(
              userId,
              openModal,
              rollUp,
              setOpenModal,
              setRollUp,
              setTargetRoom,
              socket,
              showWarningAlert
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
      )}
    </ThemeProvider>
  );
}
