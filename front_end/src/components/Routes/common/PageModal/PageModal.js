import React, { Component }                    from 'react';
import { connect as Connect }                  from 'react-redux';
import { removeBodyOverflow, addBodyOverflow } from '../../../../actions';
import { Link }                                from 'react-router-dom';
import                                              './PageModal.scss';
import * as Window                             from '../../../../actions/Window';

class PageModal extends Component {
  render() {
    const { title, children, footer, backTo } = this.props;
    let closeButton;

    if (backTo) {
      closeButton = (
        <Link to={ backTo }>
          <i className="fas fa-times" />
        </Link>
      );
    }

    return (
      <aside className="page-modal-container open">
        <div className="overlay" />
        <article className="page-modal">
          <header>
            <div className="title">
              <h4>{ title }</h4>
            </div>
            <div className="close-button">
              { closeButton }
            </div>
          </header>
          <section>
            { children }
          </section>
          <footer>
            { footer }
          </footer>
        </article>
      </aside>
    );
  }

  componentDidMount() {
    Window.scrollToTop(true);
    this.props.removeBodyOverflow();
  }

  componentWillUnmount() {
    this.props.addBodyOverflow();
  }
}

export default Connect(null, { removeBodyOverflow, addBodyOverflow })(PageModal);
