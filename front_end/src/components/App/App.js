import React, { Component } from 'react';
import                           './App.scss';
import Sidebar              from '../Sidebar/Sidebar';
import Container            from '../Container/Container';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <Container />
      </div>
    );
  }
}

export default App;
