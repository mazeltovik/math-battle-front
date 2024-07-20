import { ReciveSendMessage } from '../socketTypes';
export default function getMessage(
  messages: ReciveSendMessage[],
  setMessages: React.Dispatch<React.SetStateAction<ReciveSendMessage[]>>
) {
  return (data: ReciveSendMessage) => {
    setMessages((messages) => [...messages, data]);
  };
}
