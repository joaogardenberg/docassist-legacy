import React, { Component }   from 'react';
import ReactDOM               from 'react-dom';
import { connect as Connect } from 'react-redux';
import { Link }               from 'react-router-dom';
import { fetchPatients }      from '../../../actions';
import _                      from 'lodash';
import Article                from '../common/Article/Article';
import SearchBar              from '../common/SearchBar/SearchBar';
import * as BrowserChecks     from '../../../checks/Browser.js';
import * as DataTable         from '../../../common/DataTable';

class PatientsIndex extends Component {
  render() {
    const { patients } = this.props;
    let content;

    if (!patients || Object.keys(patients).length < 1) {
      content = this.emptyJSX();
    } else {
      content = this.tableJSXWith(patients);
    }

    return (
      <Article
        uniqueClass="patients-index"
        header="Pacientes"
        newButtonPath="/pacientes/novo"
        newButtonTooltip="paciente"
      >
        { content }
      </Article>
    );
  }

  emptyJSX() {
    return (
      <p>Não foi encontrado nenhum paciente.</p>
    );
  }

  tableJSXWith(patients) {
    const rows = _.map(patients, patient => {
      const { id, name } = patient;
      const refFab = React.createRef();
      const refShow = React.createRef();
      const refEdit = React.createRef();
      const refDestroy = React.createRef();

      this.fabRefs.push(refFab);
      this.tooltipRefs.push(...[refShow, refEdit, refDestroy]);

      return (
        <tr key={ `patients-${id}` }>
          <td>{ name }</td>
          <td className="actions">
            <div className="fixed-action-btn" ref={ refFab }>
              <button className="btn-floating btn-small bg-success waves-effect waves-light">
                <i className="fas fa-ellipsis-h" />
              </button>
              <ul>
                <li>
                  <Link
                    to={ `/pacientes/${id}/remover` }
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
                    to={ `/pacientes/${id}/editar` }
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
                    to={ `/pacientes/${id}` }
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
  }

  componentDidMount() {
    if (Object.keys(this.props.patients).length > 0) {
      this.addDataTable();
      this.initFabs();
    } else {
      this.props.fetchPatients();
    }
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.patients, nextProps.patients)) {
      this.removeDataTable();
      this.removeFabs();
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.patients, this.props.patients)) {
      this.addDataTable();
    }

    this.initFabs();
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
        targets: 1,
        searchable: false,
        orderable: false
      }],
      destroy: true,
      dom: 't<"row"<"col s12 m12 l4 xl3"i><"col s12 m12 l8 xl9"p>>',
      language: {
        ...DataTable.language(),
        emptyTable: 'Não há nenhum paciente',
        info: 'Mostrando _START_ - _END_ de _TOTAL_ pacientes',
        infoEmpty: 'Mostrando 0 pacientes',
        infoFiltered: '(filtrados de um total de _MAX_ pacientes)',
        lengthMenu: '_MENU_ pacientes por página',
        zeroRecords: 'Não foi encontrado nenhum paciente para esta pesquisa.',
      },
      order: [[0, 'asc']],
      pageLength: 10,
      pagingType: 'simple_numbers'
    });
  }

  removeDataTable() {
    if (this.table) {
      this.table.destroy();
      this.table = null;
    }
  }

  onSearchBarChange(string) {
    const { patients } = this.props;

    if (patients && Object.keys(patients).length > 0) {
      window.$(this.tableRef.current).DataTable().search(string).draw();
    }
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

PatientsIndex = Connect(
   mapStateToProps,
   { fetchPatients }
)(PatientsIndex);

export default PatientsIndex;
