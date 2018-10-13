import React, { Component }          from 'react';
import { connect as Connect }        from 'react-redux';
import { openSidebar, closeSidebar } from '../../actions';
import                                    './Sidebar.scss';
import CurrentUserInfo               from './CurrentUserInfo/CurrentUserInfo';
import SidebarItem                   from './SidebarItem/SidebarItem';

class Sidebar extends Component {
  render() {
    const { open } = this.props;

    return (
      <div className={ `app-sidebar${open ? ' open' : ''}` }>
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

  onOverlayClick() {
    this.props.closeSidebar();
  }

  checkDimensions() {
    if (window.innerWidth >= 768) {
      this.props.closeSidebar();
    }
  }
}

function mapStateToProps({ sidebar: { open } }) {
  return { open };
}

export default Connect(mapStateToProps, { openSidebar, closeSidebar })(Sidebar);
