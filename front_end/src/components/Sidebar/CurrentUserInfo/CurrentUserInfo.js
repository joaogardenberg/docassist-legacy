import React                  from 'react';
import { connect as Connect } from 'react-redux';
import { closeSidebar }       from '../../../actions';

const CurrentUserInfo = props => {
  const { imageUrl, backgroundImageUrl, closeSidebar, sidebar } = props;
  const onUserClick = () => closeSidebar(sidebar.open);
  const onImageError = ({ target }) => target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';

  return (
    <a
      className="current-user-info waves-effect waves-light"
      href="/usuario"
      style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'url(https://placeimg.com/536/129/any)' }}
      onClick={ onUserClick }
    >
      <img
        src={ imageUrl ? imageUrl : '' }
        alt="Foto do usuário"
        onError={ onImageError }
      />
      <span className="name">Usuário atual</span>
      <span className="new badge" data-badge-caption="">Editar</span>
    </a>
  );
}

function mapStateToProps({ sidebar }) {
  return { sidebar };
}

export default Connect(mapStateToProps, { closeSidebar })(CurrentUserInfo);
