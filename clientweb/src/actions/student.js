export const course_data = (data) => (dispatch) => {
  dispatch({
    type: "GET_COURSE",
    payload: data,
  });
};
