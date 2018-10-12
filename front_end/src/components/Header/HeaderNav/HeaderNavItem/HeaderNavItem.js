import React      from 'react';
import * as Toast from '../../../../common/Toast';

const HeaderNavItem = props => {
  const { iconClass, link, name } = props;
  const onLogoutClick = () => Toast.info('Fazer action creator para realizar o logout.');

  return (
    <li className="nav-item">
      <a
        className="nav-link waves-effect waves-light"
        href={ link }
        onClick={ onLogoutClick }
      >
        <span className="name">{ name }</span>
        <i className={ iconClass } />
      </a>
    </li>
  );
}

export default HeaderNavItem;
