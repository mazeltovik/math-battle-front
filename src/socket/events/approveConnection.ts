import { ReceiveApprovedConnection } from '../socketTypes';
import { NavigateFunction } from 'react-router-dom';

export default function approveConnection(
  navigate: NavigateFunction,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setRollUp: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (data: ReceiveApprovedConnection) => {
    if (data.status) {
      const { roomId } = data;
      setOpenModal(false), setRollUp(false);
      navigate(`/room/${roomId}`);
    }
  };
}
