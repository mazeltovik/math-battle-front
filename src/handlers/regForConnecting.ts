import { Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../socket/socketTypes';

export default function reqForConnecting(
  userId: string,
  openModal: boolean,
  rollUp: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setRollUp: React.Dispatch<React.SetStateAction<boolean>>,
  setTargetRoom: React.Dispatch<React.SetStateAction<string>>,
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
) {
  return (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const parent = target.offsetParent as HTMLDivElement;
    {
      if (parent && parent.id) {
        const roomId = parent.id;
        setOpenModal(true);
        setRollUp(false);
        setTargetRoom(roomId);
        if (!openModal) {
          setRollUp(false);
          setOpenModal(true);
        }
        if (!rollUp) {
          socket.emit('REQUEST_FOR_CONNECTING', {
            userId,
            roomId,
          });
        }
      }
    }
  };
}
