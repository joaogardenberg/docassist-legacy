import React from 'react';

const Multiple = props => {
  const { components, ...rest } = props;

  const temp = components.map(Component => {
    const name = Component.name === 'Connect' ? Component.WrappedComponent.name : Component.name;
    return <Component key={ name } { ...rest } />
  });

  temp.push(
    <div key="temp">
      <p>TODO:</p>
      <p>- Ajeitar modal no celular</p>
    </div>
  );

  return temp;
}

export default Multiple;
