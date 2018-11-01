import React, { Component }                 from 'react';
import { connect as Connect }               from 'react-redux';
import { withRouter }                       from 'react-router-dom';
import posed                                from 'react-pose';
import                                           './PageModal.scss';
import { pageModalOpened, pageModalClosed } from '../../../../actions';

const DURATION = 200;

const Container = posed.div({
  inactive: {
    transition: { duration: DURATION },
    opacity: 0
  },
  active: {
    transition: { duration: DURATION },
    opacity: 1
  }
});

const Modal = posed.article({
  inactive: {
    transition: { duration: DURATION },
    "max-width": 0
  },
  active: {
    transition: { duration: DURATION },
    "max-width": '992px'
  }
});

class PageModal extends Component {
  render() {
    const { active, title, children, footer, iconClass, backTo } = this.props;
    let icon;
    let closeButton;

    if (iconClass) {
      icon = <i
        className={ iconClass }
      />;
    }

    if (backTo) {
      closeButton = <i
        className="fas fa-times"
        onClick={ this.onCloseButtonClick.bind(this) }
      />;
    }

    return (
      <Container
        className="page-modal-container open"
        pose={ active ? 'active' : 'inactive' }
      >
        <div className="overlay" />
        <Modal
          className="page-modal"
          pose={ active ? 'active' : 'inactive' }
        >
          <header>
            <div className="title">
              <h4>
                { icon }
                { title }
              </h4>
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
        </Modal>
      </Container>
    );
  }

  componentDidMount() {
    this.props.pageModalOpened();
  }

  componentDidUpdate() {
    const { shouldClose } = this.props;

    if (shouldClose) {
      this.onCloseButtonClick();
    }
  }

  componentWillUnmount() {
    this.props.pageModalClosed();
  }

  onCloseButtonClick() {
    const { backTo } = this.props;
    const { history } = this.props;

    this.props.pageModalClosed();
    setTimeout(() => history.push(backTo), DURATION);
  }
}

function mapStateToProps({ pageModal }) {
  return pageModal;
}

export default withRouter(Connect(mapStateToProps, { pageModalOpened, pageModalClosed })(PageModal));
