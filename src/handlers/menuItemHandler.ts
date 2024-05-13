export default function menuItemHandler(
  active: boolean,
  callback: React.Dispatch<React.SetStateAction<boolean>>
) {
  return function () {
    if (active) {
      callback(false);
    } else return;
  };
}
