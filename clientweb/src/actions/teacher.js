/** Teacher actions */

import { TeacherService } from "../services/teacher";
import { TeacherConstants } from "../constants/teacher";
import AlertActions from "./alert";

export const get_all_courses = (teacher_id) => (dispatch) => {
  TeacherService.get_all_courses(teacher_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: TeacherConstants.GET_ALL_COURSES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
export const get_teacher_pending_classwork = (teacher_id, classroom_id) => (
  dispatch
) => {
  TeacherService.get_teacher_pending_classwork(teacher_id, classroom_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: TeacherConstants.GET_ALL_PENDING,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
export const get_teacher_unmarked_classwork = (teacher_id, classroom_id) => (
  dispatch
) => {
  TeacherService.get_teacher_unmarked_classwork(teacher_id, classroom_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: TeacherConstants.GET_ALL_UNMARKED,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
const TeacherActions = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork,
};
export default TeacherActions; 