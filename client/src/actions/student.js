export const course_data = (data) => (dispatch) => {
  dispatch({
    type: "GET_COURSE",
    payload: data,
  });
};
export const live_course = (payload) => (dispatch) => {
  dispatch({
    type: "GET_LIVE_COURSE",
    payload,
  });
};
const StudentActions = {
  course_data,
  live_course,
};

export default StudentActions;
