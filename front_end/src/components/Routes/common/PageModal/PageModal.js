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
    opacity: 0,
    transform: 'translate(-50%) scale(0)'
  },
  active: {
    transition: { duration: DURATION },
    opacity: 1,
    transform: 'translate(-50%) scale(1)'
  }
});

const INITIAL_STATE = {
  reload: false
}

class PageModal extends Component {
  render() {
    const { active, title, children, footer, iconClass, backTo } = this.props;
    const { reload }                                             = this.state;
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
          pose={ active ? reload ? 'inactive' : 'active' : 'inactive' }
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

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.reloadTimeout = null;
  }

  componentDidMount() {
    this.props.pageModalOpened();
  }

  componentWillUpdate() {
    const { shouldReload } = this.props;

    if (shouldReload) {
      this.reload();
    }
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

  reload() {
    this.setState({ reload: true });
    clearTimeout(this.reloadTimeout);
    this.reloadTimeout = setTimeout(() => this.setState({ reload: false }), DURATION);
  }
}

function mapStateToProps({ pageModal }) {
  return pageModal;
}

export default withRouter(Connect(mapStateToProps, { pageModalOpened, pageModalClosed })(PageModal));
