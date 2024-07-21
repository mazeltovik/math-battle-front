import shakeNodes from '../helpers/shakeNodes';
export default function disableGameTabHandler(
  setActiveTab: React.Dispatch<React.SetStateAction<boolean>>,
  setdisableMenuToggle: React.Dispatch<React.SetStateAction<boolean>>,
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setAmountMessages: React.Dispatch<React.SetStateAction<number>>,
  setActiveChat: React.Dispatch<React.SetStateAction<boolean>>,
  chatRef: React.RefObject<HTMLDivElement>
) {
  return (event: React.FormEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName == 'UL') return;
    else {
      const parent = shakeNodes(target);
      const className = parent.classList.value;
      if (className == 'chatIcon') {
        chatRef.current?.classList.add('active');
        setActiveChat(true);
        setNewMessage(false);
        setAmountMessages(0);
      }
      setActiveTab(false);
      setdisableMenuToggle(true);
    }
  };
}
