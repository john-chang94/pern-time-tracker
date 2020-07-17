import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import M from 'materialize-css';
import { getEntriesForTimesheet } from '../../actions/userActions';

class NewTimesheet extends Component {
    state = { 
        start_date: '',
        end_date: '',
        week_start: '',
        week_end: '',
        total_entries: '',
        total_hours: ''
     }

     componentDidMount() {
         const datepicker = document.querySelectorAll('#timesheet');
         M.Datepicker.init(datepicker, { disableDayFn: [1,3,4,5,6,7] })
         console.log(moment(new Date(Date.now())).day(1).format('yyyy-MM-DD'))
         console.log(moment(new Date(Date.now())).day(5).format('yyyy-MM-DD'))
     }

    render() { 
        return ( 
            <div className="section">
                <input type="text" className="datepicker" id="timesheet" />
                <label htmlFor="date">Select work week</label>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEntriesForTimesheet: (user_id, start_date, end_date) => dispatch(getEntriesForTimesheet(user_id, start_date, end_date))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewTimesheet);