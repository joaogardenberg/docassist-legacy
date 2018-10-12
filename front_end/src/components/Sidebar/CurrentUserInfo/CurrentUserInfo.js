import React      from 'react';
import * as Toast from '../../../common/Toast';

const CurrentUserInfo = props => {
  const { imageUrl } = props;
  const onUserClick = () => Toast.info('Adicionar router e fazer o link.');
  const onImageError = ({ target }) => target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';

  return (
    <a
      className="current-user-info waves-effect waves-light"
      href="#!"
      style={{ backgroundImage: 'url(http://informationcommunicationtechnology.com/wp-content/uploads/2018/06/Blue-Sky-Background.jpg)' }}
      onClick={ onUserClick }
    >
      <img
        src={ imageUrl ? imageUrl : '' }
        alt="Imagem do usuário"
        onError={ onImageError }
      />
    <span className="name">Usuário atual</span>
      <span className="new badge" data-badge-caption="">Editar</span>
    </a>
  );
}

export default CurrentUserInfo;
