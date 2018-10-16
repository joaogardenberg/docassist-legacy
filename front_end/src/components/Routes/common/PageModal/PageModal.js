import React, { Component }                    from 'react';
import { connect as Connect }                  from 'react-redux';
import { Link, withRouter }                    from 'react-router-dom';
import posed                                   from 'react-pose';
import                                              './PageModal.scss';
import { removeBodyOverflow, addBodyOverflow } from '../../../../actions';
import * as Window                             from '../../../../actions/Window';

const INITIAL_STATE = {
  open: false
}

const DURATION = 200;

const Container = posed.div({
  closed: {
    transition: { duration: DURATION },
    opacity: 0
  },
  open: {
    transition: { duration: DURATION },
    opacity: 1
  }
});

class PageModal extends Component {
  render() {
    const { title, children, footer, backTo } = this.props;
    const { active }                          = this.state;
    let closeButton;

    if (backTo) {
      closeButton = (
        <i
          className="fas fa-times"
          onClick={ this.onCloseButtonClick.bind(this) }
        />
      );
    }

    return (
      <Container
        className="page-modal-container open"
        pose={ active ? 'open' : 'closed' }
      >
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
      </Container>
    );
  }

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    Window.scrollToTop(true);
    this.props.removeBodyOverflow();
    this.setState({ active: true });
  }

  componentWillUnmount() {
    this.props.addBodyOverflow();
  }

  onCloseButtonClick() {
    const { backTo } = this.props;
    const { history } = this.props;

    this.setState({ active: false });
    setTimeout(() => history.push(backTo), DURATION);
  }
}

export default withRouter(Connect(null, { removeBodyOverflow, addBodyOverflow })(PageModal));
