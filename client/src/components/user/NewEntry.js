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
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);

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
                getEntries(user.user_id)
            }
        } catch (err) {
            return console.log(err)
        }
    }

    render() {
        const { projects, submitMessage, submitSuccess } = this.props;
        const { project_id, date, hours_worked } = this.state;
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
                        <input type="text" className="datepicker" id="date" />
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
                {submitMessage ? <p className={submitSuccess ? "blue-text" : "red-text"}>{submitMessage}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        projects: state.user.projects,
        submitMessage: state.user.submitMessage,
        submitSuccess: state.user.submitSuccess,
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