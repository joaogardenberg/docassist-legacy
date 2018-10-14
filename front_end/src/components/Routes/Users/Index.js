import React, { Component }                    from 'react';
import ReactDOM                                from 'react-dom';
import { connect as Connect }                  from 'react-redux';
import { Link }                                from 'react-router-dom';
import { fetchUsers, openLoader, closeLoader } from '../../../actions';
import _                                       from 'lodash';
import                                              './Users.scss';
import Article                                 from '../common/Article/Article';

class UsersIndex extends Component {
  render() {
    const { users } = this.props;
    let content;

    if (!users || Object.keys(users).length < 1) {
      content = this.emptyJSX();
    } else {
      content = this.tableJSXWith(users);
    }

    return (
      <Article
        uniqueClass="users-index"
        header="Usuários"
        newButton={ true }
        newButtonPath="/usuários/novo"
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
      const refFab = React.createRef();
      // const refPrimary = React.createRef();
      const refShow = React.createRef();
      const refEdit = React.createRef();
      const refDestroy = React.createRef();

      this.fabRefs.push(refFab);
      this.tooltipRefs.push(...[refShow, refEdit, refDestroy]);

      return (
        <tr key={ `user-${id}` }>
          <td>{ name }</td>
          <td>{ username }</td>
          <td>{ type }</td>
          <td className="actions">
            <div className="fixed-action-btn" ref={ refFab }>
              <button
                className="btn-floating btn-small bg-success waves-effect waves-light"
                // data-position="left"
                // data-tooltip="Ações"
                // ref={ refPrimary }
              >
                <i className="fas fa-ellipsis-h" />
              </button>
              <ul>
                <li>
                  <Link
                    to={ `/usuários/${id}/remover` }
                    className="btn-floating btn-small bg-error waves-effect waves-light"
                    data-position="top"
                    data-tooltip="Remover"
                    ref={ refDestroy }
                  >
                    <i className="fas fa-trash-alt" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={ `/usuários/${id}/editar` }
                    className="btn-floating btn-small bg-success waves-effect waves-light"
                    data-position="bottom"
                    data-tooltip="Editar"
                    ref={ refEdit }
                  >
                    <i className="fas fa-pencil-alt" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={ `/usuários/${id}` }
                    className="btn-floating btn-small bg-info waves-effect waves-light"
                    data-position="top"
                    data-tooltip="Ver"
                    ref={ refShow }
                  >
                    <i className="fas fa-info"/>
                  </Link>
                </li>
              </ul>
            </div>
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
            <th className="actions"></th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
        <br />
        <br />
        <p>Todo:</p>
        <p>- Ajeitar tooltip no FAB;</p>
        <p>- Paginar;</p>
        <p>- Transição de abertura do modal;</p>
        <p>- Fazer funcionar como se tivesse back end.</p>
      </table>
    );
  }

  componentWillMount() {
    this.fabRefs = [];
    this.tooltipRefs = [];
  }

  componentDidMount() {
    this.initFabs();
    this.props.openLoader();
    this.props.fetchUsers();
  }

  componentWillUpdate() {
    this.fabRefs = [];
    this.tooltipRefs = [];
  }

  componentDidUpdate() {
    this.initFabs();
  }

  initFabs() {
    this.fabRefs.forEach(({ current }) => {
      window.M.FloatingActionButton.init(current, {
        direction: 'left',
        hoverEnabled: false
      });
    });

    this.tooltipRefs.forEach(({ current }) => {
      const button = ReactDOM.findDOMNode(current);
      window.M.Tooltip.init(button);
    });
  }
}

function mapStateToProps({ users }) {
  return users;
}

export default Connect(mapStateToProps, { fetchUsers, openLoader, closeLoader })(UsersIndex);
