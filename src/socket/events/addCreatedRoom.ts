import { Socket } from 'socket.io-client';
import {
  ReceiveCreatedRoom,
  ServerToClientEvents,
  ClientToServerEvents,
} from '../socketTypes';

export default function addCreatedRoom(
  userId: string,
  rooms: ReceiveCreatedRoom[],
  setRooms: React.Dispatch<React.SetStateAction<ReceiveCreatedRoom[]>>,
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
) {
  return (data: ReceiveCreatedRoom) => {
    socket.emit('GET_ROOMS', { userId });
    setRooms([...rooms, data]);
  };
}
