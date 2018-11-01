import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Link }             from 'react-router-dom';
import { connect as Connect }               from 'react-redux';
import * as BrowserChecks   from '../../../../checks/Browser.js';

const INITIAL_STATE = {
  newButtonPulse: true
};

class Article extends Component {
  render() {
    const { uniqueClass, header, newButtonPath, newButtonTooltip } = this.props;
    const { children }                                             = this.props;
    const { newButtonPulse }                                       = this.state;
    let newButtonElement;

    if (newButtonPath) {
      newButtonElement = (
        <aside className={ `new ${uniqueClass}` }>
          <Link
            to={ newButtonPath }
            className={ `btn-floating btn-large waves-effect waves-light tooltiped${newButtonPulse ? ' pulse' : ''}` }
            data-position="left"
            data-tooltip={ newButtonTooltip ? `Adicionar ${newButtonTooltip}` : null }
            ref={ this.newButton }
            onClick={ this.onNewButtonClick.bind(this) }
          >
            <i className="fas fa-plus" />
          </Link>
        </aside>
      );
    }

    return (
      <article className={ `page ${uniqueClass}` }>
        <header>
          <h2>{ header }</h2>
          { newButtonElement }
        </header>
        <section>
          { children }
        </section>
      </article>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.newButton = React.createRef();
  }

  componentDidMount() {
    this.handlePulse();
    this.addTooltips();
  }

  componentDidUpdate() {
    this.handlePulse();
  }

  componentWillUnmount() {
    clearTimeout(this.pulseTimeout);
    this.removeTooltips();
  }

  handlePulse() {
    const { pageModal, loader } = this.props;
    const { newButtonPulse }    = this.state;

    if (newButtonPulse) {
      if (pageModal.active) {
        this.clearPulse();
      } else if (!this.pulseTimeout && !loader.active) {
        this.pulseTimeout = setTimeout(() => this.clearPulse(), 3000);
      }
    }
  }

  addTooltips() {
    if (!BrowserChecks.hasTouch()) {
      const button = ReactDOM.findDOMNode(this.newButton.current);
      window.M.Tooltip.init(button);
    }
  }

  removeTooltips() {
    if (!BrowserChecks.hasTouch() && this.newButton.current) {
      const button = ReactDOM.findDOMNode(this.newButton.current);
      const instance = window.M.Tooltip.getInstance(button);

      if (instance) {
        instance.destroy();
      }
    }
  }

  onNewButtonClick() {
    this.clearPulse();
  }

  clearPulse() {
    clearTimeout(this.pulseTimeout);
    this.pulseTimeout = null;
    this.setState({ newButtonPulse: false });
  }
}

function mapStateToProps({ pageModal, loader }) {
  return { pageModal, loader };
}

export default Connect(mapStateToProps)(Article);
