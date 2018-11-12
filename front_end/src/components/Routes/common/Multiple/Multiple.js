import React from 'react';

const Multiple = props => {
  const { components, ...rest } = props;

  const temp = components.map(Component => {
    const name = Component.name === 'Connect' ? Component.WrappedComponent.name : Component.name;
    return <Component key={ name } { ...rest } />
  });

  temp.push(
    <div key="temp" className="todo" onClick={ ({ target }) => target.closest('.todo').style = 'display: none' }>
      <h5>TODO</h5>
      <p>Terminar formulário do paciente</p>
      <p>Fazer página do paciente</p>
      <h5>NEXT</h5>
      <p>Fazer página das consultas</p>
      <p>Fazer back-end</p>
      <p>Fazer dashboard</p>
    </div>
  );

  return temp;
}

export default Multiple;
