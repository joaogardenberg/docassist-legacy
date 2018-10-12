import React      from 'react';
import * as Toast from '../../../common/Toast';

const SidebarItem = props => {
  const { active, iconClass, link, name } = props;
  const onLinkClick = () => Toast.info('Adicionar router e fazer o link.');

  return (
    <li className={ `link ${active ? ' active' : ''}` }>
      <a href={ link } className="waves-effect" onClick={ onLinkClick }>
        <i className={ iconClass } />
        <span className="name">{ name }</span>
      </a>
    </li>
  );
}

export default SidebarItem;
