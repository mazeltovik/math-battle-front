import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../socket/socketTypes';
import { Socket } from 'socket.io-client';
export type GameTabTypes = {
  socketId: string | undefined;
  roomId: string;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
};
