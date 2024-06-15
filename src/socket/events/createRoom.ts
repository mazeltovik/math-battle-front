export type CreateRoomRes = {
  roomId: string;
  name: string;
  users: number;
  difficulty: number;
  isAllowedChat: boolean;
  time: string;
  connectedUsers: number;
};
type Err = {
  err: string;
  warning: string;
};
export default function createRoom(
  setRoomConfig: React.Dispatch<React.SetStateAction<CreateRoomRes[] | null>>,
  setOpenRoomCard: React.Dispatch<React.SetStateAction<boolean>>,
  showErrorAlert: (text: string) => void,
  showWarningAlert: (text: string) => void
) {
  return (data: CreateRoomRes[] & Err) => {
    if (data.length) {
      setRoomConfig(data);
      setOpenRoomCard(true);
    }
    if (data.err) {
      showErrorAlert(data.err);
    }
    if (data.warning) {
      showWarningAlert(data.warning);
    }
  };
}
