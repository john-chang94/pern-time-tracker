import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { getEntries, deleteEntry, submitTimesheet } from '../../actions/userActions';

class EntriesList extends Component {

    handleDelete = async (entry) => {
        const { user, deleteEntry, getEntries } = this.props;
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteEntry(entry.entry_id);
            getEntries(user.user_id);
        }
    }

    handleSubmit = () => {
        const { user, entriesTotal, submitTimesheet } = this.props;
        if (window.confirm('Submit timesheet? (Make sure to double check your entries)')) {
            const timesheet = {
                user_id: user.user_id,
                week_start: moment(new Date(Date.now())).day(1).format('yyyy-MM-DD'),
                week_end: moment(new Date(Date.now())).day(5).format('yyyy-MM-DD'),
                total_entries: entriesTotal.total_entries,
                total_hours: entriesTotal.total_hours
            }
            submitTimesheet(timesheet);
        }
    }

    render() {
        const { entries, timesheetMessage, timesheetSuccess } = this.props;
        return (
            <div style={{ marginBottom: '40px' }}>
                <h5>This week's entries</h5>
                <table className="centered striped responsive-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Date</th>
                            <th>Hours Worked</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            entries ?
                                entries.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.project_name}</td>
                                        <td>{moment(entry.date).format('L')}</td>
                                        <td>{entry.hours_worked}</td>
                                        <td><button className="btn red lighten-1" onClick={this.handleDelete.bind(this, entry)}>X</button></td>
                                    </tr>
                                )) :
                                null
                        }
                    </tbody>
                </table>
                <div className="section">
                    <button className="btn blue-grey darken-1" onClick={this.handleSubmit}>Submit timesheet</button>
                </div>
                {timesheetMessage ? <p className={timesheetSuccess ? "blue-text" : "red-text"}>{timesheetMessage}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        entries: state.user.entries,
        entriesTotal: state.user.entriesTotal,
        timesheetMessage: state.user.timesheetMessage,
        timesheetSuccess: state.user.timesheetSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEntries: (user_id) => dispatch(getEntries(user_id)),
        deleteEntry: (entry_id) => dispatch(deleteEntry(entry_id)),
        submitTimesheet: (timesheet) => dispatch(submitTimesheet(timesheet))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);