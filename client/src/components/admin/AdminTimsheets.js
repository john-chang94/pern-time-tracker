import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTimesheets, getUsers } from '../../actions/adminActions';
import M from 'materialize-css';
import moment from 'moment';

class AdminTimesheets extends Component {
    state = {
        user_id: '',
        start_date: '',
        end_date: ''
    }

    componentDidMount() {
        this.props.getUsers();

        const weekStart = document.querySelectorAll('#start_date');
        M.Datepicker.init(weekStart, { disableDayFn: this.disableDates, onSelect: this.selectWeekStart });
        const weekEnd = document.querySelectorAll('#end_date');
        M.Datepicker.init(weekEnd, { disableDayFn: this.disableDates, onSelect: this.selectWeekEnd });
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
        console.log(this.props)
        const { users, user_id, timesheets, timesheetsTotal } = this.props;
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
                    <table className="centered">
                        <thead>
                            <tr>
                                <th>Work Week</th>
                                <th>Total Entries</th>
                                <th>Total Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                timesheets && timesheets.map((timesheet, index) => (
                                <tr key={index}>
                                    <td>{moment(timesheet.week_start).format('MM/DD/yyyy')} - {moment(timesheet.week_end).format('MM/DD/yyyy')}</td>
                                    <td>{timesheet.total_entries}</td>
                                    <td>{timesheet.total_hours}</td>
                                </tr>
                                ))
                            }
                            {
                                // THIS WILL NOT SHOW
                                timesheetsTotal ?
                                    <tr>
                                        <td>{timesheetsTotal.total_timesheets}</td>
                                        <td>{timesheetsTotal.total_entries}</td>
                                        <td>{timesheetsTotal.total_hours}</td>
                                    </tr> :
                                    null
                            }
                        </tbody>
                    </table>
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
        timsheetsTotal: state.admin.timesheetsTotal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTimesheets: (user_id, start_date, end_date) => dispatch(getTimesheets(user_id, start_date, end_date)),
        getUsers: () => dispatch(getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTimesheets);