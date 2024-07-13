//Styles
import './GameTab.scss';

//Types
import { GameTabTypes } from './GameTabTypes';

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
import { useState, useRef } from 'react';
//Hooks

//Helpers

//Handlers
import activeGameTabHandler from '../../handlers/activeGameTab';
import disableGameTabHandler from '../../handlers/disableGameTab';
import closeChatTabHandler from '../../handlers/closeChatTab';

export default function GameTab({}: GameTabTypes) {
  const [activeTab, setActiveTab] = useState(false);
  const [disableMenuToggle, setdisableMenuToggle] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  return (
    <div className={activeTab ? 'tab active' : 'tab'}>
      <div className="chat" ref={chatRef}>
        <div
          className="close_chat"
          onClick={closeChatTabHandler(setdisableMenuToggle, chatRef)}
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
        <div className="chat_container">
          <div className="chat_bubble">
            <p>Hello Alex, Im process engineer. I like games and movies</p>
          </div>
          <div className="chat_bubble host">
            <p>Hello Nikita, Im process engineer. I like games and movies</p>
          </div>
        </div>
        <div className="submit_container">
          <div className="send_form">
            <textarea placeholder="Message" className="textarea"></textarea>
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
        {!activeTab && <div className="bell-border"></div>}+
      </div>
      <div className="circularbg1"></div>
      <div className="circularbg2"></div>
      <div className="circular">
        <ul
          className="circle"
          onClick={disableGameTabHandler(
            setActiveTab,
            setdisableMenuToggle,
            chatRef
          )}
        >
          <li className="chatIcon">
            <Badge badgeContent={0} color="secondary" sx={{ rotate: '180deg' }}>
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
