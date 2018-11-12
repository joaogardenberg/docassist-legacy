import React from 'react';

const Multiple = props => {
  const { components, ...rest } = props;

  const temp = components.map(Component => {
    const name = Component.name === 'Connect' ? Component.WrappedComponent.name : Component.name;
    return <Component key={ name } { ...rest } />
  });

  temp.push(
    <div key="temp" className="todo" onClick={ toggleTodo }>
      <i className="fas fa-times" onClick={ event => toggleTodo(event, true) }/>
      <h5>TODO</h5>
      <p>Terminar formulário do paciente</p>
      <p>Fazer página do paciente</p>
      <h5>NEXT</h5>
      <p>Fazer página das consultas</p>
      <p>Fazer back-end</p>
      <p>Fazer dashboard</p>
    </div>
  );

  function toggleTodo(event, close = false) {
    event.stopPropagation();

    if (close) {
      event.target.closest('.todo').classList.remove('show');
      event.target.closest('.todo').classList.add('closed');
    } else if (event.target.closest('.todo').offsetWidth === 70) {
      event.target.closest('.todo').classList.add('show');
    } else {
      event.target.closest('.todo').classList.remove('show');
    }
  }

  return temp;
}

export default Multiple;
