export default function closeChatTabHandler(
  setdisableMenuToggle: React.Dispatch<React.SetStateAction<boolean>>,
  chatRef: React.RefObject<HTMLDivElement>
) {
  return () => {
    setdisableMenuToggle(false);
    chatRef.current?.classList.remove('active');
  };
}
