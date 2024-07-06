//Styles
import './GameTab.scss';

//Types
import { GameTabTypes } from './GameTabTypes';

//Images

//MUI
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
//Components

//React
import { useState, useRef } from 'react';
//Hooks

//Helpers

//Handlers
import activeGameTabHandler from '../../handlers/activeGameTab';

export default function GameTab({}: GameTabTypes) {
  const toggleRef = useRef<HTMLDivElement>(null);
  return (
    <div className="tab">
      <div
        className="menuToggle"
        ref={toggleRef}
        onClick={activeGameTabHandler(toggleRef)}
      >
        +
      </div>
      <div className="circularbg1"></div>
      <div className="circularbg2"></div>
      <div className="circular">
        <ul className="circle">
          <li>
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
          <li>
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
          <li>
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
