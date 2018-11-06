import React from 'react';

const HeaderNavItem = props => {
  const { className, iconClass, link, callback } = props;
  const onLogoutClick                            = callback;

  return (
    <li className={ `nav-item${className ? ` ${className}` : ''}` }>
      <a
        className="nav-link waves-effect waves-light"
        href={ link }
        onClick={ onLogoutClick }
      >
        <i className={ iconClass } />
      </a>
    </li>
  );
}

export default HeaderNavItem;
