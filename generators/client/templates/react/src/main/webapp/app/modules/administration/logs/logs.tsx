import * as React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';

import { getLoggers, changeLogLevel } from '../../../reducers/administration';

export interface ILogsPageProps {
  isFetching?: boolean;
  getLoggers: Function;
  changeLogLevel: Function;
  logs: any;
}

export class LogsPage extends React.Component<ILogsPageProps, { filter: string }> {

  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  componentDidMount() {
    this.props.getLoggers();
  }

  getLogs = () => {
    if (!this.props.isFetching) {
      this.props.getLoggers();
    }
  }

  changeLevel = (loggerName, level) => () => {
    this.props.changeLogLevel(loggerName, level);
  }

  setFilter = evt => {
    this.setState({
      filter: evt.target.value
    });
  }

  getClassName = (level, check, className) =>
    level === check ?
      `btn btn-secondary btn-sm btn-${className}`
      : 'btn btn-secondary btn-sm btn-secondary'

  filterFn = l => l.name.toUpperCase().includes(this.state.filter.toUpperCase());

  render() {
    const { logs, isFetching } = this.props;
    const { filter } = this.state;
    const loggers = logs ? logs.loggers : {};
    return (
        <div className="pad-5">
          <h2>Logs</h2>
          <p>There are {loggers.length} loggers.</p>

          <span>Filter</span>
          <input type="text" value={filter} onChange={this.setFilter} className="form-control" disabled={isFetching} />

          <table className="table table-sm table-striped table-bordered" >
            <thead>
              <tr title="click to order">
                <th><span>Name</span></th>
                <th><span>Level</span></th>
              </tr>
            </thead>
            <tbody>
              {
              loggers.filter(this.filterFn).map((logger, i) =>
                <tr key={`log-row-${i}`}>
                  <td><small>{logger.name}</small></td>
                  <td>
                    <button disabled={isFetching} onClick={this.changeLevel(logger.name, 'TRACE')} className={this.getClassName(logger.level, 'TRACE', 'danger')}>TRACE</button>
                    <button disabled={isFetching} onClick={this.changeLevel(logger.name, 'DEBUG')} className={this.getClassName(logger.level, 'DEBUG', 'warning')}>DEBUG</button>
                    <button disabled={isFetching} onClick={this.changeLevel(logger.name, 'INFO')} className={this.getClassName(logger.level, 'INFO', 'info')}>INFO</button>
                    <button disabled={isFetching} onClick={this.changeLevel(logger.name, 'WARN')} className={this.getClassName(logger.level, 'WARN', 'success')}>WARN</button>
                    <button disabled={isFetching} onClick={this.changeLevel(logger.name, 'ERROR')} className={this.getClassName(logger.level, 'ERROR', 'primary')}>ERROR</button>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
    );
  }
}

const mapStateToProps = ({ administration }) => ({
  logs: administration.logs,
  isFetching: administration.isFetching
});

const mapDispatchToProps = { getLoggers, changeLogLevel };

export default connect(mapStateToProps, mapDispatchToProps)(LogsPage);
