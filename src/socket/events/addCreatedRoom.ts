import { ReceiveCreatedRoom } from '../socketTypes';

export default function addCreatedRoom(
  userId: string,
  rooms: ReceiveCreatedRoom[],
  setRooms: React.Dispatch<React.SetStateAction<ReceiveCreatedRoom[]>>
) {
  return (data: ReceiveCreatedRoom) => {
    setRooms((rooms) => [...rooms, data]);
  };
}
