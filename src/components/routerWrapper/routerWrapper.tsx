import SidebarMenu from '../sidebarMenu/sidebarMenu';
import AlertPopup from '../alertPopup/alertPopup';
import { Modal } from '../modal/Modal';
import PendingOfConnection from '../modal/modals/pendingOfConnection';
import { Outlet } from 'react-router-dom';
import './routerWrapper.scss';
export default function Wrapper() {
  return (
    <div className="main-wrapper">
      <SidebarMenu />
      <Outlet />
      <AlertPopup />
      <Modal>
        <PendingOfConnection />
      </Modal>
    </div>
  );
}
