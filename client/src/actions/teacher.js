/** Teacher actions */

import { TeacherService } from "../services/teacher";
import { TeacherConstants } from "../constants/teacher";
import streams from "../services/streams";
import history from "../history";
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
      console.log(error);
      dispatch(AlertActions.error(error));
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
      console.log(error);
      dispatch(AlertActions.error(error));
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
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};
export const live_course = (payload) => (dispatch) => {
  dispatch({
    type: TeacherConstants.GET_LIVE_COURSE,
    payload,
  });
};
export const createStream = (formValues) => async (dispach, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispach({ type: TeacherConstants.CREATE_STREAM, payload: response.data });

  //programatic navitation after creating stream
  history.push("/");
};

export const fetchStreams = () => async (dispach) => {
  const response = await streams.get("/streams");

  dispach({ type: TeacherConstants.FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispach) => {
  const response = await streams.get("/streams/" + id);

  dispach({ type: TeacherConstants.FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispach) => {
  const response = await streams.patch("/streams/" + id, formValues);

  dispach({ type: TeacherConstants.EDIT_STREAM, payload: response.data });

  //programatic navitation after creating stream
  history.push("/");
};

export const deleteStream = (id) => async (dispach) => {
  await streams.delete("/streams/" + id);
  dispach({ type: TeacherConstants.DELETE_STREAM, payload: id });
  //programatic navitation after creating stream
  history.push("/");
};

const TeacherActions = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork,
  live_course,
  createStream,
  fetchStreams,
  fetchStream,
  editStream,
  deleteStream,
};
export default TeacherActions;
