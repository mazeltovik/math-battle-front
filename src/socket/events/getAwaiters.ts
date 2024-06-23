import { Awaiter } from '../socketTypes';
export default function getAwaiters(
  setAwaiters: React.Dispatch<React.SetStateAction<Awaiter[]>>
) {
  return (data: Awaiter[]) => setAwaiters(data);
}
