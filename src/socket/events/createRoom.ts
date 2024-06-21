import { ReceiveCreatedRoom, Err } from '../socketTypes';
export default function createRoom(
  setRoomConfig: React.Dispatch<
    React.SetStateAction<ReceiveCreatedRoom[] | null>
  >,
  setOpenRoomCard: React.Dispatch<React.SetStateAction<boolean>>,
  showErrorAlert: (text: string) => void,
  showWarningAlert: (text: string) => void
) {
  return (data: ReceiveCreatedRoom[] & Err) => {
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
