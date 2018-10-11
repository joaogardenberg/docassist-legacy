import React, { Component } from 'react';
import                           './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <nav className="navbar navbar-dark bg-primary">
          <button
            className="btn ripple navbar-toggle"
            type="button"
            onClick={ this.onNavbarToggleClick }
          >
            <i className="fa fa-bars"></i>
          </button>
          <a className="navbar-brand" href="#!" onClick={ this.onLogoClick }>
            <h1 className="ripple">DocAssist</h1>
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white ripple" href="#!" onClick={ this.onLogoutClick }>
                <span>Sair</span>
                <i className="fas fa-sign-out-alt" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  onNavbarToggleClick() {
    alert('Adicionar action creator para abrir a Sidebar!');
  }

  onLogoClick() {
    alert('Adicionar link para a página principal!');
  }

  onLogoutClick() {
    alert('Adicionar action creator para fazer logout!');
  }
}

export default Header;
