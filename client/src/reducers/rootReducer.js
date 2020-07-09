import { combineReducers } from 'redux';
import authReducer from './authReducer';
import entryReducer from './entryReducer';
import userReducer from './userReducer';
import timesheetReducer from './timesheetReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    entry: entryReducer,
    user: userReducer,
    timesheet: timesheetReducer,
    project: projectReducer
});

export default rootReducer;