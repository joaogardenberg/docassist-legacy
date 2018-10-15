import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Link }             from 'react-router-dom';
import * as BrowserChecks   from '../../../../checks/Browser.js';

class Article extends Component {
  constructor(props) {
    super(props);
    this.newButton = React.createRef();
  }

  render() {
    const { uniqueClass, header, newButton, newButtonPath } = this.props;
    const { newButtonTooltip, children }                    = this.props;
    let newButtonElement;

    if (newButton) {
      newButtonElement = (
        <aside className={ `new ${uniqueClass}` }>
          <Link
            to={ newButtonPath }
            className="btn-floating btn-large waves-effect waves-light tooltiped"
            data-position="left"
            data-tooltip={ newButtonTooltip ? `Adicionar ${newButtonTooltip}` : null }
            ref={ this.newButton }
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

  componentDidMount() {
    if (!BrowserChecks.hasTouch()) {
      const button = ReactDOM.findDOMNode(this.newButton.current);
      window.M.Tooltip.init(button);
    }
  }
}

export default Article;
