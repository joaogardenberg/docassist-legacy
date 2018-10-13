import React                  from 'react';
import { connect as Connect } from 'react-redux';
import { openSidebar }        from '../../../actions/Sidebar';

const SidebarToggler = props => {
  const onTogglerClick = () => props.openSidebar();

  return (
    <button className="waves-effect sidebar-toggler" type="button" onClick={ onTogglerClick }>
      <i className="fa fa-bars"></i>
    </button>
  );
}

export default Connect(null, { openSidebar })(SidebarToggler);
