import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllUsers, getAllProjects, getAllProjectMembers } from '../../actions/adminActions'
import NewProject from './NewProject'
import ProjectList from './ProjectList';

class AdminProjects extends Component {
    state = {
        showCreateProject: false
    }
    componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllProjects();
    }

    toggleShowCreateProject = () => {
        this.setState({
            showCreateProject: !this.state.showCreateProject
        })
    }

    render() {
        const { users, projects, getAllProjectMembers } = this.props;
        const { showCreateProject } = this.state;
        return (
            <div>
                {
                    showCreateProject ?
                        <NewProject users={users} /> :
                        <button className="btn"
                            style={{ marginTop: '25px' }}
                            onClick={this.toggleShowCreateProject}
                        >
                            New Project
                        </button>
                }
                <ProjectList projects={projects} getAllProjectMembers={getAllProjectMembers} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        projects: state.admin.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        getAllProjects: () => dispatch(getAllProjects()),
        getAllProjectMembers: (project_id) => dispatch(getAllProjectMembers(project_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProjects);