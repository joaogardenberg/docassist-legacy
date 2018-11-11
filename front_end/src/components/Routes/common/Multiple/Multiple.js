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
      <p>Ajeitar modal no celular (ajeitou sozinho?)</p>
      <p>Terminar formulário do paciente</p>
      <p>Fazer página do paciente</p>
      <p>Abrir datepicker só com botão (pra ser opcional)</p>
      <p>Ajeitar scroll do modal no mobile</p>
    </div>
  );

  return temp;
}

export default Multiple;
