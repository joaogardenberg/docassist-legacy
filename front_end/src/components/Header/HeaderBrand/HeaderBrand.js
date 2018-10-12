import React      from 'react';
import * as Toast from '../../../common/Toast';

const HeaderBrand = () => {
  const onLogoClick = () => Toast.info('Adicionar router e fazer o link.');

  return (
    <a className="my brand-logo waves-effect waves-light" href="#!" onClick={ onLogoClick }>
      {/* <img src="https://via.placeholder.com/350x150" /> */}
      <h1>DocAssist</h1>
    </a>
  );
}

export default HeaderBrand;
