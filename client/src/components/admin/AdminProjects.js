import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/adminActions'
import NewProject from './NewProject'

class AdminProjects extends Component {
     componentDidMount() {
         this.props.getAllUsers();
     }
     
    render() { 
        const { users } = this.props;
        return ( 
            <div>
                <NewProject users={users} />
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