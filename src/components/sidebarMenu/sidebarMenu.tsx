//Styles
import './sidebarMenu.scss';

//Types
import { sidebarMenuTypes } from './sidebarMenuTypes';

//Images

//MUI
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
//Components

//React
import { useRef } from 'react';
//Hooks
import useSidebar from '../../hooks/useSidebar';
//Helpers

//Handlers
import activeSidebarHandler from '../../handlers/activeSidebar';
import menuItemHandler from '../../handlers/menuItemHandler';

export default function SidebarMenu({}: sidebarMenuTypes) {
  const { active, setActive } = useSidebar();
  const menuParentRef = useRef<HTMLUListElement>(null);
  return (
    <div className={active ? 'navigation active' : 'navigation'}>
      <div
        className="menuToogle"
        onClick={activeSidebarHandler(active, setActive)}
      >
        {active ? (
          <CloseIcon fontSize="large" sx={{ color: '#bb2525' }}></CloseIcon>
        ) : (
          <MenuIcon
            fontSize="large"
            sx={{
              color: 'brown.main',
            }}
          ></MenuIcon>
        )}
      </div>
      <ul ref={menuParentRef} onClick={menuItemHandler(menuParentRef)}>
        <li className="list active">
          <a href="#">
            <span className="icon">
              <HomeIcon />
            </span>
            <span className="text">Home</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <SearchIcon />
            </span>
            <span className="text">Search</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <MeetingRoomIcon/>
            </span>
            <span className="text">Create</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <EmojiEventsIcon />
            </span>
            <span className="text">Achievements</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <SettingsSuggestIcon />
            </span>
            <span className="text">Setting</span>
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <PersonIcon />
            </span>
            <span className="text">Author</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
