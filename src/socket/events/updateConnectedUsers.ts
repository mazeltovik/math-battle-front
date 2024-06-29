import {
  ReceiveCreatedRoom,
  ReceiveUpdateConnectedUsers,
} from '../socketTypes';

export default function updateConnectedUsers(
  setRooms: React.Dispatch<React.SetStateAction<ReceiveCreatedRoom[]>>
) {
  return (data: ReceiveUpdateConnectedUsers) => {
    const { roomId, connectedUsers } = data;
    setRooms((rooms) =>
      rooms.map((room) => {
        if (room.roomId === roomId) {
          return { ...room, connectedUsers: connectedUsers };
        } else {
          return room;
        }
      })
    );
  };
}
