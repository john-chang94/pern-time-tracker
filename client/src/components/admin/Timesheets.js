import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTimesheets, getUsers, getTimesheetEntries } from '../../actions/adminActions';
import M from 'materialize-css';
import moment from 'moment';

const styles = {
    fontWeight: 'bold',
    padding: '0'
}

class Timesheets extends Component {
    state = {
        user_id: '',
        start_date: '',
        end_date: ''
    }

    componentDidMount() {
        this.props.getUsers(false);

        const weekStart = document.querySelectorAll('#start_date');
        M.Datepicker.init(weekStart, { disableDayFn: this.disableDates, onSelect: this.selectWeekStart });
        const weekEnd = document.querySelectorAll('#end_date');
        M.Datepicker.init(weekEnd, { disableDayFn: this.disableDates, onSelect: this.selectWeekEnd });
        const data = document.querySelectorAll('.collapsible');
        M.Collapsible.init(data);
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { user_id, start_date, end_date } = this.state;
        this.props.getTimesheets(
            user_id,
            moment(start_date).format('yyyy-MM-DD'),
            moment(end_date).format('yyyy-MM-DD')
        );
    }

    getEachEntry = (timesheet) => {
        this.props.getTimesheetEntries(
            this.state.user_id,
            moment(timesheet.week_start).format('yyyy-MM-DD'),
            moment(timesheet.week_end).format('yyyy-MM-DD')
        )
    }

    selectWeekStart = date => {
        this.setState({
            start_date: moment(date).format('MMM DD, yyyy')
        })
    }

    selectWeekEnd = date => {
        this.setState({
            end_date: moment(date).format('MMM DD, yyyy')
        })
    }

    // Disable all days except Mondays
    disableDates = date => {
        if (date.getDay() !== 1) return true;
        return false
    }

    render() {
        const { users, user_id, timesheets, timesheetsTotal, timesheetEntries } = this.props;
        const { start_date, end_date } = this.state;
        return (
            <div className="section">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="user_id">Select a user</label>
                    <select id="user_id" className="input-field browser-default" value={user_id} onChange={this.handleChange}>
                        <option value="">Select...</option>
                        {
                            users && users.map((user, index) => (
                                <option value={user.user_id} key={index}>{user.last_name}, {user.first_name}</option>
                            ))
                        }
                    </select>
                    <div className="input-field" style={{ marginTop: '30px' }}>
                        <input type="text" id="start_date" defaultValue={start_date} />
                        <label htmlFor="date">From</label>
                    </div>
                    <div className="input-field" style={{ marginTop: '30px' }}>
                        <input type="text" id="end_date" defaultValue={end_date} />
                        <label htmlFor="date">To</label>
                    </div>
                    <div className="input-field">
                        <button className="btn">Search</button>
                    </div>
                </form>

                <div className="section">
                    <div className="row" style={styles}>
                        <p className="col s4 center">Work Week</p>
                        <p className="col s4 center">Total Entries</p>
                        <p className="col s4 center">Total Hours</p>
                    </div>

                    <hr style={{ margin: '0', padding: '0' }} />

                    <ul className="collapsible">
                        {
                            // Load each timesheet
                            timesheets && timesheets.map((timesheet, index) => (
                                <li key={index} style={{ padding: '0' }} onClick={this.getEachEntry.bind(this, timesheet)}>
                                    <div className="collapsible-header row" style={styles}>
                                        <p className="col s4 center">{moment(timesheet.week_start).format('MM/DD/yyyy')} - {moment(timesheet.week_end).format('MM/DD/yyyy')}</p>
                                        <p className="col s4 center">{timesheet.total_entries}</p>
                                        <p className="col s4 center">{timesheet.total_hours}</p>
                                    </div>
                                    <div className="collapsible-body" style={{ padding: '0' }}>
                                        <table className="centered">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Hours</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    // Load each entry for each timesheet
                                                    timesheetEntries && timesheetEntries.map((entry, index) => (
                                                        <tr key={index}>
                                                            <td>{entry.date}</td>
                                                            <td>{entry.hours_worked}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    {
                        timesheetsTotal ?
                            <div className="row">
                                <p className="col s4 center" style={styles}>{timesheetsTotal.total_timesheets} week(s)</p>
                                <p className="col s4 center" style={styles}>{timesheetsTotal.total_entries}</p>
                                <p className="col s4 center" style={styles}>{timesheetsTotal.total_hours}</p>
                            </div> :
                            null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        users: state.admin.users,
        timesheets: state.admin.timesheets,
        timesheetsTotal: state.admin.timesheetsTotal,
        timesheetEntries: state.admin.timesheetEntries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTimesheets: (user_id, start_date, end_date) => dispatch(getTimesheets(user_id, start_date, end_date)),
        getUsers: (is_admin) => dispatch(getUsers(is_admin)),
        getTimesheetEntries: (user_id, week_start, week_end) => dispatch(getTimesheetEntries(user_id, week_start, week_end))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timesheets);