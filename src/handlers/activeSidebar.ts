export default function activeSidebarHandler(
  active: boolean,
  callback: React.Dispatch<React.SetStateAction<boolean>>
) {
  return () => {
    callback(!active);
  };
}
