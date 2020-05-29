/** Classroom actions */

import { ClassroomService } from "../services/classroom";
import { ClassroomConstants } from "../constants/classroom";
import AlertActions from "./alert";

export const get_all_classwork = (id) => (dispatch) => {
  ClassroomService.get_all_classwork(id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.GET_ALL_CLASSWORK,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const post_new_classroom_material = (data) => (dispatch) => {
  ClassroomService.post_new_classroom_material(data)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.ADD_CLASSROOM_MATERIAL,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const delete_classwork = (classroom_id, classwork_id) => (dispatch) => {
  ClassroomService.delete_classwork(classroom_id, classwork_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.DELETE_CLASSWORK,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const post_teacher_to_classroom = (classroom_id, teacher_id) => (
  dispatch
) => {
  ClassroomService.post_teacher_to_classroom(classroom_id, teacher_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.ADD_TEACHER,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const post_student_to_classroom = (classroom_id, student_id) => (
  dispatch
) => {
  ClassroomService.post_student_to_classroom(classroom_id, student_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.ADD_STUDENT,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const update_student_marks = (classroom_id, student_id) => (
  dispatch
) => {
  ClassroomService.update_student_marks(classroom_id, student_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.UPDATE_STUDENT_MARKS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const upload_marked_classwork = (classroom_id, classwork_id, data) => (
  dispatch
) => {
  ClassroomService.upload_marked_classwork(classroom_id, classwork_id, data)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.UPLOAD_MARKED_CLASSWORK,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_all_test_folders = (classroom_id) => (dispatch) => {
  ClassroomService.get_all_test_folders(classroom_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.GET_ALL_TEST_FOLDERS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_all_test_files = (classroom_id, test_id) => (dispatch) => {
  ClassroomService.get_all_test_files(classroom_id, test_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.GET_ALL_TEST_FILES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_all_assignment_folders = (classroom_id) => (dispatch) => {
  ClassroomService.get_all_assignment_folders(classroom_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.GET_ALL_ASSIGNMENT_FOLDERS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const get_all_assignment_files = (classroom_id, assignment_id) => (
  dispatch
) => {
  ClassroomService.get_all_assignment_files(classroom_id, assignment_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: ClassroomConstants.GET_ALL_ASSIGNMENT_FILES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
const ClassroomActions = {
  get_all_classwork,
  post_new_classroom_material,
  delete_classwork,
  post_teacher_to_classroom,
  post_student_to_classroom,
  update_student_marks,
  upload_marked_classwork,
  get_all_test_folders,
  get_all_assignment_folders,
  get_all_test_files,
  get_all_assignment_files,
};
export default ClassroomActions;
