import React           from 'react';

const CurrentUserInfo = () => {
  return (
    <a className="current-user-info ripple white-ripple" href="#!" style={{ backgroundImage: 'url(http://informationcommunicationtechnology.com/wp-content/uploads/2018/06/Blue-Sky-Background.jpg)' }}>
      <img className="rounded-circle img-fluid" src="https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png" alt="Imagem do usuário"/>
      <span>Usuário atual</span>
    </a>
  );
}

export default CurrentUserInfo;
