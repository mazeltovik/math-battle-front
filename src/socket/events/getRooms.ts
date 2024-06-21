import { ReceiveCreatedRoom } from '../socketTypes';

export default function getRooms(
  setRooms: React.Dispatch<React.SetStateAction<ReceiveCreatedRoom[]>>
) {
  return (data: ReceiveCreatedRoom[]) => setRooms(data);
}
