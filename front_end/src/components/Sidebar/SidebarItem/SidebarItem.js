import React, { Component }    from 'react';
import { connect as Connect }  from 'react-redux';
import { closeSidebar }        from '../../../actions';
import { NavLink, withRouter } from 'react-router-dom';

class SidebarItem extends Component {
  render() {
    const { iconClass, path, name } = this.props;

    return (
      <li className="link">
        <NavLink
          className="waves-effect"
          activeClassName="active"
          to={ path }
          onClick={ this.onLinkClick.bind(this) }
        >
          <i className={ iconClass } />
          <span className="name">{ name }</span>
        </NavLink>
      </li>
    );
  }

  onLinkClick() {
    const { clickCallback, closeSidebar, sidebar } = this.props;

    if (clickCallback) {
      clickCallback();
    }

    closeSidebar(sidebar.open);
  }
}

function mapStateToProps({ sidebar }) {
  return { sidebar };
}

export default withRouter(Connect(mapStateToProps, { closeSidebar })(SidebarItem));
