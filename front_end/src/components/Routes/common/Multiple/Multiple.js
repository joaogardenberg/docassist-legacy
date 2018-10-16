import React from 'react';

const Multiple = props => {
  const { components, ...rest } = props;

  const temp = components.map(Component => {
    const name = Component.name === 'Connect' ? Component.WrappedComponent.name : Component.name;
    return <Component key={ name } { ...rest } />
  });

  temp.push(
    <div key="temp">
      <p>Todo Usuários:</p>
      <p>- Fazer swipe para abrir/fechar sidebar;</p>
      <p>- Construir conteúdos dos modais;</p>
      <p>- Fazer funcionar como se tivesse back end, reiniciando tudo quando der refresh.</p>
    </div>
  );

  return temp;
}

export default Multiple;
