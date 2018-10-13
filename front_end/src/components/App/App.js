import React                    from 'react';
import                               './App.scss';
import { BrowserRouter }        from 'react-router-dom';
import Sidebar                  from '../Sidebar/Sidebar';
import Container                from '../Container/Container';
import { ToastContainer, Flip } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
          <Sidebar />
          <Container />
          <ToastContainer transition={ Flip } className="toastify-container" />
      </div>
    </BrowserRouter>
  );
}

export default App;
