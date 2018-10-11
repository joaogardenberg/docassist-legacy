import React from 'react';
import            './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-dark bg-primary">
        <button className="btn ripple navbar-toggle" type="button">
          <i className="fa fa-bars"></i>
        </button>
        <a className="navbar-brand" href="#!">
          <h1 className="ripple">DocAssist</h1>
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-white ripple" href="#!">
              <span>Sair</span>
              <i className="fa fa-sign-out" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
