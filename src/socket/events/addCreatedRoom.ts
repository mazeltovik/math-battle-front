import { ReceiveCreatedRoom } from '../socketTypes';

export default function addCreatedRoom(
  setRooms: React.Dispatch<React.SetStateAction<ReceiveCreatedRoom[]>>
) {
  return (data: ReceiveCreatedRoom) => {
    setRooms((rooms) => [...rooms, data]);
  };
}
