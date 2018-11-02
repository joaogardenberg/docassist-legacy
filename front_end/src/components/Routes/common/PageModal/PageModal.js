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
    this.backTimeout = null;
  }

  componentDidMount() {
    this.props.pageModalOpened();
  }

  componentDidUpdate() {
    const { shouldGoBack, shouldReload, history } = this.props;

    if (shouldGoBack) {
      this.props.pageModalClosed();
      clearTimeout(this.backTimeout);
      this.backTimeout = setTimeout(() => history.goBack(), DURATION);
    }

    if (shouldReload) {
      this.reload();

      if (!this.props.active) {
        this.props.pageModalOpened();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.reloadTimeout);
    clearTimeout(this.backTimeout);
    clearTimeout(this.closeTimeout);
    this.props.pageModalClosed();
  }

  onCloseButtonClick() {
    const { backTo } = this.props;
    const { history } = this.props;

    this.props.pageModalClosed();
    clearTimeout(this.closeTimeout);
    this.closeTimeout = setTimeout(() => history.push(backTo), DURATION);
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
