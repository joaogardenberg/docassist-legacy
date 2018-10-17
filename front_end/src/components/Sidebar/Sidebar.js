import React, { Component }                      from 'react';
import { connect as Connect }                    from 'react-redux';
import                                                './Sidebar.scss';
import CurrentUserInfo                           from './CurrentUserInfo/CurrentUserInfo';
import SidebarItem                               from './SidebarItem/SidebarItem';

import {
  openSidebar,
  closeSidebar
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
              path="/usuarios"
              name="Usuários"
            />
          </ul>
        </nav>
        <div className="overlay" onClick={ this.onOverlayClick.bind(this) } />
      </div>
    );
  }

  componentDidMount() {
    this.addResizeListener();
    this.addSwipeListeners();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkDimensions.bind(this));
    window.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    window.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    window.removeEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  onOverlayClick() {
    const { closeSidebar, open } = this.props;
    closeSidebar(open);
  }

  addResizeListener() {
    window.addEventListener('resize', this.checkDimensions.bind(this));
  }

  checkDimensions() {
    if (window.innerWidth >= 768) {
      this.onOverlayClick();
    }
  }

  addSwipeListeners() {
    window.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    window.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), false);

    this.resetVars();
  }

  handleTouchStart(event) {
    if (window.innerWidth < 768) {
      this.xDown = this.getTouches(event)[0].clientX;
      this.yDown = this.getTouches(event)[0].clientY;
    }
  }

  handleTouchEnd() {
    this.resetVars();
  }

  handleTouchMove(event) {
    if (!this.xDown || !this.yDown) {
        return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;
    let swipeHappened = false;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 100) {
            // Left swipe
            const { closeSidebar, open } = this.props;
            closeSidebar(open);
            swipeHappened = true;
        } else if (xDiff < -100) {
            // Right swipe
            // const { openSidebar } = this.props;
            // openSidebar();
            swipeHappened = true;
        }
    } else {
        if (yDiff > 100) {
            // Up swipe
            swipeHappened = true;
        } else if (yDiff < -100) {
            // Down swipe
            swipeHappened = true;
        }
    }

    if (swipeHappened) {
      this.resetVars();
    }
  }

  getTouches(event) {
    return event.touches ||
           event.originalEvent.touches;
  }

  resetVars() {
    this.xDown = null;
    this.yDown = null;
  }
}

function mapStateToProps({ sidebar }) {
  return sidebar;
}

export default Connect(mapStateToProps, { openSidebar, closeSidebar }, null, { pure: false })(Sidebar);
