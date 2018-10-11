import React, { Component } from 'react';
import                           './Sidebar.scss';

class Sidebar extends Component {
  render() {
    return (
      <nav className="app-sidebar">
        <ul className="page-links">
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fa fa-cog" />
              <span>Item 1</span>
            </a>
          </li>
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fa fa-cog" />
              <span>Item 2</span>
            </a>
          </li>
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fa fa-cog" />
              <span>Item 3</span>
            </a>
          </li>
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fa fa-cog" />
              <span>Item 4</span>
            </a>
          </li>
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fa fa-cog" />
              <span>Item 5</span>
            </a>
          </li>
          <li className="active">
            <a href="#!" className="ripple" onClick={ this.onNavbarItemClick }>
              <i className="fa fa-cog" />
              <span>Item 6</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  onNavbarItemClick() {
    alert('Adicionar router e links para as páginas!');
  }
}

export default Sidebar;
