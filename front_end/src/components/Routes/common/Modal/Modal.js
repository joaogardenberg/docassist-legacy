import React, { Component }                    from 'react';
import { connect as Connect }                  from 'react-redux';
import { removeBodyOverflow, addBodyOverflow } from '../../../../actions';

class Modal extends Component {
  render() {
    const { title, children, fixedFooter, footerButtons } = this.props;

    return (
      <aside className="modal-container">
        <div className="overlay" />
        <div className={ `modal open${fixedFooter ? ' modal-fixed-footer' : ''}` }>
          <div className="modal-content">
            <h4>{ title }</h4>
            { children }
          </div>
          <div className="modal-footer">
            { footerButtons }
          </div>
        </div>
      </aside>
    );
  }

  componentDidMount() {
    this.props.removeBodyOverflow();
  }

  componentWillUnmount() {
    this.props.addBodyOverflow();
  }
}

export default Connect(null, { removeBodyOverflow, addBodyOverflow })(Modal);
