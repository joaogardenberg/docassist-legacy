import React                    from 'react';
import                               './App.scss';
import Sidebar                  from '../Sidebar/Sidebar';
import Container                from '../Container/Container';
import { ToastContainer, Flip } from 'react-toastify';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <Container />
      <ToastContainer transition={ Flip } className="toastify-container" />
    </div>
  );
}

export default App;
