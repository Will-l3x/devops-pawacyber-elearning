/** Admin actions */

import { AdminService } from "../services/admin";
import { AdminConstants } from "../constants/admin";
import { AlertActions } from "../actions/alert";

export const get_all_courses = () => (dispatch) => {
  AdminService.get_all_courses()
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.GET_ALL_COURSES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const post_new_course = (data) => (dispatch) => {
  AdminService.post_new_course(data)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.ADD_NEW_COURSE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const post_course_topic = (course_id, data) => (dispatch) => {
  AdminService.post_course_topic(course_id, data)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.ADD_COURSE_TOPIC,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const delete_course = (course_id) => (dispatch) => {
  AdminService.delete_course(course_id)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.DELETE_COURSE,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const delete_course_topic = (course_id, topic_id) => (dispatch) => {
  AdminService.delete_course_topic(course_id, topic_id)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.DELETE_COURSE_TOPIC,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const get_course_material = (course_id) => (dispatch) => {
  AdminService.get_course_material(course_id)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.GET_COURSE_MATERIAL,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const post_course_material = (course_id, topic_id, data) => (
  dispatch
) => {
  AdminService.post_course_material(course_id, topic_id, data)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.ADD_COURSE_MATERIAL,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const update_course_material = (course_id, topic_id, data) => (
  dispatch
) => {
  AdminService.update_course_material(course_id, topic_id, data)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.UPDATE_COURSE_MATERIAL,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const get_all_teachers = () => (dispatch) => {
  AdminService.get_all_teachers()
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.GET_ALL_TEACHERS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const confirm_teacher = (teacher_id, data) => (dispatch) => {
  AdminService.confirm_teacher(teacher_id, data)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.CONFIRM_TEACHER,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const get_subscription_info = () => (dispatch) => {
  AdminService.get_subscription_info()
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.GET_SUBCRIPTION_INFO,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};
export const update_subscription_info = (subscription_id, data) => (dispatch) => {
  AdminService.update_subscription_info(subscription_id, data)
    .then((response) => {
      dispatch(AlertAcrions.success("Success"));
      dispatch({
        type: AdminConstants.UPDATE_SUBCRIPTION_INFO,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error), dispatch(AlertActions.error(error));
    });
};

const AdminActions = {
  get_all_courses,
  post_new_course,
  post_course_topic,
  delete_course,
  get_course_material,
  post_course_material,
  update_course_material,
  delete_course_topic,
  get_all_teachers,
  confirm_teacher,
  get_subscription_info,
  update_subscription_info,
};
export default AdminActions;
