import { Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../socket/socketTypes';
export default function sendMessage(
  socketId: string | undefined,
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  roomId: string,
  messageRef: React.RefObject<HTMLTextAreaElement>
) {
  return () => {
    const message = messageRef.current?.value;
    if (message && socketId) {
      socket.emit('SEND_MESSAGE', { socketId, message, roomId });
    }
  };
}
