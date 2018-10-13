import React                  from 'react';
import { connect as Connect } from 'react-redux';
import { closeSidebar }       from '../../actions';
import                             './Sidebar.scss';
import CurrentUserInfo        from './CurrentUserInfo/CurrentUserInfo';
import SidebarItem            from './SidebarItem/SidebarItem';

const Sidebar = props => {
  const onOverlayClick = () => props.closeSidebar();

  return (
    <div className={ `app-sidebar${props.open ? ' open' : ''}` }>
      <nav>
        <ul className="page-links">
          <CurrentUserInfo />
          <SidebarItem
            iconClass="fas fa-chart-line"
            link="#!"
            name="Dashboard"
          />
          <SidebarItem
            active={ true }
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
            iconClass="fas fa-users"
            link="#!"
            name="Usuários"
          />
        </ul>
      </nav>
      <div className="overlay" onClick={ onOverlayClick } />
    </div>
  );
}

function mapStateToProps({ sidebar: { open } }) {
  return { open };
}

export default Connect(mapStateToProps, { closeSidebar })(Sidebar);
