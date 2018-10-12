import React     from 'react';
import                './App.scss';
import Sidebar   from '../Sidebar/Sidebar';
import Container from '../Container/Container';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <Container />
    </div>
  );
}

export default App;
