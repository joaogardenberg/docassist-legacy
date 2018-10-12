import React         from 'react';
import HeaderNavItem from './HeaderNavItem/HeaderNavItem';

const HeaderNav = () => {
  return (
    <ul className="header-nav right">
      <HeaderNavItem
        iconClass="fas fa-sign-out-alt"
        link="#!"
        name="Sair"
      />
    </ul>
  );
}

export default HeaderNav;
