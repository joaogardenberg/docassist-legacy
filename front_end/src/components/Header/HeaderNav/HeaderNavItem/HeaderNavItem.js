import React          from 'react';

const HeaderNavItem = props => {
  const { iconClass, link, name } = props;

  return (
    <li className="nav-item">
      <a className="nav-link text-white ripple white-ripple" href={ link }>
        <span>{ name }</span>
        <i className={ iconClass } />
      </a>
    </li>
  );
}

export default HeaderNavItem;
