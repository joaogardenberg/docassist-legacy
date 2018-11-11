import React   from 'react';
import              './Container.scss';
import Header  from '../Header/Header';
import Content from './Content/Content';
import Footer  from '../Footer/Footer';

const Container = () => {
  return (
    <div className="app-container" style={{ overflow: 'hidden' }}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Container;
