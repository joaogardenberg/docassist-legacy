import React, { Component } from 'react';
import                           './Sidebar.scss';

class Sidebar extends Component {
  render() {
    return (
      <nav className="app-sidebar">
        <ul className="page-links">
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fas fa-calendar-alt" />
              <span>Consultas</span>
            </a>
          </li>
          <li>
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fas fa-cog" />
              <span>Item 2</span>
            </a>
          </li>
          <li>
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fas fa-cog" />
              <span>Item 3</span>
            </a>
          </li>
          <li>
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fas fa-cog" />
              <span>Item 4</span>
            </a>
          </li>
          <li>
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fas fa-cog" />
              <span>Item 5</span>
            </a>
          </li>
          <li>
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fas fa-cog" />
              <span>Item 6</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  onNavbarItemClick() {
    // alert('Adicionar router e links para as páginas!');
  }
}

export default Sidebar;
