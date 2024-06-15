export default function reqForConnecting(
  setAmoutOfAwaiters: React.Dispatch<React.SetStateAction<number>>
) {
  return function (amoutOfAwaiters: number) {
    setAmoutOfAwaiters(amoutOfAwaiters);
  };
}
