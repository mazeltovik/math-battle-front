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
//Components

//React
import { useState, useRef } from 'react';
//Hooks

//Helpers

//Handlers
import activeGameTabHandler from '../../handlers/activeGameTab';
import disableGameTabHandler from '../../handlers/disableGameTab';

export default function GameTab({}: GameTabTypes) {
  const [activeTab, setActiveTab] = useState(true);
  const [disableMenuToggle, setdisableMenuToggle] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  return (
    <div className={activeTab ? 'tab active' : 'tab'}>
      <div className="chat active" ref={chatRef}>
        <div className="chat_container">
          <div className="chat_bubble">
            <p>Hello Alex, Im process engineer. I like games and movies</p>
          </div>
          <div className="chat_bubble host">
            <p>Hello Nikita, Im process engineer. I like games and movies</p>
          </div>
          <div className="chat_bubble">
            <p>Hello Alex, Im process engineer. I like games and movies</p>
          </div>
          <div className="chat_bubble host">
            <p>Hello Nikita, Im process engineer. I like games and movies</p>
          </div>
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
        ref={toggleRef}
        onClick={activeGameTabHandler(setActiveTab)}
      >
        +
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
            <ChatIcon
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
