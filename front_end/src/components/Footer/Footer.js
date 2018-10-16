import React from 'react';
import            './Footer.scss';

const Footer = () => {
  const initialYear = 2018;
  const todaysYear  = new Date().getFullYear();
  const yearInfo = `${initialYear}${todaysYear > initialYear ? `-${todaysYear}` : ''}`;

  return (
    <footer className="app-footer top-shadow">
      <p>&copy; { yearInfo } DocAssist. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
