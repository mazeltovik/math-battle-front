import { Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../socket/socketTypes';
import isFullRoom from '../helpers/isFullRoom';

export default function reqForConnecting(
  userId: string,
  openModal: boolean,
  rollUp: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setRollUp: React.Dispatch<React.SetStateAction<boolean>>,
  setTargetRoom: React.Dispatch<React.SetStateAction<string>>,
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  showWarningAlert: (text: string) => void
) {
  return (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const parent = target.offsetParent as HTMLDivElement;
    const [connectedUsersElem] =
      parent.getElementsByClassName('connectedUsers');
    const amoutOfUsers = connectedUsersElem.textContent;
    {
      if (parent && parent.id) {
        const roomId = parent.id;
        if (isFullRoom(amoutOfUsers)) {
          showWarningAlert('This room is full, try again later');
        } else {
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
    }
  };
}
