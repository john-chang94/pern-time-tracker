import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { getEntries } from '../../actions/userActions';
import EditEntry from './EditEntry';

class EntriesList extends Component {
    state = {
        modalOpen: false,
        entry: '',
        date: '',
        hours_worked: '',
        details: ''
    }
    componentDidMount() {
        const { getEntries, config, user } = this.props;
        getEntries(config, user.user_id)
    }

    openModal = () => {
        this.setState({
            modalOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false,
            entry: '',
            date: '',
            hours_worked: '',
            details: ''
        })
    }

    setEntryModal = entry => {
        this.setState({
            date: entry.date,
            hours_worked: entry.hours_worked,
            details: entry.details
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { entries } = this.props;
        const { modalOpen, date, hours_worked, details } = this.state;
        return (
            <div className="section">
                <h5>Recent entries</h5>
                <table className="centered highlight">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Date</th>
                            <th>Hours Worked</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            entries ?
                                entries.map((entry, index) => (
                                    <tr key={index}
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={this.setEntryModal.bind(this, entry)}
                                        onClick={this.openModal}
                                    >
                                        <td>{entry.project_name}</td>
                                        <td>{moment(entry.date).format('L')}</td>
                                        <td>{entry.hours_worked}</td>
                                        <td>{entry.details}</td>
                                    </tr>
                                )) :
                                null
                        }
                    </tbody>
                </table>
                <EditEntry modalOpen={modalOpen}
                    closeModal={this.closeModal}
                    handleChange={this.handleChange}
                    date={date}
                    hours_worked={hours_worked}
                    details={details}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        config: state.auth.config,
        user: state.auth.user,
        entries: state.user.entries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEntries: (config, user_id) => dispatch(getEntries(config, user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);