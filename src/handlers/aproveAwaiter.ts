import { Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../socket/socketTypes';

export default function aproveAwaiter(
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  host: string
) {
  return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    if (target.tagName != 'BUTTON') return;
    const btnParent = target.parentElement;
    if (btnParent) {
      const parentNode = btnParent.parentElement;
      if (parentNode) {
        const foe = parentNode.id;
        socket.emit('APPROVE_CONNECTION', { host, foe });
      }
    }
  };
}
