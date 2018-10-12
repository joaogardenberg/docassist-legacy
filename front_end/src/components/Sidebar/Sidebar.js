import React           from 'react';
import                      './Sidebar.scss';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import SidebarItem     from './SidebarItem/SidebarItem';

const Sidebar = () => {
  return (
    <nav className="app-sidebar">
      <ul className="page-links">
        <CurrentUserInfo />
        <SidebarItem
          iconClass="fas fa-chart-line"
          link="#!"
          name="Dashboard"
        />
        <SidebarItem
          iconClass="fas fa-calendar-alt"
          link="#!"
          name="Consultas"
        />
        <SidebarItem
          iconClass="fas fa-address-card"
          link="#!"
          name="Pacientes"
        />
        <SidebarItem
          active={ true }
          iconClass="fas fa-users"
          link="#!"
          name="Usuários"
        />
      </ul>
    </nav>
  );
}

export default Sidebar;
