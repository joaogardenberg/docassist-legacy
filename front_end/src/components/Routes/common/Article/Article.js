import React, { Component } from 'react';

class Article extends Component {
  render() {
    const { uniqueClass, header, newButtonCallback } = this.props;
    const { newButtonTooltip, children }             = this.props;

    const newButton = (
      <aside className={ `new ${uniqueClass}` }>
        <button
          className="btn-floating btn-large waves-effect waves-light tooltiped"
          data-position="left"
          data-tooltip={ newButtonTooltip ? `Adicionar ${newButtonTooltip}` : null }
          onClick={ newButtonCallback }
        >
          <i className="fas fa-plus" />
        </button>
      </aside>
    );

    return (
      <article className={ `page ${uniqueClass}` }>
        <header>
          <h2>{ header }</h2>
          { newButton }
        </header>
        <section>
          { children }
        </section>
      </article>
    );
  }
}

export default Article;
