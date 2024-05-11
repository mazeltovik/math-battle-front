import { useContext } from 'react';
import SidebarContext from '../contexts/sidebarContext';

const useSidebar = () => useContext(SidebarContext);

export default useSidebar;
