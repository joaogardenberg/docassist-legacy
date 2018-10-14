import React                  from 'react';
import { connect as Connect } from 'react-redux';
import { closeSidebar }       from '../../../actions';

const CurrentUserInfo = props => {
  const { imageUrl, closeSidebar, sidebar } = props;
  const onUserClick = () => closeSidebar(sidebar.open);
  const onImageError = ({ target }) => target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';

  return (
    <a
      className="current-user-info waves-effect waves-light"
      href="/usuário"
      style={{ backgroundImage: 'url(http://informationcommunicationtechnology.com/wp-content/uploads/2018/06/Blue-Sky-Background.jpg)' }}
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
