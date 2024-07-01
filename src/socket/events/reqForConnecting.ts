import { Err } from '../socketTypes';
export default function reqForConnecting(
  setAmoutOfAwaiters: React.Dispatch<React.SetStateAction<number>>,
  showWarningAlert: (text: string) => void
) {
  return function (data: { amountOfAwaiters: number } & Err) {
    if (data.warning) {
      showWarningAlert(data.warning);
    } else {
      const { amountOfAwaiters } = data;
      setAmoutOfAwaiters(amountOfAwaiters);
    }
  };
}
