import React    from 'react';
import { Link } from 'react-router-dom';

const HeaderBrand = () => {
  return (
    <Link to="/dashboard" className="my brand-logo waves-effect waves-light">
      {/* <img src="https://via.placeholder.com/350x150" /> */}
      <h1>DocAssist</h1>
    </Link>
  );
}

export default HeaderBrand;
