import { Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../socket/socketTypes';

export default function aproveAwaiter(
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
) {
  return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    if (target.tagName != 'BUTTON') return;
    const btnParent = target.parentElement;
    if (btnParent) {
      const parentNode = btnParent.parentElement;
      if (parentNode) {
        console.log(parentNode.id);
      }
    }
  };
}
