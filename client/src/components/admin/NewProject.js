import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject, assignUserProject, getAllProjects } from '../../actions/adminActions';
import M from 'materialize-css';
import moment from 'moment';

class NewProject extends Component {
    state = {
        project_name: '',
        details: '',
        start_date: '',
        due_date: '',
        members: []
    }

    componentDidMount() {
        const startDate = document.querySelectorAll('#start_date');
        M.Datepicker.init(startDate, { disableWeekends: true, onSelect: this.selectStartDate });
        const dueDate = document.querySelectorAll('#due_date');
        M.Datepicker.init(dueDate, { disableWeekends: true, onSelect: this.selectDueDate });
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    selectStartDate = date => {
        this.setState({
            start_date: moment(date).format('MMM DD, yyyy')
        })
    }

    selectDueDate = date => {
        this.setState({
            due_date: moment(date).format('MMM DD, yyyy')
        })
    }

    addMember = member => {
        const { members } = this.state;
        // Loop through members array to check if member already exists
        for (let i = 0; i < members.length; i++) {
            if (member.user_id === members[i].user_id) {
                return alert(`Already added ${member.first_name} ${member.last_name}`);
            }
        }
        // If user does not exist in members, add to array
        this.setState({
            members: [...members, member]
        })
    }

    removeMember = id => {
        const members = this.state.members.filter(member => {
            return member.user_id !== id
        })
        this.setState({
            members
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { project_name, details, start_date, due_date } = this.state;
        const { createProject, assignUserProject, getAllProjects } = this.props;
        const { members } = this.state;
        const project = {
            project_name,
            details,
            start_date: moment(start_date).format('yyyy-MM-DD'),
            due_date: moment(due_date).format('yyyy-MM-DD')
        }
        await createProject(project);

        // If createProject success, assign members to project
        if (this.props.createProjectSuccess) {
            for (let i = 0; i < members.length; i++) {
                const user_project_ids = {
                    user_id: members[i].user_id, // Grab each user id from state members array
                    project_id: this.props.project_id // Grab project id after successfully created
                }
                assignUserProject(user_project_ids)
            }
            this.setState({
                project_name: '',
                details: '',
                start_date: '',
                due_date: '',
                members: []
            })
            getAllProjects();
        }
    }

    render() {
        const { users, createProjectMessage } = this.props;
        const { project_name, details, members } = this.state;
        return (
            <div className="row section">
                <div className="col m12 l8">
                    <h5>Create a New Project</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input type="text" id="project_name" value={project_name} onChange={this.handleChange} />
                            <label htmlFor="project_name">Project Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="details" value={details} onChange={this.handleChange} />
                            <label htmlFor="details">Details</label>
                        </div>
                        <div className="input-field">
                            <input type="text" className="datepicker" id="start_date" />
                            <label htmlFor="start_date">Start Date</label>
                        </div>
                        <div className="input-field">
                            <input type="text" className="datepicker" id="due_date" />
                            <label htmlFor="due_date">Due Date</label>
                        </div>
                        <div>
                            <label>Assign group members from user list</label>
                            <ul className="project-users">
                                {
                                    members && members.map((member, index) => (
                                        <li key={index} style={{ cursor: 'pointer' }} onClick={this.removeMember.bind(this, member.user_id)}>
                                            {member.first_name} {member.last_name} &nbsp; &nbsp; X
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>
                        <div className="input-field">
                            <button className="btn">Create</button>
                        </div>
                        {createProjectMessage ? <p className={"red-text"}>{createProjectMessage}</p> : null}
                    </form>
                </div>

                <div className="col m12 l4 project-user-list">
                    <table className="highlight">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((user, index) => (
                                    <tr key={index} style={{ cursor: 'pointer' }} onClick={this.addMember.bind(this, user)}>
                                        <td>{user.last_name}, {user.first_name}</td>
                                    </tr>
                                ))
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
        createProjectMessage: state.admin.createProjectMessage,
        createProjectSuccess: state.admin.createProjectSuccess,
        project_id: state.admin.project_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProject: (project) => dispatch(createProject(project)),
        assignUserProject: (user_project_ids) => dispatch(assignUserProject(user_project_ids)),
        getAllProjects: () => dispatch(getAllProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);