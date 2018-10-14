import React from 'react';

const Multiple = props => {
  const { components, ...rest } = props;

  return components.map(Component => {
    const name = Component.name === 'Connect' ? Component.WrappedComponent.name : Component.name;
    return <Component key={ name } { ...rest } />
  });
}

export default Multiple;
