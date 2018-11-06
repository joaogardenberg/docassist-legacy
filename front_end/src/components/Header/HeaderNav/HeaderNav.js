import React         from 'react';
import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import * as Toast    from '../../../common/Toast';
import Screenfull    from 'screenfull';

const HeaderNav = () => {
  const onLogoutClick = () => Toast.info('Fazer action creator para realizar o logout.');
  const onFullscreenClick = () => Screenfull.toggle();

  return (
    <ul className="header-nav right">
      <HeaderNavItem
        className="hide-on-small-only"
        iconClass="fas fa-expand"
        callback={ onFullscreenClick }
      />
      <HeaderNavItem
        iconClass="fas fa-sign-out-alt"
        callback={ onLogoutClick }
      />
    </ul>
  );
}

export default HeaderNav;
