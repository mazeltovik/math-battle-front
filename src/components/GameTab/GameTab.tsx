//Styles
import './GameTab.scss';

//Types
import { GameTabTypes } from './GameTabTypes';
import { ReciveSendMessage } from '../../socket/socketTypes';
//Images

//MUI
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Badge from '@mui/material/Badge';
//Components

//React
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
//Hooks

//Helpers

//Handlers
import activeGameTabHandler from '../../handlers/activeGameTab';
import disableGameTabHandler from '../../handlers/disableGameTab';
import closeChatTabHandler from '../../handlers/closeChatTab';
import sendMessage from '../../handlers/sendMessage';
import getMessage from '../../socket/events/getMessage';

export default function GameTab({ roomId, socketId, socket }: GameTabTypes) {
  const [activeTab, setActiveTab] = useState(false);
  const [disableMenuToggle, setdisableMenuToggle] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [messages, setMessages] = useState<ReciveSendMessage[]>([]);
  const [newMessage, setNewMessage] = useState(false);
  const [amountMessages, setAmountMessages] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const chatContainer = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  //Event listeners
  const getMessageCashed = useMemo(
    () =>
      getMessage(
        socketId,
        activeChat,
        setMessages,
        setNewMessage,
        setAmountMessages,
        chatContainer
      ),
    []
  );
  const getMessageHandler = useCallback(getMessageCashed, []);
  useEffect(() => {
    socket.on('SEND_MESSAGE', getMessageHandler);
    return () => {
      socket.off('SEND_MESSAGE', getMessageHandler);
    };
  }, []);
  return (
    <div className={activeTab ? 'tab active' : 'tab'}>
      <div className="chat" ref={chatRef}>
        <div
          className="close_chat"
          onClick={closeChatTabHandler(
            setdisableMenuToggle,
            setActiveChat,
            setNewMessage,
            setAmountMessages,
            chatRef
          )}
        >
          <DisabledByDefaultIcon
            sx={{
              color: '#bcccdc',
              cursor: 'pointer',
              width: '2rem',
              height: '2rem',
              ':hover': {
                color: '#bb2525',
                transition: '.3s',
              },
            }}
          />
        </div>
        <div className="chat_container" ref={chatContainer}>
          {messages.map((message) => {
            if (message.sender == socketId) {
              return (
                <div key={message.messageId} className="chat_bubble host">
                  <p>{message.message}</p>
                </div>
              );
            } else {
              return (
                <div key={message.messageId} className="chat_bubble">
                  <p>{message.message}</p>
                </div>
              );
            }
          })}
        </div>
        <div className="submit_container">
          <div className="send_form">
            <textarea
              placeholder="Message"
              className="textarea"
              ref={messageRef}
            ></textarea>
            <IconButton
              color="primary"
              aria-label="send message"
              sx={{
                background: '#ab7a5f',
                ':hover': {
                  background: '#453227',
                  transition: '.3s',
                },
              }}
              onClick={sendMessage(socketId, socket, roomId, messageRef)}
            >
              <SendIcon sx={{ color: 'white' }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div
        className={disableMenuToggle ? 'menuToggle disable' : 'menuToggle'}
        onClick={activeGameTabHandler(setActiveTab)}
      >
        {!activeTab && newMessage && <div className="bell-border"></div>}+
      </div>
      <div className="circularbg1"></div>
      <div className="circularbg2"></div>
      <div className="circular">
        <ul
          className="circle"
          onClick={disableGameTabHandler(
            setActiveTab,
            setdisableMenuToggle,
            setNewMessage,
            setAmountMessages,
            setActiveChat,
            chatRef
          )}
        >
          <li className="chatIcon">
            <Badge
              badgeContent={amountMessages}
              color="secondary"
              sx={{ rotate: '180deg' }}
            >
              <ChatIcon
                sx={{
                  opacity: '0.5',
                  ':hover': {
                    opacity: '1',
                    transition: '.3s ease-in-out',
                  },
                }}
              />
            </Badge>
          </li>
          <li className="leaveGameIcon">
            <ExitToAppIcon
              sx={{
                rotate: '180deg',
                opacity: '0.5',
                ':hover': {
                  opacity: '1',
                  transition: '.3s ease-in-out',
                  color: '#bb2525',
                },
              }}
            />
          </li>
          <li className="settingsIcon">
            <SettingsSuggestIcon
              sx={{
                rotate: '180deg',
                opacity: '0.5',
                ':hover': {
                  opacity: '1',
                  transition: '.3s ease-in-out',
                },
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
