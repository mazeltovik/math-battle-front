export default function leaveAwaitingRoom(
  setAmoutOfAwaiters: React.Dispatch<React.SetStateAction<number>>
) {
  return function (data: { amountOfAwaiters: number }) {
    const { amountOfAwaiters } = data;
    setAmoutOfAwaiters(amountOfAwaiters);
  };
}
