import React, { Component } from 'react';

const SidebarItem = props => {
  const { active, iconClass, link, name } = props;

  return (
    <li className={ `link ${active ? ' active' : ''}` }>
      <a href={ link } className="ripple">
        <i className={ iconClass } />
        <span>{ name }</span>
      </a>
    </li>
  );
}

export default SidebarItem;
