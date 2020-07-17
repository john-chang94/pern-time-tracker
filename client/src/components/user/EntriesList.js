import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { getEntries, deleteEntry } from '../../actions/userActions';

class EntriesList extends Component {

    handleDelete = async (entry) => {
        const { user, deleteEntry, getEntries } = this.props;
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteEntry(entry.entry_id);
            getEntries(user.user_id);
        }
    }

    render() {
        const { entries } = this.props;
        return (
            <div className="section" style={{ marginBottom: '40px' }}>
                <h5>Recent entries</h5>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        entries: state.user.entries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEntries: (user_id) => dispatch(getEntries(user_id)),
        deleteEntry: (entry_id) => dispatch(deleteEntry(entry_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);