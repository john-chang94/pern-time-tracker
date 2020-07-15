import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { getProjects, submitEntry } from '../../actions/userActions';

class NewEntry extends Component {
    state = {
        project_id: '',
        date: '',
        hours_worked: '',
        details: ''
    }

    componentDidMount() {
        let select = document.querySelectorAll('select');
        M.FormSelect.init(select);

        const { config, user } = this.props;
        this.props.getProjects(config, user.user_id)
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const entry = {
            user_id: this.props.user.user_id,
            ...this.state
        }
        await this.props.submitEntry(entry, this.props.config)
        if (this.props.submitSuccess) {
            this.setState({
                project_id: '',
                date: '',
                hours_worked: '',
                details: ''
            })
        }
    }

    render() {
        const { projects, submitError, submitSuccess } = this.props;
        const { project_id, date, hours_worked, details } = this.state;
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
                        <input type="date" id="date" value={date} onChange={this.handleChange} />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="hours_worked" value={hours_worked} onChange={this.handleChange} />
                        <label htmlFor="hours_worked">Hours Worked</label>
                    </div>
                    <div className="input-field">
                        <textarea className="materialize-textarea" id="details" value={details} onChange={this.handleChange}></textarea>
                        <label htmlFor="details">Additional details</label>
                    </div>
                    <div className="input-field">
                        <button className="btn">Submit</button>
                    </div>
                </form>
                { submitError ? <p className="red-text">{submitError}</p> : null}
                { submitSuccess ? <p className="blue-text">{submitSuccess}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        config: state.auth.config,
        user: state.auth.user,
        projects: state.user.projects,
        submitError: state.user.submitError,
        submitSuccess: state.user.submitSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjects: (token, user_id) => dispatch(getProjects(token, user_id)),
        submitEntry: (token, entry) => dispatch(submitEntry(token, entry))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);