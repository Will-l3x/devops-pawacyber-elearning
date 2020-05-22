/** School actions */

import { SchoolService } from "../services/school";
import SchoolConstants from "../constants/school";
import AlertActions from "./alert";

export const get_subscribed_courses = (school_id, currentPageNumber, lim) => (
  dispatch
) => {
  SchoolService.get_subscribed_courses(school_id, currentPageNumber, lim)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: SchoolConstants.GET_SUBSCRIBED_COURSES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_subscribe_course = (payload) => (dispatch) => {
  dispatch({
    type: SchoolConstants.GET_SUBSCRIBE_COURSE,
    payload,
  });
};
export const subscribe_course = (school_id, course_id) => (dispatch) => {
  SchoolService.subscribe_course(school_id, course_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: SchoolConstants.SUBSCRIBE_COURSE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const unsubscribe_course = (school_id, course_id) => (dispatch) => {
  SchoolService.unsubscribe_course(school_id, course_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: SchoolConstants.UNSUBSCRIBE_COURSE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_all_teachers = () => (dispatch) => {
  SchoolService.get_all_teachers()
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: SchoolConstants.GET_ALL_TEACHERS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_all_students = () => (dispatch) => {
  SchoolService.get_all_students()
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: SchoolConstants.GET_ALL_STUDENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};

const SchoolActions = {
  get_subscribed_courses,
  get_subscribe_course,
  subscribe_course,
  unsubscribe_course,
  get_all_teachers,
  get_all_students,
};
export default SchoolActions;
