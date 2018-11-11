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
    const { active, title, children, footer, iconClass } = this.props;
    const { reload }                                     = this.state;
    let icon;

    if (iconClass) {
      icon = <i
        className={ iconClass }
      />;
    }

    return (
      <Container
        className="page-modal-container open"
        style={{ overflow: 'hidden' }}
        pose={ active ? 'active' : 'inactive' }
      >
        <div className="overlay" />
        <Modal
          className="page-modal"
          style={{ overflow: 'hidden' }}
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
              <i
                className="fas fa-times"
                onClick={ this.onCloseButtonClick.bind(this) }
              />
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
    this.closeTimeout = null;
    this.backTimeout = null;
  }

  componentDidMount() {
    this.props.pageModalOpened();
  }

  componentDidUpdate() {
    const { shouldGoBack, shouldReload } = this.props;

    if (shouldGoBack) {
      this.onBackButtonClick();
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
    const { history, closeTo } = this.props;

    this.props.pageModalClosed();

    if (closeTo) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = setTimeout(() => history.push(closeTo), DURATION);
    } else {
      history.push('/dashboard');
    }
  }

  onBackButtonClick() {
    const { history } = this.props;

    this.props.pageModalClosed();
    clearTimeout(this.backTimeout);
    this.backTimeout = setTimeout(() => history.goBack(), DURATION);
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
