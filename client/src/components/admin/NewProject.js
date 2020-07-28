import React, { Component } from 'react'
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
        const weekStart = document.querySelectorAll('#start_date');
        M.Datepicker.init(weekStart, { disableWeekends: true, onSelect: this.selectStartDate });
        const weekEnd = document.querySelectorAll('#due_date');
        M.Datepicker.init(weekEnd, { disableWeekends: true, onSelect: this.selectDueDate });
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

    addUser = user => {
        const { members } = this.state;
        // Loop through members array to check if user already exists
        for (let i = 0; i < members.length; i++) {
            if (user.user_id === members[i].user_id) {
                return alert('Already added');
            }
        }
        // If user does not exist in members, add to array
        this.setState({
            members: [...members, user]
        })
    }



    render() {
        const { users } = this.props;
        const { members } = this.state;
        return (
            <div className="row section">
                <div className="col m12 l8">
                    <h5>Create a New Project</h5>
                    <form>
                        <div className="input-field">
                            <input type="text" id="project_name" onChange={this.handleChange} />
                            <label htmlFor="project_name">Project Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="details" onChange={this.handleChange} />
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
                            <ul>
                                {
                                    members && members.map((member, index) => (
                                        <li key={index}>{member.first_name} {member.last_name} &nbsp; &nbsp; X</li>
                                    ))
                                }
                            </ul>

                        </div>
                        <div className="input-field">
                            <button className="btn">Create</button>
                        </div>
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
                                    <tr key={index} style={{ cursor: 'pointer' }} onClick={this.addUser.bind(this, user)}>
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

export default NewProject;