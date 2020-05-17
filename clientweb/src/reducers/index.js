import { combineReducers } from 'redux';
import dashLink from './navlink';
import student from './student';
import fileUpload from './fileUpload';
export default combineReducers({
    dashLink,
    student,
    fileUpload
});