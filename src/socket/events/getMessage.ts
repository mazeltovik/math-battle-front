import { ReciveSendMessage } from '../socketTypes';
export default function getMessage(
  socketId: string | undefined,
  activeChat: boolean,
  setMessages: React.Dispatch<React.SetStateAction<ReciveSendMessage[]>>,
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setAmountMessages: React.Dispatch<React.SetStateAction<number>>,
  chatContainer: React.RefObject<HTMLDivElement>
) {
  return (data: ReciveSendMessage) => {
    if (!activeChat) {
      if (socketId != data.sender) {
        setAmountMessages((value) => value + 1);
        setNewMessage(true);
      }
    }
    setMessages((messages) => [...messages, data]);
    // console.log((chatContainer.current as HTMLDivElement).scrollTop);
    // console.log((chatContainer.current as HTMLDivElement).scrollHeight);
    // chatContainer!.current.scrollTo({
    //   top: (chatContainer.current as HTMLDivElement).scrollHeight,
    //   behavior: 'smooth',
    // });
    // console.log((chatContainer.current as HTMLDivElement).scrollTop);
    // console.log((chatContainer.current as HTMLDivElement).scrollHeight);
  };
}
