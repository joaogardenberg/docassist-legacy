import React, { Component }   from 'react';
import ReactDOM               from 'react-dom';
import { connect as Connect } from 'react-redux';
import { Link }               from 'react-router-dom';
import { fetchUsers }         from '../../../actions';
import _                      from 'lodash';
import Article                from '../common/Article/Article';
import SearchBar              from '../common/SearchBar/SearchBar';
import * as BrowserChecks     from '../../../checks/Browser.js';
import * as DataTable         from '../../../common/DataTable';

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
        newButtonPath="/usuarios/novo"
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
      const { id, name, username, typeName } = user;
      const refFab = React.createRef();
      const refShow = React.createRef();
      const refEdit = React.createRef();
      const refDestroy = React.createRef();

      this.fabRefs.push(refFab);
      this.tooltipRefs.push(...[refShow, refEdit, refDestroy]);

      return (
        <tr key={ `user-${id}` }>
          <td>{ name }</td>
          <td>{ username }</td>
          <td>{ typeName }</td>
          <td className="actions">
            <div className="fixed-action-btn" ref={ refFab }>
              <button className="btn-floating btn-small bg-success waves-effect waves-light">
                <i className="fas fa-ellipsis-h" />
              </button>
              <ul>
                <li>
                  <Link
                    to={ `/usuarios/${id}/remover` }
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
                    to={ `/usuarios/${id}/editar` }
                    className="btn-floating btn-small bg-warning waves-effect waves-light"
                    data-position="top"
                    data-tooltip="Editar"
                    ref={ refEdit }
                  >
                    <i className="fas fa-pencil-alt" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={ `/usuarios/${id}` }
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
      <div>
        <SearchBar
          callback={ this.onSearchBarChange.bind(this) }
        />
        <table ref={ this.tableRef }>
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
        </table>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.fabRefs = [];
    this.tooltipRefs = [];
    this.tableRef = React.createRef();
    this.lastPage = 0;
  }

  componentDidMount() {
    const { params } = this.props.match;

    if (Object.keys(this.props.users).length > 0) {
      this.addDataTable();
      this.initFabs();
    } else {
      this.props.fetchUsers();
    }

    this.mapSearchToParams();

    if (params.p && this.table) {
      this.table.page(params.p);
    }
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.users, nextProps.users)) {
      this.removeDataTable();
      this.removeFabs();
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;

    if (!_.isEqual(prevProps.users, this.props.users)) {
      this.addDataTable();
    }

    this.initFabs();
    this.mapSearchToParams();

    if (this.table) {
      if (params.p && this.table.page() !== parseInt(params.p)) {
        this.table.page(parseInt(params.p) - 1).draw('page');
      } else {
        this.table.page('first').draw('page');
      }
    }
  }

  componentWillUnmount() {
    this.removeFabs();
    this.removeDataTable();
  }

  initFabs() {
    this.fabRefs.filter(({ current }) => !!current).forEach(({ current }) => {
      window.M.FloatingActionButton.init(current, {
        direction: 'left',
        hoverEnabled: false
      });
    });

    if (!BrowserChecks.hasTouch()) {
      this.tooltipRefs.filter(({ current }) => !!current).forEach(({ current }) => {
        const button = ReactDOM.findDOMNode(current);
        window.M.Tooltip.init(button);
      });
    }
  }

  removeFabs() {
    this.fabRefs.filter(({ current }) => !!current).forEach(({ current }) => {
      const instance = window.M.FloatingActionButton.getInstance(current);

      if (instance) {
        instance.destroy();
      }
    });

    if (!BrowserChecks.hasTouch()) {
      this.tooltipRefs.filter(({ current }) => !!current).forEach(({ current }) => {
        const button = ReactDOM.findDOMNode(current);
        const instance = window.M.Tooltip.getInstance(button);

        if (instance) {
          instance.destroy();
        }
      });
    }

    this.fabRefs = [];
    this.tooltipRefs = [];
  }

  addDataTable() {
    const { current } = this.tableRef;

    this.table = window.$(current).DataTable({
      autoWidth: false,
      columnDefs: [{
        targets: 3,
        searchable: false,
        orderable: false
      }],
      destroy: true,
      dom: 't<"row"<"col s12 m12 l4 xl3"i><"col s12 m12 l8 xl9"p>>',
      language: {
        ...DataTable.language(),
        emptyTable: 'Não há nenhum usuário',
        info: 'Mostrando _START_ - _END_ de _TOTAL_ usuários',
        infoEmpty: 'Mostrando 0 usuários',
        infoFiltered: '(filtrados de um total de _MAX_ usuários)',
        lengthMenu: '_MENU_ usuários por página',
        zeroRecords: 'Não foi encontrado nenhum usuário para esta pesquisa.',
      },
      order: [[0, 'asc']],
      pageLength: 1,
      pagingType: 'simple_numbers',
      drawCallback: this.onTableDraw.bind(this)
    });
  }

  removeDataTable() {
    if (this.table) {
      this.table.destroy();
      this.table = null;
    }
  }

  onTableDraw() {
    const { params, path } = this.props.match;

    if (this.table) {
      params.p = this.table.page() + 1;

      if (params.p !== this.lastPage) {
        console.log(params.p, this.lastPage);
        let paramsArray = _.map(params, (val, key) => {
          if (val && (key === 'p' ? val > 1 : true)) {
            return `${key}=${encodeURI(val).replace(/%20/g, '+')}`;
          } else {
            return null;
          }
        });

        paramsArray = paramsArray.filter(i => !!i);

        this.lastPage = params.p;
        console.log(`${path}?${paramsArray.join('&')}`);
        this.props.history.push(`${path}?${paramsArray.join('&')}`);
      }
    }
  }

  onSearchBarChange(string) {
    const { users } = this.props;

    if (users && Object.keys(users).length > 0) {
      window.$(this.tableRef.current).DataTable().search(string).draw();
    }
  }

  mapSearchToParams() {
    const { location: { search }, match: { params } } = this.props;

    search
      .substr(1, search.length - 1)
      .split('&')
      .filter(param => param.length > 0)
      .forEach(param => {
        const [ key, value ] = param.split('=');
        params[key] = value;
      });
  }
}

function mapStateToProps({ users }) {
  return { users };
}

UsersIndex = Connect(
   mapStateToProps,
   { fetchUsers }
)(UsersIndex);

export default UsersIndex;
