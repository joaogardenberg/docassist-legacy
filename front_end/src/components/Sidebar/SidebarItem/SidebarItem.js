import React                  from 'react';
import { connect as Connect } from 'react-redux';
import { closeSidebar }       from '../../../actions';

const SidebarItem = props => {
  const { active, iconClass, link, name, closeSidebar } = props;
  const onLinkClick = () => closeSidebar();

  return (
    <li className={ `link ${active ? ' active' : ''}` }>
      <a href={ link } className="waves-effect" onClick={ onLinkClick }>
        <i className={ iconClass } />
        <span className="name">{ name }</span>
      </a>
    </li>
  );
}

export default Connect(null, { closeSidebar })(SidebarItem);
