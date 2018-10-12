import React from 'react';
import * as Toast from '../../../common/Toast';

const SidebarToggler = () => {
  const onTogglerClick = () => Toast.info('Adicionar Redux e fazer o action creator para abrir o menu.');

  return (
    <button className="waves-effect sidebar-toggler" type="button" onClick={ onTogglerClick }>
      <i className="fa fa-bars"></i>
    </button>
  );
}

export default SidebarToggler;
