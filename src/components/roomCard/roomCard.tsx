//Styles
import './roomCard.scss';

//Types
import { roomCardTypes } from './roomCardTypes';

//Images

//MUI
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatIcon from '@mui/icons-material/Chat';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
//Components

//React
import { useMemo } from 'react';
//Hooks

//Helpers
import getHex from '../../helpers/getHex';
//Handlers

export default function RoomCard({
  roomId,
  open,
  name,
  connectedUsers,
  time,
  difficulty,
  isAllowedChat,
}: roomCardTypes) {
  const bgHex = useMemo(() => getHex(), []);
  return (
    <div
      className={open ? 'card-container open' : 'card-container'}
      id={roomId}
    >
      <div className="overlay"></div>
      <div className="card-wrapper">
        <div className="icons">
          <MeetingRoomIcon />
          <hr />
          <SupervisedUserCircleIcon />
          <hr />
          <AccessTimeIcon />
          <hr />
          <SportsKabaddiIcon />
          <hr />
          <ChatIcon />
        </div>
        <div className="room-config">
          <p>{name}</p>
          <p>{connectedUsers}/2</p>
          <p>{`${time}s`}</p>
          <p>
            {difficulty == 1 ? (
              <SentimentVerySatisfiedIcon color="success" />
            ) : difficulty == 2 ? (
              <SentimentSatisfiedIcon color="warning" />
            ) : (
              <SentimentVeryDissatisfiedIcon color="error" />
            )}
          </p>
          <p>
            {isAllowedChat ? (
              <CheckCircleIcon sx={{ color: '#36b636' }} />
            ) : (
              <CancelIcon sx={{ color: '#bb2525' }} />
            )}
          </p>
        </div>
      </div>
      <Paper
        sx={{
          height: '6px',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          bgcolor: `#${bgHex}`,
        }}
      />
    </div>
  );
}
