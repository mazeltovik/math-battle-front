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
import { useRef, useEffect } from 'react';
import { NavLink, useLocation, useHref } from 'react-router-dom';
//Hooks
import useSidebar from '../../hooks/useSidebar';
//Helpers

//Handlers
import activeSidebarHandler from '../../handlers/activeSidebar';
import menuItemHandler from '../../handlers/menuItemHandler';

export default function SidebarMenu({}: sidebarMenuTypes) {
  let location = useLocation();
  const { active, setActive } = useSidebar();
  const menuParentRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const { pathname } = location;
    const childs = menuParentRef.current?.children;
    if (childs) {
      const arrOfChilds = Array.from(childs);
      arrOfChilds.forEach((item) => {
        if (item.classList.contains(pathname)) {
          item.classList.add('active');
        }
      });
    }
    return () => {
      if (childs) {
        const arrOfChilds = Array.from(childs);
        arrOfChilds.forEach((item) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });
      }
    };
  }, [location]);
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
      <ul ref={menuParentRef} onClick={menuItemHandler(active, setActive)}>
        <li className="list /">
          <NavLink to="/">
            <span className="icon">
              <HomeIcon />
            </span>
            <span className="text">Home</span>
          </NavLink>
        </li>
        <li className="list /search">
          <NavLink to="/search">
            <span className="icon">
              <SearchIcon />
            </span>
            <span className="text">Search</span>
          </NavLink>
        </li>
        <li className="list /create">
          <NavLink to="/create">
            <span className="icon">
              <MeetingRoomIcon />
            </span>
            <span className="text">Create</span>
          </NavLink>
        </li>
        <li className="list /achievements">
          <NavLink to="/achievements">
            <span className="icon">
              <EmojiEventsIcon />
            </span>
            <span className="text">Achievements</span>
          </NavLink>
        </li>
        <li className="list /settings">
          <NavLink to="/settings">
            <span className="icon">
              <SettingsSuggestIcon />
            </span>
            <span className="text">Setting</span>
          </NavLink>
        </li>
        <li className="list /author">
          <NavLink to="/author">
            <span className="icon">
              <PersonIcon />
            </span>
            <span className="text">Author</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
