import { Socket } from 'socket.io-client';
import { CreateRoomRes } from './createRoom';

export default function addCreatedRoom(
  userId: string,
  rooms: CreateRoomRes[],
  setRooms: React.Dispatch<React.SetStateAction<CreateRoomRes[]>>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) {
  return (data: CreateRoomRes) => {
    socket.emit('GET_ROOMS', { userId });
    setRooms([...rooms, data]);
  };
}
