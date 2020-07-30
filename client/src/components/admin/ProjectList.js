import React, { Component } from 'react';
import EditProject from './EditProjects';

class ProjectList extends Component {
    state = {
        modalOpen: false,
        project: ''
    }

    openModal = (project) => {
        this.setState({
            modalOpen: true,
            project
        })
        // Get all project members for selected and set in state for modal use
        this.props.getAllProjectMembers(project.project_id)
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { projects } = this.props;
        const { project, modalOpen } = this.state;
        return (
            <div className="section">
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects && projects.map((project, index) => (
                                <tr key={index} style={{ cursor: 'pointer' }} onClick={this.openModal.bind(this, project)}>
                                    <td>{project.project_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            <EditProject
                project={project}
                modalOpen={modalOpen}
                closeModal={this.closeModal}
            />
            </div>
        );
    }
}

export default ProjectList;