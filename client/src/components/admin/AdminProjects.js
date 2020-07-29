import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/adminActions'
import NewProject from './NewProject'
import ProjectList from './ProjectList';

class AdminProjects extends Component {
    state = {
        showCreateProject: false
    }
    componentDidMount() {
        this.props.getAllUsers();
    }

    toggleShowCreateProject = () => {
        this.setState({
            showCreateProject: !this.state.showCreateProject
        })
    }

    render() {
        const { users } = this.props;
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
                <ProjectList />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(getAllUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProjects);