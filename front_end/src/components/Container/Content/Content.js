import React      from 'react';
import                 './Content.scss';
import Routes     from '../../Routes/Routes';
import PageLoader from './PageLoader/PageLoader';

const Content = () => {
  return (
    <main className="page-content" style={{ overflow: 'hidden' }}>
      <Routes />
      <PageLoader />
    </main>
  );
}

export default Content;
