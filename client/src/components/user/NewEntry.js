import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { submitEntry, getEntries } from '../../actions/userActions';
import moment from 'moment';

class NewEntry extends Component {
    state = {
        project_id: '',
        date: '',
        hours_worked: ''
    }

    componentDidMount() {
        const datepicker = document.querySelectorAll('#date');
        M.Datepicker.init(datepicker, { disableWeekends: true, onSelect: this.selectDate });
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    selectDate = date => {
        this.setState({
            date: moment(date).format('MMM DD, yyyy')
        })
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { project_id, date, hours_worked } = this.state;
            const { user, submitEntry, getEntries } = this.props;
            const entry = {
                user_id: user.user_id,
                project_id,
                date: moment(date).format('yyyy-MM-DD'),
                hours_worked
            }
            await submitEntry(entry)
            // If submit success, clear form and fetch updated entries list
            if (this.props.submitSuccess) {
                this.setState({
                    project_id: '',
                    date: '',
                    hours_worked: ''
                })
                getEntries(
                    user.user_id,
                    moment(new Date(Date.now())).day(1).format('yyyy-MM-DD'),
                    moment(new Date(Date.now())).day(5).format('yyyy-MM-DD')
                )
            }
        } catch (err) {
            return console.log(err)
        }
    }

    render() {
        const { projects, entryMessage, entrySuccess } = this.props;
        const { project_id, hours_worked, date } = this.state;
        return (
            <div className="section">
                <h5>Submit a time entry</h5>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="project_id">Choose a project:</label>
                    <select className="input-field browser-default"
                        id="project_id"
                        onChange={this.handleChange}
                        value={project_id}
                    >
                        <option value="">Select...</option>
                        {
                            projects ?
                                projects.map((project, index) => (
                                    <option key={index} value={project.project_id} onChange={this.handleChange}>{project.project_name}</option>
                                )) :
                                null
                        }
                    </select>
                    <div className="input-field" style={{ marginTop: '30px' }}>
                        <input type="text" className="datepicker" id="date" defaultValue={date} />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="hours_worked" value={hours_worked} onChange={this.handleChange} />
                        <label htmlFor="hours_worked">Hours Worked</label>
                    </div>
                    <div className="input-field">
                        <button className="btn">Submit</button>
                    </div>
                </form>
                {entryMessage ? <p className={entrySuccess ? "blue-text" : "red-text"}>{entryMessage}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        projects: state.user.projects,
        entryMessage: state.user.entryMessage,
        entrySuccess: state.user.entrySuccess,
        entries: state.user.entries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitEntry: (entry) => dispatch(submitEntry(entry)),
        getEntries: (user_id) => dispatch(getEntries(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);