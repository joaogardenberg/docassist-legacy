import React       from 'react';
import                  './Sidebar.scss';

const Sidebar = () => {
  return (
    <nav className="app-sidebar">
      <ul className="page-links">
        <li className="active">
          <a href="#!" className="ripple">
            <i className="fa fa-cog" />
            <span>Item</span>
          </a>
        </li>
        <li>
          <a href="#!" className="ripple">
            <i className="fa fa-cog" />
            <span>Item</span>
          </a>
        </li>
        <li>
          <a href="#!" className="ripple">
            <i className="fa fa-cog" />
            <span>Item</span>
          </a>
        </li>
        <li>
          <a href="#!" className="ripple">
            <i className="fa fa-cog" />
            <span>Item</span>
          </a>
        </li>
        <li>
          <a href="#!" className="ripple">
            <i className="fa fa-cog" />
            <span>Item</span>
          </a>
        </li>
        <li>
          <a href="#!" className="ripple">
            <i className="fa fa-cog" />
            <span>Item</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
