import React, { Component }                    from 'react';
import { connect as Connect }                  from 'react-redux';
import { fetchUsers, openLoader, closeLoader } from '../../../actions';
import _                                       from 'lodash';
import                                              './Users.scss';
import Article                                 from '../common/Article/Article';
import * as Toast                              from '../../../common/Toast';

class Users extends Component {
  render() {
    console.log(this.props)
    const { fetchError, users } = this.props;
    let content;

    if (!users || Object.keys(users).length < 1) {
      content = this.emptyJSX();
    } else {
      content = this.tableJSXWith(users);
    }

    return (
      <Article
        uniqueClass="users"
        header="Usuários"
        newButtonCallback={ this.onNewButtonClick }
        newButtonTooltip="usuário"
      >
        { content }
      </Article>
    );
  }

  emptyJSX() {
    return (
      <p>Não foi encontrado nenhum usuário.</p>
    );
  }

  tableJSXWith(users) {
    const rows = _.map(users, user => {
      const { id, name, username, type } = user;
      return (
        <tr key={ `user-${id}` }>
          <td>{ name }</td>
          <td>{ username }</td>
          <td>{ type }</td>
          <td>
            <button
              className="btn-small waves-effect waves-light bg-info"
              onClick={ () => this.onShowButtonClick(id) }
            >
              <i className="fas fa-info-circle left" />
              <span>Ver</span>
            </button>
            <button
              className="btn-small waves-effect waves-light bg-success"
              onClick={ () => this.onEditButtonClick(id) }
            >
              <i className="fas fa-pen-square left" />
              <span>Editar</span>
            </button>
            <button
              className="btn-small waves-effect waves-light bg-error"
              onClick={ () => this.onDeleteButtonClick(id) }
            >
              <i className="fas fa-times-circle left" />
              <span>Remover</span>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="highlight responsive-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Tipo</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }

  componentDidMount() {
    this.props.openLoader();
    this.props.fetchUsers();
  }

  onNewButtonClick() {
    Toast.info('Fazer modal para adicionar usuário.');
  }

  onShowButtonClick(id) {
    Toast.info(`Fazer modal para mostrar o usuário ${id}.`);
  }

  onEditButtonClick(id) {
    Toast.info(`Fazer modal para editar o usuário ${id}.`);
  }

  onDeleteButtonClick(id) {
    Toast.info(`Fazer modal para confirmar remoção do usuário ${id}.`);
  }
}

function mapStateToProps({ users }) {
  return users;
}

export default Connect(mapStateToProps, { fetchUsers, openLoader, closeLoader })(Users);
