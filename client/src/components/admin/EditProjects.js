import React, { Component } from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import { connect } from 'react-redux';
import { assignUserProject, removeUserProject, getAllProjectMembers, updateProject } from '../../actions/adminActions';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
};

class EditProject extends Component {
    state = {
        project_name: '',
        details: '',
        start_date: '',
        due_date: '',
        editMembers: false
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // Set values from props into modal state so they != null in values upon modal open
    // Visually, the values are set in the forms by defaultValue
    setValues = () => {
        const { project } = this.props;
        this.setState({
            project_name: project.project_name,
            details: project.details,
            start_date: moment(project.start_date).format('yyyy-MM-DD'),
            due_date: moment(project.due_date).format('yyyy-MM-DD'),
        })
    }

    // Clear state on modal close because dates will sometimes clash
    clearValues = () => {
        this.setState({
            project_name: '',
            details: '',
            start_date: '',
            due_date: '',
        })
    }

    handleSubmit = async () => {
        const { project_name, details, start_date, due_date } = this.state;
        const { project, updateProject } = this.props;
        const updatedProject = {
            project_name,
            details,
            start_date: moment(start_date).format('yyyy-MM-DD'),
            due_date: moment(due_date).format('yyyy-MM-DD')
        }

        await updateProject(project.project_id, updatedProject)
        if (this.props.updateProjectSuccess) {
            console.log('updated')
        }
    }

    toggleEditMembers = () => {
        this.setState({
            editMembers: !this.state.editMembers
        })
    }

    addMember = async (member) => {
        const { project, assignUserProject, getAllProjectMembers } = this.props;
        const user_project_ids = {
            user_id: member.user_id, // user_id grabbed from binded member
            project_id: project.project_id // project_id grabbed from props
        }
        await assignUserProject(user_project_ids);
        // Refresh list of project members after newly assigned
        getAllProjectMembers(project.project_id);
    }

    removeMember = async (member) => {
        const { project, removeUserProject, getAllProjectMembers } = this.props;
        await removeUserProject(member.user_id, project.project_id);
        // Refresh list of project members after any removed
        getAllProjectMembers(project.project_id);
    }

    render() {
        const { modalOpen, closeModal, members, users } = this.props;
        const { editMembers, project_name, details, start_date, due_date } = this.state;
        return (
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                onAfterOpen={this.setValues}
                onAfterClose={this.clearValues}
                style={customStyles}
                ariaHideApp={false}
            >
                <div>
                    {
                        editMembers ?
                            null :
                            <div>
                                <div>
                                    <label htmlFor="project_name">Project Name</label>
                                    <input type="text" id="project_name" defaultValue={project_name} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="details">Details</label>
                                    <input type="text" id="details" defaultValue={details} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="start_date">Start Date</label>
                                    <input type="date" id="start_date" defaultValue={start_date} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="due_date">Due Date</label>
                                    <input type="date" id="due_date" defaultValue={due_date} onChange={this.handleChange} />
                                </div>
                                <div className="section">
                                    <button className="btn blue-grey darken-1" onClick={this.toggleEditMembers}>Edit Members</button>
                                </div>
                                <div className="row">
                                    <div className="input-field left">
                                        <button className="btn" onClick={this.handleSubmit}>Update</button>
                                    </div>
                                    <div className="input-field right">
                                        <button className="btn grey darken-1" onClick={closeModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                    }

                    {
                        editMembers ?
                            <div>
                                <div className="section">
                                    <button className="btn blue-grey darken-1" onClick={this.toggleEditMembers}>Back</button>
                                </div>
                                <div>
                                    <label>Group Members (Click name to remove)</label>
                                    <ul>
                                        {
                                            members && members.map((member, index) => (
                                                <li key={index} style={{ cursor: 'pointer' }} onClick={this.removeMember.bind(this, member)}>{member.first_name} {member.last_name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <br />
                                <strong>Click Name to Add</strong>
                                <div className="project-user-list">
                                    <table className="highlight">
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
                            </div> :
                            null
                    }
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        members: state.admin.members,
        users: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        assignUserProject: (user_project_ids) => dispatch(assignUserProject(user_project_ids)),
        removeUserProject: (user_id, project_id) => dispatch(removeUserProject(user_id, project_id)),
        getAllProjectMembers: (project_id) => dispatch(getAllProjectMembers(project_id)),
        updateProject: (project_id, updatedProject) => dispatch(updateProject(project_id, updatedProject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);