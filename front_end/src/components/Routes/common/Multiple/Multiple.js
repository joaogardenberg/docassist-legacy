import React from 'react';

const Multiple = props => {
  const { components, ...rest } = props;

  const componentsToRender = components.map(Component => {
    const name = Component.name === 'Connect' ? Component.WrappedComponent.name : Component.name;
    return <Component key={ name } { ...rest } />
  });

  return (
    <div>
      { componentsToRender }
    </div>
  );
}

export default Multiple;
