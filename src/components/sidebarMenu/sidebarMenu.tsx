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
import Badge from '@mui/material/Badge';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
//Components

//React
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
//Hooks
import useSidebar from '../../hooks/useSidebar';
import useAlert from '../../hooks/useAlert';
//Helpers
import reqForConnecting from '../../socket/events/reqForConnecting';
import leaveAwaitingRoom from '../../socket/events/leaveAwaitingRoom';
//Handlers
import activeSidebarHandler from '../../handlers/activeSidebar';
import menuItemHandler from '../../handlers/menuItemHandler';

//Socket
import { socket } from '../../socket/socket';

export default function SidebarMenu({}: sidebarMenuTypes) {
  const location = useLocation();
  const { active, setActive } = useSidebar();
  const { showWarningAlert } = useAlert();
  const [amoutOfAwaiters, setAmoutOfAwaiters] = useState(0);
  const menuParentRef = useRef<HTMLUListElement>(null);

  //Memoize reqForConnecting
  const reqForConnectingCashed = useMemo(
    () => reqForConnecting(setAmoutOfAwaiters, showWarningAlert),
    []
  );
  const reqForConnectingHandler = useCallback(reqForConnectingCashed, []);

  //Memoize leaveAwaitingRoom
  const leaveAwaitingRoomCashed = useMemo(
    () => leaveAwaitingRoom(setAmoutOfAwaiters),
    []
  );
  const leaveAwaitingRoomHandler = useCallback(leaveAwaitingRoomCashed, []);

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
    socket.on('REQUEST_FOR_CONNECTING', reqForConnectingHandler);
    socket.on('LEAVE_AWAITING_ROOM', leaveAwaitingRoomHandler);
    socket.on('REMOVE_AWAITER', (data) => {
      const { amountOfAwaiters: amount } = data;
      setAmoutOfAwaiters(amount);
    });
    return () => {
      if (childs) {
        const arrOfChilds = Array.from(childs);
        arrOfChilds.forEach((item) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });
      }
      socket.off('REQUEST_FOR_CONNECTING', reqForConnectingHandler);
      socket.off('LEAVE_AWAITING_ROOM', leaveAwaitingRoomHandler);
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
        <li className="list /awaiters">
          <NavLink to="/awaiters">
            <span className="icon">
              <Badge badgeContent={amoutOfAwaiters} color="secondary">
                <GroupAddIcon />
              </Badge>
            </span>
            <span className="text">Awaiters</span>
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
