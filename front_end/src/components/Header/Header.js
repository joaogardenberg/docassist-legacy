import React          from 'react';
import                     './Header.scss';
import SidebarToggler from './SidebarToggler/SidebarToggler';
import HeaderBrand    from './HeaderBrand/HeaderBrand';
import HeaderNav      from './HeaderNav/HeaderNav';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="nav-wrapper">
        <SidebarToggler />
        <HeaderBrand />
        <HeaderNav />
      </nav>
    </header>
  );
}

export default Header;
