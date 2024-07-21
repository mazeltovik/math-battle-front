export default function closeChatTabHandler(
  setdisableMenuToggle: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveChat: React.Dispatch<React.SetStateAction<boolean>>,
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setAmountMessages: React.Dispatch<React.SetStateAction<number>>,
  chatRef: React.RefObject<HTMLDivElement>
) {
  return () => {
    setdisableMenuToggle(false);
    setActiveChat(false);
    setNewMessage(false);
    setAmountMessages(0);
    chatRef.current?.classList.remove('active');
  };
}
