import React, { Component }                      from 'react';
import { connect as Connect }                    from 'react-redux';
import                                                './Sidebar.scss';
import CurrentUserInfo                           from './CurrentUserInfo/CurrentUserInfo';
import SidebarItem                               from './SidebarItem/SidebarItem';

import {
  openSidebar,
  closeSidebar,
  openLoader,
  fetchUsers
} from '../../actions';

class Sidebar extends Component {
  render() {
    const { open } = this.props;

    return (
      <div className={ `app-sidebar${open ? ' open' : ''}` }>
        <nav className="right-shadow desktop-only">
          <ul className="page-links">
            <CurrentUserInfo />
            <SidebarItem
              iconClass="fas fa-chart-line"
              path="/dashboard"
              name="Dashboard"
            />
            <SidebarItem
              iconClass="fas fa-calendar-alt"
              path="/consultas"
              name="Consultas"
            />
            <SidebarItem
              iconClass="fas fa-address-card"
              path="/pacientes"
              name="Pacientes"
            />
            <SidebarItem
              iconClass="fas fa-users"
              path="/usuários"
              name="Usuários"
              clickCallback={ this.onUsersClick.bind(this) }
            />
          </ul>
        </nav>
        <div className="overlay" onClick={ this.onOverlayClick.bind(this) } />
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkDimensions.bind(this));
  }

  onUsersClick() {
    if (window.location.pathname.includes('/usu%C3%A1rios')) {
      this.props.openLoader();
      this.props.fetchUsers();
    }
  }

  onOverlayClick() {
    const { closeSidebar, open } = this.props;
    closeSidebar(open);
  }

  checkDimensions() {
    if (window.innerWidth >= 768) {
      this.onOverlayClick();
    }
  }
}

function mapStateToProps({ sidebar }) {
  return sidebar;
}

export default Connect(mapStateToProps, { openSidebar, closeSidebar, openLoader, fetchUsers }, null, { pure: false })(Sidebar);
