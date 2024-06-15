import { CreateRoomRes } from './createRoom';

export default function getRooms(
  setRooms: React.Dispatch<React.SetStateAction<CreateRoomRes[]>>
) {
  return (data: CreateRoomRes[]) => setRooms(data);
}
