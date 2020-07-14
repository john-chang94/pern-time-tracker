import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { getProjects } from '../../actions/userActions';

class NewEntry extends Component {
    state = { 
        project_id: '',
        hours_worked: '',
        details: ''
     }

     componentDidMount() {
         const { config, user } = this.props;
         M.FormSelect.init(this.formselect);
         M.Datepicker.init(this.datepicker);
         this.props.getProjects(config, user.user_id)
     }

     handleChange = e => {
         this.setState({
             [e.target.id]: e.target.value
         })
     }

    render() { 
        const { projects } = this.props;
        return ( 
            <div className="col l5 s12">
                <h4>Submit a time entry.</h4>
                <form className="">
                    <label htmlFor="project_id">Choose a project:</label>
                    <select ref={this.formselect}
                        className="input-field browser-default"
                        id="project_id"
                        onChange={this.handleChange}
                    >
                        {
                            projects ?
                                projects.map((project, index) => (
                                <option key={index} value={project.project_id}>{project.project_name}</option>
                                )) :
                                null
                        }
                    </select>
                    <label htmlFor="date">Date</label>
                    <input type="date" className="datepicker" id="date" ref={this.datepicker} />
                </form>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        config: state.auth.config,
        user: state.auth.user,
        projects: state.user.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjects: (token, user_id) => dispatch(getProjects(token, user_id))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);