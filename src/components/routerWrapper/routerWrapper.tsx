import SidebarMenu from '../sidebarMenu/sidebarMenu';
import AlertPopup from '../alertPopup/alertPopup';
import { Outlet } from 'react-router-dom';
import './routerWrapper.scss';
export default function Wrapper() {
  return (
    <div className="main-wrapper">
      <SidebarMenu />
      <Outlet />
      <AlertPopup />
    </div>
  );
}
