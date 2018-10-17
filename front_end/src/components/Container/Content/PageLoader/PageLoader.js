import React                       from 'react';
import { connect as Connect }      from 'react-redux';
import { openLoader, closeLoader } from '../../../../actions';
import                                  './PageLoader.scss';

const PageLoader = props => {
  const { active } = props;

  return (
    <div className={`page-loader ${active ? 'active' : 'inactive'}`}>
      <div className="spinner">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ loader }) {
  return loader;
}

export default Connect(mapStateToProps, { openLoader, closeLoader })(PageLoader);
